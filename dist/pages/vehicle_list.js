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

var Vehicle_list = function (_wepy$page) {
  _inherits(Vehicle_list, _wepy$page);

  function Vehicle_list() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Vehicle_list);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Vehicle_list.__proto__ || Object.getPrototypeOf(Vehicle_list)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      enablePullDownRefresh: true
    }, _this.components = {}, _this.data = {
      json_data: '',
      draw: {
        startX: 0,
        startY: 0,
        isDrawing: false,
        endX: 0,
        endY: 0,
        maxDistance: 100 //拖拽最大距离，单位是rpx
      }
    }, _this.computed = {}, _this.methods = {
      toDetails: function toDetails(plate, $event) {
        var that = _this;
        that.$navigate('/pages/peccancy_list?plate_num=' + plate);
      },
      addCar: function addCar(e) {
        var that = _this;
        that.$navigate('/pages/index');
      },
      changeUser: function changeUser(e) {
        var that = _this;
        wx.showModal({
          title: '提示',
          content: '确定要注销当前用户？',
          success: function success(res) {
            if (res.confirm) {
              _wepy2.default.removeStorageSync('token');
              that.$redirect('/pages/login');
            }
          }
        });
      },

      drawStart: function drawStart(e) {
        //        console.log("拖动开始");
        var that = _this;
        var touch = e.touches[0];
        that.draw.startX = touch.clientX;
        that.draw.startY = touch.clientY;
        that.draw.isDrawing = true;
        //        console.log(e.currentTarget.dataset.id);
        //        return;
        that.$apply();
      },
      drawMove: function drawMove(e) {
        var that = _this;
        var id = e.currentTarget.dataset.id;
        //        console.log("拖动");

        if (that.draw.isDrawing) {
          var touch = e.touches[0];
          that.draw.endX = touch.clientX;
          that.draw.endY = touch.clientY;

          //垂直滑动 or 不滑动
          if (that.draw.endX - that.draw.startX == 0) {
            return;
          }
          //从右往左
          if (that.draw.endX - that.draw.startX < 0) {
            //所有拖拽距离还原为0
            for (var i = 0; i < that.json_data.length; i++) {
              that.json_data[i].draw_distance = 0;
            }
            that.json_data[id].draw_distance = that.draw.maxDistance;
          } else {
            //从左往右
            that.json_data[id].draw_distance = 0;
          }
        }
        that.$apply();
      },
      drawEnd: function drawEnd(e) {
        //        console.log("拖动结束");
        var that = _this;
        that.draw.draw = false;
        that.$apply();
      },
      remove: function remove(e) {
        var that = _this;
        var platenum = e.currentTarget.dataset.platenum;
        wx.showModal({
          title: '提示',
          content: '确定移除【' + platenum + '】？',
          success: function success(res) {
            if (res.confirm) {
              console.log("移除", platenum);
              wx.showLoading({
                title: '移除中',
                mask: true
              });
              _wepy2.default.request({
                url: 'https://peccancy' + utils.getPrefix() + '.etcchebao.com/v1/query/removeCar',
                data: {
                  token: _wepy2.default.getStorageSync('token'),
                  channelId: utils.getChannelId(),
                  plate_num: platenum
                },
                complete: function complete() {
                  wx.hideLoading();
                },
                success: function success(req) {
                  var json = req.data;

                  //                json = {
                  //                    code:0,
                  //                }
                  console.log('移除车辆', json);
                  if (json.code == 0) {
                    _wepy2.default.showModal({
                      title: '提醒',
                      content: '移除成功',
                      showCancel: false,
                      success: function success(res) {
                        if (res.confirm) {
                          that.json_data = [];
                          that.$apply();
                          that.initData();
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
            }
            if (res.cancel) {
              for (var i = 0; i < that.json_data.length; i++) {
                that.json_data[i].draw_distance = 0;
              }
              that.$apply();
            }
          }
        });
      }
    }, _this.events = {}, _this.filterData = function (arr) {
      if (!arr) {
        return [];
      }
      for (var i = 0; i < arr.length; i++) {
        arr[i].draw_distance = 0;
      }
      return arr;
    }, _this.initData = function () {
      var that = _this;
      wx.showLoading({
        title: '加载中',
        mask: true
      });
      _wepy2.default.request({
        url: "https://peccancy" + utils.getPrefix() + ".etcchebao.com/v1/query/getCarList",
        data: {
          token: _wepy2.default.getStorageSync('token'),
          channelId: utils.getChannelId()
        },
        complete: function complete() {
          wx.hideLoading();
          wx.stopPullDownRefresh();
        },
        success: function success(req) {
          var json = req.data;
          //            json = {
          //                code:0,
          //            }
          console.log('初始化数据', json);
          if (json.code == 0) {
            that.json_data = that.filterData(json.data);
            that.$apply();
          } else if (json.code == -10001) {
            wx.showModal({
              title: '错误',
              content: json.msg,
              success: function success(res) {
                if (res.confirm) {
                  _wepy2.default.removeStorage({
                    key: 'token'
                  });
                  that.$redirect('/pages/login');
                }
              }
            });
          } else {
            wx.showModal({
              title: '错误',
              content: json.msg,
              showCancel: false
            });
          }
        },
        fail: function fail() {
          wx.showModal({
            title: '错误',
            content: '网络错误，请重试',
            showCancel: false
          });
        }
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  //绑定的方法


  //事件处理


  _createClass(Vehicle_list, [{
    key: 'onLoad',
    value: function onLoad(options) {
      var that = this;
      utils = new _utils2.default(this);
      utils.init();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      var that = this;
      that.initData();
    }
  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      console.log("下拉");
      var that = this;
      that.initData();
    }
  }]);

  return Vehicle_list;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Vehicle_list , 'pages/vehicle_list'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlaGljbGVfbGlzdC5qcyJdLCJuYW1lcyI6WyJ1dGlscyIsIlZlaGljbGVfbGlzdCIsImNvbmZpZyIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImNvbXBvbmVudHMiLCJkYXRhIiwianNvbl9kYXRhIiwiZHJhdyIsInN0YXJ0WCIsInN0YXJ0WSIsImlzRHJhd2luZyIsImVuZFgiLCJlbmRZIiwibWF4RGlzdGFuY2UiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJ0b0RldGFpbHMiLCJwbGF0ZSIsIiRldmVudCIsInRoYXQiLCIkbmF2aWdhdGUiLCJhZGRDYXIiLCJlIiwiY2hhbmdlVXNlciIsInd4Iiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJyZW1vdmVTdG9yYWdlU3luYyIsIiRyZWRpcmVjdCIsImRyYXdTdGFydCIsInRvdWNoIiwidG91Y2hlcyIsImNsaWVudFgiLCJjbGllbnRZIiwiJGFwcGx5IiwiZHJhd01vdmUiLCJpZCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaSIsImxlbmd0aCIsImRyYXdfZGlzdGFuY2UiLCJkcmF3RW5kIiwicmVtb3ZlIiwicGxhdGVudW0iLCJjb25zb2xlIiwibG9nIiwic2hvd0xvYWRpbmciLCJtYXNrIiwicmVxdWVzdCIsInVybCIsImdldFByZWZpeCIsInRva2VuIiwiZ2V0U3RvcmFnZVN5bmMiLCJjaGFubmVsSWQiLCJnZXRDaGFubmVsSWQiLCJwbGF0ZV9udW0iLCJjb21wbGV0ZSIsImhpZGVMb2FkaW5nIiwicmVxIiwianNvbiIsImNvZGUiLCJzaG93Q2FuY2VsIiwiaW5pdERhdGEiLCJtc2ciLCJmYWlsIiwiY2FuY2VsIiwiZXZlbnRzIiwiZmlsdGVyRGF0YSIsImFyciIsInN0b3BQdWxsRG93blJlZnJlc2giLCJyZW1vdmVTdG9yYWdlIiwia2V5Iiwib3B0aW9ucyIsImluaXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztB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LHFCQUFPLElBREk7QUFFWEMsdUJBQVNxQyxLQUFLSSxHQUZIO0FBR1hGLDBCQUFZO0FBSEQsYUFBYjtBQUtEO0FBQ0YsU0F2Q1U7QUF3Q1hHLGNBQU0sZ0JBQU07QUFDVjdDLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxJQURJO0FBRVhDLHFCQUFTLFVBRkU7QUFHWHVDLHdCQUFZO0FBSEQsV0FBYjtBQUtEO0FBOUNVLE9BQWI7QUFnREQsSzs7O0FBak9EOzs7QUE0SUE7Ozs7OzJCQUtPVyxPLEVBQVM7QUFDZCxVQUFJMUQsT0FBTyxJQUFYO0FBQ0FuQixjQUFRLG9CQUFVLElBQVYsQ0FBUjtBQUNBQSxZQUFNOEUsSUFBTjtBQUNEOzs7NkJBQ087QUFDTixVQUFJM0QsT0FBTyxJQUFYO0FBQ0FBLFdBQUtnRCxRQUFMO0FBQ0Q7Ozt3Q0FFa0I7QUFDakJsQixjQUFRQyxHQUFSLENBQVksSUFBWjtBQUNBLFVBQUkvQixPQUFPLElBQVg7QUFDQUEsV0FBS2dELFFBQUw7QUFDRDs7OztFQXBMdUMsZUFBS1ksSTs7a0JBQTFCOUUsWSIsImZpbGUiOiJ2ZWhpY2xlX2xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IFV0aWxzIGZyb20gJy4uL2xpYi91dGlscy5qcydcbiAgbGV0IHV0aWxzO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlaGljbGVfbGlzdCBleHRlbmRzIHdlcHkucGFnZSB7XG5cbiAgICBjb25maWcgPSB7XG4gICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6dHJ1ZSxcbiAgICB9O1xuICAgIGNvbXBvbmVudHMgPSB7fTtcblxuICAgIGRhdGEgPSB7XG4gICAgICBqc29uX2RhdGE6ICcnLFxuICAgICAgZHJhdzp7XG4gICAgICAgIHN0YXJ0WDowLFxuICAgICAgICBzdGFydFk6MCxcbiAgICAgICAgaXNEcmF3aW5nOmZhbHNlLFxuICAgICAgICBlbmRYOjAsXG4gICAgICAgIGVuZFk6MCxcbiAgICAgICAgbWF4RGlzdGFuY2U6MTAwLy/mi5bmi73mnIDlpKfot53nprvvvIzljZXkvY3mmK9ycHhcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGNvbXB1dGVkID0ge307XG5cbiAgICAvL+e7keWumueahOaWueazlVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB0b0RldGFpbHM6KHBsYXRlLCRldmVudCk9PntcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGF0LiRuYXZpZ2F0ZSgnL3BhZ2VzL3BlY2NhbmN5X2xpc3Q/cGxhdGVfbnVtPScrcGxhdGUpO1xuICAgICAgfSxcbiAgICAgIGFkZENhcjooZSk9PntcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGF0LiRuYXZpZ2F0ZSgnL3BhZ2VzL2luZGV4Jyk7XG4gICAgICB9LFxuICAgICAgY2hhbmdlVXNlcjooZSk9PntcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn56Gu5a6a6KaB5rOo6ZSA5b2T5YmN55So5oi377yfJyxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICB3ZXB5LnJlbW92ZVN0b3JhZ2VTeW5jKCd0b2tlbicpO1xuICAgICAgICAgICAgICB0aGF0LiRyZWRpcmVjdCgnL3BhZ2VzL2xvZ2luJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG5cbiAgICAgIGRyYXdTdGFydDooZSk9Pntcbi8vICAgICAgICBjb25zb2xlLmxvZyhcIuaLluWKqOW8gOWni1wiKTtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICB2YXIgdG91Y2ggPSBlLnRvdWNoZXNbMF07XG4gICAgICAgIHRoYXQuZHJhdy5zdGFydFggPSB0b3VjaC5jbGllbnRYO1xuICAgICAgICB0aGF0LmRyYXcuc3RhcnRZID0gdG91Y2guY2xpZW50WTtcbiAgICAgICAgdGhhdC5kcmF3LmlzRHJhd2luZyA9IHRydWU7XG4vLyAgICAgICAgY29uc29sZS5sb2coZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQpO1xuLy8gICAgICAgIHJldHVybjtcbiAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgIH0sXG4gICAgICBkcmF3TW92ZTooZSk9PntcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICB2YXIgaWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZDtcbi8vICAgICAgICBjb25zb2xlLmxvZyhcIuaLluWKqFwiKTtcblxuICAgICAgICBpZih0aGF0LmRyYXcuaXNEcmF3aW5nKSB7XG4gICAgICAgICAgdmFyIHRvdWNoID0gZS50b3VjaGVzWzBdO1xuICAgICAgICAgIHRoYXQuZHJhdy5lbmRYID0gdG91Y2guY2xpZW50WDtcbiAgICAgICAgICB0aGF0LmRyYXcuZW5kWSA9IHRvdWNoLmNsaWVudFk7XG5cbiAgICAgICAgICAvL+WeguebtOa7keWKqCBvciDkuI3mu5HliqhcbiAgICAgICAgICBpZih0aGF0LmRyYXcuZW5kWCAtIHRoYXQuZHJhdy5zdGFydFggPT0gMCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvL+S7juWPs+W+gOW3plxuICAgICAgICAgIGlmKCh0aGF0LmRyYXcuZW5kWCAtIHRoYXQuZHJhdy5zdGFydFgpIDwgMCl7XG4gICAgICAgICAgICAvL+aJgOacieaLluaLvei3neemu+i/mOWOn+S4ujBcbiAgICAgICAgICAgIGZvcih2YXIgaT0wO2k8dGhhdC5qc29uX2RhdGEubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgIHRoYXQuanNvbl9kYXRhW2ldLmRyYXdfZGlzdGFuY2UgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC5qc29uX2RhdGFbaWRdLmRyYXdfZGlzdGFuY2UgPSB0aGF0LmRyYXcubWF4RGlzdGFuY2U7XG4gICAgICAgICAgfWVsc2V7Ly/ku47lt6blvoDlj7NcbiAgICAgICAgICAgIHRoYXQuanNvbl9kYXRhW2lkXS5kcmF3X2Rpc3RhbmNlID0gMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgIH0sXG4gICAgICBkcmF3RW5kOihlKT0+e1xuLy8gICAgICAgIGNvbnNvbGUubG9nKFwi5ouW5Yqo57uT5p2fXCIpO1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHRoYXQuZHJhdy5kcmF3ID0gZmFsc2U7XG4gICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlOihlKT0+e1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHZhciBwbGF0ZW51bSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnBsYXRlbnVtO1xuICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn56Gu5a6a56e76Zmk44CQJytwbGF0ZW51bSsn44CR77yfJyxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuenu+mZpFwiLHBsYXRlbnVtKTtcbiAgICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgICAgICAgIHRpdGxlOifnp7vpmaTkuK0nLFxuICAgICAgICAgICAgICAgIG1hc2s6dHJ1ZSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9wZWNjYW5jeScrdXRpbHMuZ2V0UHJlZml4KCkrJy5ldGNjaGViYW8uY29tL3YxL3F1ZXJ5L3JlbW92ZUNhcicsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgdG9rZW46d2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSxcbiAgICAgICAgICAgICAgICAgIGNoYW5uZWxJZCA6IHV0aWxzLmdldENoYW5uZWxJZCgpLFxuICAgICAgICAgICAgICAgICAgcGxhdGVfbnVtIDogcGxhdGVudW0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTooKT0+e1xuICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXEpID0+IHtcbiAgICAgICAgICAgICAgICAgIGxldCBqc29uID0gcmVxLmRhdGE7XG5cbi8vICAgICAgICAgICAgICAgIGpzb24gPSB7XG4vLyAgICAgICAgICAgICAgICAgICAgY29kZTowLFxuLy8gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+enu+mZpOi9pui+hicsanNvbik7XG4gICAgICAgICAgICAgICAgICBpZihqc29uLmNvZGU9PTApe1xuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DphpInLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfnp7vpmaTmiJDlip8nLFxuICAgICAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6ZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuanNvbl9kYXRhPVtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmluaXREYXRhKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6J+mUmeivrycsXG4gICAgICAgICAgICAgICAgICAgICAgY29udGVudDoganNvbi5tc2csXG4gICAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDpmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDooKT0+e1xuICAgICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTon6ZSZ6K+vJyxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDon572R57uc6ZSZ6K+v77yM6K+36YeN6K+VJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDpmYWxzZVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcy5jYW5jZWwpe1xuICAgICAgICAgICAgICBmb3IodmFyIGk9MDtpPHRoYXQuanNvbl9kYXRhLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIHRoYXQuanNvbl9kYXRhW2ldLmRyYXdfZGlzdGFuY2UgPSAwO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvL+S6i+S7tuWkhOeQhlxuICAgIGV2ZW50cyA9IHtcblxuICAgIH07XG5cbiAgICBvbkxvYWQob3B0aW9ucykge1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgdXRpbHMgPSBuZXcgVXRpbHModGhpcyk7XG4gICAgICB1dGlscy5pbml0KCk7XG4gICAgfVxuICAgIG9uU2hvdygpe1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5pbml0RGF0YSgpO1xuICAgIH1cblxuICAgIG9uUHVsbERvd25SZWZyZXNoKCl7XG4gICAgICBjb25zb2xlLmxvZyhcIuS4i+aLiVwiKTtcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuaW5pdERhdGEoKTtcbiAgICB9XG5cbiAgICBmaWx0ZXJEYXRhID0gKGFycik9PntcbiAgICAgIGlmKCFhcnIpe1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICAgIGZvcih2YXIgaT0wO2k8YXJyLmxlbmd0aDtpKyspe1xuICAgICAgICBhcnJbaV0uZHJhd19kaXN0YW5jZSA9IDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH1cblxuICAgIGluaXREYXRhID0gKCkgPT4ge1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICB0aXRsZTon5Yqg6L295LitJyxcbiAgICAgICAgbWFzazp0cnVlLFxuICAgICAgfSk7XG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9wZWNjYW5jeVwiICsgdXRpbHMuZ2V0UHJlZml4KCkgKyBcIi5ldGNjaGViYW8uY29tL3YxL3F1ZXJ5L2dldENhckxpc3RcIixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHRva2VuOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpLFxuICAgICAgICAgIGNoYW5uZWxJZDogdXRpbHMuZ2V0Q2hhbm5lbElkKCksXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlOigpPT57XG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3M6IChyZXEpID0+IHtcbiAgICAgICAgICBsZXQganNvbiA9IHJlcS5kYXRhO1xuICAgICAgICAgIC8vICAgICAgICAgICAganNvbiA9IHtcbiAgICAgICAgICAvLyAgICAgICAgICAgICAgICBjb2RlOjAsXG4gICAgICAgICAgLy8gICAgICAgICAgICB9XG4gICAgICAgICAgY29uc29sZS5sb2coJ+WIneWni+WMluaVsOaNricsanNvbik7XG4gICAgICAgICAgaWYgKGpzb24uY29kZSA9PSAwKSB7XG4gICAgICAgICAgICB0aGF0Lmpzb25fZGF0YSA9IHRoYXQuZmlsdGVyRGF0YShqc29uLmRhdGEpO1xuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgICAgICB9IGVsc2UgaWYoanNvbi5jb2RlID09IC0xMDAwMSkge1xuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfplJnor68nLFxuICAgICAgICAgICAgICBjb250ZW50OiBqc29uLm1zZyxcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICB3ZXB5LnJlbW92ZVN0b3JhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICAgIGtleTondG9rZW4nXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIHRoYXQuJHJlZGlyZWN0KCcvcGFnZXMvbG9naW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+mUmeivrycsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IGpzb24ubXNnLFxuICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn6ZSZ6K+vJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfnvZHnu5zplJnor6/vvIzor7fph43or5UnLFxuICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG4iXX0=