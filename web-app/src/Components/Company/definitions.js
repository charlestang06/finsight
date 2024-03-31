const definitions = {
    "Market Capitalization": "Total value of a company's outstanding shares",
    "EPS": "Profit allocated to each outstanding share",
    "PE Ratio": "Stock price relative to earnings per share",
    "Dividend Yield": "Percentage of dividends relative to share price",
    "Return on Investment": "Measure of profitability relative to investment",
    "ROI": "Measure of profitability relative to investment",
    "Beta": "Measure of a stock's volatility compared to market",
    "Volatility": "Degree of variation in trading price of a security",
    "Liquidity": "Ease of converting an asset to cash without loss",
    "Net Asset Value": "Value of a fund's assets minus liabilities",
    "NAV": "Value of a fund's assets minus liabilities",
    "Book Value": "Value of a company's assets minus liabilities",
    "Debt-to-Equity Ratio": "Proportion of debt to equity in a company",
    "Debt-to-Equity": "Proportion of debt to equity in a company",
    "Profit Margin": "Ratio of profit to revenue for a company",
    "Operating Margin": "Ratio of operating income to revenue",
    "Gross Margin": "Ratio of gross profit to revenue",
    "Free Cash Flow": "Cash generated by a company after expenses",
    "FCF": "Cash generated by a company after expenses",
    "Current Ratio": "Ability of a company to pay short-term obligations",
    "Quick Ratio": "Measure of company's ability to meet short-term liabilities",
    "Return on Assets": "Profitability relative to total assets",
    "ROA": "Profitability relative to total assets",
    "Return on Equity": "Profitability relative to shareholders' equity",
    "ROE": "Profitability relative to shareholders' equity",
    "Price-to-Book Ratio": "Comparison of a stock's market value to its book value",
    "PB Ratio": "Comparison of a stock's market value to its book value",
    "Market Sentiment": "Overall attitude of investors towards a market",
    "Bull Market": "Period of rising stock prices",
    "Bear Market": "Period of falling stock prices",
    "Market Correction": "Reversal of at least 10% in stock prices",
    "Market Cap Weighted Index": "Index where components are weighted by market capitalization",
    "Dow Jones": "Price-weighted average of 30 large US stocks",
    "S&P 500": "Index of 500 large-cap American stocks",
    "NASDAQ": "Stock market index of over 2,500 stocks",
    "VIX": "Measure of market's expectation of volatility",
    "Dividend Payout Ratio": "Percentage of earnings paid out as dividends",
    "Earnings Yield": "Earnings per share relative to stock price",
    "PS Ratio": "Comparison of stock price to revenue per share",
    "Enterprise Value": "Total value of a company including debt and equity",
    "Alpha": "Measure of investment performance relative to market",
    "Sharpe Ratio": "Risk-adjusted measure of investment performance",
    "Treynor Ratio": "Risk-adjusted measure of investment returns",
    "Sortino Ratio": "Risk-adjusted measure of investment returns",
    "Standard Deviation": "Measure of dispersion from the mean",
    "Correlation": "Degree to which two securities move in relation to each other",
    "Moving Average": "Average of a security's price over a period",
    "Resistance Level": "Price level at which a security faces selling pressure",
    "Support Level": "Price level at which a security faces buying pressure",
    "Volume": "Number of shares traded in a security or market",
    "Market Order": "Instruction to buy or sell at current market price",
    "Limit Order": "Instruction to buy or sell at a specific price",
    "Stop-Loss Order": "Order to sell a security when it reaches a certain price",
    "Short Selling": "Selling borrowed securities with intention of buying them back later",
    "Dividend": "Distribution of company profits to shareholders",
    "Stock Split": "Division of a company's existing shares into multiple shares",
    "Initial Public Offering (IPO)": "First sale of stock by a private company to the public",
    "Secondary Offering": "Sale of new or existing shares by a company",
    "Underwriting": "Process of guaranteeing financial support for a venture",
    "Market Maker": "Entity that facilitates trading by providing bid and ask prices",
    "Arbitrage": "Simultaneous buying and selling to profit from price discrepancies",
    "Hedge Fund": "Investment fund employing various strategies to maximize returns",
    "Mutual Fund": "Investment fund pooling money from many investors",
    "Exchange-Traded Fund (ETF)": "Investment fund traded on stock exchanges",
    "Index Fund": "Mutual fund or ETF that tracks a market index",
    "Blue Chip Stocks": "Stable, large-cap stocks with proven track records",
    "Penny Stocks": "Low-priced stocks with small market capitalizations",
    "Value Stocks": "Stocks considered undervalued relative to fundamentals",
    "Growth Stocks": "Stocks expected to grow at an above-average rate",
    "Cyclical Stocks": "Stocks whose performance mirrors economic cycles",
    "Defensive Stocks": "Stocks resistant to economic downturns",
    "Income Stocks": "Stocks that pay dividends consistently",
    "Tech Stocks": "Stocks of technology-based companies",
    "Banking Stocks": "Stocks of companies in the banking sector",
    "Biotech Stocks": "Stocks of companies in the biotechnology sector",
    "Blue-Sky Laws": "State regulations governing the sale of securities",
    "Insider Trading": "Buying or selling of securities based on non-public information",
    "Proxy Statement": "Document disclosing information to shareholders",
    "Annual Report": "Company's yearly financial report to shareholders",
    "Quarterly Report": "Company's financial report every three months",
    "Securities and Exchange Commission (SEC)": "US regulatory agency overseeing securities markets",
    "Federal Reserve": "Central banking system of the United States",
    "Stock Exchange": "Marketplace where securities are bought and sold",
    "Dark Pool": "Private securities exchange for large-volume trades",
    "Market Maker Spread": "Difference between bid and ask prices quoted by a market maker",
    "High-Frequency Trading (HFT)": "Algorithmic trading characterized by high speed and volume",
    "Insolvency": "Inability to meet financial obligations",
    "Bankruptcy": "Legal process of declaring insolvency and restructuring debts",
    "Recapitalization": "Process of restructuring a company's debt and equity",
    "Dividend Aristocrats": "Companies with a history of consistently increasing dividends",
    "Earnings Report": "Release of a company's financial results to the public",
    "Market Capitalization Weighting": "Index weighting based on market capitalization",
    "P/E": "Price-to-Earnings Ratio: Stock price relative to earnings per share",
    "DCF": "Discounted Cash Flow: Valuation method estimating future cash flows",
    "IRR": "Internal Rate of Return: Discount rate yielding zero net present value",
    "EBITDA": "Earnings Before Interest, Taxes, Depreciation, and Amortization",
    "CAGR": "Compound Annual Growth Rate: Average annual growth rate",
    "WACC": "Weighted Average Cost of Capital: Average rate of return a company is expected to pay",
    "CAPM": "Capital Asset Pricing Model: Method for pricing risky securities",
    "FIFO": "First In, First Out: Inventory costing method",
    "LIFO": "Last In, First Out: Inventory costing method",
    "EBIT": "Earnings Before Interest and Taxes: Measure of a company's operating performance",
    "GAAP": "Generally Accepted Accounting Principles: Standard accounting rules",
    "NPV": "Net Present Value: Present value of expected cash flows",
    "Total Assets": "Sum of all assets owned by a company",
    "Total Liabilities": "Sum of all debts owed by a company",
    "Shareholder's Equity": "Residual interest in the assets of a company after liabilities are deducted",
    "Current Assets": "Assets expected to be converted into cash within one year",
    "Current Liabilities": "Obligations due within one year",
    "Long-Term Assets": "Assets not expected to be converted into cash within one year",
    "Long-Term Liabilities": "Obligations due beyond one year",
    "Inventory": "Value of goods held for sale",
    "Accounts Payable": "Money owed by a company to its suppliers",
    "Accounts Receivable": "Money owed to a company by its customers"
}

export default definitions;