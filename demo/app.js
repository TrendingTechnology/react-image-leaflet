import React from 'react';
import ReactDOM from 'react-dom';

import PanZoom from '../dist/index';

const App = () => {
  const [url, setUrl] = React.useState('https://source.unsplash.com/random');

  return (
    <div style={{ width: '500px', height: '500px' }}>
      <PanZoom
        url={url}
        attribution='<a target="_blank" href="https://source.unsplash.com/">source.unsplash.com</a>'
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
