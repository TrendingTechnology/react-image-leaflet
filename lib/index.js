"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var react_resize_detector_1 = __importDefault(require("react-resize-detector"));
var leaflet_1 = __importDefault(require("leaflet"));
require("leaflet/dist/leaflet.css");
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: ", ";\n  padding: ", ";\n  height: 100%;\n  overflow: hidden;\n  background-color: ", ";\n\n  .leaflet-container {\n    background-color: transparent;\n  }\n"], ["\n  margin: ", ";\n  padding: ", ";\n  height: 100%;\n  overflow: hidden;\n  background-color: ", ";\n\n  .leaflet-container {\n    background-color: transparent;\n  }\n"])), function (props) { return props.margin; }, function (props) { return props.padding; }, function (props) { return props.bgColor; });
var Map = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n  height: 100%;\n"], ["\n  margin: 0;\n  padding: 0;\n  height: 100%;\n"])));
var PanZoom = /** @class */ (function (_super) {
    __extends(PanZoom, _super);
    function PanZoom(props) {
        var _this = _super.call(this, props) || this;
        _this.outRef = react_1.default.createRef();
        _this.mapRef = react_1.default.createRef();
        _this.map = null;
        _this.bgColor = _this.props.bgColor === undefined ? '#ddd' : _this.props.bgColor;
        _this.margin = _this.props.margin === undefined ? 0 : _this.props.margin;
        _this.padding = _this.props.padding === undefined ? 0 : _this.props.padding;
        _this.doubleClickReset = _this.props.doubleClickReset === undefined
            ? false
            : _this.props.doubleClickReset;
        _this.getFocus = _this.props.getFocus === undefined ? false : _this.props.getFocus;
        _this.options = {
            preferCanvas: _this.props.preferCanvas === undefined ? false : _this.props.preferCanvas,
            attributionControl: _this.props.attributionControl === undefined
                ? true
                : _this.props.attributionControl,
            zoomControl: _this.props.zoomControl === undefined ? true : _this.props.zoomControl,
            zoomSnap: _this.props.zoomSnap === undefined ? 1 : _this.props.zoomSnap,
            zoomDelta: _this.props.zoomDelta === undefined ? 1 : _this.props.zoomDelta,
            boxZoom: _this.props.boxZoom === undefined ? true : _this.props.boxZoom,
            doubleClickZoom: _this.props.doubleClickReset === true
                ? false
                : _this.props.doubleClickZoom === undefined
                    ? true
                    : _this.props.doubleClickZoom,
            dragging: _this.props.dragging === undefined ? true : _this.props.dragging,
            maxZoom: _this.props.maxZoom === undefined ? 3 : _this.props.maxZoom,
            zoomAnimation: _this.props.zoomAnimation === undefined ? true : _this.props.zoomAnimation,
            zoomAnimationThreshold: _this.props.zoomAnimationThreshold === undefined
                ? 4
                : _this.props.zoomAnimationThreshold,
            fadeAnimation: _this.props.fadeAnimation === undefined ? true : _this.props.fadeAnimation,
            keyboard: _this.props.keyboard === undefined ? true : _this.props.keyboard,
            keyboardPanDelta: _this.props.keyboardPanDelta === undefined
                ? 80
                : _this.props.keyboardPanDelta,
            scrollWheelZoom: _this.props.scrollWheelZoom === undefined
                ? true
                : _this.props.scrollWheelZoom,
            wheelDebounceTime: _this.props.wheelDebounceTime === undefined
                ? 40
                : _this.props.wheelDebounceTime,
            wheelPxPerZoomLevel: _this.props.wheelPxPerZoomLevel === undefined
                ? 60
                : _this.props.wheelPxPerZoomLevel,
            tap: _this.props.tap === undefined ? true : _this.props.tap,
            tapTolerance: _this.props.tapTolerance === undefined ? 15 : _this.props.tapTolerance,
            touchZoom: _this.props.touchZoom === undefined ? false : _this.props.touchZoom,
            bounceAtZoomLimits: _this.props.bounceAtZoomLimits === undefined
                ? true
                : _this.props.bounceAtZoomLimits,
        };
        _this.calc = function (width, height) {
            var zoom = 1;
            if (width > _this.state.width || height > _this.state.height) {
                var zoomX = _this.state.width / width;
                var zoomY = _this.state.height / height;
                zoomX >= zoomY ? (zoom = zoomY) : (zoom = zoomX);
            }
            var size = { width: width * zoom, height: height * zoom };
            return size;
        };
        _this.draw = function (url) {
            var img = new Image();
            img.onload = function () {
                var size = _this.calc(img.width, img.height);
                var bounds = new leaflet_1.default.LatLngBounds([
                    [0, 0],
                    [size.height, size.width],
                ]);
                if (_this.map) {
                    _this.map.off();
                    _this.map.remove();
                }
                _this.map = leaflet_1.default.map('map', __assign(__assign({}, _this.options), { maxBounds: bounds, crs: leaflet_1.default.CRS.Simple }));
                _this.map.fitBounds(bounds);
                if (_this.doubleClickReset) {
                    _this.map.on('dblclick', function () {
                        if (_this.map) {
                            if (img.width < _this.state.width &&
                                img.height < _this.state.height) {
                                _this.map.setZoom(0);
                            }
                            else {
                                _this.map.fitBounds(bounds);
                            }
                        }
                    });
                }
                if (img.width < _this.state.width && img.height < _this.state.height) {
                    _this.map.setZoom(0, { animate: false });
                }
                leaflet_1.default.imageOverlay(img.src, bounds).addTo(_this.map);
                if (_this.getFocus) {
                    var node = _this.mapRef.current;
                    if (node) {
                        node.blur();
                        node.focus();
                    }
                }
            };
            img.src = url;
        };
        _this.onResize = function () {
            var node = _this.outRef.current;
            if (node) {
                var width = node.clientWidth;
                var height = node.clientHeight;
                _this.setState({ width: width, height: height });
            }
        };
        _this.componentDidMount = function () {
            var node = _this.outRef.current;
            if (node) {
                var width = node.clientWidth;
                var height = node.clientHeight;
                _this.setState({ width: width, height: height });
            }
            _this.draw(_this.props.url);
        };
        _this.componentDidUpdate = function (prevProps, prevState) {
            if (_this.props !== prevProps || _this.state !== prevState) {
                _this.draw(_this.props.url);
            }
        };
        _this.render = function () {
            return (react_1.default.createElement(Container, { ref: _this.outRef, bgColor: _this.bgColor, margin: _this.margin, padding: _this.padding },
                react_1.default.createElement(react_resize_detector_1.default, { handleWidth: true, handleHeight: true, onResize: _this.onResize }),
                react_1.default.createElement(Map, { id: "map", ref: _this.mapRef })));
        };
        var outer = _this.outRef.current;
        var width = 0;
        var height = 0;
        if (outer) {
            width = outer.clientWidth;
            height = outer.clientHeight;
        }
        _this.state = {
            width: width,
            height: height,
        };
        return _this;
    }
    return PanZoom;
}(react_1.default.Component));
exports.default = PanZoom;
var templateObject_1, templateObject_2;
