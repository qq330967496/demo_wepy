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
      },
      debug: true
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRDb2xvciIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJkZWJ1ZyIsImdsb2JhbERhdGEiLCJpbWdfbW9kZSIsImVudiIsInVzZSIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7OztBQTRCRSxzQkFBYztBQUFBOztBQUFBOztBQUFBLFVBekJkQSxNQXlCYyxHQXpCTDtBQUNQQyxhQUFPO0FBQ2I7O0FBRVEsbUJBSEssRUFJTCxvQkFKSyxFQUtMLHFCQUxLLEVBTUwsYUFOSyxFQU9MLFlBUEssQ0FEQTtBQVVQQyxjQUFRO0FBQ05DLHlCQUFpQixTQURYO0FBRU5DLDZCQUFxQixPQUZmO0FBR05DLHNDQUE4QixTQUh4QjtBQUlOQyxnQ0FBd0IsU0FKbEI7QUFLTkMsZ0NBQXdCO0FBTGxCLE9BVkQ7QUFpQlBDLGFBQU07QUFqQkMsS0F5Qks7QUFBQSxVQUxkQyxVQUtjLEdBTEQ7QUFDWEMsZ0JBQVUsVUFEQztBQUVYQyxXQUFJLE1BRk8sRUFLQzs7QUFFWixVQUFLQyxHQUFMLENBQVMsWUFBVDtBQUZZO0FBR2I7Ozs7K0JBRVUsQ0FFVjs7OztFQWpDMEIsZUFBS0MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIHBhZ2VzOiBbXG4vLyAgICAgICAgJ3BhZ2VzL2luZGV4JyxcblxuICAgICAgICAncGFnZXMvbG9naW4nLFxuICAgICAgICAncGFnZXMvdmVoaWNsZV9saXN0JyxcbiAgICAgICAgJ3BhZ2VzL3BlY2NhbmN5X2xpc3QnLFxuICAgICAgICAncGFnZXMvaW5kZXgnLFxuICAgICAgICAncGFnZXMvZGVtbydcbiAgICAgIF0sXG4gICAgICB3aW5kb3c6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ViZWJlYicsXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXG4gICAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjMDliNmYyJyxcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aal+m7kUVUQ+i9puWunScsXG4gICAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdsaWdodCdcbiAgICAgIH0sXG4gICAgICBkZWJ1Zzp0cnVlXG4gICAgfVxuXG4gICAgZ2xvYmFsRGF0YSA9IHtcbiAgICAgIGltZ19tb2RlOiAnd2lkdGhGaXgnLFxuICAgICAgZW52OictZGV2JywvL+eOr+Wig1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKVxuICAgICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxuICAgIH1cblxuICAgIG9uTGF1bmNoKCkge1xuXG4gICAgfVxuICB9XG4iXX0=