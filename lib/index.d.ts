import React from 'react';
import 'leaflet/dist/leaflet.css';
interface Props {
    url: Readonly<string>;
    bgColor?: string;
    getFocus?: boolean;
    attribution?: string;
    margin?: string | number;
    padding?: string | number;
    doubleClickReset?: boolean;
    zIndex?: number | 'inherit';
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
}
interface State {
    width: number;
    height: number;
}
export default class PanZoom extends React.Component<Props, State> {
    constructor(props: Props);
    private outRef;
    private mapRef;
    private map;
    private bgColor;
    private attribution;
    private margin;
    private padding;
    private doubleClickReset;
    private getFocus;
    private zIndex;
    private options;
    private calc;
    private draw;
    private onResize;
    componentDidMount: () => void;
    componentDidUpdate: (prevProps: Props, prevState: State) => void;
    render: () => JSX.Element;
}
export {};
