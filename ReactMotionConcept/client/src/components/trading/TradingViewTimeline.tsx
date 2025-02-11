import React, { useEffect, useRef, memo } from 'react';
import styled from 'styled-components';

const TimelineContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 200px;
  height: 275px;
  z-index: 10;
`;

function TradingViewTimeline() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "feedMode": "all_symbols",
        "isTransparent": false,
        "displayMode": "regular",
        "width": 200,
        "height": 275,
        "colorTheme": "dark",
        "locale": "en"
      }`;

    if (container.current) {
      container.current.innerHTML = '';
      const widgetContainer = document.createElement('div');
      widgetContainer.className = 'tradingview-widget-container';

      const widget = document.createElement('div');
      widget.className = 'tradingview-widget-container__widget';

      const copyright = document.createElement('div');
      copyright.className = 'tradingview-widget-copyright';
      copyright.innerHTML = '<a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a>';

      widgetContainer.appendChild(widget);
      widgetContainer.appendChild(copyright);
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
    <TimelineContainer>
      <div ref={container} />
    </TimelineContainer>
  );
}

export default memo(TradingViewTimeline);