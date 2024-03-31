# Finsight 📈
## Your AI finance bro, Finn

<img src="https://github.com/charlestang06/finsight/blob/main/finsightBanner.png?raw=true" />

## About

Finsight is a RAG (retrieval augmented generation) AI app that helps new investors understand financial markets through experiential learning. With market data streamed from Yahoo Finance, state-of-the-art LLMs (large language models) process that data and deliver high-quality, unbiased market briefings to users through a friendly user interface. 

## Our Process 

We were motivated by the difficulty of learning more about the stock and financial markets, as they are taking a bigger role in our day-to-day wealth management lives. So, we determined a need for an educational platform to help new investors understand what the financial market looks like daily and provide critical insights on investments. As a result, Finsense came to be. We spent the first few hours planning our idea, including developing our unique “RAG” pipeline from data sources like Yahoo Finance to LLMs to the user interface with LangChain wrappers. We also sketched our idea on a whiteboard while researching similar designs: Yahoo Finance, Robinhood, Motley Fools, etc.

This was the second time most of our team members had developed with ReactJS and Firebase, so working with these web technologies was challenging, especially with passing data between components. Our team learned a lot about teamwork and communication, especially using GitHub as a centralized platform for code management (merge conflicts!). Furthermore, we learned a lot about the ideation process and how to plan for software with many moving parts (components, working with LLMs, API development, etc). 

## Current Features

- Top company stock listings dashboard for users to explore and add to their "favorites"
- In-depth RAG-generated stock briefings for day, month, quarter, and year
- User login for saving favorites
- Tutorial and definitions to help users learn about financial terms

### Future Work

- Deploy to a permanent cloud location and custom domain
- Experiment with different LLMs and Prompt Templates to improve response quality
- Streaming tokens for cleaner chat UI

## Technical

Finsense was developed with the following technologies:
- Frontend: ReactJS
- API: FastAPI, HuggingFace LLM (gemma:2b, published on Feb 21, 2024), Ollama, LangChain
- Database: Firebase Firestore
- Auth: Firebase Auth

### Local Hosting

To run the project locally, you may clone the repository linked above. You must have Node version 18+ and pip/Python 3.11+ installed on your machine.

**Setup**
```bash
git clone https://github.com/charlestang06/finsight
```

Then, install the dependencies.

```bash
cd web-app
npm install
cd ..
cd finance-rag-server
pip install -r requirements.txt
```

Run the server. The server will be listening on port 8000.

```bash
cd finance-rag-server
uvicorn main:app --reload
cd ..
```

Open a new command line and run the web-app.

```bash
cd web-app
npm start
```

Go to `localhost:3000` to view the project.


### Versions
* Version 1.0 (03/30/2024)
    * Initial Release
    * See [Commits history]

### License
MIT
