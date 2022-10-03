// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import * as styleList from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { AutoSizer, List } from 'react-virtualized';
import './Highlight.css';

function Highlight({ language='plaintext', rowHeight=30, text, theme='darcula'}) {

  // IMPORTANT!
  // The prop text must be a state that stores the file that will be highlighted.

  const camelTheme = theme?.replace(/-./g, x => x[1]?.toUpperCase());

  const [textRows, setTextRows] = useState([]);

  useEffect(() => {
    setTextRows(text?.split('\n'));
  }, [text]);

  const rowRenderer = ({
                         index,
                        //  isScrolling,
                         key,
                         style,
                       }) => {
    // if (isScrolling) return <div key={key} style={style} />;

    return (
      <div
        key={key}
        style={{
          ...style, 
          width: 'auto'
        }}
      >
        <SyntaxHighlighter
          language={language}
          style={styleList[camelTheme]}
        >
          {textRows[index]}
        </SyntaxHighlighter>
      </div>
    );
  };

  return (
    <div
      className="highlighter"
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: styleList[camelTheme]?.hljs?.background,
        color: 'lightgrey'
      }}
    >
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
