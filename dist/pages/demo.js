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

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.components = {}, _this.data = {
      msg: '数据',
      val: ''
    }, _this.computed = {}, _this.methods = {
      'keyInput': function keyInput(e) {
        _this.val = e.detail.value;
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  //    mixins = [testMixin]

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {
      console.log('加载');
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/demo'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8uanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJjb21wb25lbnRzIiwiZGF0YSIsIm1zZyIsInZhbCIsImNvbXB1dGVkIiwibWV0aG9kcyIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImV2ZW50cyIsImNvbnNvbGUiLCJsb2ciLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUyxFLFFBQ1RDLFUsR0FBYSxFLFFBSWJDLEksR0FBTztBQUNMQyxXQUFLLElBREE7QUFFTEMsV0FBSztBQUZBLEssUUFLUEMsUSxHQUFXLEUsUUFFWEMsTyxHQUFVO0FBQ1Isa0JBQVksa0JBQUNDLENBQUQsRUFBTztBQUNqQixjQUFLSCxHQUFMLEdBQVdHLEVBQUVDLE1BQUYsQ0FBU0MsS0FBcEI7QUFDRDtBQUhPLEssUUFNVkMsTSxHQUFTLEU7OztBQWZiOzs7OzZCQW1CYTtBQUNQQyxjQUFRQyxHQUFSLENBQVksSUFBWjtBQUNEOzs7O0VBekJnQyxlQUFLQyxJOztrQkFBbkJkLEsiLCJmaWxlIjoiZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHt9XHJcbiAgICBjb21wb25lbnRzID0ge31cclxuXHJcbi8vICAgIG1peGlucyA9IFt0ZXN0TWl4aW5dXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgbXNnOiAn5pWw5o2uJyxcclxuICAgICAgdmFsOiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge31cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAna2V5SW5wdXQnOiAoZSkgPT4ge1xyXG4gICAgICAgIHRoaXMudmFsID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICBjb25zb2xlLmxvZygn5Yqg6L29JylcclxuICAgIH1cclxuICB9XHJcbiJdfQ==