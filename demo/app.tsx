import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import EvnetListener from 'react-event-listener';

import PanZoom from '../src/index';

const App = (): JSX.Element => {
  const [url, setUrl] = useState('https://source.unsplash.com/random');

  const regexp = /bmp|ico|gif|jpeg|png|apng|svg|webp/;
  const agent = window.navigator.userAgent.toLowerCase();
  const macos = agent.includes('mac os x');

  const preventDefault = (e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleOnDrop = (e: DragEvent): void => {
    preventDefault(e);

    if (e.dataTransfer) {
      const file = e.dataTransfer.files[0];
      if (!file.type.match(regexp)) return;

      const reader = new FileReader();

      reader.onload = (): void => {
        const img = new Image();

        img.onload = (): void => {
          setUrl(img.src);
        };

        img.src = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container">
      <EvnetListener
        target="window"
        onDragEnter={(e): void => preventDefault(e)}
        onDragOver={(e): void => preventDefault(e)}
        onDragLeave={(e): void => preventDefault(e)}
        onDrop={(e): void => handleOnDrop(e)}
      />
      <div className="header">You can also drop an image file here... </div>
      <div className="content">
        <div className="image-container">
          <PanZoom
            url={url}
            zoomSnap={macos ? 0.3 : 0}
            doubleClickReset
            getFocus
            attribution='<a target="_blank" href="https://source.unsplash.com/">source.unsplash.com</a>'
          />
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
