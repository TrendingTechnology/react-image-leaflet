import React from 'react';
import 'leaflet/dist/leaflet.css';
interface Props {
    url: Readonly<string>;
    preferCanvas?: boolean;
    attributionControl?: boolean;
    zoomControl?: boolean;
    zoomSnap?: number;
    zoomDelta?: number;
    boxZoom?: boolean;
    doubleClickZoom?: boolean | 'center';
    dragging?: boolean;
    maxZoom?: number;
    zoomAnimation?: boolean;
    zoomAnimationThreshold?: number;
    fadeAnimation?: boolean;
    keyboard?: boolean;
    keyboardPanDelta?: number;
    scrollWheelZoom?: boolean | 'center';
    wheelDebounceTime?: number;
    wheelPxPerZoomLevel?: number;
    tap?: boolean;
    tapTolerance?: number;
    touchZoom?: boolean | 'center';
    bounceAtZoomLimits?: boolean;
    bgColor?: string;
}
interface State {
    width: number;
    height: number;
}
export default class PanZoom extends React.Component<Props, State> {
    state: State;
    private outRef;
    private map;
    private bgColor;
    private options;
    private calc;
    private draw;
    componentDidMount: () => void;
    render: () => JSX.Element;
}
export {};
