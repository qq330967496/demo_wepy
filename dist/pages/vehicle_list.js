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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Vehicle_list.__proto__ || Object.getPrototypeOf(Vehicle_list)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.components = {}, _this.data = {
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
          content: '确定车牌为【' + platenum + '】的车吗？',
          success: function success(res) {
            if (res.confirm) {
              console.log("移除", platenum);
              _wepy2.default.request({
                url: 'https://peccancy' + utils.getPrefix() + '.etcchebao.com/v1/query/removeCar',
                data: {
                  token: _wepy2.default.getStorageSync('token'),
                  channelId: utils.getChannelId(),
                  plate_num: platenum
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
      _wepy2.default.request({
        url: "https://peccancy" + utils.getPrefix() + ".etcchebao.com/v1/query/getCarList",
        data: {
          token: _wepy2.default.getStorageSync('token'),
          channelId: utils.getChannelId()
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
  }]);

  return Vehicle_list;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Vehicle_list , 'pages/vehicle_list'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlaGljbGVfbGlzdC5qcyJdLCJuYW1lcyI6WyJ1dGlscyIsIlZlaGljbGVfbGlzdCIsImNvbmZpZyIsImNvbXBvbmVudHMiLCJkYXRhIiwianNvbl9kYXRhIiwiZHJhdyIsInN0YXJ0WCIsInN0YXJ0WSIsImlzRHJhd2luZyIsImVuZFgiLCJlbmRZIiwibWF4RGlzdGFuY2UiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJ0b0RldGFpbHMiLCJwbGF0ZSIsIiRldmVudCIsInRoYXQiLCIkbmF2aWdhdGUiLCJhZGRDYXIiLCJlIiwiY2hhbmdlVXNlciIsInd4Iiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJyZW1vdmVTdG9yYWdlU3luYyIsIiRyZWRpcmVjdCIsImRyYXdTdGFydCIsInRvdWNoIiwidG91Y2hlcyIsImNsaWVudFgiLCJjbGllbnRZIiwiJGFwcGx5IiwiZHJhd01vdmUiLCJpZCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaSIsImxlbmd0aCIsImRyYXdfZGlzdGFuY2UiLCJkcmF3RW5kIiwicmVtb3ZlIiwicGxhdGVudW0iLCJjb25zb2xlIiwibG9nIiwicmVxdWVzdCIsInVybCIsImdldFByZWZpeCIsInRva2VuIiwiZ2V0U3RvcmFnZVN5bmMiLCJjaGFubmVsSWQiLCJnZXRDaGFubmVsSWQiLCJwbGF0ZV9udW0iLCJyZXEiLCJqc29uIiwiY29kZSIsInNob3dDYW5jZWwiLCJpbml0RGF0YSIsIm1zZyIsImZhaWwiLCJjYW5jZWwiLCJldmVudHMiLCJmaWx0ZXJEYXRhIiwiYXJyIiwicmVtb3ZlU3RvcmFnZSIsImtleSIsIm9wdGlvbnMiLCJpbml0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSUEsY0FBSjs7SUFFcUJDLFk7Ozs7Ozs7Ozs7Ozs7O2tNQUVuQkMsTSxHQUFTLEUsUUFDVEMsVSxHQUFhLEUsUUFFYkMs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QUNEOzs7O0VBckt1QyxlQUFLVyxJOztrQkFBMUJ4RSxZIiwiZmlsZSI6InZlaGljbGVfbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgVXRpbHMgZnJvbSAnLi4vbGliL3V0aWxzLmpzJ1xuICBsZXQgdXRpbHM7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVoaWNsZV9saXN0IGV4dGVuZHMgd2VweS5wYWdlIHtcblxuICAgIGNvbmZpZyA9IHt9O1xuICAgIGNvbXBvbmVudHMgPSB7fTtcblxuICAgIGRhdGEgPSB7XG4gICAgICBqc29uX2RhdGE6ICcnLFxuICAgICAgZHJhdzp7XG4gICAgICAgIHN0YXJ0WDowLFxuICAgICAgICBzdGFydFk6MCxcbiAgICAgICAgaXNEcmF3aW5nOmZhbHNlLFxuICAgICAgICBlbmRYOjAsXG4gICAgICAgIGVuZFk6MCxcbiAgICAgICAgbWF4RGlzdGFuY2U6MTAwLy/mi5bmi73mnIDlpKfot53nprvvvIzljZXkvY3mmK9ycHhcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGNvbXB1dGVkID0ge307XG5cbiAgICAvL+e7keWumueahOaWueazlVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB0b0RldGFpbHM6KHBsYXRlLCRldmVudCk9PntcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGF0LiRuYXZpZ2F0ZSgnL3BhZ2VzL3BlY2NhbmN5X2xpc3Q/cGxhdGVfbnVtPScrcGxhdGUpO1xuICAgICAgfSxcbiAgICAgIGFkZENhcjooZSk9PntcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGF0LiRuYXZpZ2F0ZSgnL3BhZ2VzL2luZGV4Jyk7XG4gICAgICB9LFxuICAgICAgY2hhbmdlVXNlcjooZSk9PntcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn56Gu5a6a6KaB5rOo6ZSA5b2T5YmN55So5oi377yfJyxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICB3ZXB5LnJlbW92ZVN0b3JhZ2VTeW5jKCd0b2tlbicpO1xuICAgICAgICAgICAgICB0aGF0LiRyZWRpcmVjdCgnL3BhZ2VzL2xvZ2luJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG5cbiAgICAgIGRyYXdTdGFydDooZSk9Pntcbi8vICAgICAgICBjb25zb2xlLmxvZyhcIuaLluWKqOW8gOWni1wiKTtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICB2YXIgdG91Y2ggPSBlLnRvdWNoZXNbMF07XG4gICAgICAgIHRoYXQuZHJhdy5zdGFydFggPSB0b3VjaC5jbGllbnRYO1xuICAgICAgICB0aGF0LmRyYXcuc3RhcnRZID0gdG91Y2guY2xpZW50WTtcbiAgICAgICAgdGhhdC5kcmF3LmlzRHJhd2luZyA9IHRydWU7XG4vLyAgICAgICAgY29uc29sZS5sb2coZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQpO1xuLy8gICAgICAgIHJldHVybjtcbiAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgIH0sXG4gICAgICBkcmF3TW92ZTooZSk9PntcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICB2YXIgaWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZDtcbi8vICAgICAgICBjb25zb2xlLmxvZyhcIuaLluWKqFwiKTtcblxuICAgICAgICBpZih0aGF0LmRyYXcuaXNEcmF3aW5nKSB7XG4gICAgICAgICAgdmFyIHRvdWNoID0gZS50b3VjaGVzWzBdO1xuICAgICAgICAgIHRoYXQuZHJhdy5lbmRYID0gdG91Y2guY2xpZW50WDtcbiAgICAgICAgICB0aGF0LmRyYXcuZW5kWSA9IHRvdWNoLmNsaWVudFk7XG5cbiAgICAgICAgICAvL+WeguebtOa7keWKqCBvciDkuI3mu5HliqhcbiAgICAgICAgICBpZih0aGF0LmRyYXcuZW5kWCAtIHRoYXQuZHJhdy5zdGFydFggPT0gMCl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvL+S7juWPs+W+gOW3plxuICAgICAgICAgIGlmKCh0aGF0LmRyYXcuZW5kWCAtIHRoYXQuZHJhdy5zdGFydFgpIDwgMCl7XG4gICAgICAgICAgICAvL+aJgOacieaLluaLvei3neemu+i/mOWOn+S4ujBcbiAgICAgICAgICAgIGZvcih2YXIgaT0wO2k8dGhhdC5qc29uX2RhdGEubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgIHRoYXQuanNvbl9kYXRhW2ldLmRyYXdfZGlzdGFuY2UgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC5qc29uX2RhdGFbaWRdLmRyYXdfZGlzdGFuY2UgPSB0aGF0LmRyYXcubWF4RGlzdGFuY2U7XG4gICAgICAgICAgfWVsc2V7Ly/ku47lt6blvoDlj7NcbiAgICAgICAgICAgIHRoYXQuanNvbl9kYXRhW2lkXS5kcmF3X2Rpc3RhbmNlID0gMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgIH0sXG4gICAgICBkcmF3RW5kOihlKT0+e1xuLy8gICAgICAgIGNvbnNvbGUubG9nKFwi5ouW5Yqo57uT5p2fXCIpO1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHRoYXQuZHJhdy5kcmF3ID0gZmFsc2U7XG4gICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlOihlKT0+e1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHZhciBwbGF0ZW51bSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnBsYXRlbnVtO1xuICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn56Gu5a6a6L2m54mM5Li644CQJytwbGF0ZW51bSsn44CR55qE6L2m5ZCX77yfJyxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuenu+mZpFwiLHBsYXRlbnVtKTtcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICB1cmw6ICdodHRwczovL3BlY2NhbmN5Jyt1dGlscy5nZXRQcmVmaXgoKSsnLmV0Y2NoZWJhby5jb20vdjEvcXVlcnkvcmVtb3ZlQ2FyJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICB0b2tlbjp3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpLFxuICAgICAgICAgICAgICAgICAgY2hhbm5lbElkIDogdXRpbHMuZ2V0Q2hhbm5lbElkKCksXG4gICAgICAgICAgICAgICAgICBwbGF0ZV9udW0gOiBwbGF0ZW51bSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXEpID0+IHtcbiAgICAgICAgICAgICAgICAgIGxldCBqc29uID0gcmVxLmRhdGE7XG5cbi8vICAgICAgICAgICAgICAgIGpzb24gPSB7XG4vLyAgICAgICAgICAgICAgICAgICAgY29kZTowLFxuLy8gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+enu+mZpOi9pui+hicsanNvbik7XG4gICAgICAgICAgICAgICAgICBpZihqc29uLmNvZGU9PTApe1xuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DphpInLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfnp7vpmaTmiJDlip8nLFxuICAgICAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6ZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuanNvbl9kYXRhPVtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmluaXREYXRhKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6J+mUmeivrycsXG4gICAgICAgICAgICAgICAgICAgICAgY29udGVudDoganNvbi5tc2csXG4gICAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDpmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDooKT0+e1xuICAgICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTon6ZSZ6K+vJyxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDon572R57uc6ZSZ6K+v77yM6K+36YeN6K+VJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDpmYWxzZVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcy5jYW5jZWwpe1xuICAgICAgICAgICAgICBmb3IodmFyIGk9MDtpPHRoYXQuanNvbl9kYXRhLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIHRoYXQuanNvbl9kYXRhW2ldLmRyYXdfZGlzdGFuY2UgPSAwO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvL+S6i+S7tuWkhOeQhlxuICAgIGV2ZW50cyA9IHtcblxuICAgIH07XG5cbiAgICBvbkxvYWQob3B0aW9ucykge1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgdXRpbHMgPSBuZXcgVXRpbHModGhpcyk7XG4gICAgICB1dGlscy5pbml0KCk7XG4gICAgfVxuICAgIG9uU2hvdygpe1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5pbml0RGF0YSgpO1xuICAgIH1cblxuICAgIGZpbHRlckRhdGEgPSAoYXJyKT0+e1xuICAgICAgaWYoIWFycil7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgICAgZm9yKHZhciBpPTA7aTxhcnIubGVuZ3RoO2krKyl7XG4gICAgICAgIGFycltpXS5kcmF3X2Rpc3RhbmNlID0gMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuXG4gICAgaW5pdERhdGEgPSAoKSA9PiB7XG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9wZWNjYW5jeVwiICsgdXRpbHMuZ2V0UHJlZml4KCkgKyBcIi5ldGNjaGViYW8uY29tL3YxL3F1ZXJ5L2dldENhckxpc3RcIixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHRva2VuOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpLFxuICAgICAgICAgIGNoYW5uZWxJZDogdXRpbHMuZ2V0Q2hhbm5lbElkKCksXG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3M6IChyZXEpID0+IHtcbiAgICAgICAgICBsZXQganNvbiA9IHJlcS5kYXRhO1xuICAgICAgICAgIC8vICAgICAgICAgICAganNvbiA9IHtcbiAgICAgICAgICAvLyAgICAgICAgICAgICAgICBjb2RlOjAsXG4gICAgICAgICAgLy8gICAgICAgICAgICB9XG4gICAgICAgICAgY29uc29sZS5sb2coJ+WIneWni+WMluaVsOaNricsanNvbik7XG4gICAgICAgICAgaWYgKGpzb24uY29kZSA9PSAwKSB7XG4gICAgICAgICAgICB0aGF0Lmpzb25fZGF0YSA9IHRoYXQuZmlsdGVyRGF0YShqc29uLmRhdGEpO1xuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgICAgICB9IGVsc2UgaWYoanNvbi5jb2RlID09IC0xMDAwMSkge1xuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfplJnor68nLFxuICAgICAgICAgICAgICBjb250ZW50OiBqc29uLm1zZyxcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICB3ZXB5LnJlbW92ZVN0b3JhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICAgIGtleTondG9rZW4nXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIHRoYXQuJHJlZGlyZWN0KCcvcGFnZXMvbG9naW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+mUmeivrycsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IGpzb24ubXNnLFxuICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn6ZSZ6K+vJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfnvZHnu5zplJnor6/vvIzor7fph43or5UnLFxuICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG4iXX0=