import React, { useEffect, useRef, memo } from 'react';
import styled from 'styled-components';

const WidgetContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  opacity: 0.9; // Changed from 0.85 to 0.9
  pointer-events: none;

  .tradingview-widget-container {
    height: 100%;
    width: 100%;
  }
`;

function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "exchanges": ["NYSE"],
        "dataSource": "SPX500",
        "grouping": "sector",
        "blockSize": "market_cap_basic",
        "blockColor": "change",
        "locale": "en",
        "symbolUrl": "",
        "colorTheme": "dark",
        "hasTopBar": false,
        "isDataSetEnabled": false,
        "isZoomEnabled": true,
        "hasSymbolTooltip": true,
        "isMonoSize": false,
        "width": "100%",
        "height": "100%"
      }`;

    if (container.current) {
      container.current.innerHTML = '';
      const widgetContainer = document.createElement('div');
      widgetContainer.className = 'tradingview-widget-container';

      const widget = document.createElement('div');
      widget.className = 'tradingview-widget-container__widget';

      widgetContainer.appendChild(widget);
      widgetContainer.appendChild(script);
      container.current.appendChild(widgetContainer);
    }

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <WidgetContainer>
      <div ref={container} style={{ height: '100%', width: '100%' }} />
    </WidgetContainer>
  );
}

export default memo(TradingViewWidget);