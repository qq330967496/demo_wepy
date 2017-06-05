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
          if (that.draw.endX - that.draw.startX < -50) {
            //所有拖拽距离还原为0
            for (var i = 0; i < that.json_data.length; i++) {
              that.json_data[i].draw_distance = 0;
            }
            that.json_data[id].draw_distance = that.draw.maxDistance;
          } else if (that.draw.endX - that.draw.startX > 50) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlaGljbGVfbGlzdC5qcyJdLCJuYW1lcyI6WyJ1dGlscyIsIlZlaGljbGVfbGlzdCIsImNvbmZpZyIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImNvbXBvbmVudHMiLCJkYXRhIiwianNvbl9kYXRhIiwiZHJhdyIsInN0YXJ0WCIsInN0YXJ0WSIsImlzRHJhd2luZyIsImVuZFgiLCJlbmRZIiwibWF4RGlzdGFuY2UiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJ0b0RldGFpbHMiLCJwbGF0ZSIsIiRldmVudCIsInRoYXQiLCIkbmF2aWdhdGUiLCJhZGRDYXIiLCJlIiwiY2hhbmdlVXNlciIsInd4Iiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJyZW1vdmVTdG9yYWdlU3luYyIsIiRyZWRpcmVjdCIsImRyYXdTdGFydCIsInRvdWNoIiwidG91Y2hlcyIsImNsaWVudFgiLCJjbGllbnRZIiwiJGFwcGx5IiwiZHJhd01vdmUiLCJpZCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaSIsImxlbmd0aCIsImRyYXdfZGlzdGFuY2UiLCJkcmF3RW5kIiwicmVtb3ZlIiwicGxhdGVudW0iLCJjb25zb2xlIiwibG9nIiwic2hvd0xvYWRpbmciLCJtYXNrIiwicmVxdWVzdCIsInVybCIsImdldFByZWZpeCIsInRva2VuIiwiZ2V0U3RvcmFnZVN5bmMiLCJjaGFubmVsSWQiLCJnZXRDaGFubmVsSWQiLCJwbGF0ZV9udW0iLCJjb21wbGV0ZSIsImhpZGVMb2FkaW5nIiwicmVxIiwianNvbiIsImNvZGUiLCJzaG93Q2FuY2VsIiwiaW5pdERhdGEiLCJtc2ciLCJmYWlsIiwiY2FuY2VsIiwiZXZlbnRzIiwiZmlsdGVyRGF0YSIsImFyciIsInN0b3BQdWxsRG93blJlZnJlc2giLCJyZW1vdmVTdG9yYWdlIiwia2V5Iiwib3B0aW9ucyIsImluaXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztB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QUFLYSxTQUFMLENBQWUsY0FBZjtBQUNEO0FBQ0Y7QUFWVSxhQUFiO0FBWUQsV0FiTSxNQWFBO0FBQ0xSLGVBQUdDLFNBQUgsQ0FBYTtBQUNYQyxxQkFBTyxJQURJO0FBRVhDLHVCQUFTcUMsS0FBS0ksR0FGSDtBQUdYRiwwQkFBWTtBQUhELGFBQWI7QUFLRDtBQUNGLFNBdkNVO0FBd0NYRyxjQUFNLGdCQUFNO0FBQ1Y3QyxhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sSUFESTtBQUVYQyxxQkFBUyxVQUZFO0FBR1h1Qyx3QkFBWTtBQUhELFdBQWI7QUFLRDtBQTlDVSxPQUFiO0FBZ0RELEs7OztBQWpPRDs7O0FBNElBOzs7OzsyQkFLT1csTyxFQUFTO0FBQ2QsVUFBSTFELE9BQU8sSUFBWDtBQUNBbkIsY0FBUSxvQkFBVSxJQUFWLENBQVI7QUFDQUEsWUFBTThFLElBQU47QUFDRDs7OzZCQUNPO0FBQ04sVUFBSTNELE9BQU8sSUFBWDtBQUNBQSxXQUFLZ0QsUUFBTDtBQUNEOzs7d0NBRWtCO0FBQ2pCbEIsY0FBUUMsR0FBUixDQUFZLElBQVo7QUFDQSxVQUFJL0IsT0FBTyxJQUFYO0FBQ0FBLFdBQUtnRCxRQUFMO0FBQ0Q7Ozs7RUFwTHVDLGVBQUtZLEk7O2tCQUExQjlFLFkiLCJmaWxlIjoidmVoaWNsZV9saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBVdGlscyBmcm9tICcuLi9saWIvdXRpbHMuanMnXG4gIGxldCB1dGlscztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBWZWhpY2xlX2xpc3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuXG4gICAgY29uZmlnID0ge1xuICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOnRydWUsXG4gICAgfTtcbiAgICBjb21wb25lbnRzID0ge307XG5cbiAgICBkYXRhID0ge1xuICAgICAganNvbl9kYXRhOiAnJyxcbiAgICAgIGRyYXc6e1xuICAgICAgICBzdGFydFg6MCxcbiAgICAgICAgc3RhcnRZOjAsXG4gICAgICAgIGlzRHJhd2luZzpmYWxzZSxcbiAgICAgICAgZW5kWDowLFxuICAgICAgICBlbmRZOjAsXG4gICAgICAgIG1heERpc3RhbmNlOjEwMC8v5ouW5ou95pyA5aSn6Led56a777yM5Y2V5L2N5pivcnB4XG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb21wdXRlZCA9IHt9O1xuXG4gICAgLy/nu5HlrprnmoTmlrnms5VcbiAgICBtZXRob2RzID0ge1xuICAgICAgdG9EZXRhaWxzOihwbGF0ZSwkZXZlbnQpPT57XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhhdC4kbmF2aWdhdGUoJy9wYWdlcy9wZWNjYW5jeV9saXN0P3BsYXRlX251bT0nK3BsYXRlKTtcbiAgICAgIH0sXG4gICAgICBhZGRDYXI6KGUpPT57XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhhdC4kbmF2aWdhdGUoJy9wYWdlcy9pbmRleCcpO1xuICAgICAgfSxcbiAgICAgIGNoYW5nZVVzZXI6KGUpPT57XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+ehruWumuimgeazqOmUgOW9k+WJjeeUqOaIt++8nycsXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgd2VweS5yZW1vdmVTdG9yYWdlU3luYygndG9rZW4nKTtcbiAgICAgICAgICAgICAgdGhhdC4kcmVkaXJlY3QoJy9wYWdlcy9sb2dpbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9LFxuXG4gICAgICBkcmF3U3RhcnQ6KGUpPT57XG4vLyAgICAgICAgY29uc29sZS5sb2coXCLmi5bliqjlvIDlp4tcIik7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdmFyIHRvdWNoID0gZS50b3VjaGVzWzBdO1xuICAgICAgICB0aGF0LmRyYXcuc3RhcnRYID0gdG91Y2guY2xpZW50WDtcbiAgICAgICAgdGhhdC5kcmF3LnN0YXJ0WSA9IHRvdWNoLmNsaWVudFk7XG4gICAgICAgIHRoYXQuZHJhdy5pc0RyYXdpbmcgPSB0cnVlO1xuLy8gICAgICAgIGNvbnNvbGUubG9nKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkKTtcbi8vICAgICAgICByZXR1cm47XG4gICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICB9LFxuICAgICAgZHJhd01vdmU6KGUpPT57XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdmFyIGlkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQ7XG4vLyAgICAgICAgY29uc29sZS5sb2coXCLmi5bliqhcIik7XG5cbiAgICAgICAgaWYodGhhdC5kcmF3LmlzRHJhd2luZykge1xuICAgICAgICAgIHZhciB0b3VjaCA9IGUudG91Y2hlc1swXTtcbiAgICAgICAgICB0aGF0LmRyYXcuZW5kWCA9IHRvdWNoLmNsaWVudFg7XG4gICAgICAgICAgdGhhdC5kcmF3LmVuZFkgPSB0b3VjaC5jbGllbnRZO1xuXG4gICAgICAgICAgLy/lnoLnm7Tmu5Hliqggb3Ig5LiN5ruR5YqoXG4gICAgICAgICAgaWYodGhhdC5kcmF3LmVuZFggLSB0aGF0LmRyYXcuc3RhcnRYID09IDApe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy/ku47lj7PlvoDlt6ZcbiAgICAgICAgICBpZigodGhhdC5kcmF3LmVuZFggLSB0aGF0LmRyYXcuc3RhcnRYKSA8IC01MCl7XG4gICAgICAgICAgICAvL+aJgOacieaLluaLvei3neemu+i/mOWOn+S4ujBcbiAgICAgICAgICAgIGZvcih2YXIgaT0wO2k8dGhhdC5qc29uX2RhdGEubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgIHRoYXQuanNvbl9kYXRhW2ldLmRyYXdfZGlzdGFuY2UgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC5qc29uX2RhdGFbaWRdLmRyYXdfZGlzdGFuY2UgPSB0aGF0LmRyYXcubWF4RGlzdGFuY2U7XG4gICAgICAgICAgfWVsc2UgaWYoKHRoYXQuZHJhdy5lbmRYIC0gdGhhdC5kcmF3LnN0YXJ0WCkgPiA1MCl7Ly/ku47lt6blvoDlj7NcbiAgICAgICAgICAgIHRoYXQuanNvbl9kYXRhW2lkXS5kcmF3X2Rpc3RhbmNlID0gMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgIH0sXG4gICAgICBkcmF3RW5kOihlKT0+e1xuLy8gICAgICAgIGNvbnNvbGUubG9nKFwi5ouW5Yqo57uT5p2fXCIpO1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHRoYXQuZHJhdy5kcmF3ID0gZmFsc2U7XG4gICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlOihlKT0+e1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHZhciBwbGF0ZW51bSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnBsYXRlbnVtO1xuICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn56Gu5a6a56e76Zmk44CQJytwbGF0ZW51bSsn44CR77yfJyxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuenu+mZpFwiLHBsYXRlbnVtKTtcbiAgICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgICAgICAgIHRpdGxlOifnp7vpmaTkuK0nLFxuICAgICAgICAgICAgICAgIG1hc2s6dHJ1ZSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9wZWNjYW5jeScrdXRpbHMuZ2V0UHJlZml4KCkrJy5ldGNjaGViYW8uY29tL3YxL3F1ZXJ5L3JlbW92ZUNhcicsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgdG9rZW46d2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSxcbiAgICAgICAgICAgICAgICAgIGNoYW5uZWxJZCA6IHV0aWxzLmdldENoYW5uZWxJZCgpLFxuICAgICAgICAgICAgICAgICAgcGxhdGVfbnVtIDogcGxhdGVudW0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTooKT0+e1xuICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXEpID0+IHtcbiAgICAgICAgICAgICAgICAgIGxldCBqc29uID0gcmVxLmRhdGE7XG5cbi8vICAgICAgICAgICAgICAgIGpzb24gPSB7XG4vLyAgICAgICAgICAgICAgICAgICAgY29kZTowLFxuLy8gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+enu+mZpOi9pui+hicsanNvbik7XG4gICAgICAgICAgICAgICAgICBpZihqc29uLmNvZGU9PTApe1xuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DphpInLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfnp7vpmaTmiJDlip8nLFxuICAgICAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6ZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuanNvbl9kYXRhPVtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmluaXREYXRhKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6J+mUmeivrycsXG4gICAgICAgICAgICAgICAgICAgICAgY29udGVudDoganNvbi5tc2csXG4gICAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDpmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDooKT0+e1xuICAgICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTon6ZSZ6K+vJyxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDon572R57uc6ZSZ6K+v77yM6K+36YeN6K+VJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDpmYWxzZVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcy5jYW5jZWwpe1xuICAgICAgICAgICAgICBmb3IodmFyIGk9MDtpPHRoYXQuanNvbl9kYXRhLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIHRoYXQuanNvbl9kYXRhW2ldLmRyYXdfZGlzdGFuY2UgPSAwO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvL+S6i+S7tuWkhOeQhlxuICAgIGV2ZW50cyA9IHtcblxuICAgIH07XG5cbiAgICBvbkxvYWQob3B0aW9ucykge1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgdXRpbHMgPSBuZXcgVXRpbHModGhpcyk7XG4gICAgICB1dGlscy5pbml0KCk7XG4gICAgfVxuICAgIG9uU2hvdygpe1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5pbml0RGF0YSgpO1xuICAgIH1cblxuICAgIG9uUHVsbERvd25SZWZyZXNoKCl7XG4gICAgICBjb25zb2xlLmxvZyhcIuS4i+aLiVwiKTtcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuaW5pdERhdGEoKTtcbiAgICB9XG5cbiAgICBmaWx0ZXJEYXRhID0gKGFycik9PntcbiAgICAgIGlmKCFhcnIpe1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICAgIGZvcih2YXIgaT0wO2k8YXJyLmxlbmd0aDtpKyspe1xuICAgICAgICBhcnJbaV0uZHJhd19kaXN0YW5jZSA9IDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH1cblxuICAgIGluaXREYXRhID0gKCkgPT4ge1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICB0aXRsZTon5Yqg6L295LitJyxcbiAgICAgICAgbWFzazp0cnVlLFxuICAgICAgfSk7XG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9wZWNjYW5jeVwiICsgdXRpbHMuZ2V0UHJlZml4KCkgKyBcIi5ldGNjaGViYW8uY29tL3YxL3F1ZXJ5L2dldENhckxpc3RcIixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHRva2VuOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpLFxuICAgICAgICAgIGNoYW5uZWxJZDogdXRpbHMuZ2V0Q2hhbm5lbElkKCksXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlOigpPT57XG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3M6IChyZXEpID0+IHtcbiAgICAgICAgICBsZXQganNvbiA9IHJlcS5kYXRhO1xuICAgICAgICAgIC8vICAgICAgICAgICAganNvbiA9IHtcbiAgICAgICAgICAvLyAgICAgICAgICAgICAgICBjb2RlOjAsXG4gICAgICAgICAgLy8gICAgICAgICAgICB9XG4gICAgICAgICAgY29uc29sZS5sb2coJ+WIneWni+WMluaVsOaNricsanNvbik7XG4gICAgICAgICAgaWYgKGpzb24uY29kZSA9PSAwKSB7XG4gICAgICAgICAgICB0aGF0Lmpzb25fZGF0YSA9IHRoYXQuZmlsdGVyRGF0YShqc29uLmRhdGEpO1xuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgICAgICB9IGVsc2UgaWYoanNvbi5jb2RlID09IC0xMDAwMSkge1xuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfplJnor68nLFxuICAgICAgICAgICAgICBjb250ZW50OiBqc29uLm1zZyxcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICB3ZXB5LnJlbW92ZVN0b3JhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICAgIGtleTondG9rZW4nXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIHRoYXQuJHJlZGlyZWN0KCcvcGFnZXMvbG9naW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+mUmeivrycsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IGpzb24ubXNnLFxuICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn6ZSZ6K+vJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfnvZHnu5zplJnor6/vvIzor7fph43or5UnLFxuICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG4iXX0=