'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../lib/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var utils = void 0;

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
        //        wx.navigateBack('/pages/vehicle_list');
        //        return;

        var that = this;
        console.log("查询");
        //        console.log("车辆号码：",that.plate_val+that.plate_num);
        //        console.log("车架号码：",that.frame_num);
        //        console.log("发动机号：",that.engine_num);

        _wepy2.default.request({
          url: 'https://peccancy' + utils.getPrefix() + '.etcchebao.com/v1/query/bind',
          data: {
            token: _wepy2.default.getStorageSync('token'),
            channelId: utils.getChannelId(),
            plate_num: that.plate_val + that.plate_num,
            vin: that.frame_num,
            engine: that.engine_num,
            vehicle_color: "02"
          },
          success: function success(req) {
            var json = req.data;

            //            json = {
            //                code:0,
            //            }
            console.log('添加车辆', json);
            if (json.code == 0) {
              _wepy2.default.showModal({
                title: '提醒',
                content: '添加成功',
                success: function success(res) {
                  if (res.confirm) {
                    //                    that.$redirect('/pages/vehicle_list');
                    wx.navigateBack('/pages/vehicle_list');
                  }
                }
              });
            } else {
              _wepy2.default.showModal({
                title: '错误',
                content: json.msg,
                showCancel: false
              });
            }
          },
          fail: function fail() {
            _wepy2.default.showModal({
              title: '错误',
              content: '网络错误，请重试',
              showCancel: false
            });
          }
        });
      },

      //车牌选择器
      init_plate: function init_plate() {
        var that = _this;
        _wepy2.default.request({
          url: 'https://peccancy' + utils.getPrefix() + '.etcchebao.com/v1/query/provinces',
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
      utils = new _utils2.default(this);
      utils.init();

      that.img_mode = this.$wxapp.$app.globalData.img_mode;
      that.methods.init_plate();
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInV0aWxzIiwiSW5kZXgiLCJjb25maWciLCJjb21wb25lbnRzIiwiZGF0YSIsImltZ19tb2RlIiwicGxhdGVfbnVtIiwiZnJhbWVfbnVtIiwiZW5naW5lX251bSIsInBsYXRlX3ZhbCIsImlzU2hvd1BsYXQiLCJwbGF0ZV9kYXRhIiwicGxhdGVfc2hvcnQiLCJwbGF0ZV9sZXR0ZXIiLCJwbGF0ZV9pbml0IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiYmluZFBsYXRlTnVtIiwiZSIsImRldGFpbCIsInZhbHVlIiwiYmluZEZyYW1lTnVtIiwiYmluZEVuZ2luZU51bSIsInRvU2VhcmNoIiwidGhhdCIsImNvbnNvbGUiLCJsb2ciLCJyZXF1ZXN0IiwidXJsIiwiZ2V0UHJlZml4IiwidG9rZW4iLCJnZXRTdG9yYWdlU3luYyIsImNoYW5uZWxJZCIsImdldENoYW5uZWxJZCIsInZpbiIsImVuZ2luZSIsInZlaGljbGVfY29sb3IiLCJzdWNjZXNzIiwicmVxIiwianNvbiIsImNvZGUiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJyZXMiLCJjb25maXJtIiwid3giLCJuYXZpZ2F0ZUJhY2siLCJtc2ciLCJzaG93Q2FuY2VsIiwiZmFpbCIsImluaXRfcGxhdGUiLCJpIiwibGVuZ3RoIiwicHVzaCIsInByb3ZpbmNlIiwiaiIsImNpdHlzIiwiY2l0eV9jb2RlIiwicGxhdGVfcGlja2VyX2NoYW5nZSIsInZhbCIsInNldF9wbGF0ZV9sZXR0ZXIiLCJzaG9ydF9pbmRleCIsIm9wZW5fcGxhdGUiLCJjbG9zZV9wbGF0ZSIsImV2ZW50cyIsImluaXQiLCIkd3hhcHAiLCIkYXBwIiwiZ2xvYmFsRGF0YSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUNBLElBQUlBLGNBQUo7O0lBRXFCQyxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUyxFLFFBQ1RDLFUsR0FBYSxFLFFB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RDs7OztFQXJLZ0MsZUFBS21CLEk7O2tCQUFuQnJFLEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCBVdGlscyBmcm9tICcuLi9saWIvdXRpbHMuanMnO1xuICBsZXQgdXRpbHM7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHt9XG4gICAgY29tcG9uZW50cyA9IHt9XG5cbi8vICAgIG1peGlucyA9IFt0ZXN0TWl4aW5dXG5cbiAgICBkYXRhID0ge1xuICAgICAgaW1nX21vZGU6ICcnLFxuICAgICAgcGxhdGVfbnVtOicnLFxuICAgICAgZnJhbWVfbnVtOicnLFxuICAgICAgZW5naW5lX251bTonJyxcblxuXG4gICAgICAvL+i9pueJjOmAieaLqeWZqFxuICAgICAgcGxhdGVfdmFsOiAn57KkQScsLy/ovabniYzlgLxcbiAgICAgIGlzU2hvd1BsYXQ6IGZhbHNlLFxuICAgICAgcGxhdGVfZGF0YTp7fSwvL+i9pueJjOaVsOaNrlxuICAgICAgcGxhdGVfc2hvcnQ6IFtdLC8v6L2m54mM566A56ewXG4gICAgICBwbGF0ZV9sZXR0ZXI6IFtdLC8v6L2m54mM5a2X5q+NXG4gICAgICBwbGF0ZV9pbml0OicnLC8v5Yid5aeL5YyW6L2m54mM5o6n5Lu255qE5YC8XG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7fVxuXG4gICAgLy/nu5HlrprnmoTmlrnms5VcbiAgICBtZXRob2RzID0ge1xuICAgICAgYmluZFBsYXRlTnVtOmZ1bmN0aW9uKGUpe1xuICAgICAgICB0aGlzLnBsYXRlX251bSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9LFxuICAgICAgYmluZEZyYW1lTnVtOmZ1bmN0aW9uKGUpe1xuICAgICAgICB0aGlzLmZyYW1lX251bSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9LFxuICAgICAgYmluZEVuZ2luZU51bTpmdW5jdGlvbihlKXtcbiAgICAgICAgdGhpcy5lbmdpbmVfbnVtID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIH0sXG5cbiAgICAgIHRvU2VhcmNoOmZ1bmN0aW9uKGUpe1xuLy8gICAgICAgIHd4Lm5hdmlnYXRlQmFjaygnL3BhZ2VzL3ZlaGljbGVfbGlzdCcpO1xuLy8gICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5p+l6K+iXCIpO1xuLy8gICAgICAgIGNvbnNvbGUubG9nKFwi6L2m6L6G5Y+356CB77yaXCIsdGhhdC5wbGF0ZV92YWwrdGhhdC5wbGF0ZV9udW0pO1xuLy8gICAgICAgIGNvbnNvbGUubG9nKFwi6L2m5p625Y+356CB77yaXCIsdGhhdC5mcmFtZV9udW0pO1xuLy8gICAgICAgIGNvbnNvbGUubG9nKFwi5Y+R5Yqo5py65Y+377yaXCIsdGhhdC5lbmdpbmVfbnVtKTtcblxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogJ2h0dHBzOi8vcGVjY2FuY3knK3V0aWxzLmdldFByZWZpeCgpKycuZXRjY2hlYmFvLmNvbS92MS9xdWVyeS9iaW5kJyxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB0b2tlbjp3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpLFxuICAgICAgICAgICAgY2hhbm5lbElkIDogdXRpbHMuZ2V0Q2hhbm5lbElkKCksXG4gICAgICAgICAgICBwbGF0ZV9udW0gOiB0aGF0LnBsYXRlX3ZhbCt0aGF0LnBsYXRlX251bSxcbiAgICAgICAgICAgIHZpbjogdGhhdC5mcmFtZV9udW0sXG4gICAgICAgICAgICBlbmdpbmUgOiB0aGF0LmVuZ2luZV9udW0sXG4gICAgICAgICAgICB2ZWhpY2xlX2NvbG9yIDogXCIwMlwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VjY2VzczogKHJlcSkgPT4ge1xuICAgICAgICAgICAgbGV0IGpzb24gPSByZXEuZGF0YTtcblxuLy8gICAgICAgICAgICBqc29uID0ge1xuLy8gICAgICAgICAgICAgICAgY29kZTowLFxuLy8gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5re75Yqg6L2m6L6GJyxqc29uKTtcbiAgICAgICAgICAgIGlmKGpzb24uY29kZT09MCl7XG4gICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOmGkicsXG4gICAgICAgICAgICAgICAgY29udGVudDogJ+a3u+WKoOaIkOWKnycsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgdGhhdC4kcmVkaXJlY3QoJy9wYWdlcy92ZWhpY2xlX2xpc3QnKTtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKCcvcGFnZXMvdmVoaWNsZV9saXN0Jyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6J+mUmeivrycsXG4gICAgICAgICAgICAgICAgY29udGVudDoganNvbi5tc2csXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbDpmYWxzZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDooKT0+e1xuICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTon6ZSZ6K+vJyxcbiAgICAgICAgICAgICAgY29udGVudDon572R57uc6ZSZ6K+v77yM6K+36YeN6K+VJyxcbiAgICAgICAgICAgICAgc2hvd0NhbmNlbDpmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICB9LFxuXG4gICAgICAvL+i9pueJjOmAieaLqeWZqFxuICAgICAgaW5pdF9wbGF0ZTogKCkgPT4ge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgdXJsOidodHRwczovL3BlY2NhbmN5Jyt1dGlscy5nZXRQcmVmaXgoKSsnLmV0Y2NoZWJhby5jb20vdjEvcXVlcnkvcHJvdmluY2VzJyxcbiAgICAgICAgICBzdWNjZXNzOihqc29uKT0+e1xuICAgICAgICAgICAgdGhhdC5wbGF0ZV9zaG9ydCA9IFtdO1xuICAgICAgICAgICAgdGhhdC5wbGF0ZV9sZXR0ZXIgPSBbXTtcbiAgICAgICAgICAgIHRoYXQucGxhdGVfZGF0YSA9IGpzb24uZGF0YS5kYXRhO1xuICAgICAgICAgICAgY29uc29sZS5sb2coanNvbi5kYXRhKTtcbiAgICAgICAgICAgIGlmKGpzb24uZGF0YS5jb2RlPT0wKXtcbiAgICAgICAgICAgICAgZm9yKHZhciBpPTA7aTxqc29uLmRhdGEuZGF0YS5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXRlX3Nob3J0LnB1c2goanNvbi5kYXRhLmRhdGFbaV0ucHJvdmluY2UpO1xuICAgICAgICAgICAgICAgIGlmKCfnsqQnID09IGpzb24uZGF0YS5kYXRhW2ldLnByb3ZpbmNlKXtcbiAgICAgICAgICAgICAgICAgIGZvcih2YXIgaj0wO2o8anNvbi5kYXRhLmRhdGFbaV0uY2l0eXMubGVuZ3RoO2orKyl7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGxhdGVfbGV0dGVyLnB1c2goanNvbi5kYXRhLmRhdGFbaV0uY2l0eXNbal0uY2l0eV9jb2RlKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGF0LnBsYXRlX2luaXQgPSBbMTQsMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBwbGF0ZV9waWNrZXJfY2hhbmdlOiAoZSkgPT4ge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHZhciB2YWwgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgaWYodmFsWzBdIT10aGF0LnBsYXRlX2luaXRbMF0pe1xuICAgICAgICAgIHRoYXQucGxhdGVfaW5pdCA9IHZhbDtcbiAgICAgICAgICB0aGlzLm1ldGhvZHMuc2V0X3BsYXRlX2xldHRlcih2YWxbMF0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGF0LnBsYXRlX2luaXQgPSB2YWw7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXRfcGxhdGVfbGV0dGVyOiAoc2hvcnRfaW5kZXgpID0+IHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGF0LnBsYXRlX2xldHRlciA9IFtdO1xuICAgICAgICBmb3IodmFyIGo9MDtqPHRoYXQucGxhdGVfZGF0YVtzaG9ydF9pbmRleF0uY2l0eXMubGVuZ3RoO2orKyl7XG4gICAgICAgICAgdGhhdC5wbGF0ZV9sZXR0ZXIucHVzaCh0aGF0LnBsYXRlX2RhdGFbc2hvcnRfaW5kZXhdLmNpdHlzW2pdLmNpdHlfY29kZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5wbGF0ZV9pbml0ID0gW3Nob3J0X2luZGV4LDBdO1xuICAgICAgfSxcbiAgICAgIG9wZW5fcGxhdGU6ICgpID0+IHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGF0LmlzU2hvd1BsYXQgPSB0cnVlO1xuICAgICAgfSxcbiAgICAgIGNsb3NlX3BsYXRlOiAoKSA9PiB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhhdC5pc1Nob3dQbGF0ID0gZmFsc2U7XG4gICAgICAgIHRoYXQucGxhdGVfdmFsID0gdGhhdC5wbGF0ZV9zaG9ydFt0aGF0LnBsYXRlX2luaXRbMF1dO1xuICAgICAgICB0aGF0LnBsYXRlX3ZhbCArPSB0aGF0LnBsYXRlX2xldHRlclt0aGF0LnBsYXRlX2luaXRbMV1dO1xuICAgICAgfSxcblxuXG5cblxuICAgIH1cblxuICAgIC8v5LqL5Lu25aSE55CGXG4gICAgZXZlbnRzID0ge1xuXG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdXRpbHMgPSBuZXcgVXRpbHModGhpcyk7XG4gICAgICB1dGlscy5pbml0KCk7XG5cbiAgICAgIHRoYXQuaW1nX21vZGUgPSB0aGlzLiR3eGFwcC4kYXBwLmdsb2JhbERhdGEuaW1nX21vZGU7XG4gICAgICB0aGF0Lm1ldGhvZHMuaW5pdF9wbGF0ZSgpO1xuICAgIH1cbiAgfVxuIl19