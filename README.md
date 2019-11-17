# react-image-leaflet

[![Actions Status](https://github.com/sprout2000/react-image-leaflet/workflows/github%20build/badge.svg)](https://github.com/{owner}/{repo}/actions)
![GitHub file size in bytes](https://img.shields.io/github/size/sprout2000/react-image-leaflet/dist/index.js)
![npm](https://img.shields.io/npm/dt/react-image-leaflet)
[![GitHub license](https://img.shields.io/github/license/sprout2000/react-image-leaflet)](https://github.com/sprout2000/react-image-leaflet/blob/master/LICENSE.txt)

A React library based on leaflet that adds pan and zoom features to images

### [DEMO](https://sprout2000.github.io/react-image-leaflet/)

## Features

- Pan & Zoom
- Adjust image size according to parent containers
- Provided with Type Difinitions

## Usage

Install

```bash
$ npm install react-image-leaflet
```

then in your jsx or tsx ...

```jsx
import React from 'react'
import ReactDOM from 'react-dom';

import PanZoom from 'react-image-leaflet';

const App = () => {
  return (
    <div style={{ width: '500px', height: '500px' }}>
      <PanZoom url={'https://source.unsplash.com/random'} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

## Props

- `url`: Image URL (required)
- `bgColor`: string (_default_: '#ddd')
- `margin`: string | number (_default_: 0)
- `padding`: string | number (_default_: 0)
- `zIndex`: number | 'inherit' (_default_: 'inherit')
- `doubleClickReset`: boolean (_default_: false, _overrides_ `doubleClickZoom`)
- `attribution`: string (The HTML text)

### Props inherited from [Leaflet](https://leafletjs.com/)

see [leaflet's documents](https://leafletjs.com/reference-1.5.0.html) for more details ...

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
- `touchZoom`: boolean | 'center' (_default_: true)
- `bounceAtZoomLimits`: boolean (_default_: true)
