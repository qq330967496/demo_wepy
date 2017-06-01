'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: [
      //        'pages/index',

      'pages/login', 'pages/vehicle_list', 'pages/peccancy_list', 'pages/index', 'pages/demo'],
      window: {
        backgroundColor: '#ebebeb',
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#09b6f2',
        navigationBarTitleText: '暗黑ETC车宝',
        navigationBarTextStyle: 'light'
      }
    };
    _this.globalData = {
      img_mode: 'widthFix',
      env: '-dev' };

    _this.use('requestfix');
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {}
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRDb2xvciIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJnbG9iYWxEYXRhIiwiaW1nX21vZGUiLCJlbnYiLCJ1c2UiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUEyQkUsc0JBQWM7QUFBQTs7QUFBQTs7QUFBQSxVQXhCZEEsTUF3QmMsR0F4Qkw7QUFDUEMsYUFBTztBQUNiOztBQUVRLG1CQUhLLEVBSUwsb0JBSkssRUFLTCxxQkFMSyxFQU1MLGFBTkssRUFPTCxZQVBLLENBREE7QUFVUEMsY0FBUTtBQUNOQyx5QkFBaUIsU0FEWDtBQUVOQyw2QkFBcUIsT0FGZjtBQUdOQyxzQ0FBOEIsU0FIeEI7QUFJTkMsZ0NBQXdCLFNBSmxCO0FBS05DLGdDQUF3QjtBQUxsQjtBQVZELEtBd0JLO0FBQUEsVUFMZEMsVUFLYyxHQUxEO0FBQ1hDLGdCQUFVLFVBREM7QUFFWEMsV0FBSSxNQUZPLEVBS0M7O0FBRVosVUFBS0MsR0FBTCxDQUFTLFlBQVQ7QUFGWTtBQUdiOzs7OytCQUVVLENBRVY7Ozs7RUFoQzBCLGVBQUtDLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBwYWdlczogW1xuLy8gICAgICAgICdwYWdlcy9pbmRleCcsXG5cbiAgICAgICAgJ3BhZ2VzL2xvZ2luJyxcbiAgICAgICAgJ3BhZ2VzL3ZlaGljbGVfbGlzdCcsXG4gICAgICAgICdwYWdlcy9wZWNjYW5jeV9saXN0JyxcbiAgICAgICAgJ3BhZ2VzL2luZGV4JyxcbiAgICAgICAgJ3BhZ2VzL2RlbW8nXG4gICAgICBdLFxuICAgICAgd2luZG93OiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNlYmViZWInLFxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxuICAgICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnIzA5YjZmMicsXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmmpfpu5FFVEPovablrp0nLFxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnbGlnaHQnXG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2xvYmFsRGF0YSA9IHtcbiAgICAgIGltZ19tb2RlOiAnd2lkdGhGaXgnLFxuICAgICAgZW52OictZGV2JywvL+eOr+Wig1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKVxuICAgICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxuICAgIH1cblxuICAgIG9uTGF1bmNoKCkge1xuXG4gICAgfVxuICB9XG4iXX0=