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
      //        'pages/vehicle_list',//调试用

      'pages/login', //登录
      'pages/vehicle_list', //车辆列表
      'pages/peccancy_list', //违章列表
      'pages/index', //添加车辆
      'pages/demo'],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRDb2xvciIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJnbG9iYWxEYXRhIiwiaW1nX21vZGUiLCJlbnYiLCJ1c2UiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUE0QkUsc0JBQWM7QUFBQTs7QUFBQTs7QUFBQSxVQXpCZEEsTUF5QmMsR0F6Qkw7QUFDUEMsYUFBTztBQUNiOztBQUVRLG1CQUhLLEVBR1M7QUFDZCwwQkFKSyxFQUlnQjtBQUNyQiwyQkFMSyxFQUtpQjtBQUN0QixtQkFOSyxFQU1TO0FBQ2Qsa0JBUEssQ0FEQTtBQVVQQyxjQUFRO0FBQ05DLHlCQUFpQixTQURYO0FBRU5DLDZCQUFxQixPQUZmO0FBR05DLHNDQUE4QixTQUh4QjtBQUlOQyxnQ0FBd0IsU0FKbEI7QUFLTkMsZ0NBQXdCO0FBTGxCO0FBVkQsS0F5Qks7QUFBQSxVQUxkQyxVQUtjLEdBTEQ7QUFDWEMsZ0JBQVUsVUFEQztBQUVYQyxXQUFJLE1BRk8sRUFLQzs7QUFFWixVQUFLQyxHQUFMLENBQVMsWUFBVDtBQUZZO0FBR2I7Ozs7K0JBRVUsQ0FFVjs7OztFQWpDMEIsZUFBS0MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIHBhZ2VzOiBbXG4vLyAgICAgICAgJ3BhZ2VzL3ZlaGljbGVfbGlzdCcsLy/osIPor5XnlKhcblxuICAgICAgICAncGFnZXMvbG9naW4nLC8v55m75b2VXG4gICAgICAgICdwYWdlcy92ZWhpY2xlX2xpc3QnLC8v6L2m6L6G5YiX6KGoXG4gICAgICAgICdwYWdlcy9wZWNjYW5jeV9saXN0JywvL+i/neeroOWIl+ihqFxuICAgICAgICAncGFnZXMvaW5kZXgnLC8v5re75Yqg6L2m6L6GXG4gICAgICAgICdwYWdlcy9kZW1vJywvL+aooeadv1xuICAgICAgXSxcbiAgICAgIHdpbmRvdzoge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZWJlYmViJyxcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcbiAgICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyMwOWI2ZjInLFxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5pqX6buRRVRD6L2m5a6dJyxcbiAgICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2xpZ2h0J1xuICAgICAgfSxcbi8vICAgICAgZGVidWc6dHJ1ZVxuICAgIH1cblxuICAgIGdsb2JhbERhdGEgPSB7XG4gICAgICBpbWdfbW9kZTogJ3dpZHRoRml4JyxcbiAgICAgIGVudjonLWRldicsLy/njq/looNcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKClcbiAgICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcbiAgICB9XG5cbiAgICBvbkxhdW5jaCgpIHtcblxuICAgIH1cbiAgfVxuIl19