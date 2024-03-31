import React, { useEffect, useRef, memo } from 'react';

function FinInfo({ticker}) {
    const container = useRef();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-financials.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
        {
            "isTransparent": false,
            "largeChartUrl": "",
            "displayMode": "adaptive",
            "width": "100%",
            "height": "100%",
            "colorTheme": "light",
            "symbol": "${ticker}",
            "locale": "en"
        }
        `;
        if (container.current.firstChild) {
            container.current.removeChild(container.current.firstChild);
        }
        else {
            container.current.appendChild(script);
        }
    }, []);

    return (
        <div className="tradingview-widget-container" ref={container}>
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
}

export default memo(FinInfo);
