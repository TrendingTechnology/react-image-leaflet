import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import EvnetListener from 'react-event-listener';

import PanZoom from '../src/index';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
  }
`;

const Container = styled.div`
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  font-size: 2.5vh;
  color: #666;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Leaflet = styled.div`
  width: 80%;
  height: 70%;
`;

const App = (): JSX.Element => {
  const [url, setUrl] = useState('https://source.unsplash.com/random');

  const regexp = /bmp|ico|gif|jpeg|png|apng|svg|webp/;
  const macos = window.navigator.userAgent.includes('Mac OS X');

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
    <React.Fragment>
      <GlobalStyle />
      <Container>
        <EvnetListener
          target="window"
          onDragEnter={(e): void => preventDefault(e)}
          onDragOver={(e): void => preventDefault(e)}
          onDragLeave={(e): void => preventDefault(e)}
          onDrop={(e): void => handleOnDrop(e)}
        />
        <Text>You can also drop an image file here... </Text>
        <Leaflet>
          <PanZoom
            url={url}
            zoomSnap={macos ? 0.3 : 0}
            doubleClickReset
            getFocus
            attribution='<a target="_blank" href="https://source.unsplash.com/">source.unsplash.com</a>'
          />
        </Leaflet>
      </Container>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
