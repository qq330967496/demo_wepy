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
      _wepy2.default.request({
        url: "https://peccancy" + utils.getPrefix() + ".etcchebao.com/v1/query/getPeccancyList",
        data: {
          token: _wepy2.default.getStorageSync('token'),
          channelId: utils.getChannelId(),
          plate_num: that.plate_num
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
      that.initData();
    }
  }]);

  return Vehicle_list;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Vehicle_list , 'pages/peccancy_list'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBlY2NhbmN5X2xpc3QuanMiXSwibmFtZXMiOlsidXRpbHMiLCJWZWhpY2xlX2xpc3QiLCJjb25maWciLCJjb21wb25lbnRzIiwiZGF0YSIsInBsYXRlX251bSIsInBsYXRlX2wiLCJwbGF0ZV9yIiwianNvbl9kYXRhIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwidG9EZXRhaWxzIiwiaWQiLCJjb25zb2xlIiwibG9nIiwiZXZlbnRzIiwiZGF0YUZpbHRlciIsImpzb24iLCJzdGF0dXNBcnIiLCJpIiwicGVjY2FuY3lpbmZvIiwibGVuZ3RoIiwicGF5YWJsZV9jbiIsInBheWFibGUiLCJpbml0RGF0YSIsInRoYXQiLCJyZXF1ZXN0IiwidXJsIiwiZ2V0UHJlZml4IiwidG9rZW4iLCJnZXRTdG9yYWdlU3luYyIsImNoYW5uZWxJZCIsImdldENoYW5uZWxJZCIsInN1Y2Nlc3MiLCJyZXEiLCJjb2RlIiwiJGFwcGx5Iiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwibXNnIiwicmVzIiwiY29uZmlybSIsInJlbW92ZVN0b3JhZ2UiLCJrZXkiLCIkcmVkaXJlY3QiLCJzaG93Q2FuY2VsIiwiZmFpbCIsIm9wdGlvbnMiLCJpbml0Iiwic3Vic3RyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSUEsS0FBSjs7SUFHcUJDLFk7Ozs7Ozs7Ozs7Ozs7O2tNQUVuQkMsTSxHQUFTLEUsUUFDVEMsVSxHQUFhLEUsUUFFYkMsSSxHQUFPO0FBQ0xDLGlCQUFXLEVBRE47QUFFTEMsZUFBUSxFQUZIO0FBR0xDLGVBQVEsRUFISDtBQUlMQyxpQkFBVztBQUpOLEssUUFPUEMsUSxHQUFXLEUsUUFHWEMsTyxHQUFVO0FBQ1JDLGlCQUFXLG1CQUFDQyxFQUFELEVBQVE7QUFDakJDLGdCQUFRQyxHQUFSLENBQVlGLEVBQVo7QUFDRDtBQUhPLEssUUFPVkcsTSxHQUFTLEUsUUFjVEMsVSxHQUFhLFVBQUNDLElBQUQsRUFBUTtBQUN6QjtBQUNNLFVBQUlDLFlBQVksQ0FBQyxNQUFELEVBQVEsS0FBUixFQUFjLEtBQWQsRUFBb0IsS0FBcEIsRUFBMEIsS0FBMUIsQ0FBaEI7QUFDQSxXQUFJLElBQUlDLElBQUksQ0FBWixFQUFlQSxJQUFFRixLQUFLRyxZQUFMLENBQWtCQyxNQUFuQyxFQUEyQ0YsR0FBM0MsRUFBK0M7QUFDN0NGLGFBQUtHLFlBQUwsQ0FBa0JELENBQWxCLEVBQXFCRyxVQUFyQixHQUFrQ0osVUFBVUQsS0FBS0csWUFBTCxDQUFrQkQsQ0FBbEIsRUFBcUJJLE9BQS9CLENBQWxDO0FBQ0Q7QUFDRCxhQUFPTixJQUFQO0FBQ0QsSyxRQUVETyxRLEdBQVcsWUFBTTtBQUNmLFVBQUlDLFlBQUo7QUFDQSxxQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLGFBQUsscUJBQXFCM0IsTUFBTTRCLFNBQU4sRUFBckIsR0FBeUMseUNBRG5DO0FBRVh4QixjQUFNO0FBQ0p5QixpQkFBTyxlQUFLQyxjQUFMLENBQW9CLE9BQXBCLENBREg7QUFFSkMscUJBQVcvQixNQUFNZ0MsWUFBTixFQUZQO0FBR0ozQixxQkFBVW9CLEtBQUtwQjtBQUhYLFNBRks7QUFPWDRCLGlCQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIsY0FBSWpCLE9BQU9pQixJQUFJOUIsSUFBZjtBQUNBO0FBQ0E7QUFDQTtBQUNBUyxrQkFBUUMsR0FBUixDQUFZRyxJQUFaO0FBQ0EsY0FBSUEsS0FBS2tCLElBQUwsSUFBYSxDQUFqQixFQUFvQjtBQUNsQlYsaUJBQUtqQixTQUFMLEdBQWlCaUIsS0FBS1QsVUFBTCxDQUFnQkMsS0FBS2IsSUFBckIsQ0FBakI7QUFDQXFCLGlCQUFLVyxNQUFMO0FBQ0QsV0FIRCxNQUdPLElBQUluQixLQUFLa0IsSUFBTCxJQUFhLENBQUMsS0FBbEIsRUFBeUI7QUFDOUIsMkJBQUtFLFNBQUwsQ0FBZTtBQUNiQyxxQkFBTyxJQURNO0FBRWJDLHVCQUFTdEIsS0FBS3VCLEdBRkQ7QUFHYlAsdUJBQVMsaUJBQVVRLEdBQVYsRUFBZTtBQUN0QixvQkFBSUEsSUFBSUMsT0FBUixFQUFpQjtBQUNmLGlDQUFLQyxhQUFMLENBQW1CO0FBQ2pCQyx5QkFBSztBQURZLG1CQUFuQjtBQUdBbkIsdUJBQUtvQixTQUFMLENBQWUsY0FBZjtBQUNEO0FBQ0Y7QUFWWSxhQUFmO0FBWUQsV0FiTSxNQWFBO0FBQ0wsMkJBQUtSLFNBQUwsQ0FBZTtBQUNiQyxxQkFBTyxJQURNO0FBRWJDLHVCQUFTdEIsS0FBS3VCLEdBRkQ7QUFHYk0sMEJBQVk7QUFIQyxhQUFmO0FBS0Q7QUFDRixTQXBDVTtBQXFDWEMsY0FBTSxnQkFBTTtBQUNWLHlCQUFLVixTQUFMLENBQWU7QUFDYkMsbUJBQU8sSUFETTtBQUViQyxxQkFBUyxVQUZJO0FBR2JPLHdCQUFZO0FBSEMsV0FBZjtBQUtEO0FBM0NVLE9BQWI7QUE2Q0QsSzs7O0FBOUVEOzs7QUFPQTs7Ozs7MkJBR09FLE8sRUFBUztBQUNkLFVBQUl2QixPQUFPLElBQVg7QUFDQXpCLGNBQVEsb0JBQVUsSUFBVixDQUFSO0FBQ0FBLFlBQU1pRCxJQUFOO0FBQ0E7QUFDTjtBQUNNeEIsV0FBS3BCLFNBQUwsR0FBaUIyQyxRQUFRM0MsU0FBekI7QUFDQW9CLFdBQUtuQixPQUFMLEdBQWVtQixLQUFLcEIsU0FBTCxDQUFlNkMsTUFBZixDQUFzQixDQUF0QixFQUF3QixDQUF4QixDQUFmO0FBQ0F6QixXQUFLbEIsT0FBTCxHQUFla0IsS0FBS3BCLFNBQUwsQ0FBZTZDLE1BQWYsQ0FBc0IsQ0FBdEIsRUFBd0J6QixLQUFLcEIsU0FBTCxDQUFlZ0IsTUFBdkMsQ0FBZjtBQUNBSSxXQUFLRCxRQUFMO0FBQ0Q7Ozs7RUFsQ3VDLGVBQUsyQixJOztrQkFBMUJsRCxZIiwiZmlsZSI6InBlY2NhbmN5X2xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IFV0aWxzIGZyb20gJy4uL2xpYi91dGlscy5qcydcbiAgdmFyIHV0aWxzO1xuXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVoaWNsZV9saXN0IGV4dGVuZHMgd2VweS5wYWdlIHtcblxuICAgIGNvbmZpZyA9IHt9XG4gICAgY29tcG9uZW50cyA9IHt9XG5cbiAgICBkYXRhID0ge1xuICAgICAgcGxhdGVfbnVtOiAnJyxcbiAgICAgIHBsYXRlX2w6JycsXG4gICAgICBwbGF0ZV9yOicnLFxuICAgICAganNvbl9kYXRhOiAnJyxcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHt9XG5cbiAgICAvL+e7keWumueahOaWueazlVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB0b0RldGFpbHM6IChpZCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhpZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy/kuovku7blpITnkIZcbiAgICBldmVudHMgPSB7fTtcblxuICAgIG9uTG9hZChvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB1dGlscyA9IG5ldyBVdGlscyh0aGlzKTtcbiAgICAgIHV0aWxzLmluaXQoKTtcbiAgICAgIC8vVE9ETyDmqKHmi5/mlbDmja5cbi8vICAgICAgb3B0aW9ucy5wbGF0ZV9udW0gPSAn57KkUUhFMDg2JztcbiAgICAgIHRoYXQucGxhdGVfbnVtID0gb3B0aW9ucy5wbGF0ZV9udW07XG4gICAgICB0aGF0LnBsYXRlX2wgPSB0aGF0LnBsYXRlX251bS5zdWJzdHIoMCwyKTtcbiAgICAgIHRoYXQucGxhdGVfciA9IHRoYXQucGxhdGVfbnVtLnN1YnN0cigyLHRoYXQucGxhdGVfbnVtLmxlbmd0aCk7XG4gICAgICB0aGF0LmluaXREYXRhKCk7XG4gICAgfVxuXG4gICAgZGF0YUZpbHRlciA9IChqc29uKT0+e1xuLy8gICAgICBsZXQgc3RhdHVzQXJyID0gW1wi5LiN5Y+v5Yqe55CGXCIsXCLpnIDooaXlhYXpqb7nhaflkI7lip7nkIZcIixcIuWPr+WKnueQhlwiLFwi5bey5Yqe55CGXCIsXCLlip7nkIbkuK1cIl07XG4gICAgICBsZXQgc3RhdHVzQXJyID0gW1wi5LiN5Y+v5Yqe55CGXCIsXCLlj6/lip7nkIZcIixcIuWPr+WKnueQhlwiLFwi5bey5Yqe55CGXCIsXCLlip7nkIbkuK1cIl07XG4gICAgICBmb3IodmFyIGkgPSAwOyBpPGpzb24ucGVjY2FuY3lpbmZvLmxlbmd0aDsgaSsrKXtcbiAgICAgICAganNvbi5wZWNjYW5jeWluZm9baV0ucGF5YWJsZV9jbiA9IHN0YXR1c0Fycltqc29uLnBlY2NhbmN5aW5mb1tpXS5wYXlhYmxlXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBqc29uO1xuICAgIH1cblxuICAgIGluaXREYXRhID0gKCkgPT4ge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiBcImh0dHBzOi8vcGVjY2FuY3lcIiArIHV0aWxzLmdldFByZWZpeCgpICsgXCIuZXRjY2hlYmFvLmNvbS92MS9xdWVyeS9nZXRQZWNjYW5jeUxpc3RcIixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHRva2VuOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpLFxuICAgICAgICAgIGNoYW5uZWxJZDogdXRpbHMuZ2V0Q2hhbm5lbElkKCksXG4gICAgICAgICAgcGxhdGVfbnVtOnRoYXQucGxhdGVfbnVtLFxuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzOiAocmVxKSA9PiB7XG4gICAgICAgICAgbGV0IGpzb24gPSByZXEuZGF0YTtcbiAgICAgICAgICAvLyAgICAgICAgICAgIGpzb24gPSB7XG4gICAgICAgICAgLy8gICAgICAgICAgICAgICAgY29kZTowLFxuICAgICAgICAgIC8vICAgICAgICAgICAgfVxuICAgICAgICAgIGNvbnNvbGUubG9nKGpzb24pO1xuICAgICAgICAgIGlmIChqc29uLmNvZGUgPT0gMCkge1xuICAgICAgICAgICAgdGhhdC5qc29uX2RhdGEgPSB0aGF0LmRhdGFGaWx0ZXIoanNvbi5kYXRhKTtcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChqc29uLmNvZGUgPT0gLTEwMDAxKSB7XG4gICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn6ZSZ6K+vJyxcbiAgICAgICAgICAgICAgY29udGVudDoganNvbi5tc2csXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgIHdlcHkucmVtb3ZlU3RvcmFnZSh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogJ3Rva2VuJ1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB0aGF0LiRyZWRpcmVjdCgnL3BhZ2VzL2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+mUmeivrycsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IGpzb24ubXNnLFxuICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfplJnor68nLFxuICAgICAgICAgICAgY29udGVudDogJ+e9kee7nOmUmeivr++8jOivt+mHjeivlScsXG4gICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiJdfQ==