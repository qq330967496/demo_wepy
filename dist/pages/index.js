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
      plate_num: '',
      frame_num: '',
      engine_num: '',

      //车牌选择器
      plate_val: '粤A', //车牌值
      isShowPlat: false,
      plate_data: {}, //车牌数据
      plate_short: [], //车牌简称
      plate_letter: [], //车牌字母
      plate_init: '' }, _this.computed = {}, _this.methods = {
      bindPlateNum: function bindPlateNum(e) {
        this.plate_num = e.detail.value;
      },
      bindFrameNum: function bindFrameNum(e) {
        this.frame_num = e.detail.value;
      },
      bindEngineNum: function bindEngineNum(e) {
        this.engine_num = e.detail.value;
      },

      toSearch: function toSearch(e) {
        var that = this;
        console.log("查询");
        console.log("车辆号码：", that.plate_val + that.plate_num);
        console.log("车架号码：", that.frame_num);
        console.log("发动机号：", that.engine_num);
      },

      //车牌选择器
      init_plate: function init_plate() {
        var that = _this;
        _wepy2.default.request({
          url: 'https://peccancy.etcchebao.com/v1/query/provinces',
          success: function success(json) {
            that.plate_short = [];
            that.plate_letter = [];
            that.plate_data = json.data.data;
            console.log(json.data);
            if (json.data.code == 0) {
              for (var i = 0; i < json.data.data.length; i++) {
                that.plate_short.push(json.data.data[i].province);
                if ('粤' == json.data.data[i].province) {
                  for (var j = 0; j < json.data.data[i].citys.length; j++) {
                    that.plate_letter.push(json.data.data[i].citys[j].city_code);
                  }
                }
              }
              that.plate_init = [14, 0];
            }
          }
        });
      },
      plate_picker_change: function plate_picker_change(e) {
        var that = _this;
        var val = e.detail.value;
        if (val[0] != that.plate_init[0]) {
          that.plate_init = val;
          _this.methods.set_plate_letter(val[0]);
        } else {
          that.plate_init = val;
        }
      },
      set_plate_letter: function set_plate_letter(short_index) {
        var that = _this;
        that.plate_letter = [];
        for (var j = 0; j < that.plate_data[short_index].citys.length; j++) {
          that.plate_letter.push(that.plate_data[short_index].citys[j].city_code);
        }
        that.plate_init = [short_index, 0];
      },
      open_plate: function open_plate() {
        var that = _this;
        that.isShowPlat = true;
      },
      close_plate: function close_plate() {
        var that = _this;
        that.isShowPlat = false;
        that.plate_val = that.plate_short[that.plate_init[0]];
        that.plate_val += that.plate_letter[that.plate_init[1]];
      }

    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  //    mixins = [testMixin]

  //绑定的方法


  //事件处理


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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiY29tcG9uZW50cyIsImRhdGEiLCJpbWdfbW9kZSIsInBsYXRlX251bSIsImZyYW1lX251bSIsImVuZ2luZV9udW0iLCJwbGF0ZV92YWwiLCJpc1Nob3dQbGF0IiwicGxhdGVfZGF0YSIsInBsYXRlX3Nob3J0IiwicGxhdGVfbGV0dGVyIiwicGxhdGVfaW5pdCIsImNvbXB1dGVkIiwibWV0aG9kcyIsImJpbmRQbGF0ZU51bSIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImJpbmRGcmFtZU51bSIsImJpbmRFbmdpbmVOdW0iLCJ0b1NlYXJjaCIsInRoYXQiLCJjb25zb2xlIiwibG9nIiwiaW5pdF9wbGF0ZSIsInJlcXVlc3QiLCJ1cmwiLCJzdWNjZXNzIiwianNvbiIsImNvZGUiLCJpIiwibGVuZ3RoIiwicHVzaCIsInByb3ZpbmNlIiwiaiIsImNpdHlzIiwiY2l0eV9jb2RlIiwicGxhdGVfcGlja2VyX2NoYW5nZSIsInZhbCIsInNldF9wbGF0ZV9sZXR0ZXIiLCJzaG9ydF9pbmRleCIsIm9wZW5fcGxhdGUiLCJjbG9zZV9wbGF0ZSIsImV2ZW50cyIsIiR3eGFwcCIsIiRhcHAiLCJnbG9iYWxEYXRhIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVMsRSxRQUNUQyxVLEdBQWEsRSxRQUliQyxJLEdBQU87QUFDTEMsZ0JBQVUsRUFETDtBQUVMQyxpQkFBVSxFQUZMO0FBR0xDLGlCQUFVLEVBSEw7QUFJTEMsa0JBQVcsRUFKTjs7QUFPTDtBQUNBQyxpQkFBVyxJQVJOLEVBUVc7QUFDaEJDLGtCQUFZLEtBVFA7QUFVTEMsa0JBQVcsRUFWTixFQVVTO0FBQ2RDLG1CQUFhLEVBWFIsRUFXVztBQUNoQkMsb0JBQWMsRUFaVCxFQVlZO0FBQ2pCQyxrQkFBVyxFQWJOLEUsUUFnQlBDLFEsR0FBVyxFLFFBR1hD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cEI7QUFDQSxhQUFJLElBQUl3QixJQUFFLENBQVYsRUFBWUEsSUFBRWIsS0FBS2IsVUFBTCxDQUFnQmdDLFdBQWhCLEVBQTZCTCxLQUE3QixDQUFtQ0osTUFBakQsRUFBd0RHLEdBQXhELEVBQTREO0FBQzFEYixlQUFLWCxZQUFMLENBQWtCc0IsSUFBbEIsQ0FBdUJYLEtBQUtiLFVBQUwsQ0FBZ0JnQyxXQUFoQixFQUE2QkwsS0FBN0IsQ0FBbUNELENBQW5DLEVBQXNDRSxTQUE3RDtBQUNEO0FBQ0RmLGFBQUtWLFVBQUwsR0FBa0IsQ0FBQzZCLFdBQUQsRUFBYSxDQUFiLENBQWxCO0FBQ0QsT0E3RE87QUE4RFJDLGtCQUFZLHNCQUFNO0FBQ2hCLFlBQUlwQixZQUFKO0FBQ0FBLGFBQUtkLFVBQUwsR0FBa0IsSUFBbEI7QUFDRCxPQWpFTztBQWtFUm1DLG1CQUFhLHVCQUFNO0FBQ2pCLFlBQUlyQixZQUFKO0FBQ0FBLGFBQUtkLFVBQUwsR0FBa0IsS0FBbEI7QUFDQWMsYUFBS2YsU0FBTCxHQUFpQmUsS0FBS1osV0FBTCxDQUFpQlksS0FBS1YsVUFBTCxDQUFnQixDQUFoQixDQUFqQixDQUFqQjtBQUNBVSxhQUFLZixTQUFMLElBQWtCZSxLQUFLWCxZQUFMLENBQWtCVyxLQUFLVixVQUFMLENBQWdCLENBQWhCLENBQWxCLENBQWxCO0FBQ0Q7O0FBdkVPLEssUUErRVZnQyxNLEdBQVMsRTs7O0FBcEdiOztBQW9CSTs7O0FBK0VBOzs7Ozs2QkFLUztBQUNQLFVBQUl0QixPQUFPLElBQVg7QUFDQUEsV0FBS25CLFFBQUwsR0FBZ0IsS0FBSzBDLE1BQUwsQ0FBWUMsSUFBWixDQUFpQkMsVUFBakIsQ0FBNEI1QyxRQUE1QztBQUNBbUIsV0FBS1IsT0FBTCxDQUFhVyxVQUFiO0FBQ0Q7Ozs7RUFoSGdDLGVBQUt1QixJOztrQkFBbkJqRCxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHt9XG4gICAgY29tcG9uZW50cyA9IHt9XG5cbi8vICAgIG1peGlucyA9IFt0ZXN0TWl4aW5dXG5cbiAgICBkYXRhID0ge1xuICAgICAgaW1nX21vZGU6ICcnLFxuICAgICAgcGxhdGVfbnVtOicnLFxuICAgICAgZnJhbWVfbnVtOicnLFxuICAgICAgZW5naW5lX251bTonJyxcblxuXG4gICAgICAvL+i9pueJjOmAieaLqeWZqFxuICAgICAgcGxhdGVfdmFsOiAn57KkQScsLy/ovabniYzlgLxcbiAgICAgIGlzU2hvd1BsYXQ6IGZhbHNlLFxuICAgICAgcGxhdGVfZGF0YTp7fSwvL+i9pueJjOaVsOaNrlxuICAgICAgcGxhdGVfc2hvcnQ6IFtdLC8v6L2m54mM566A56ewXG4gICAgICBwbGF0ZV9sZXR0ZXI6IFtdLC8v6L2m54mM5a2X5q+NXG4gICAgICBwbGF0ZV9pbml0OicnLC8v5Yid5aeL5YyW6L2m54mM5o6n5Lu255qE5YC8XG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7fVxuXG4gICAgLy/nu5HlrprnmoTmlrnms5VcbiAgICBtZXRob2RzID0ge1xuICAgICAgYmluZFBsYXRlTnVtOmZ1bmN0aW9uKGUpe1xuICAgICAgICB0aGlzLnBsYXRlX251bSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9LFxuICAgICAgYmluZEZyYW1lTnVtOmZ1bmN0aW9uKGUpe1xuICAgICAgICB0aGlzLmZyYW1lX251bSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9LFxuICAgICAgYmluZEVuZ2luZU51bTpmdW5jdGlvbihlKXtcbiAgICAgICAgdGhpcy5lbmdpbmVfbnVtID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIH0sXG5cbiAgICAgIHRvU2VhcmNoOmZ1bmN0aW9uKGUpe1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5p+l6K+iXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIui9pui+huWPt+egge+8mlwiLHRoYXQucGxhdGVfdmFsK3RoYXQucGxhdGVfbnVtKTtcbiAgICAgICAgY29uc29sZS5sb2coXCLovabmnrblj7fnoIHvvJpcIix0aGF0LmZyYW1lX251bSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Y+R5Yqo5py65Y+377yaXCIsdGhhdC5lbmdpbmVfbnVtKTtcbiAgICAgIH0sXG5cbiAgICAgIC8v6L2m54mM6YCJ5oup5ZmoXG4gICAgICBpbml0X3BsYXRlOiAoKSA9PiB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vcGVjY2FuY3kuZXRjY2hlYmFvLmNvbS92MS9xdWVyeS9wcm92aW5jZXMnLFxuICAgICAgICAgIHN1Y2Nlc3M6KGpzb24pPT57XG4gICAgICAgICAgICB0aGF0LnBsYXRlX3Nob3J0ID0gW107XG4gICAgICAgICAgICB0aGF0LnBsYXRlX2xldHRlciA9IFtdO1xuICAgICAgICAgICAgdGhhdC5wbGF0ZV9kYXRhID0ganNvbi5kYXRhLmRhdGE7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhqc29uLmRhdGEpO1xuICAgICAgICAgICAgaWYoanNvbi5kYXRhLmNvZGU9PTApe1xuICAgICAgICAgICAgICBmb3IodmFyIGk9MDtpPGpzb24uZGF0YS5kYXRhLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIHRoYXQucGxhdGVfc2hvcnQucHVzaChqc29uLmRhdGEuZGF0YVtpXS5wcm92aW5jZSk7XG4gICAgICAgICAgICAgICAgaWYoJ+eypCcgPT0ganNvbi5kYXRhLmRhdGFbaV0ucHJvdmluY2Upe1xuICAgICAgICAgICAgICAgICAgZm9yKHZhciBqPTA7ajxqc29uLmRhdGEuZGF0YVtpXS5jaXR5cy5sZW5ndGg7aisrKXtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF0ZV9sZXR0ZXIucHVzaChqc29uLmRhdGEuZGF0YVtpXS5jaXR5c1tqXS5jaXR5X2NvZGUpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoYXQucGxhdGVfaW5pdCA9IFsxNCwwXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHBsYXRlX3BpY2tlcl9jaGFuZ2U6IChlKSA9PiB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdmFyIHZhbCA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICBpZih2YWxbMF0hPXRoYXQucGxhdGVfaW5pdFswXSl7XG4gICAgICAgICAgdGhhdC5wbGF0ZV9pbml0ID0gdmFsO1xuICAgICAgICAgIHRoaXMubWV0aG9kcy5zZXRfcGxhdGVfbGV0dGVyKHZhbFswXSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoYXQucGxhdGVfaW5pdCA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNldF9wbGF0ZV9sZXR0ZXI6IChzaG9ydF9pbmRleCkgPT4ge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHRoYXQucGxhdGVfbGV0dGVyID0gW107XG4gICAgICAgIGZvcih2YXIgaj0wO2o8dGhhdC5wbGF0ZV9kYXRhW3Nob3J0X2luZGV4XS5jaXR5cy5sZW5ndGg7aisrKXtcbiAgICAgICAgICB0aGF0LnBsYXRlX2xldHRlci5wdXNoKHRoYXQucGxhdGVfZGF0YVtzaG9ydF9pbmRleF0uY2l0eXNbal0uY2l0eV9jb2RlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LnBsYXRlX2luaXQgPSBbc2hvcnRfaW5kZXgsMF07XG4gICAgICB9LFxuICAgICAgb3Blbl9wbGF0ZTogKCkgPT4ge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHRoYXQuaXNTaG93UGxhdCA9IHRydWU7XG4gICAgICB9LFxuICAgICAgY2xvc2VfcGxhdGU6ICgpID0+IHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGF0LmlzU2hvd1BsYXQgPSBmYWxzZTtcbiAgICAgICAgdGhhdC5wbGF0ZV92YWwgPSB0aGF0LnBsYXRlX3Nob3J0W3RoYXQucGxhdGVfaW5pdFswXV07XG4gICAgICAgIHRoYXQucGxhdGVfdmFsICs9IHRoYXQucGxhdGVfbGV0dGVyW3RoYXQucGxhdGVfaW5pdFsxXV07XG4gICAgICB9LFxuXG5cblxuXG4gICAgfVxuXG4gICAgLy/kuovku7blpITnkIZcbiAgICBldmVudHMgPSB7XG5cbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LmltZ19tb2RlID0gdGhpcy4kd3hhcHAuJGFwcC5nbG9iYWxEYXRhLmltZ19tb2RlO1xuICAgICAgdGhhdC5tZXRob2RzLmluaXRfcGxhdGUoKTtcbiAgICB9XG4gIH1cbiJdfQ==