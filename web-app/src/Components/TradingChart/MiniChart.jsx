import React, { useEffect, useRef, useState } from 'react';

function MiniChart({ ticker }) {
    const container = useRef();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
      {
        "symbol": "TSLA",
        "autosize": true,   
        "locale": "en",
        "dateRange": "12M",
        "colorTheme": "light",
        "isTransparent": false,
        "autosize": true,
        "largeChartUrl": ""
      }`;
        if (container.current.firstChild) {
            container.current.removeChild(container.current.firstChild);
        }
        else {
          container.current.appendChild(script);
        }
    }, []);

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
