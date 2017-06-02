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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Vehicle_list.__proto__ || Object.getPrototypeOf(Vehicle_list)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.components = {}, _this.data = {
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
  }]);

  return Vehicle_list;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Vehicle_list , 'pages/peccancy_list'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBlY2NhbmN5X2xpc3QuanMiXSwibmFtZXMiOlsidXRpbHMiLCJWZWhpY2xlX2xpc3QiLCJjb25maWciLCJjb21wb25lbnRzIiwiZGF0YSIsInBsYXRlX251bSIsInBsYXRlX2wiLCJwbGF0ZV9yIiwianNvbl9kYXRhIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwidG9EZXRhaWxzIiwiaWQiLCJjb25zb2xlIiwibG9nIiwiZXZlbnRzIiwiZGF0YUZpbHRlciIsImpzb24iLCJzdGF0dXNBcnIiLCJpIiwicGVjY2FuY3lpbmZvIiwibGVuZ3RoIiwicGF5YWJsZV9jbiIsInBheWFibGUiLCJpbml0RGF0YSIsInRoYXQiLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwicmVxdWVzdCIsInVybCIsImdldFByZWZpeCIsInRva2VuIiwiZ2V0U3RvcmFnZVN5bmMiLCJjaGFubmVsSWQiLCJnZXRDaGFubmVsSWQiLCJjb21wbGV0ZSIsImhpZGVMb2FkaW5nIiwic3VjY2VzcyIsInJlcSIsImNvZGUiLCIkYXBwbHkiLCJzaG93TW9kYWwiLCJjb250ZW50IiwibXNnIiwicmVzIiwiY29uZmlybSIsInJlbW92ZVN0b3JhZ2UiLCJrZXkiLCIkcmVkaXJlY3QiLCJzaG93Q2FuY2VsIiwiZmFpbCIsIm9wdGlvbnMiLCJpbml0Iiwic3Vic3RyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSUEsS0FBSjs7SUFHcUJDLFk7Ozs7Ozs7Ozs7Ozs7O2tNQUVuQkMsTSxHQUFTLEUsUUFDVEMsVSxHQUFhLEUsUUFFYkMsSSxHQUFPO0FBQ0xDLGlCQUFXLEVBRE47QUFFTEMsZUFBUSxFQUZIO0FBR0xDLGVBQVEsRUFISDtBQUlMQyxpQkFBVztBQUpOLEssUUFPUEMsUSxHQUFXLEUsUUFHWEMsTyxHQUFVO0FBQ1JDLGlCQUFXLG1CQUFDQyxFQUFELEVBQVE7QUFDakJDLGdCQUFRQyxHQUFSLENBQVlGLEVBQVo7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QUFDTixVQUFJSSxPQUFPLElBQVg7QUFDQUEsV0FBS0QsUUFBTDtBQUNEOzs7O0VBdEN1QyxlQUFLZ0MsSTs7a0JBQTFCdkQsWSIsImZpbGUiOiJwZWNjYW5jeV9saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBVdGlscyBmcm9tICcuLi9saWIvdXRpbHMuanMnXG4gIHZhciB1dGlscztcblxuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlaGljbGVfbGlzdCBleHRlbmRzIHdlcHkucGFnZSB7XG5cbiAgICBjb25maWcgPSB7fVxuICAgIGNvbXBvbmVudHMgPSB7fVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIHBsYXRlX251bTogJycsXG4gICAgICBwbGF0ZV9sOicnLFxuICAgICAgcGxhdGVfcjonJyxcbiAgICAgIGpzb25fZGF0YTogJycsXG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7fVxuXG4gICAgLy/nu5HlrprnmoTmlrnms5VcbiAgICBtZXRob2RzID0ge1xuICAgICAgdG9EZXRhaWxzOiAoaWQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coaWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8v5LqL5Lu25aSE55CGXG4gICAgZXZlbnRzID0ge307XG5cbiAgICBvbkxvYWQob3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdXRpbHMgPSBuZXcgVXRpbHModGhpcyk7XG4gICAgICB1dGlscy5pbml0KCk7XG4gICAgICAvL1RPRE8g5qih5ouf5pWw5o2uXG4vLyAgICAgIG9wdGlvbnMucGxhdGVfbnVtID0gJ+eypFFIRTA4Nic7XG4gICAgICB0aGF0LnBsYXRlX251bSA9IG9wdGlvbnMucGxhdGVfbnVtO1xuICAgICAgdGhhdC5wbGF0ZV9sID0gdGhhdC5wbGF0ZV9udW0uc3Vic3RyKDAsMik7XG4gICAgICB0aGF0LnBsYXRlX3IgPSB0aGF0LnBsYXRlX251bS5zdWJzdHIoMix0aGF0LnBsYXRlX251bS5sZW5ndGgpO1xuICAgIH1cblxuICAgIG9uU2hvdygpe1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5pbml0RGF0YSgpO1xuICAgIH1cblxuICAgIGRhdGFGaWx0ZXIgPSAoanNvbik9Pntcbi8vICAgICAgbGV0IHN0YXR1c0FyciA9IFtcIuS4jeWPr+WKnueQhlwiLFwi6ZyA6KGl5YWF6am+54Wn5ZCO5Yqe55CGXCIsXCLlj6/lip7nkIZcIixcIuW3suWKnueQhlwiLFwi5Yqe55CG5LitXCJdO1xuICAgICAgbGV0IHN0YXR1c0FyciA9IFtcIuS4jeWPr+WKnueQhlwiLFwi5Y+v5Yqe55CGXCIsXCLlj6/lip7nkIZcIixcIuW3suWKnueQhlwiLFwi5Yqe55CG5LitXCJdO1xuICAgICAgZm9yKHZhciBpID0gMDsgaTxqc29uLnBlY2NhbmN5aW5mby5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGpzb24ucGVjY2FuY3lpbmZvW2ldLnBheWFibGVfY24gPSBzdGF0dXNBcnJbanNvbi5wZWNjYW5jeWluZm9baV0ucGF5YWJsZV07XG4gICAgICB9XG4gICAgICByZXR1cm4ganNvbjtcbiAgICB9XG5cbiAgICBpbml0RGF0YSA9ICgpID0+IHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuanNvbl9kYXRhID0ge307XG4gICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgIHRpdGxlOifliqDovb3kuK0nLFxuICAgICAgICBtYXNrOnRydWUsXG4gICAgICB9KTtcbiAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgIHVybDogXCJodHRwczovL3BlY2NhbmN5XCIgKyB1dGlscy5nZXRQcmVmaXgoKSArIFwiLmV0Y2NoZWJhby5jb20vdjEvcXVlcnkvZ2V0UGVjY2FuY3lMaXN0XCIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB0b2tlbjogd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSxcbiAgICAgICAgICBjaGFubmVsSWQ6IHV0aWxzLmdldENoYW5uZWxJZCgpLFxuICAgICAgICAgIHBsYXRlX251bTp0aGF0LnBsYXRlX251bSxcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGU6KCk9PntcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzOiAocmVxKSA9PiB7XG4gICAgICAgICAgbGV0IGpzb24gPSByZXEuZGF0YTtcbiAgICAgICAgICAvLyAgICAgICAgICAgIGpzb24gPSB7XG4gICAgICAgICAgLy8gICAgICAgICAgICAgICAgY29kZTowLFxuICAgICAgICAgIC8vICAgICAgICAgICAgfVxuICAgICAgICAgIGNvbnNvbGUubG9nKGpzb24pO1xuICAgICAgICAgIGlmIChqc29uLmNvZGUgPT0gMCkge1xuICAgICAgICAgICAgdGhhdC5qc29uX2RhdGEgPSB0aGF0LmRhdGFGaWx0ZXIoanNvbi5kYXRhKTtcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChqc29uLmNvZGUgPT0gLTEwMDAxKSB7XG4gICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn6ZSZ6K+vJyxcbiAgICAgICAgICAgICAgY29udGVudDoganNvbi5tc2csXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgIHdlcHkucmVtb3ZlU3RvcmFnZSh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogJ3Rva2VuJ1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB0aGF0LiRyZWRpcmVjdCgnL3BhZ2VzL2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+mUmeivrycsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IGpzb24ubXNnLFxuICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfplJnor68nLFxuICAgICAgICAgICAgY29udGVudDogJ+e9kee7nOmUmeivr++8jOivt+mHjeivlScsXG4gICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiJdfQ==