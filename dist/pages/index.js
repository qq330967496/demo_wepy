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
      img_mode: '',

      //车牌选择器
      isShowPlat: false,
      plat_data: {}, //车牌数据
      plat_short: [], //车牌简称
      plat_letter: [], //车牌字母
      plat_val: '粤A', //车牌值
      plat_init: '' }, _this.computed = {}, _this.methods = {
      keyInput: function keyInput(e) {
        _this.val = e.detail.value;
      },

      //车牌选择器
      init_plate: function init_plate() {
        var that = _this;
        _wepy2.default.request({
          url: 'https://peccancy.etcchebao.com/v1/query/provinces',
          success: function success(json) {
            that.plat_short = [];
            that.plat_letter = [];
            that.plat_data = json.data.data;
            console.log(json.data);
            if (json.data.code == 0) {
              for (var i = 0; i < json.data.data.length; i++) {
                that.plat_short.push(json.data.data[i].province);
                if ('粤' == json.data.data[i].province) {
                  for (var j = 0; j < json.data.data[i].citys.length; j++) {
                    that.plat_letter.push(json.data.data[i].citys[j].city_code);
                  }
                }
              }
              that.plat_init = [14, 0];
            }
          }
        });
      },
      plate_picker_change: function plate_picker_change(e) {
        var that = _this;
        var val = e.detail.value;
        if (val[0] != that.plat_init[0]) {
          that.plat_init = val;
          _this.methods.set_plate_letter(val[0]);
        } else {
          that.plat_init = val;
        }
      },
      set_plate_letter: function set_plate_letter(short_index) {
        var that = _this;
        that.plat_letter = [];
        for (var j = 0; j < that.plat_data[short_index].citys.length; j++) {
          that.plat_letter.push(that.plat_data[short_index].citys[j].city_code);
        }
        that.plat_init = [short_index, 0];
      },
      open_plate: function open_plate() {
        var that = _this;
        that.isShowPlat = true;
      },
      close_plate: function close_plate() {
        var that = _this;
        that.isShowPlat = false;
        that.plat_val = that.plat_short[that.plat_init[0]];
        that.plat_val += that.plat_letter[that.plat_init[1]];
      }

    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  //    mixins = [testMixin]

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      that.img_mode = this.$wxapp.$app.globalData.img_mode;
      that.methods.init_plate();
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiY29tcG9uZW50cyIsImRhdGEiLCJpbWdfbW9kZSIsImlzU2hvd1BsYXQiLCJwbGF0X2RhdGEiLCJwbGF0X3Nob3J0IiwicGxhdF9sZXR0ZXIiLCJwbGF0X3ZhbCIsInBsYXRfaW5pdCIsImNvbXB1dGVkIiwibWV0aG9kcyIsImtleUlucHV0IiwiZSIsInZhbCIsImRldGFpbCIsInZhbHVlIiwiaW5pdF9wbGF0ZSIsInRoYXQiLCJyZXF1ZXN0IiwidXJsIiwic3VjY2VzcyIsImpzb24iLCJjb25zb2xlIiwibG9nIiwiY29kZSIsImkiLCJsZW5ndGgiLCJwdXNoIiwicHJvdmluY2UiLCJqIiwiY2l0eXMiLCJjaXR5X2NvZGUiLCJwbGF0ZV9waWNrZXJfY2hhbmdlIiwic2V0X3BsYXRlX2xldHRlciIsInNob3J0X2luZGV4Iiwib3Blbl9wbGF0ZSIsImNsb3NlX3BsYXRlIiwiZXZlbnRzIiwiJHd4YXBwIiwiJGFwcCIsImdsb2JhbERhdGEiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUyxFLFFBQ1RDLFUsR0FBYSxFLFFBSWJDLEksR0FBTztBQUNMQyxnQkFBVSxFQURMOztBQUdMO0FBQ0FDLGtCQUFZLEtBSlA7QUFLTEMsaUJBQVUsRUFMTCxFQUtRO0FBQ2JDLGtCQUFZLEVBTlAsRUFNVTtBQUNmQyxtQkFBYSxFQVBSLEVBT1c7QUFDaEJDLGdCQUFVLElBUkwsRUFRVTtBQUNmQyxpQkFBVSxFQVRMLEUsUUFZUEMsUSxHQUFXLEUsUUFFWEMsTyxHQUFVO0FBQ1JDLGdCQUFVLGtCQUFDQyxDQUFELEVBQU87QUFDZixjQUFLQyxHQUFMLEdBQVdELEVBQUVFLE1BQUYsQ0FBU0MsS0FBcEI7QUFDRCxPQUhPOztBQUtSO0FBQ0FDLGtCQUFZLHNCQUFNO0FBQ2hCLFlBQUlDLFlBQUo7QUFDQSx1QkFB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ekRPLEssUUE4RFY2QixNLEdBQVMsRTs7O0FBOUViOzs7OzZCQWtGYTtBQUNQLFVBQUlwQixPQUFPLElBQVg7QUFDQUEsV0FBS2YsUUFBTCxHQUFnQixLQUFLb0MsTUFBTCxDQUFZQyxJQUFaLENBQWlCQyxVQUFqQixDQUE0QnRDLFFBQTVDO0FBQ0FlLFdBQUtQLE9BQUwsQ0FBYU0sVUFBYjtBQUNEOzs7O0VBMUZnQyxlQUFLeUIsSTs7a0JBQW5CM0MsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7fVxuICAgIGNvbXBvbmVudHMgPSB7fVxuXG4vLyAgICBtaXhpbnMgPSBbdGVzdE1peGluXVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIGltZ19tb2RlOiAnJyxcblxuICAgICAgLy/ovabniYzpgInmi6nlmahcbiAgICAgIGlzU2hvd1BsYXQ6IGZhbHNlLFxuICAgICAgcGxhdF9kYXRhOnt9LC8v6L2m54mM5pWw5o2uXG4gICAgICBwbGF0X3Nob3J0OiBbXSwvL+i9pueJjOeugOensFxuICAgICAgcGxhdF9sZXR0ZXI6IFtdLC8v6L2m54mM5a2X5q+NXG4gICAgICBwbGF0X3ZhbDogJ+eypEEnLC8v6L2m54mM5YC8XG4gICAgICBwbGF0X2luaXQ6JycsLy/liJ3lp4vljJbovabniYzmjqfku7bnmoTlgLxcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHt9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAga2V5SW5wdXQ6IChlKSA9PiB7XG4gICAgICAgIHRoaXMudmFsID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIH0sXG5cbiAgICAgIC8v6L2m54mM6YCJ5oup5ZmoXG4gICAgICBpbml0X3BsYXRlOiAoKSA9PiB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vcGVjY2FuY3kuZXRjY2hlYmFvLmNvbS92MS9xdWVyeS9wcm92aW5jZXMnLFxuICAgICAgICAgIHN1Y2Nlc3M6KGpzb24pPT57XG4gICAgICAgICAgICB0aGF0LnBsYXRfc2hvcnQgPSBbXTtcbiAgICAgICAgICAgIHRoYXQucGxhdF9sZXR0ZXIgPSBbXTtcbiAgICAgICAgICAgIHRoYXQucGxhdF9kYXRhID0ganNvbi5kYXRhLmRhdGE7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhqc29uLmRhdGEpO1xuICAgICAgICAgICAgaWYoanNvbi5kYXRhLmNvZGU9PTApe1xuICAgICAgICAgICAgICBmb3IodmFyIGk9MDtpPGpzb24uZGF0YS5kYXRhLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIHRoYXQucGxhdF9zaG9ydC5wdXNoKGpzb24uZGF0YS5kYXRhW2ldLnByb3ZpbmNlKTtcbiAgICAgICAgICAgICAgICBpZign57KkJyA9PSBqc29uLmRhdGEuZGF0YVtpXS5wcm92aW5jZSl7XG4gICAgICAgICAgICAgICAgICBmb3IodmFyIGo9MDtqPGpzb24uZGF0YS5kYXRhW2ldLmNpdHlzLmxlbmd0aDtqKyspe1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXRfbGV0dGVyLnB1c2goanNvbi5kYXRhLmRhdGFbaV0uY2l0eXNbal0uY2l0eV9jb2RlKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGF0LnBsYXRfaW5pdCA9IFsxNCwwXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHBsYXRlX3BpY2tlcl9jaGFuZ2U6IChlKSA9PiB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdmFyIHZhbCA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICBpZih2YWxbMF0hPXRoYXQucGxhdF9pbml0WzBdKXtcbiAgICAgICAgICB0aGF0LnBsYXRfaW5pdCA9IHZhbDtcbiAgICAgICAgICB0aGlzLm1ldGhvZHMuc2V0X3BsYXRlX2xldHRlcih2YWxbMF0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGF0LnBsYXRfaW5pdCA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNldF9wbGF0ZV9sZXR0ZXI6IChzaG9ydF9pbmRleCkgPT4ge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHRoYXQucGxhdF9sZXR0ZXIgPSBbXTtcbiAgICAgICAgZm9yKHZhciBqPTA7ajx0aGF0LnBsYXRfZGF0YVtzaG9ydF9pbmRleF0uY2l0eXMubGVuZ3RoO2orKyl7XG4gICAgICAgICAgdGhhdC5wbGF0X2xldHRlci5wdXNoKHRoYXQucGxhdF9kYXRhW3Nob3J0X2luZGV4XS5jaXR5c1tqXS5jaXR5X2NvZGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQucGxhdF9pbml0ID0gW3Nob3J0X2luZGV4LDBdO1xuICAgICAgfSxcbiAgICAgIG9wZW5fcGxhdGU6ICgpID0+IHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGF0LmlzU2hvd1BsYXQgPSB0cnVlO1xuICAgICAgfSxcbiAgICAgIGNsb3NlX3BsYXRlOiAoKSA9PiB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhhdC5pc1Nob3dQbGF0ID0gZmFsc2U7XG4gICAgICAgIHRoYXQucGxhdF92YWwgPSB0aGF0LnBsYXRfc2hvcnRbdGhhdC5wbGF0X2luaXRbMF1dO1xuICAgICAgICB0aGF0LnBsYXRfdmFsICs9IHRoYXQucGxhdF9sZXR0ZXJbdGhhdC5wbGF0X2luaXRbMV1dO1xuICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG5cbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LmltZ19tb2RlID0gdGhpcy4kd3hhcHAuJGFwcC5nbG9iYWxEYXRhLmltZ19tb2RlO1xuICAgICAgdGhhdC5tZXRob2RzLmluaXRfcGxhdGUoKTtcbiAgICB9XG4gIH1cbiJdfQ==