import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import EvnetListener from 'react-event-listener';
import styled, { createGlobalStyle } from 'styled-components';

import PanZoom from '../src/index';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
  }
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgContainer = styled.div`
  margin: 0;
  padding: 0;
  height: 80%;
  width: 80%;
`;

const App = (): JSX.Element => {
  const [url, setUrl] = useState('https://source.unsplash.com/random');

  const regexp = /bmp|ico|gif|jpeg|png|apng|svg|webp/;
  const agent = window.navigator.userAgent.toLowerCase();
  const mac = agent.includes('mac os x');

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
        <ImgContainer>
          <PanZoom
            url={url}
            zoomSnap={mac ? 0.3 : 0}
            doubleClickReset
            getFocus
            attribution='<a target="_blank" href="https://source.unsplash.com/">source.unsplash.com</a>'
          />
        </ImgContainer>
      </Container>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
