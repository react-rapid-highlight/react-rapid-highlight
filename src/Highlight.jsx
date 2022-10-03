// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import * as styleList from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { AutoSizer, List } from 'react-virtualized';
import './Highlight.css';

function Highlight({ language='plaintext', fontSize=14, rowHeight=30, text, style='darcula'}) {

  // IMPORTANT!
  // The prop text must be a state that stores the file that will be highlighted.

  const camelStyle = style?.replace(/-./g, x => x[1]?.toUpperCase());

  const [textRows, setTextRows] = useState([]);

  useEffect(() => {
    setTextRows(text?.split('\n'));
  }, [text]);

  const rowRenderer = ({
                         index,
                         // isScrolling,
                         key,
                         rowStyle,
                       }) => {
    // if (isScrolling) return <div key={key} style={style} />;

    return (
      <div key={key} style={{ ...rowStyle, width: 'auto', fontSize: fontSize }}>
        <SyntaxHighlighter language={language} style={styleList[camelStyle]}>
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
