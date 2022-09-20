// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { AutoSizer, List } from 'react-virtualized';
import './Highlight.css';

function Highlight({ language='plaintext', fontSize=14, rowHeight=30, text}) {

  // IMPORTANT!
  // The prop text must be a state that stores the file that will be highlighted.

  const [textRows, setTextRows] = useState([]);

  useEffect(() => {
    setTextRows(text?.split('\n'));
  }, [text]);

  const rowRenderer = ({
                         index,
                         // isScrolling,
                         key,
                         style,
                       }) => {
    // if (isScrolling) return <div key={key} style={style} />;

    return (
      <div key={key} style={{ ...style, width: 'auto', fontSize: fontSize }}>
        <SyntaxHighlighter language={language} style={ darcula }>
          {textRows[index]}
        </SyntaxHighlighter>
      </div>
    );
  };

  return (
    <div className="highlighter">
      <AutoSizer className="highlighterAutoSizer">
        {({ width, height }) => (
          <List
            className="highlighterList"
            height={height}
            width={width}
            rowCount={textRows.length}
            rowHeight={rowHeight}
            rowRenderer={rowRenderer}
            overscanRowCount={0}
          />
        )}
      </AutoSizer>
    </div>
  );
}

export default Highlight;
