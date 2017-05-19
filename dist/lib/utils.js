'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var utils = function (_wepy$mixin) {
  _inherits(utils, _wepy$mixin);

  function utils() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, utils);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = utils.__proto__ || Object.getPrototypeOf(utils)).call.apply(_ref, [this].concat(args))), _this), _this.data = {}, _this.methods = {
      tap: function tap() {
        this.mixin = 'mixin data was changed';
        console.log('mixin method tap');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(utils, [{
    key: 'onShow',
    value: function onShow() {
      console.log('mixin onShow');
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      console.log('mixin onLoad');
    }
  }]);

  return utils;
}(_wepy2.default.mixin);

exports.default = utils;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbInV0aWxzIiwiZGF0YSIsIm1ldGhvZHMiLCJ0YXAiLCJtaXhpbiIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsSSxHQUFPLEUsUUFHUEMsTyxHQUFVO0FBQ1JDLFNBRFEsaUJBQ0Q7QUFDTCxhQUFLQyxLQUFMLEdBQWEsd0JBQWI7QUFDQUMsZ0JBQVFDLEdBQVIsQ0FBWSxrQkFBWjtBQUNEO0FBSk8sSzs7Ozs7NkJBT0Q7QUFDUEQsY0FBUUMsR0FBUixDQUFZLGNBQVo7QUFDRDs7OzZCQUVRO0FBQ1BELGNBQVFDLEdBQVIsQ0FBWSxjQUFaO0FBQ0Q7Ozs7RUFqQmdDLGVBQUtGLEs7O2tCQUFuQkosSyIsImZpbGUiOiJ1dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB1dGlscyBleHRlbmRzIHdlcHkubWl4aW4ge1xyXG4gIGRhdGEgPSB7XHJcblxyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgdGFwICgpIHtcclxuICAgICAgdGhpcy5taXhpbiA9ICdtaXhpbiBkYXRhIHdhcyBjaGFuZ2VkJ1xyXG4gICAgICBjb25zb2xlLmxvZygnbWl4aW4gbWV0aG9kIHRhcCcpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblNob3coKSB7XHJcbiAgICBjb25zb2xlLmxvZygnbWl4aW4gb25TaG93JylcclxuICB9XHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdtaXhpbiBvbkxvYWQnKVxyXG4gIH1cclxufVxyXG4iXX0=