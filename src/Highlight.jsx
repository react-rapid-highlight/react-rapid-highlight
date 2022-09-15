// eslint-disable-next-line
import React, { useState, useEffect, useRef, createRef } from 'react';
import hljs from 'highlight.js';
import { AutoSizer, List } from 'react-virtualized';
import './Highlight.css';

function Highlight({ language='language-plaintext', fontSize=14, rowHeight=30, text}) {

  // IMPORTANT!
  // The prop text must be a state that stores the file that will be highlighted.

  const [textRows, setTextRows] = useState([]);

  const rowRefs = useRef([]);

  const updateRefs = () => {
    rowRefs?.current?.forEach((ref) => {
      if (ref.current != null) {
        hljs.highlightElement(ref.current);
      }
    });
    rowRefs.current = [];
  };

  useEffect(() => {
    setTextRows(text?.split('\n'));
  }, [text]);

  useEffect(() => {
    updateRefs();
  }, [textRows]);

  const rowRenderer = ({
    index,
    // isScrolling,
    key,
    style,
  }) => {
    // if (isScrolling) return <div key={key} style={style} />;

    const newRef = createRef();
    rowRefs.current.push(newRef);

    return (
      <div key={key} style={{ ...style, width: 'auto', fontSize: fontSize }}>
        <pre>
          <code
            ref={newRef}
            className={language}
          >
            {textRows[index]}
          </code>
        </pre>
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
            onRowsRendered={updateRefs}
          />
        )}
      </AutoSizer>
    </div>
  );
}

export default Highlight;
