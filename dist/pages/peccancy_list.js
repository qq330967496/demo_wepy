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

var utils;

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
      plate_num: '',
      plate_l: '',
      plate_r: '',
      json_data: ''
    }, _this.computed = {}, _this.methods = {
      toDetails: function toDetails(id) {
        console.log(id);
      }
    }, _this.events = {}, _this.dataFilter = function (json) {
      //      let statusArr = ["不可办理","需补充驾照后办理","可办理","已办理","办理中"];
      var statusArr = ["不可办理", "可办理", "可办理", "已办理", "办理中"];
      for (var i = 0; i < json.peccancyinfo.length; i++) {
        json.peccancyinfo[i].payable_cn = statusArr[json.peccancyinfo[i].payable];
      }
      return json;
    }, _this.initData = function () {
      var that = _this;
      that.json_data = {};
      wx.showLoading({
        title: '加载中',
        mask: true
      });
      _wepy2.default.request({
        url: "https://peccancy" + utils.getPrefix() + ".etcchebao.com/v1/query/getPeccancyList",
        data: {
          token: _wepy2.default.getStorageSync('token'),
          channelId: utils.getChannelId(),
          plate_num: that.plate_num
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
          console.log(json);
          if (json.code == 0) {
            that.json_data = that.dataFilter(json.data);
            that.$apply();
          } else if (json.code == -10001) {
            _wepy2.default.showModal({
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
      //TODO 模拟数据
      //      options.plate_num = '粤QHE086';
      that.plate_num = options.plate_num;
      that.plate_l = that.plate_num.substr(0, 2);
      that.plate_r = that.plate_num.substr(2, that.plate_num.length);
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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Vehicle_list , 'pages/peccancy_list'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBlY2NhbmN5X2xpc3QuanMiXSwibmFtZXMiOlsidXRpbHMiLCJWZWhpY2xlX2xpc3QiLCJjb25maWciLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJjb21wb25lbnRzIiwiZGF0YSIsInBsYXRlX251bSIsInBsYXRlX2wiLCJwbGF0ZV9yIiwianNvbl9kYXRhIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwidG9EZXRhaWxzIiwiaWQiLCJjb25zb2xlIiwibG9nIiwiZXZlbnRzIiwiZGF0YUZpbHRlciIsImpzb24iLCJzdGF0dXNBcnIiLCJpIiwicGVjY2FuY3lpbmZvIiwibGVuZ3RoIiwicGF5YWJsZV9jbiIsInBheWFibGUiLCJpbml0RGF0YSIsInRoYXQiLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwicmVxdWVzdCIsInVybCIsImdldFByZWZpeCIsInRva2VuIiwiZ2V0U3RvcmFnZVN5bmMiLCJjaGFubmVsSWQiLCJnZXRDaGFubmVsSWQiLCJjb21wbGV0ZSIsImhpZGVMb2FkaW5nIiwic3RvcFB1bGxEb3duUmVmcmVzaCIsInN1Y2Nlc3MiLCJyZXEiLCJjb2RlIiwiJGFwcGx5Iiwic2hvd01vZGFsIiwiY29udGVudCIsIm1zZyIsInJlcyIsImNvbmZpcm0iLCJyZW1vdmVTdG9yYWdlIiwia2V5IiwiJHJlZGlyZWN0Iiwic2hvd0NhbmNlbCIsImZhaWwiLCJvcHRpb25zIiwiaW5pdCIsInN1YnN0ciIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUNBLElBQUlBLEtBQUo7O0lBR3FCQyxZOzs7Ozs7Ozs7Ozs7OztrTUFFbkJDLE0sR0FBUztBQUNQQyw2QkFBc0I7QUFEZixLLFFBR1RDLFUsR0FBYSxFLFFBRWJDLEksR0FBTztBQUNMQyxpQkFBVyxFQUROO0FBRUxDLGVBQVEsRUFGSDtBQUdMQyxlQUFRLEVBSEg7QUFJTEMsaUJBQVc7QUFKTixLLFFBT1BDLFEsR0FBVyxFLFFBR1hDLE8s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QUtwQixTQUFMLENBQWVtRCxNQUFmLENBQXNCLENBQXRCLEVBQXdCL0IsS0FBS3BCLFNBQUwsQ0FBZWdCLE1BQXZDLENBQWY7QUFDRDs7OzZCQUVPO0FBQ04sVUFBSUksT0FBTyxJQUFYO0FBQ0FBLFdBQUtELFFBQUw7QUFDRDs7O3dDQUVrQjtBQUNqQlgsY0FBUUMsR0FBUixDQUFZLElBQVo7QUFDQSxVQUFJVyxPQUFPLElBQVg7QUFDQUEsV0FBS0QsUUFBTDtBQUNEOzs7O0VBOUN1QyxlQUFLaUMsSTs7a0JBQTFCekQsWSIsImZpbGUiOiJwZWNjYW5jeV9saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBVdGlscyBmcm9tICcuLi9saWIvdXRpbHMuanMnXG4gIHZhciB1dGlscztcblxuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlaGljbGVfbGlzdCBleHRlbmRzIHdlcHkucGFnZSB7XG5cbiAgICBjb25maWcgPSB7XG4gICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6dHJ1ZSxcbiAgICB9XG4gICAgY29tcG9uZW50cyA9IHt9XG5cbiAgICBkYXRhID0ge1xuICAgICAgcGxhdGVfbnVtOiAnJyxcbiAgICAgIHBsYXRlX2w6JycsXG4gICAgICBwbGF0ZV9yOicnLFxuICAgICAganNvbl9kYXRhOiAnJyxcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHt9XG5cbiAgICAvL+e7keWumueahOaWueazlVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB0b0RldGFpbHM6IChpZCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhpZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy/kuovku7blpITnkIZcbiAgICBldmVudHMgPSB7fTtcblxuICAgIG9uTG9hZChvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB1dGlscyA9IG5ldyBVdGlscyh0aGlzKTtcbiAgICAgIHV0aWxzLmluaXQoKTtcbiAgICAgIC8vVE9ETyDmqKHmi5/mlbDmja5cbi8vICAgICAgb3B0aW9ucy5wbGF0ZV9udW0gPSAn57KkUUhFMDg2JztcbiAgICAgIHRoYXQucGxhdGVfbnVtID0gb3B0aW9ucy5wbGF0ZV9udW07XG4gICAgICB0aGF0LnBsYXRlX2wgPSB0aGF0LnBsYXRlX251bS5zdWJzdHIoMCwyKTtcbiAgICAgIHRoYXQucGxhdGVfciA9IHRoYXQucGxhdGVfbnVtLnN1YnN0cigyLHRoYXQucGxhdGVfbnVtLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgb25TaG93KCl7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LmluaXREYXRhKCk7XG4gICAgfVxuXG4gICAgb25QdWxsRG93blJlZnJlc2goKXtcbiAgICAgIGNvbnNvbGUubG9nKFwi5LiL5ouJXCIpO1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5pbml0RGF0YSgpO1xuICAgIH1cblxuICAgIGRhdGFGaWx0ZXIgPSAoanNvbik9Pntcbi8vICAgICAgbGV0IHN0YXR1c0FyciA9IFtcIuS4jeWPr+WKnueQhlwiLFwi6ZyA6KGl5YWF6am+54Wn5ZCO5Yqe55CGXCIsXCLlj6/lip7nkIZcIixcIuW3suWKnueQhlwiLFwi5Yqe55CG5LitXCJdO1xuICAgICAgbGV0IHN0YXR1c0FyciA9IFtcIuS4jeWPr+WKnueQhlwiLFwi5Y+v5Yqe55CGXCIsXCLlj6/lip7nkIZcIixcIuW3suWKnueQhlwiLFwi5Yqe55CG5LitXCJdO1xuICAgICAgZm9yKHZhciBpID0gMDsgaTxqc29uLnBlY2NhbmN5aW5mby5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGpzb24ucGVjY2FuY3lpbmZvW2ldLnBheWFibGVfY24gPSBzdGF0dXNBcnJbanNvbi5wZWNjYW5jeWluZm9baV0ucGF5YWJsZV07XG4gICAgICB9XG4gICAgICByZXR1cm4ganNvbjtcbiAgICB9XG5cbiAgICBpbml0RGF0YSA9ICgpID0+IHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuanNvbl9kYXRhID0ge307XG4gICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgIHRpdGxlOifliqDovb3kuK0nLFxuICAgICAgICBtYXNrOnRydWUsXG4gICAgICB9KTtcbiAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgIHVybDogXCJodHRwczovL3BlY2NhbmN5XCIgKyB1dGlscy5nZXRQcmVmaXgoKSArIFwiLmV0Y2NoZWJhby5jb20vdjEvcXVlcnkvZ2V0UGVjY2FuY3lMaXN0XCIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB0b2tlbjogd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSxcbiAgICAgICAgICBjaGFubmVsSWQ6IHV0aWxzLmdldENoYW5uZWxJZCgpLFxuICAgICAgICAgIHBsYXRlX251bTp0aGF0LnBsYXRlX251bSxcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGU6KCk9PntcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzczogKHJlcSkgPT4ge1xuICAgICAgICAgIGxldCBqc29uID0gcmVxLmRhdGE7XG4gICAgICAgICAgLy8gICAgICAgICAgICBqc29uID0ge1xuICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGNvZGU6MCxcbiAgICAgICAgICAvLyAgICAgICAgICAgIH1cbiAgICAgICAgICBjb25zb2xlLmxvZyhqc29uKTtcbiAgICAgICAgICBpZiAoanNvbi5jb2RlID09IDApIHtcbiAgICAgICAgICAgIHRoYXQuanNvbl9kYXRhID0gdGhhdC5kYXRhRmlsdGVyKGpzb24uZGF0YSk7XG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoanNvbi5jb2RlID09IC0xMDAwMSkge1xuICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+mUmeivrycsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IGpzb24ubXNnLFxuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICB3ZXB5LnJlbW92ZVN0b3JhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6ICd0b2tlbidcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgdGhhdC4kcmVkaXJlY3QoJy9wYWdlcy9sb2dpbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfplJnor68nLFxuICAgICAgICAgICAgICBjb250ZW50OiBqc29uLm1zZyxcbiAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn6ZSZ6K+vJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfnvZHnu5zplJnor6/vvIzor7fph43or5UnLFxuICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG4iXX0=