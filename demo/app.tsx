import React from 'react';
import ReactDOM from 'react-dom';
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
  const url = 'https://source.unsplash.com/random';

  const agent = window.navigator.userAgent.toLowerCase();
  const mac = agent.includes('mac os x');

  return (
    <React.Fragment>
      <GlobalStyle />
      <Container>
        <ImgContainer>
          <PanZoom url={url} zoomSnap={mac ? 0.3 : 0} doubleClickReset />
        </ImgContainer>
      </Container>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
