import React, { useEffect, useRef } from 'react';

function MiniChart({ ticker }) {
    const container = useRef();
    const scriptLoaded = useRef(false);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
      {
        "symbol": "NASDAQ:${ticker}",
        "autosize": true,   
        "locale": "en",
        "dateRange": "12M",
        "colorTheme": "light",
        "isTransparent": false,
        "autosize": false,
        "largeChartUrl": ""
      }`;
        container.current.appendChild(script);
        scriptLoaded.current = true;

    }, [ticker, scriptLoaded]);

    useEffect(() => {
        container.current.style.pointerEvents = "none";
    }, []);

    return (
        <div className="tradingview-widget-container" ref={container}>
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
}

export default MiniChart;
