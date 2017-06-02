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
      json_data: ''
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
      }
    }, _this.events = {}, _this.initData = function () {
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
            that.json_data = json.data;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlaGljbGVfbGlzdC5qcyJdLCJuYW1lcyI6WyJ1dGlscyIsIlZlaGljbGVfbGlzdCIsImNvbmZpZyIsImNvbXBvbmVudHMiLCJkYXRhIiwianNvbl9kYXRhIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwidG9EZXRhaWxzIiwicGxhdGUiLCIkZXZlbnQiLCJ0aGF0IiwiJG5hdmlnYXRlIiwiYWRkQ2FyIiwiZSIsImNoYW5nZVVzZXIiLCJ3eCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwicmVtb3ZlU3RvcmFnZVN5bmMiLCIkcmVkaXJlY3QiLCJldmVudHMiLCJpbml0RGF0YSIsInJlcXVlc3QiLCJ1cmwiLCJnZXRQcmVmaXgiLCJ0b2tlbiIsImdldFN0b3JhZ2VTeW5jIiwiY2hhbm5lbElkIiwiZ2V0Q2hhbm5lbElkIiwicmVxIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJjb2RlIiwiJGFwcGx5IiwibXNnIiwicmVtb3ZlU3RvcmFnZSIsImtleSIsInNob3dDYW5jZWwiLCJmYWlsIiwib3B0aW9ucyIsImluaXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFDQSxJQUFJQSxjQUFKOztJQUVxQkMsWTs7Ozs7Ozs7Ozs7Ozs7a01BRW5CQyxNLEdBQVMsRSxRQUNUQyxVLEdBQWEsRSxRQUViQyxJLEdBQU87QUFDTEMsaUJBQVc7QUFETixLLFFBSVBDLFEsR0FBVyxFLFFBR1hDLE8sR0FBVTtBQUNSQyxpQkFBVSxtQkFBQ0MsS0FBRCxFQUFPQyxNQUFQLEVBQWdCO0FBQ3hCLFlBQUlDLFlBQUo7QUFDQUEsYUFBS0MsU0FBTCxDQUFlLG9DQUFrQ0gsS0FBakQ7QUFDRCxPQUpPO0FBS1JJLGNBQU8sZ0JBQUNDLENBQUQsRUFBSztBQUNWLFlBQUlILFlBQUo7QUFDQUEsYUFBS0MsU0FBTCxDQUFlLGNBQWY7QUFDRCxPQVJPO0FBU1JHLGtCQUFXLG9CQUFDRCxDQUFELEVBQUs7QUFDZCxZQUFJSCxZQUFKO0FBQ0FLLFdBQUdDLFNBQUgsQ0FBYTtBQUNYQyxpQkFBTyxJQURJO0FBRVhDLG1CQUFTLFlBRkU7QUFHWEMsbUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQixnQkFBSUEsSUFBSUMsT0FBUixFQUFpQjtBQUNmLDZCQUFLQyxpQkFBTCxDQUF1QixPQUF2QjtBQUNBWixtQkFBS2EsU0FBTCxDQUFlLGNBQWY7QUFDRDtBQUNGO0FBUlUsU0FBYjtBQVlEO0FBdkJPLEssUUEyQlZDLE0sR0FBUyxFLFFBY1RDLFEsR0FBVyxZQUFNO0FBQ2YsVUFBSWYsWUFBSjtBQUNBLHFCQUFLZ0IsT0FBTCxDQUFhO0FBQ1hDLGFBQUsscUJBQXFCNUIsTUFBTTZCLFNBQU4sRUFBckIsR0FBeUMsb0NBRG5DO0FBRVh6QixjQUFNO0FBQ0owQixpQkFBTyxlQUFLQyxjQUFMLENBQW9CLE9BQXBCLENBREg7QUFFSkMscUJBQVdoQyxNQUFNaUMsWUFBTjtBQUZQLFNBRks7QUFNWGIsaUJBQVMsaUJBQUNjLEdBQUQsRUFBUztBQUNoQixjQUFJQyxPQUFPRCxJQUFJOUIsSUFBZjtBQUNBO0FBQ0E7QUFDQTtBQUNBZ0Msa0JBQVFDLEdBQVIsQ0FBWSxPQUFaLEVBQW9CRixJQUFwQjtBQUNBLGNBQUlBLEtBQUtHLElBQUwsSUFBYSxDQUFqQixFQUFvQjtBQUNsQjNCLGlCQUFLTixTQUFMLEdBQWlCOEIsS0FBSy9CLElBQXRCO0FBQ0FPLGlCQUFLNEIsTUFBTDtBQUNELFdBSEQsTUFHTyxJQUFHSixLQUFLRyxJQUFMLElBQWEsQ0FBQyxLQUFqQixFQUF3QjtBQUM3QnRCLGVBQUdDLFNBQUgsQ0FBYTtBQUNYQyxxQkFBTyxJQURJO0FBRVhDLHVCQUFTZ0IsS0FBS0ssR0FGSDtBQUdYcEIsdUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQixvQkFBSUEsSUFBSUMsT0FBUixFQUFpQjtBQUNmLGlDQUFLbUIsYUFBTCxDQUFtQjtBQUNmQyx5QkFBSTtBQURXLG1CQUFuQjtBQUdBL0IsdUJBQUthLFNBQUwsQ0FBZSxjQUFmO0FBQ0Q7QUFDRjtBQVZVLGFBQWI7QUFZRCxXQWJNLE1BYUE7QUFDTFIsZUFBR0MsU0FBSCxDQUFhO0FBQ1hDLHFCQUFPLElBREk7QUFFWEMsdUJBQVNnQixLQUFLSyxHQUZIO0FBR1hHLDBCQUFZO0FBSEQsYUFBYjtBQUtEO0FBQ0YsU0FuQ1U7QUFvQ1hDLGNBQU0sZ0JBQU07QUFDVjVCLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxJQURJO0FBRVhDLHFCQUFTLFVBRkU7QUFHWHdCLHdCQUFZO0FBSEQsV0FBYjtBQUtEO0FBMUNVLE9BQWI7QUE0Q0QsSzs7O0FBeEZEOzs7QUEyQkE7Ozs7OzJCQUtPRSxPLEVBQVM7QUFDZCxVQUFJbEMsT0FBTyxJQUFYO0FBQ0FYLGNBQVEsb0JBQVUsSUFBVixDQUFSO0FBQ0FBLFlBQU04QyxJQUFOO0FBQ0Q7Ozs2QkFDTztBQUNOLFVBQUluQyxPQUFPLElBQVg7QUFDQUEsV0FBS2UsUUFBTDtBQUNEOzs7O0VBbkR1QyxlQUFLcUIsSTs7a0JBQTFCOUMsWSIsImZpbGUiOiJ2ZWhpY2xlX2xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IFV0aWxzIGZyb20gJy4uL2xpYi91dGlscy5qcydcbiAgbGV0IHV0aWxzO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlaGljbGVfbGlzdCBleHRlbmRzIHdlcHkucGFnZSB7XG5cbiAgICBjb25maWcgPSB7fTtcbiAgICBjb21wb25lbnRzID0ge307XG5cbiAgICBkYXRhID0ge1xuICAgICAganNvbl9kYXRhOiAnJyxcbiAgICB9O1xuXG4gICAgY29tcHV0ZWQgPSB7fTtcblxuICAgIC8v57uR5a6a55qE5pa55rOVXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHRvRGV0YWlsczoocGxhdGUsJGV2ZW50KT0+e1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIHRoYXQuJG5hdmlnYXRlKCcvcGFnZXMvcGVjY2FuY3lfbGlzdD9wbGF0ZV9udW09JytwbGF0ZSk7XG4gICAgICB9LFxuICAgICAgYWRkQ2FyOihlKT0+e1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIHRoYXQuJG5hdmlnYXRlKCcvcGFnZXMvaW5kZXgnKTtcbiAgICAgIH0sXG4gICAgICBjaGFuZ2VVc2VyOihlKT0+e1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgIGNvbnRlbnQ6ICfnoa7lrpropoHms6jplIDlvZPliY3nlKjmiLfvvJ8nLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIHdlcHkucmVtb3ZlU3RvcmFnZVN5bmMoJ3Rva2VuJyk7XG4gICAgICAgICAgICAgIHRoYXQuJHJlZGlyZWN0KCcvcGFnZXMvbG9naW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG5cblxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgLy/kuovku7blpITnkIZcbiAgICBldmVudHMgPSB7XG5cbiAgICB9O1xuXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgIHV0aWxzID0gbmV3IFV0aWxzKHRoaXMpO1xuICAgICAgdXRpbHMuaW5pdCgpO1xuICAgIH1cbiAgICBvblNob3coKXtcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuaW5pdERhdGEoKTtcbiAgICB9XG5cbiAgICBpbml0RGF0YSA9ICgpID0+IHtcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgIHVybDogXCJodHRwczovL3BlY2NhbmN5XCIgKyB1dGlscy5nZXRQcmVmaXgoKSArIFwiLmV0Y2NoZWJhby5jb20vdjEvcXVlcnkvZ2V0Q2FyTGlzdFwiLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdG9rZW46IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJyksXG4gICAgICAgICAgY2hhbm5lbElkOiB1dGlscy5nZXRDaGFubmVsSWQoKSxcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzczogKHJlcSkgPT4ge1xuICAgICAgICAgIGxldCBqc29uID0gcmVxLmRhdGE7XG4gICAgICAgICAgLy8gICAgICAgICAgICBqc29uID0ge1xuICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGNvZGU6MCxcbiAgICAgICAgICAvLyAgICAgICAgICAgIH1cbiAgICAgICAgICBjb25zb2xlLmxvZygn5Yid5aeL5YyW5pWw5o2uJyxqc29uKTtcbiAgICAgICAgICBpZiAoanNvbi5jb2RlID09IDApIHtcbiAgICAgICAgICAgIHRoYXQuanNvbl9kYXRhID0ganNvbi5kYXRhO1xuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgICAgICB9IGVsc2UgaWYoanNvbi5jb2RlID09IC0xMDAwMSkge1xuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfplJnor68nLFxuICAgICAgICAgICAgICBjb250ZW50OiBqc29uLm1zZyxcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICB3ZXB5LnJlbW92ZVN0b3JhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICAgIGtleTondG9rZW4nXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIHRoYXQuJHJlZGlyZWN0KCcvcGFnZXMvbG9naW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+mUmeivrycsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IGpzb24ubXNnLFxuICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn6ZSZ6K+vJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfnvZHnu5zplJnor6/vvIzor7fph43or5UnLFxuICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG4iXX0=