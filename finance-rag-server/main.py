# FastAPI for PubMed RAG

# Imports
import uvicorn
from typing import List
from fastapi import FastAPI
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.llms import Ollama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.document_loaders import PubMedLoader
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.pydantic_v1 import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import yake
from langchain_core.documents import Document
from langchain_core.runnables.base import Runnable
import yfinance as yf
import pandas as pd
from requests import Session
from requests_cache import CacheMixin, SQLiteCache
from requests_ratelimiter import LimiterMixin, MemoryQueueBucket
from pyrate_limiter import Duration, RequestRate, Limiter
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


# Hyperparameters
class CachedLimiterSession(CacheMixin, LimiterMixin, Session):
    pass


session = CachedLimiterSession(
    limiter=Limiter(
        RequestRate(5, Duration.SECOND * 5)
    ),  # max 2 requests per 5 seconds
    bucket_class=MemoryQueueBucket,
    backend=SQLiteCache("yfinance.cache"),
)

model = "gemma:2b"
prompt = ChatPromptTemplate.from_template(
    """
[INST] Write an in-depth financial review outlining the important key takeaways based on financial indicators and data for the stock ticker focused on the past {period}. 
Make sure to higlight any specific outlier data points and provide a brief analysis of the {name}'s financial health and future outlook, highlighting specific data. 
Write as if it was a report to an investor interested in {name}, and to recommend whether this stock seems like a good buy or sell. Make sure to mention the company's name: {name} [/INST]
 
Stock ticker: {ticker}
Company name: {name}
Market cap: {marketCap}
Period: {period}

<Price History>
{price_history}
</Price History>

<Indicators>
{indicators}
</Indicators>

<Income Statement>
{income_statement}
</Income Statement>

<Relevant News>
{news}
</Relevant News>

<Output Template>
{name} ({ticker}) Financial Review
Key Points:
[bulleted list]

Financial Analysis:
[bulleted list]

Future Outlook / Recommendations:
[bulleted list]

Summary: 
[paragraph]
</Output Template>
"""
)

llm = Ollama(model=model)
chain = prompt | llm

cred = credentials.Certificate("finsight-5cae6-firebase-adminsdk-8vm5q-04e459691c.json")
fb_app = firebase_admin.initialize_app(cred)
db = firestore.client()

# helper method to get stock info from yfinance
def get_stock_info(ticker: str, length: int):
    assert length in [1, 7, 30, 90, 365]
    lengthInt = [1, 7, 30, 90, 365]
    lengthStr = ["day", "week", "month", "quarter", "year"]
    try:
        stock = yf.Ticker(ticker, session=session)
    except:
        return None
    end_date = pd.Timestamp.today().strftime("%Y-%m-%d")
    start_date = (pd.Timestamp.today() - pd.Timedelta(days=length)).strftime("%Y-%m-%d")
    data = {
        # Descriptive
        "ticker": ticker,
        "period": lengthStr[lengthInt.index(length)],
        "name": stock.info["shortName"] if "shortName" in stock.info else ticker,
        "indicators": {
            "dividentYield": (
                stock.info["dividendYield"] if "dividendYield" in stock.info else None
            ),
            "beta": stock.info["beta"] if "beta" in stock.info else None,
            "PE": stock.info["trailingPE"] if "trailingPE" in stock.info else None,
            "fiftyDayAverage": (
                stock.info["fiftyDayAverage"]
                if "fiftyDayAverage" in stock.info
                else None
            ),
            "twoHundredDayAverage": (
                stock.info["twoHundredDayAverage"]
                if "twoHundredDayAverage" in stock.info
                else None
            ),
            "shortRatio": (
                stock.info["shortRatio"] if "shortRatio" in stock.info else None
            ),
            "trailingEps": (
                stock.info["trailingEps"] if "trailingEps" in stock.info else None
            ),
            "ebitda": stock.info["ebitda"] if "ebitda" in stock.info else None,
            "currentRatio": (
                stock.info["currentRatio"] if "currentRatio" in stock.info else None
            ),
            "totalRevenue": (
                stock.info["totalRevenue"] if "totalRevenue" in stock.info else None
            ),
            "freeCashflow": (
                stock.info["freeCashflow"] if "freeCashflow" in stock.info else None
            ),
            "operatingMargins": (
                stock.info["operatingMargins"]
                if "operatingMargins" in stock.info
                else None
            ),
            "profitMargins": (
                stock.info["profitMargins"] if "profitMargins" in stock.info else None
            ),
            "earningsGrowth": (
                stock.info["earningsGrowth"] if "earningsGrowth" in stock.info else None
            ),
        },
        "website": stock.info["website"] if "website" in stock.info else None,
        "sector": stock.info["sector"] if "sector" in stock.info else None,
        "description": (
            stock.info["longBusinessSummary"]
            if "longBusinessSummary" in stock.info
            else None
        ),
        "marketCap": stock.info["marketCap"] if "marketCap" in stock.info else None,
        "currency": stock.info["currency"] if "currency" in stock.info else None,
        "info": stock.info,
        "price_history": (
            stock.history(start=start_date, end=end_date).iloc[::6]
            if length <= 90
            else stock.history(start=start_date, end=end_date).iloc[::30]
        ),
        "income_statement": stock.income_stmt.iloc[:, :1],
        "balance_sheet": stock.balance_sheet.iloc[:20, :1],
        "cash_flow": stock.cashflow.iloc[:20, :1],
        "recommendations": stock.recommendations,
        "news": stock.news,
    }
    return data

# get LLM summary
def get_summary(ticker: str, length: int):
    temp_data = get_stock_info(ticker, length)
    assert length in [1, 7, 30, 90, 365]
    lengthInt = [1, 7, 30, 90, 365]
    lengthStr = ["day", "week", "month", "quarter", "year"]

    if not temp_data:
        return {"response": "Invalid stock ticker"}
    data = {
        "ticker": temp_data["ticker"],
        "period": temp_data["period"],
        "name": temp_data["name"],
        "marketCap": temp_data["marketCap"],
        "price_history": temp_data["price_history"],
        "indicators": temp_data["indicators"],
        "income_statement": temp_data["income_statement"],
        "news": [x["title"] for x in temp_data["news"]],
    }
    
    response = "Invalid stock ticker"

    if data["name"]:
        # firebase caching
        typePeriod = lengthStr[lengthInt.index(length)]
        currentDay = pd.Timestamp.today().day
        currentMonth = pd.Timestamp.today().month
        currentYear = pd.Timestamp.today().year
        docName = ""

        # find firebase doc name
        llm_cache_ref = db.collection("llmcache")
        if typePeriod == "day":
            docName = f"{ticker}-{currentMonth}-{currentDay}-{currentYear}-day"
        elif typePeriod == "week":
            docName = f"{ticker}-{currentMonth}-{int(currentDay / 7)}-{currentYear}"
        elif typePeriod == "month":
            docName = f"{ticker}-{currentMonth}-{currentYear}"
        elif typePeriod == "quarter":
            docName = f"{ticker}-Q{int(currentMonth / 3)}-{currentYear}"
        elif typePeriod == "year":
            docName = f"{ticker}-{currentYear}"

        # if doc exists in firebase
        if llm_cache_ref.document(docName).get().exists:
            temp_dict = llm_cache_ref.document(docName).get().to_dict()
            response = temp_dict["response"]
        # else
        else:
            response = chain.invoke(data)
            llm_cache_ref.document(docName).set(
                {
                    "response": response,
                }
            ) 

    return {
        "response": response,
    }

def get_chat_response(ticker: str, length: int, query: str):
    response = get_summary(ticker, length)
    promptChat = ChatPromptTemplate.from_template(
        """
        Answer as if you are a financial analyst. 
        <Context>
        {context}
        <Context>  
        Query: {query}                              
        """
                                                  )
    chatChain = promptChat | llm
    output = chatChain.invoke({"context": response["response"], "query": query})
    return {"response": output}

def get_company_info(ticker: str):
    temp_data = get_stock_info(ticker, 30)
    return {
        "links": [x["link"] for x in temp_data["news"]],
        "description": temp_data["description"],
        "website": temp_data["website"],
        "name": temp_data["name"],
        "marketCap": temp_data["marketCap"]
    }

# create user or update favorites
def send_user_favorites(user_id: str, favorites: List[str]):
    user_ref = db.collection("users").document(user_id)
    user_ref.set(
        {
            "favorites": favorites
        })

def get_user_favorites(user_id: str):
    try: 
        user_ref = db.collection("users").document(user_id)
        favorites = user_ref.get().to_dict()["favorites"]
    except:
        favorites = []
    return favorites

# App Configs
app = FastAPI(
    title="LangChain Server for Finsight RAG",
    version="1.0",
    description="An API server using FastAPI",
)


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/get/")
def answer(ticker: str, length: int):
    response = get_summary(ticker, length)
    return response

@app.get("/company/{ticker}")
def company(ticker: str):
    response = get_company_info(ticker)
    return response

@app.get("/getChat/")
def chat(ticker: str, length: int, query: str):
    response = get_chat_response(ticker, length, query)
    return response

@app.get("/get_favorites/{user_id}")
def favorites(user_id: str):
    response = get_user_favorites(user_id)
    return response

@app.post("/post_favorites/")
def favorites(user_id: str, favorites: List[str]):
    send_user_favorites(user_id, favorites)
    return {"response": True}

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, log_level="info")
