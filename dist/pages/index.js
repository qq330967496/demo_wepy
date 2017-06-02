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
        console.log("车辆号码：", that.plate_val + that.plate_num);
        console.log("车架号码：", that.frame_num);
        console.log("发动机号：", that.engine_num);

        wx.showLoading({
          title: '查询中',
          mask: true
        });
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
          complete: function complete() {},
          success: function success(req) {
            var json = req.data;

            //            json = {
            //                code:0,
            //            }
            console.log('添加车辆', json);
            if (json.code == 0) {
              wx.showToast({
                icon: 'success',
                title: '添加成功',
                success: function success() {
                  wx.navigateBack('/pages/vehicle_list');
                }
              });

              /*wepy.showModal({
                title: '提醒',
                content: '添加成功',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
              //                    that.$redirect('/pages/vehicle_list');
                    wx.navigateBack('/pages/vehicle_list');
                  }
                }
              });*/
            } else {
              wx.hideLoading();
              _wepy2.default.showModal({
                title: '错误',
                content: json.msg,
                showCancel: false
              });
            }
          },
          fail: function fail() {
            wx.hideLoading();
            _wepy2.default.showModal({
              title: '错误',
              content: '网络错误，请重试',
              showCancel: false
            });
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
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      var that = this;
      that.init_plate();
    }

    //车牌选择器

  }, {
    key: 'init_plate',
    value: function init_plate() {
      var that = this;
      wx.showLoading({
        title: '加载中',
        mask: true
      });
      _wepy2.default.request({
        url: 'https://peccancy' + utils.getPrefix() + '.etcchebao.com/v1/query/provinces',
        complete: function complete() {
          wx.hideLoading();
        },
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
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInV0aWxzIiwiSW5kZXgiLCJjb25maWciLCJjb21wb25lbnRzIiwiZGF0YSIsImltZ19tb2RlIiwicGxhdGVfbnVtIiwiZnJhbWVfbnVtIiwiZW5naW5lX251bSIsInBsYXRlX3ZhbCIsImlzU2hvd1BsYXQiLCJwbGF0ZV9kYXRhIiwicGxhdGVfc2hvcnQiLCJwbGF0ZV9sZXR0ZXIiLCJwbGF0ZV9pbml0IiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiYmluZFBsYXRlTnVtIiwiZSIsImRldGFpbCIsInZhbHVlIiwiYmluZEZyYW1lTnVtIiwiYmluZEVuZ2luZU51bSIsInRvU2VhcmNoIiwidGhhdCIsImNvbnNvbGUiLCJsb2ciLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwicmVxdWVzdCIsInVybCIsImdldFByZWZpeCIsInRva2VuIiwiZ2V0U3RvcmFnZVN5bmMiLCJjaGFubmVsSWQiLCJnZXRDaGFubmVsSWQiLCJ2aW4iLCJlbmdpbmUiLCJ2ZWhpY2xlX2NvbG9yIiwiY29tcGxldGUiLCJzdWNjZXNzIiwicmVxIiwianNvbiIsImNvZGUiLCJzaG93VG9hc3QiLCJpY29uIiwibmF2aWdhdGVCYWNrIiwiaGlkZUxvYWRpbmciLCJzaG93TW9kYWwiLCJjb250ZW50IiwibXNnIiwic2hvd0NhbmNlbCIsImZhaWwiLCJwbGF0ZV9waWNrZXJfY2hhbmdlIiwidmFsIiwic2V0X3BsYXRlX2xldHRlciIsInNob3J0X2luZGV4IiwiaiIsImNpdHlzIiwibGVuZ3RoIiwicHVzaCIsImNpdHlfY29kZSIsIm9wZW5fcGxhdGUiLCJjbG9zZV9wbGF0ZSIsImV2ZW50cyIsImluaXQiLCIkd3hhcHAiLCIkYXBwIiwiZ2xvYmFsRGF0YSIsImluaXRfcGxhdGUiLCJpIiwicHJvdmluY2UiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFDQSxJQUFJQSxjQUFKOztJQUVxQkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVMsRSxRQUNUQyxVLEdBQWEsRSxRQUliQyxJLEdBQU87QUFDTEMsZ0JBQVUsRUFETDtBQUVMQyxpQkFBVyxFQUZOO0FBR0xDLGlCQUFXLEVBSE47QUFJTEMsa0JBQVksRUFKUDs7QUFPTDtBQUNBQyxpQkFBVyxJQVJOLEVBUVc7QUFDaEJDLGtCQUFZLEtBVFA7QUFVTEMsa0JBQVksRUFWUCxFQVVVO0FBQ2ZDLG1CQUFhLEVBWFIsRUFXVztBQUNoQkMsb0JBQWMsRUFaVCxFQVlZO0FBQ2pCQyxrQkFBWSxFQWJQLEUsUUFnQlBDLFEsR0FBVyxFLFFBR1hDLE8sR0FBVTtBQUNSQyxvQkFBYyxzQkFBVUMsQ0FBVixFQUFhO0FBQ3pCLGFBQUtaLFNBQUwsR0FBaUJZLEVBQUVDLE1BQUYsQ0FBU0MsS0FBMUI7QUFDRCxPQUhPO0FBSVJDLG9CQUFjLHNCQUFVSCxDQUFWLEVBQWE7QUFDekIsYUFBS1gsU0FBTCxHQUFpQlcsRUFBRUMsTUFBRixDQUFTQyxLQUExQjtBQUNELE9BTk87QUFPUkUscUJBQWUsdUJBQVVKLENBQVYsRUFBYTtBQUMxQixhQUFLVixVQUFMLEdBQWtCVSxFQUFFQyxNQUFGLENBQVNDLEtBQTNCO0FBQ0QsT0FUTzs7QUFXUkcsZ0JBQVUsa0JBQVVMLENBQVYsRUFBYTtBQUM3QjtBQUNBOztBQUVRLFlBQUlNLE9BQU8sSUFBWDtBQUNBQyxnQkFBUUMsR0FBUixDQUFZLElBQVo7QUFDQUQsZ0JBQVFDLEdBQVIsQ0FBWSxPQUFaLEVBQXFCRixLQUFLZixTQUFMLEdBQWlCZSxLQUFLbEIsU0FBM0M7QUFDQW1CLGdCQUFRQyxHQUFSLENBQVksT0FBWixFQUFxQkYsS0FBS2pCLFNBQTFCO0FBQ0FrQixnQkFBUUMsR0FBUixDQUFZLE9BQVosRUFBcUJGLEtBQUtoQixVQUExQjs7QUFFQW1CLFdBQUdDLFdBQUgsQ0FBZTtBQUNiQyxpQkFBTyxLQURNO0FBRWJDLGdCQUFLO0FBRlEsU0FBZjtBQUlBLHVCQUFLQyxPQUFMLENBQWE7QUFDWEMsZUFBSyxxQkFBcUJoQyxNQUFNaUMsU0FBTixFQUFyQixHQUF5Qyw4QkFEbkM7QUFFWDdCLGdCQUFNO0FBQ0o4QixtQkFBTyxlQUFLQyxjQUFMLENBQW9CLE9BQXBCLENBREg7QUFFSkMsdUJBQVdwQyxNQUFNcUMsWUFBTixFQUZQO0FBR0ovQix1QkFBV2tCLEtBQUtmLFNBQUwsR0FBaUJlLEtBQUtsQixTQUg3QjtBQUlKZ0MsaUJBQUtkLEtBQUtqQixTQUpOO0FBS0pnQyxvQkFBUWYsS0FBS2hCLFVBTFQ7QUFNSmdDLDJCQUFlO0FBTlgsV0FGSztBQVVYQyxvQkFBVSxvQkFBTSxDQUVmLENBWlU7QUFhWEMsbUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixnQkFBSUMsT0FBT0QsSUFBSXZDLElBQWY7O0FBRVo7QUFDQTtBQUNBO0FBQ1lxQixvQkFBUUMsR0FBUixDQUFZLE1BQVosRUFBb0JrQixJQUFwQjtBQUNBLGdCQUFJQSxLQUFLQyxJQUFMLElBQWEsQ0FBakIsRUFBb0I7QUFDbEJsQixpQkFBR21CLFNBQUgsQ0FBYTtBQUNYQyxzQkFBSyxTQURNO0FBRVhsQix1QkFBTSxNQUZLO0FBR1hhLHlCQUFTLG1CQUFZO0FBQ25CZixxQkFBR3FCLFlBQUgsQ0FBZ0IscUJBQWhCO0FBQ0Q7QUFMVSxlQUFiOztBQVFBOzs7Ozs7Ozs7OztBQVdELGFBcEJELE1Bb0JPO0FBQ0xyQixpQkFBR3NCLFdBQUg7QUFDQSw2QkFBS0MsU0FBTCxDQUFlO0FBQ2JyQix1QkFBTyxJQURNO0FBRWJzQix5QkFBU1AsS0FBS1EsR0FGRDtBQUdiQyw0QkFBWTtBQUhDLGVBQWY7QUFLRDtBQUVGLFdBakRVO0FBa0RYQyxnQkFBTSxnQkFBTTtBQUNWM0IsZUFBR3NCLFdBQUg7QUFDQSwyQkFBS0MsU0FBTCxDQUFlO0FBQ2JyQixxQkFBTyxJQURNO0FBRWJzQix1QkFBUyxVQUZJO0FBR2JFLDBCQUFZO0FBSEMsYUFBZjtBQUtEO0FBekRVLFNBQWI7QUE0REQsT0FyRk87O0FBdUZSRSwyQkFBcUIsNkJBQUNyQyxDQUFELEVBQU87QUFDMUIsWUFBSU0sWUFBSjtBQUNBLFlBQUlnQyxNQUFNdEMsRUFBRUMsTUFBRixDQUFTQyxLQUFuQjtBQUNBLFlBQUlvQyxJQUFJLENBQUosS0FBVWhDLEtBQUtWLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBZCxFQUFrQztBQUNoQ1UsZUFBS1YsVUFBTCxHQUFrQjBDLEdBQWxCO0FBQ0EsZ0JBQUt4QyxPQUFMLENBQWF5QyxnQkFBYixDQUE4QkQsSUFBSSxDQUFKLENBQTlCO0FBQ0QsU0FIRCxNQUdPO0FBQ0xoQyxlQUFLVixVQUFMLEdBQWtCMEMsR0FBbEI7QUFDRDtBQUNGLE9BaEdPO0FBaUdSQyx3QkFBa0IsMEJBQUNDLFdBQUQsRUFBaUI7QUFDakMsWUFBSWxDLFlBQUo7QUFDQUEsYUFBS1gsWUFBTCxHQUFvQixFQUFwQjtBQUNBLGFBQUssSUFBSThDLElBQUksQ0FBYixFQUFnQkEsSUFBSW5DLEtBQUtiLFVBQUwsQ0FBZ0IrQyxXQUFoQixFQUE2QkUsS0FBN0IsQ0FBbUNDLE1BQXZELEVBQStERixHQUEvRCxFQUFvRTtBQUNsRW5DLGVBQUtYLFlBQUwsQ0FBa0JpRCxJQUFsQixDQUF1QnRDLEtBQUtiLFVBQUwsQ0FBZ0IrQyxXQUFoQixFQUE2QkUsS0FBN0IsQ0FBbUNELENBQW5DLEVBQXNDSSxTQUE3RDtBQUNEO0FBQ0R2QyxhQUFLVixVQUFMLEdBQWtCLENBQUM0QyxXQUFELEVBQWMsQ0FBZCxDQUFsQjtBQUNELE9BeEdPO0FBeUdSTSxrQkFBWSxzQkFBTTtBQUNoQixZQUFJeEMsWUFBSjtBQUNBQSxhQUFLZCxVQUFMLEdBQWtCLElBQWxCO0FBQ0QsT0E1R087QUE2R1J1RCxtQkFBYSx1QkFBTTtBQUNqQixZQUFJekMsWUFBSjtBQUNBQSxhQUFLZCxVQUFMLEdBQWtCLEtBQWxCO0FBQ0FjLGFBQUtmLFNBQUwsR0FBaUJlLEtBQUtaLFdBQUwsQ0FBaUJZLEtBQUtWLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBakIsQ0FBakI7QUFDQVUsYUFBS2YsU0FBTCxJQUFrQmUsS0FBS1gsWUFBTCxDQUFrQlcsS0FBS1YsVUFBTCxDQUFnQixDQUFoQixDQUFsQixDQUFsQjtBQUNEOztBQWxITyxLLFFBd0hWb0QsTSxHQUFTLEU7OztBQTdJYjs7QUFvQkk7OztBQXdIQTs7Ozs7NkJBR1M7QUFDUCxVQUFJMUMsT0FBTyxJQUFYO0FBQ0F4QixjQUFRLG9CQUFVLElBQVYsQ0FBUjtBQUNBQSxZQUFNbUUsSUFBTjs7QUFFQTNDLFdBQUtuQixRQUFMLEdBQWdCLEtBQUsrRCxNQUFMLENBQVlDLElBQVosQ0FBaUJDLFVBQWpCLENBQTRCakUsUUFBNUM7QUFFRDs7OzZCQUVRO0FBQ1AsVUFBSW1CLE9BQU8sSUFBWDtBQUNBQSxXQUFLK0MsVUFBTDtBQUNEOztBQUVEOzs7O2lDQUNhO0FBQ1gsVUFBSS9DLE9BQU8sSUFBWDtBQUNBRyxTQUFHQyxXQUFILENBQWU7QUFDYkMsZUFBTyxLQURNO0FBRWJDLGNBQUs7QUFGUSxPQUFmO0FBSUEscUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxhQUFLLHFCQUFxQmhDLE1BQU1pQyxTQUFOLEVBQXJCLEdBQXlDLG1DQURuQztBQUVYUSxrQkFBVSxvQkFBTTtBQUNkZCxhQUFHc0IsV0FBSDtBQUNELFNBSlU7QUFLWFAsaUJBQVMsaUJBQUNFLElBQUQsRUFBVTtBQUNqQnBCLGVBQUtaLFdBQUwsR0FBbUIsRUFBbkI7QUFDQVksZUFBS1gsWUFBTCxHQUFvQixFQUFwQjtBQUNBVyxlQUFLYixVQUFMLEdBQWtCaUMsS0FBS3hDLElBQUwsQ0FBVUEsSUFBNUI7QUFDQXFCLGtCQUFRQyxHQUFSLENBQVlrQixLQUFLeEMsSUFBakI7QUFDQSxjQUFJd0MsS0FBS3hDLElBQUwsQ0FBVXlDLElBQVYsSUFBa0IsQ0FBdEIsRUFBeUI7QUFDdkIsaUJBQUssSUFBSTJCLElBQUksQ0FBYixFQUFnQkEsSUFBSTVCLEtBQUt4QyxJQUFMLENBQVVBLElBQVYsQ0FBZXlELE1BQW5DLEVBQTJDVyxHQUEzQyxFQUFnRDtBQUM5Q2hELG1CQUFLWixXQUFMLENBQWlCa0QsSUFBakIsQ0FBc0JsQixLQUFLeEMsSUFBTCxDQUFVQSxJQUFWLENBQWVvRSxDQUFmLEVBQWtCQyxRQUF4QztBQUNBLGtCQUFJLE9BQU83QixLQUFLeEMsSUFBTCxDQUFVQSxJQUFWLENBQWVvRSxDQUFmLEVBQWtCQyxRQUE3QixFQUF1QztBQUNyQyxxQkFBSyxJQUFJZCxJQUFJLENBQWIsRUFBZ0JBLElBQUlmLEtBQUt4QyxJQUFMLENBQVVBLElBQVYsQ0FBZW9FLENBQWYsRUFBa0JaLEtBQWxCLENBQXdCQyxNQUE1QyxFQUFvREYsR0FBcEQsRUFBeUQ7QUFDdkRuQyx1QkFBS1gsWUFBTCxDQUFrQmlELElBQWxCLENBQXVCbEIsS0FBS3hDLElBQUwsQ0FBVUEsSUFBVixDQUFlb0UsQ0FBZixFQUFrQlosS0FBbEIsQ0FBd0JELENBQXhCLEVBQTJCSSxTQUFsRDtBQUNEO0FBRUY7QUFDRjtBQUNEdkMsaUJBQUtWLFVBQUwsR0FBa0IsQ0FBQyxFQUFELEVBQUssQ0FBTCxDQUFsQjtBQUNEO0FBQ0Y7QUF0QlUsT0FBYjtBQXdCRDs7OztFQWhNZ0MsZUFBSzRELEk7O2tCQUFuQnpFLEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCBVdGlscyBmcm9tICcuLi9saWIvdXRpbHMuanMnO1xuICBsZXQgdXRpbHM7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHt9XG4gICAgY29tcG9uZW50cyA9IHt9XG5cbi8vICAgIG1peGlucyA9IFt0ZXN0TWl4aW5dXG5cbiAgICBkYXRhID0ge1xuICAgICAgaW1nX21vZGU6ICcnLFxuICAgICAgcGxhdGVfbnVtOiAnJyxcbiAgICAgIGZyYW1lX251bTogJycsXG4gICAgICBlbmdpbmVfbnVtOiAnJyxcblxuXG4gICAgICAvL+i9pueJjOmAieaLqeWZqFxuICAgICAgcGxhdGVfdmFsOiAn57KkQScsLy/ovabniYzlgLxcbiAgICAgIGlzU2hvd1BsYXQ6IGZhbHNlLFxuICAgICAgcGxhdGVfZGF0YToge30sLy/ovabniYzmlbDmja5cbiAgICAgIHBsYXRlX3Nob3J0OiBbXSwvL+i9pueJjOeugOensFxuICAgICAgcGxhdGVfbGV0dGVyOiBbXSwvL+i9pueJjOWtl+avjVxuICAgICAgcGxhdGVfaW5pdDogJycsLy/liJ3lp4vljJbovabniYzmjqfku7bnmoTlgLxcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHt9XG5cbiAgICAvL+e7keWumueahOaWueazlVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBiaW5kUGxhdGVOdW06IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHRoaXMucGxhdGVfbnVtID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIH0sXG4gICAgICBiaW5kRnJhbWVOdW06IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHRoaXMuZnJhbWVfbnVtID0gZS5kZXRhaWwudmFsdWVcbiAgICAgIH0sXG4gICAgICBiaW5kRW5naW5lTnVtOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLmVuZ2luZV9udW0gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgfSxcblxuICAgICAgdG9TZWFyY2g6IGZ1bmN0aW9uIChlKSB7XG4vLyAgICAgICAgd3gubmF2aWdhdGVCYWNrKCcvcGFnZXMvdmVoaWNsZV9saXN0Jyk7XG4vLyAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgY29uc29sZS5sb2coXCLmn6Xor6JcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi6L2m6L6G5Y+356CB77yaXCIsIHRoYXQucGxhdGVfdmFsICsgdGhhdC5wbGF0ZV9udW0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcIui9puaetuWPt+egge+8mlwiLCB0aGF0LmZyYW1lX251bSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Y+R5Yqo5py65Y+377yaXCIsIHRoYXQuZW5naW5lX251bSk7XG5cbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgIHRpdGxlOiAn5p+l6K+i5LitJyxcbiAgICAgICAgICBtYXNrOnRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogJ2h0dHBzOi8vcGVjY2FuY3knICsgdXRpbHMuZ2V0UHJlZml4KCkgKyAnLmV0Y2NoZWJhby5jb20vdjEvcXVlcnkvYmluZCcsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdG9rZW46IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJyksXG4gICAgICAgICAgICBjaGFubmVsSWQ6IHV0aWxzLmdldENoYW5uZWxJZCgpLFxuICAgICAgICAgICAgcGxhdGVfbnVtOiB0aGF0LnBsYXRlX3ZhbCArIHRoYXQucGxhdGVfbnVtLFxuICAgICAgICAgICAgdmluOiB0aGF0LmZyYW1lX251bSxcbiAgICAgICAgICAgIGVuZ2luZTogdGhhdC5lbmdpbmVfbnVtLFxuICAgICAgICAgICAgdmVoaWNsZV9jb2xvcjogXCIwMlwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29tcGxldGU6ICgpID0+IHtcblxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VjY2VzczogKHJlcSkgPT4ge1xuICAgICAgICAgICAgbGV0IGpzb24gPSByZXEuZGF0YTtcblxuLy8gICAgICAgICAgICBqc29uID0ge1xuLy8gICAgICAgICAgICAgICAgY29kZTowLFxuLy8gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5re75Yqg6L2m6L6GJywganNvbik7XG4gICAgICAgICAgICBpZiAoanNvbi5jb2RlID09IDApIHtcbiAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICBpY29uOidzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICB0aXRsZTon5re75Yqg5oiQ5YqfJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soJy9wYWdlcy92ZWhpY2xlX2xpc3QnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIC8qd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q6YaSJyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn5re75Yqg5oiQ5YqfJyxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbi8vICAgICAgICAgICAgICAgICAgICB0aGF0LiRyZWRpcmVjdCgnL3BhZ2VzL3ZlaGljbGVfbGlzdCcpO1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soJy9wYWdlcy92ZWhpY2xlX2xpc3QnKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pOyovXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfplJnor68nLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGpzb24ubXNnLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+mUmeivrycsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICfnvZHnu5zplJnor6/vvIzor7fph43or5UnLFxuICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICB9LFxuXG4gICAgICBwbGF0ZV9waWNrZXJfY2hhbmdlOiAoZSkgPT4ge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHZhciB2YWwgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbFswXSAhPSB0aGF0LnBsYXRlX2luaXRbMF0pIHtcbiAgICAgICAgICB0aGF0LnBsYXRlX2luaXQgPSB2YWw7XG4gICAgICAgICAgdGhpcy5tZXRob2RzLnNldF9wbGF0ZV9sZXR0ZXIodmFsWzBdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGF0LnBsYXRlX2luaXQgPSB2YWw7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXRfcGxhdGVfbGV0dGVyOiAoc2hvcnRfaW5kZXgpID0+IHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGF0LnBsYXRlX2xldHRlciA9IFtdO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoYXQucGxhdGVfZGF0YVtzaG9ydF9pbmRleF0uY2l0eXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB0aGF0LnBsYXRlX2xldHRlci5wdXNoKHRoYXQucGxhdGVfZGF0YVtzaG9ydF9pbmRleF0uY2l0eXNbal0uY2l0eV9jb2RlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LnBsYXRlX2luaXQgPSBbc2hvcnRfaW5kZXgsIDBdO1xuICAgICAgfSxcbiAgICAgIG9wZW5fcGxhdGU6ICgpID0+IHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGF0LmlzU2hvd1BsYXQgPSB0cnVlO1xuICAgICAgfSxcbiAgICAgIGNsb3NlX3BsYXRlOiAoKSA9PiB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhhdC5pc1Nob3dQbGF0ID0gZmFsc2U7XG4gICAgICAgIHRoYXQucGxhdGVfdmFsID0gdGhhdC5wbGF0ZV9zaG9ydFt0aGF0LnBsYXRlX2luaXRbMF1dO1xuICAgICAgICB0aGF0LnBsYXRlX3ZhbCArPSB0aGF0LnBsYXRlX2xldHRlclt0aGF0LnBsYXRlX2luaXRbMV1dO1xuICAgICAgfSxcblxuXG4gICAgfVxuXG4gICAgLy/kuovku7blpITnkIZcbiAgICBldmVudHMgPSB7fVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdXRpbHMgPSBuZXcgVXRpbHModGhpcyk7XG4gICAgICB1dGlscy5pbml0KCk7XG5cbiAgICAgIHRoYXQuaW1nX21vZGUgPSB0aGlzLiR3eGFwcC4kYXBwLmdsb2JhbERhdGEuaW1nX21vZGU7XG5cbiAgICB9XG5cbiAgICBvblNob3coKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LmluaXRfcGxhdGUoKTtcbiAgICB9XG5cbiAgICAvL+i9pueJjOmAieaLqeWZqFxuICAgIGluaXRfcGxhdGUoKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgICAgbWFzazp0cnVlLFxuICAgICAgfSk7XG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwczovL3BlY2NhbmN5JyArIHV0aWxzLmdldFByZWZpeCgpICsgJy5ldGNjaGViYW8uY29tL3YxL3F1ZXJ5L3Byb3ZpbmNlcycsXG4gICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzczogKGpzb24pID0+IHtcbiAgICAgICAgICB0aGF0LnBsYXRlX3Nob3J0ID0gW107XG4gICAgICAgICAgdGhhdC5wbGF0ZV9sZXR0ZXIgPSBbXTtcbiAgICAgICAgICB0aGF0LnBsYXRlX2RhdGEgPSBqc29uLmRhdGEuZGF0YTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhqc29uLmRhdGEpO1xuICAgICAgICAgIGlmIChqc29uLmRhdGEuY29kZSA9PSAwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGpzb24uZGF0YS5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHRoYXQucGxhdGVfc2hvcnQucHVzaChqc29uLmRhdGEuZGF0YVtpXS5wcm92aW5jZSk7XG4gICAgICAgICAgICAgIGlmICgn57KkJyA9PSBqc29uLmRhdGEuZGF0YVtpXS5wcm92aW5jZSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwganNvbi5kYXRhLmRhdGFbaV0uY2l0eXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgIHRoYXQucGxhdGVfbGV0dGVyLnB1c2goanNvbi5kYXRhLmRhdGFbaV0uY2l0eXNbal0uY2l0eV9jb2RlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC5wbGF0ZV9pbml0ID0gWzE0LCAwXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuIl19