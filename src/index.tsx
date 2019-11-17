import React from 'react';
import styled from 'styled-components';
import ReactResizeDetector from 'react-resize-detector';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Props {
  url: Readonly<string>;
  bgColor?: string;
  margin?: string | number;
  padding?: string | number;
  doubleClickReset?: boolean;
  getFocus?: boolean;
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
  attribution?: string;
}

interface State {
  width: number;
  height: number;
}

interface Size {
  width: number;
  height: number;
}

interface ContainerProps {
  bgColor: string;
  margin: string | number;
  padding: string | number;
}

const Container = styled.div`
  margin: ${(props: ContainerProps): string | number => props.margin};
  padding: ${(props: ContainerProps): string | number => props.padding};
  height: 100%;
  overflow: hidden;
  background-color: ${(props: ContainerProps): string => props.bgColor};

  .leaflet-container {
    background-color: transparent;
  }
`;

interface MapProps {
  zIndex: number | 'inherit';
}

const Map = styled.div`
  margin: 0;
  padding: 0;
  height: 100%;
  z-index: ${(props: MapProps): number | 'inherit' => props.zIndex};
`;

export default class PanZoom extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const outer = this.outRef.current;

    let width = 0;
    let height = 0;

    if (outer) {
      width = outer.clientWidth;
      height = outer.clientHeight;
    }

    this.state = {
      width: width,
      height: height,
    };
  }

  private outRef = React.createRef<HTMLDivElement>();
  private mapRef = React.createRef<HTMLDivElement>();
  private map: L.Map | null = null;

  private bgColor =
    this.props.bgColor === undefined ? '#ddd' : this.props.bgColor;
  private attribution =
    this.props.attribution === undefined ? '' : this.props.attribution;
  private margin = this.props.margin === undefined ? 0 : this.props.margin;
  private padding = this.props.padding === undefined ? 0 : this.props.padding;
  private doubleClickReset =
    this.props.doubleClickReset === undefined
      ? false
      : this.props.doubleClickReset;
  private getFocus =
    this.props.getFocus === undefined ? false : this.props.getFocus;
  private zIndex =
    this.props.zIndex === undefined ? 'inherit' : this.props.zIndex;

  private options = {
    preferCanvas:
      this.props.preferCanvas === undefined ? false : this.props.preferCanvas,
    attributionControl:
      this.props.attributionControl === undefined
        ? true
        : this.props.attributionControl,
    zoomControl:
      this.props.zoomControl === undefined ? true : this.props.zoomControl,
    zoomSnap: this.props.zoomSnap === undefined ? 1 : this.props.zoomSnap,
    zoomDelta: this.props.zoomDelta === undefined ? 1 : this.props.zoomDelta,
    boxZoom: this.props.boxZoom === undefined ? true : this.props.boxZoom,
    doubleClickZoom:
      this.props.doubleClickReset === true
        ? false
        : this.props.doubleClickZoom === undefined
        ? true
        : this.props.doubleClickZoom,
    dragging: this.props.dragging === undefined ? true : this.props.dragging,
    maxZoom: this.props.maxZoom === undefined ? 3 : this.props.maxZoom,
    zoomAnimation:
      this.props.zoomAnimation === undefined ? true : this.props.zoomAnimation,
    zoomAnimationThreshold:
      this.props.zoomAnimationThreshold === undefined
        ? 4
        : this.props.zoomAnimationThreshold,
    fadeAnimation:
      this.props.fadeAnimation === undefined ? true : this.props.fadeAnimation,
    keyboard: this.props.keyboard === undefined ? true : this.props.keyboard,
    keyboardPanDelta:
      this.props.keyboardPanDelta === undefined
        ? 80
        : this.props.keyboardPanDelta,
    scrollWheelZoom:
      this.props.scrollWheelZoom === undefined
        ? true
        : this.props.scrollWheelZoom,
    wheelDebounceTime:
      this.props.wheelDebounceTime === undefined
        ? 40
        : this.props.wheelDebounceTime,
    wheelPxPerZoomLevel:
      this.props.wheelPxPerZoomLevel === undefined
        ? 60
        : this.props.wheelPxPerZoomLevel,
    tap: this.props.tap === undefined ? true : this.props.tap,
    tapTolerance:
      this.props.tapTolerance === undefined ? 15 : this.props.tapTolerance,
    touchZoom:
      this.props.touchZoom === undefined ? false : this.props.touchZoom,
    bounceAtZoomLimits:
      this.props.bounceAtZoomLimits === undefined
        ? true
        : this.props.bounceAtZoomLimits,
  };

  private calc = (width: number, height: number): Size => {
    let zoom = 1;

    if (width > this.state.width || height > this.state.height) {
      const zoomX = this.state.width / width;
      const zoomY = this.state.height / height;
      zoomX >= zoomY ? (zoom = zoomY) : (zoom = zoomX);
    }
    const size = { width: width * zoom, height: height * zoom };

    return size;
  };

  private draw = (url: string): void => {
    const img = new Image();

    img.onload = (): void => {
      const size = this.calc(img.width, img.height);
      const bounds = new L.LatLngBounds([
        [0, 0],
        [size.height, size.width],
      ]);

      if (this.map) {
        this.map.off();
        this.map.remove();
      }

      this.map = L.map('map', {
        ...this.options,
        maxBounds: bounds,
        crs: L.CRS.Simple,
      });
      this.map.fitBounds(bounds);

      if (this.doubleClickReset) {
        this.map.on('dblclick', () => {
          if (this.map) {
            if (
              img.width < this.state.width &&
              img.height < this.state.height
            ) {
              this.map.setZoom(0);
            } else {
              this.map.fitBounds(bounds);
            }
          }
        });
      }

      if (img.width < this.state.width && img.height < this.state.height) {
        this.map.setZoom(0, { animate: false });
      }

      L.imageOverlay(img.src, bounds, { attribution: this.attribution }).addTo(
        this.map
      );

      if (this.getFocus) {
        const node = this.mapRef.current;
        if (node) {
          node.blur();
          node.focus();
        }
      }
    };

    img.src = url;
  };

  private onResize = (): void => {
    const node = this.outRef.current;
    if (node) {
      const width = node.clientWidth;
      const height = node.clientHeight;

      this.setState({ width, height });
    }
  };

  public componentDidMount = (): void => {
    const node = this.outRef.current;
    if (node) {
      const width = node.clientWidth;
      const height = node.clientHeight;

      this.setState({ width, height });
    }

    this.draw(this.props.url);
  };

  public componentDidUpdate = (prevProps: Props, prevState: State): void => {
    if (this.props.url !== prevProps.url || this.state !== prevState) {
      this.draw(this.props.url);
    }
  };

  public render = (): JSX.Element => {
    return (
      <Container
        ref={this.outRef}
        bgColor={this.bgColor}
        margin={this.margin}
        padding={this.padding}>
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.onResize}
        />
        <Map id="map" ref={this.mapRef} zIndex={this.zIndex} />
      </Container>
    );
  };
}
