// eslint-disable-next-line
import React, { useEffect, useState, useRef, createRef } from 'react';
import hljs from 'highlight.js';
import { AutoSizer, List } from 'react-virtualized';
import { useFilesContext } from '../../../../contexts/FilesContext';
import './Previewer.css';

function PreviewCode() {
  const { selectedFileVersion, fileVersionViewLink } = useFilesContext();

  const rowHeight = 30;

  const rowRefs = useRef([]);

  const viewLink = fileVersionViewLink();

  const [fileContent, setFileContent] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFiletype = () => {
    const fileExt = selectedFileVersion?.file?.type.toLowerCase();
    switch (fileExt) {
      case 'py':
        return 'language-python';
      case 'js':
        return 'language-javascript';
      case 'json':
        return 'language-json';
      case 'lis':
      case 'fem':
      case 'txt':
      default:
        return 'language-plaintext';
    }
  };

  const updateRefs = () => {
    rowRefs?.current?.forEach((ref) => {
      if (ref.current != null) {
        hljs.highlightElement(ref.current);
      }
    });
    rowRefs.current = [];
  };

  useEffect(() => {
    updateRefs();
  }, [fileContent]);

  useEffect(() => {
    if (!viewLink) return;

    setLoading(true);

    fetch(viewLink)
      .then((response) => {
        console.log('download finished', Date().toLocaleString());
        return response.text();
      })
      .then((text) => {
        console.log('.text() finished', Date().toLocaleString());
        setLoading(false);
        setFileContent(text.split('\n'));
      });

    // eslint-disable-next-line consistent-return
    return () => {
      setLoading(false);
      setFileContent('');
    };
  }, [viewLink]);

  const rowRenderer = ({
    index,
    // isScrolling,
    key,
    style,
  }) => {
    // console.log('Index:', index);
    // if (isScrolling) return <div key={key} style={style} />;

    const newRef = createRef();
    rowRefs.current.push(newRef);

    return (
      <div key={key} style={{ ...style, width: 'auto', fontSize: 14 }}>
        <pre>
          <code
            ref={newRef}
            className={getFiletype()}
            // style={{ overflow: 'hidden' }}
          >
            {fileContent[index]}
          </code>
        </pre>
      </div>
    );
  };

  if (loading) return <>Loading...</>;

  return (
    <div className="highlighter">
      <AutoSizer>
        {({ width, height }) => (
          <List
            className="highlighterList"
            height={height}
            width={width}
            rowCount={fileContent.length}
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

export default PreviewCode;
