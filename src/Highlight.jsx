// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as styleList from 'react-syntax-highlighter/dist/esm/styles/prism';
import { AutoSizer, List } from 'react-virtualized';
import './Highlight.css';

function Highlight({ language='plaintext', fontSize=12, lineHeight=0.75, rowHeight=30, text, theme='vsc-dark-plus'}) {

  // IMPORTANT!
  // The prop text must be a state that stores the file that will be highlighted.

  const camelTheme = theme?.replace(/[-_.]./g, x => x[1]?.toUpperCase());

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
          codeTagProps = {{
            style: {
              lineHeight: "inherit",
              fontSize: "inherit"
            }
          }}
          customStyle={{
            lineHeight: lineHeight,
            fontSize: `${fontSize}px`
          }}
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
        backgroundColor: '#1e1e1e',
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
