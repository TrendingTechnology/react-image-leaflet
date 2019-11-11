# react-image-leaflet

[![Actions Status](https://github.com/sprout2000/react-image-leaflet/workflows/github%20build/badge.svg)](https://github.com/{owner}/{repo}/actions)
[![GitHub license](https://img.shields.io/github/license/sprout2000/react-image-leaflet)](https://github.com/sprout2000/react-image-leaflet/blob/master/LICENSE.txt)
[![GitHub stars](https://img.shields.io/github/stars/sprout2000/react-image-leaflet)](https://github.com/sprout2000/react-image-leaflet/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/sprout2000/react-image-leaflet)](https://github.com/sprout2000/react-image-leaflet/network)
[![GitHub issues](https://img.shields.io/github/issues/sprout2000/react-image-leaflet)](https://github.com/sprout2000/react-image-leaflet/issues)

### [DEMO](https://codesandbox.io/s/react-image-leaflet-demo-2nhfk)

## Features

- Drag & Move
- Zoom In
- Zoom Out
- Adjust image size to parent containers

## Usage

Install

```bash
$ npm install -D react-image-leaflet
```

then in your jsx or tsx ...

```jsx
import React from 'react'
import ReactDOM from 'react-dom';

import PanZoom from 'react-image-leaflet';

const App = () => {
  return (
    <div style={{ width: '500px', height: '500px' }}>
      <PanZoom url={'https://source.unsplash.com/random'} bgColor={'#242424'} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

## Props

see [leaflet's document](https://leafletjs.com/reference-1.5.0.html) for details ...

- `url`: Image URL (required)
- `bgColor`: string (_default_: '#ddd')
- `preferCanvas`: boolean (_default_: false)
- `attributionControl`: boolean (_default_: true)
- `zoomControl`: boolean (_default_: true)
- `zoomSnap`: number (_default_: 1)
- `zoomDelta`: number (_default_: 1)
- `boxZoom`: boolean (_default_: true)
- `doubleClickZoom`: boolean | 'center' (_default_: true)
- `dragging`: boolean (_default_: true)
- `maxZoom`: number (_default_: 3)
- `zoomAnimation`: boolean (_default_: true)
- `zoomAnimationThreshold`: number (_default_: 4)
- `fadeAnimation`: boolean (_default_: true)
- `keyboard`: boolean (_default_: true)
- `keyboardPanDelta`: number (_default_: 80)
- `scrollWheelZoom`: boolean | 'center' (_default_: true)
- `wheelDebounceTime`: number (_default_: 40)
- `wheelPxPerZoomLevel`: number (_default_: 60)
- `tap`: boolean (_default_: true)
- `tapTolerance`: number (_default_: 15)
- `touchZoom`: boolean | 'center' (_default_: false)
- `bounceAtZoomLimits`: boolean (_default_: true)
