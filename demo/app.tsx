import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import EventListener from 'react-event-listener';
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
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Label = styled.label`
  color: #ffffff;
  font-size: 2.5vh;
  padding: 0.5em 1.5em;
  border-radius: 0.25em;
  background-color: #007aff;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: #0060d2;
  }
`;

const Button = styled.input.attrs({ type: 'file', accept: 'image/*' })`
  display: none;
`;

const Text = styled.p`
  color: #666;
  font-size: 2.5vh;
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

  const load = (file: File): void => {
    const reader = new FileReader();

    reader.onload = (): void => {
      const img = new Image();

      img.onload = (): void => {
        setUrl(img.src);
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  };

  const handleOnClick = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    if (!file.type.match(regexp)) return;

    load(file);
  };

  const handleOnDrop = (e: DragEvent): void => {
    preventDefault(e);

    if (e.dataTransfer) {
      const file = e.dataTransfer.files[0];
      if (!file.type.match(regexp)) return;

      load(file);
    }
  };

  return (
    <React.Fragment>
      <GlobalStyle />
      <Container>
        <EventListener
          target="window"
          onDragEnter={(e): void => preventDefault(e)}
          onDragOver={(e): void => preventDefault(e)}
          onDragLeave={(e): void => preventDefault(e)}
          onDrop={(e): void => handleOnDrop(e)}
        />
        <Label>
          Open
          <Button type="file" onChange={(e): void => handleOnClick(e)} />
        </Label>
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
