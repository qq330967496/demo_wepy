'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Demo = function (_wepy$page) {
  _inherits(Demo, _wepy$page);

  function Demo() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Demo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Demo.__proto__ || Object.getPrototypeOf(Demo)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.components = {}, _this.data = {
      msg: '数据',
      val: ''
    }, _this.computed = {}, _this.methods = {
      'keyInput': function keyInput(e) {
        _this.val = e.detail.value;
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  //    mixins = [testMixin]

  _createClass(Demo, [{
    key: 'onLoad',
    value: function onLoad() {
      console.log('加载');
    }
  }]);

  return Demo;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Demo , 'pages/demo'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8uanMiXSwibmFtZXMiOlsiRGVtbyIsImNvbmZpZyIsImNvbXBvbmVudHMiLCJkYXRhIiwibXNnIiwidmFsIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZSIsImRldGFpbCIsInZhbHVlIiwiZXZlbnRzIiwiY29uc29sZSIsImxvZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O2tMQUNuQkMsTSxHQUFTLEUsUUFDVEMsVSxHQUFhLEUsUUFJYkMsSSxHQUFPO0FBQ0xDLFdBQUssSUFEQTtBQUVMQyxXQUFLO0FBRkEsSyxRQUtQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVU7QUFDUixrQkFBWSxrQkFBQ0MsQ0FBRCxFQUFPO0FBQ2pCLGNBQUtILEdBQUwsR0FBV0csRUFBRUMsTUFBRixDQUFTQyxLQUFwQjtBQUNEO0FBSE8sSyxRQU1WQyxNLEdBQVMsRTs7O0FBZmI7Ozs7NkJBbUJhO0FBQ1BDLGNBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0Q7Ozs7RUF6QitCLGVBQUtDLEk7O2tCQUFsQmQsSSIsImZpbGUiOiJkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVtbyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge31cbiAgICBjb21wb25lbnRzID0ge31cblxuLy8gICAgbWl4aW5zID0gW3Rlc3RNaXhpbl1cblxuICAgIGRhdGEgPSB7XG4gICAgICBtc2c6ICfmlbDmja4nLFxuICAgICAgdmFsOiAnJ1xuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge31cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAna2V5SW5wdXQnOiAoZSkgPT4ge1xuICAgICAgICB0aGlzLnZhbCA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgZXZlbnRzID0ge1xuXG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgY29uc29sZS5sb2coJ+WKoOi9vScpXG4gICAgfVxuICB9XG4iXX0=