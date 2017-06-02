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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBlY2NhbmN5X2xpc3QuanMiXSwibmFtZXMiOlsidXRpbHMiLCJWZWhpY2xlX2xpc3QiLCJjb25maWciLCJjb21wb25lbnRzIiwiZGF0YSIsInBsYXRlX251bSIsInBsYXRlX2wiLCJwbGF0ZV9yIiwianNvbl9kYXRhIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwidG9EZXRhaWxzIiwiaWQiLCJjb25zb2xlIiwibG9nIiwiZXZlbnRzIiwiZGF0YUZpbHRlciIsImpzb24iLCJzdGF0dXNBcnIiLCJpIiwicGVjY2FuY3lpbmZvIiwibGVuZ3RoIiwicGF5YWJsZV9jbiIsInBheWFibGUiLCJpbml0RGF0YSIsInRoYXQiLCJyZXF1ZXN0IiwidXJsIiwiZ2V0UHJlZml4IiwidG9rZW4iLCJnZXRTdG9yYWdlU3luYyIsImNoYW5uZWxJZCIsImdldENoYW5uZWxJZCIsInN1Y2Nlc3MiLCJyZXEiLCJjb2RlIiwiJGFwcGx5Iiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwibXNnIiwicmVzIiwiY29uZmlybSIsInJlbW92ZVN0b3JhZ2UiLCJrZXkiLCIkcmVkaXJlY3QiLCJzaG93Q2FuY2VsIiwiZmFpbCIsIm9wdGlvbnMiLCJpbml0Iiwic3Vic3RyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSUEsS0FBSjs7SUFHcUJDLFk7Ozs7Ozs7Ozs7Ozs7O2tNQUVuQkMsTSxHQUFTLEUsUUFDVEMsVSxHQUFhLEUsUUFFYkMsSSxHQUFPO0FBQ0xDLGlCQUFXLEVBRE47QUFFTEMsZUFBUSxFQUZIO0FBR0xDLGVBQVEsRUFISDtBQUlMQyxpQkFBVztBQUpOLEssUUFPUEMsUSxHQUFXLEUsUUFHWEMsTyxHQUFVO0FBQ1JDLGlCQUFXLG1CQUFDQyxFQUFELEVBQVE7QUFDakJDLGdCQUFRQyxHQUFSLENBQVlGLEVBQVo7QUFDRDtBQUhPLEssUUFPVkcsTSxHQUFTLEUsUUFrQlRDLFUsR0FBYSxVQUFDQyxJQUFELEVBQVE7QUFDekI7QUFDTSxVQUFJQyxZQUFZLENBQUMsTUFBRCxFQUFRLEtBQVIsRUFBYyxLQUFkLEVBQW9CLEtBQXBCLEVBQTBCLEtBQTFCLENBQWhCO0FBQ0EsV0FBSSxJQUFJQyxJQUFJLENBQVosRUFBZUEsSUFBRUYsS0FBS0csWUFBTCxDQUFrQkMsTUFBbkMsRUFBMkNGLEdBQTNDLEVBQStDO0FBQzdDRixhQUFLRyxZQUFMLENBQWtCRCxDQUFsQixFQUFxQkcsVUFBckIsR0FBa0NKLFVBQVVELEtBQUtHLFlBQUwsQ0FBa0JELENBQWxCLEVBQXFCSSxPQUEvQixDQUFsQztBQUNEO0FBQ0QsYUFBT04sSUFBUDtBQUNELEssUUFFRE8sUSxHQUFXLFlBQU07QUFDZixVQUFJQyxZQUFKO0FBQ0EscUJBQUtDLE9BQUwsQ0FBYTtBQUNYQyxhQUFLLHFCQUFxQjNCLE1BQU00QixTQUFOLEVBQXJCLEdBQXlDLHlDQURuQztBQUVYeEIsY0FBTTtBQUNKeUIsaUJBQU8sZUFBS0MsY0FBTCxDQUFvQixPQUFwQixDQURIO0FBRUpDLHFCQUFXL0IsTUFBTWdDLFlBQU4sRUFGUDtBQUdKM0IscUJBQVVvQixLQUFLcEI7QUFIWCxTQUZLO0FBT1g0QixpQkFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2hCLGNBQUlqQixPQUFPaUIsSUFBSTlCLElBQWY7QUFDQTtBQUNBO0FBQ0E7QUFDQVMsa0JBQVFDLEdBQVIsQ0FBWUcsSUFBWjtBQUNBLGNBQUlBLEtBQUtrQixJQUFMLElBQWEsQ0FBakIsRUFBb0I7QUFDbEJWLGlCQUFLakIsU0FBTCxHQUFpQmlCLEtBQUtULFVBQUwsQ0FBZ0JDLEtBQUtiLElBQXJCLENBQWpCO0FBQ0FxQixpQkFBS1csTUFBTDtBQUNELFdBSEQsTUFHTyxJQUFJbkIsS0FBS2tCLElBQUwsSUFBYSxDQUFDLEtBQWxCLEVBQXlCO0FBQzlCLDJCQUFLRSxTQUFMLENBQWU7QUFDYkMscUJBQU8sSUFETTtBQUViQyx1QkFBU3RCLEtBQUt1QixHQUZEO0FBR2JQLHVCQUFTLGlCQUFVUSxHQUFWLEVBQWU7QUFDdEIsb0JBQUlBLElBQUlDLE9BQVIsRUFBaUI7QUFDZixpQ0FBS0MsYUFBTCxDQUFtQjtBQUNqQkMseUJBQUs7QUFEWSxtQkFBbkI7QUFHQW5CLHVCQUFLb0IsU0FBTCxDQUFlLGNBQWY7QUFDRDtBQUNGO0FBVlksYUFBZjtBQVlELFdBYk0sTUFhQTtBQUNMLDJCQUFLUixTQUFMLENBQWU7QUFDYkMscUJBQU8sSUFETTtBQUViQyx1QkFBU3RCLEtBQUt1QixHQUZEO0FBR2JNLDBCQUFZO0FBSEMsYUFBZjtBQUtEO0FBQ0YsU0FwQ1U7QUFxQ1hDLGNBQU0sZ0JBQU07QUFDVix5QkFBS1YsU0FBTCxDQUFlO0FBQ2JDLG1CQUFPLElBRE07QUFFYkMscUJBQVMsVUFGSTtBQUdiTyx3QkFBWTtBQUhDLFdBQWY7QUFLRDtBQTNDVSxPQUFiO0FBNkNELEs7OztBQWxGRDs7O0FBT0E7Ozs7OzJCQUdPRSxPLEVBQVM7QUFDZCxVQUFJdkIsT0FBTyxJQUFYO0FBQ0F6QixjQUFRLG9CQUFVLElBQVYsQ0FBUjtBQUNBQSxZQUFNaUQsSUFBTjtBQUNBO0FBQ047QUFDTXhCLFdBQUtwQixTQUFMLEdBQWlCMkMsUUFBUTNDLFNBQXpCO0FBQ0FvQixXQUFLbkIsT0FBTCxHQUFlbUIsS0FBS3BCLFNBQUwsQ0FBZTZDLE1BQWYsQ0FBc0IsQ0FBdEIsRUFBd0IsQ0FBeEIsQ0FBZjtBQUNBekIsV0FBS2xCLE9BQUwsR0FBZWtCLEtBQUtwQixTQUFMLENBQWU2QyxNQUFmLENBQXNCLENBQXRCLEVBQXdCekIsS0FBS3BCLFNBQUwsQ0FBZWdCLE1BQXZDLENBQWY7QUFDRDs7OzZCQUVPO0FBQ04sVUFBSUksT0FBTyxJQUFYO0FBQ0FBLFdBQUtELFFBQUw7QUFDRDs7OztFQXRDdUMsZUFBSzJCLEk7O2tCQUExQmxELFkiLCJmaWxlIjoicGVjY2FuY3lfbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgVXRpbHMgZnJvbSAnLi4vbGliL3V0aWxzLmpzJ1xuICB2YXIgdXRpbHM7XG5cblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBWZWhpY2xlX2xpc3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuXG4gICAgY29uZmlnID0ge31cbiAgICBjb21wb25lbnRzID0ge31cblxuICAgIGRhdGEgPSB7XG4gICAgICBwbGF0ZV9udW06ICcnLFxuICAgICAgcGxhdGVfbDonJyxcbiAgICAgIHBsYXRlX3I6JycsXG4gICAgICBqc29uX2RhdGE6ICcnLFxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge31cblxuICAgIC8v57uR5a6a55qE5pa55rOVXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHRvRGV0YWlsczogKGlkKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGlkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL+S6i+S7tuWkhOeQhlxuICAgIGV2ZW50cyA9IHt9O1xuXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHV0aWxzID0gbmV3IFV0aWxzKHRoaXMpO1xuICAgICAgdXRpbHMuaW5pdCgpO1xuICAgICAgLy9UT0RPIOaooeaLn+aVsOaNrlxuLy8gICAgICBvcHRpb25zLnBsYXRlX251bSA9ICfnsqRRSEUwODYnO1xuICAgICAgdGhhdC5wbGF0ZV9udW0gPSBvcHRpb25zLnBsYXRlX251bTtcbiAgICAgIHRoYXQucGxhdGVfbCA9IHRoYXQucGxhdGVfbnVtLnN1YnN0cigwLDIpO1xuICAgICAgdGhhdC5wbGF0ZV9yID0gdGhhdC5wbGF0ZV9udW0uc3Vic3RyKDIsdGhhdC5wbGF0ZV9udW0ubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBvblNob3coKXtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuaW5pdERhdGEoKTtcbiAgICB9XG5cbiAgICBkYXRhRmlsdGVyID0gKGpzb24pPT57XG4vLyAgICAgIGxldCBzdGF0dXNBcnIgPSBbXCLkuI3lj6/lip7nkIZcIixcIumcgOihpeWFhempvueFp+WQjuWKnueQhlwiLFwi5Y+v5Yqe55CGXCIsXCLlt7Llip7nkIZcIixcIuWKnueQhuS4rVwiXTtcbiAgICAgIGxldCBzdGF0dXNBcnIgPSBbXCLkuI3lj6/lip7nkIZcIixcIuWPr+WKnueQhlwiLFwi5Y+v5Yqe55CGXCIsXCLlt7Llip7nkIZcIixcIuWKnueQhuS4rVwiXTtcbiAgICAgIGZvcih2YXIgaSA9IDA7IGk8anNvbi5wZWNjYW5jeWluZm8ubGVuZ3RoOyBpKyspe1xuICAgICAgICBqc29uLnBlY2NhbmN5aW5mb1tpXS5wYXlhYmxlX2NuID0gc3RhdHVzQXJyW2pzb24ucGVjY2FuY3lpbmZvW2ldLnBheWFibGVdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGpzb247XG4gICAgfVxuXG4gICAgaW5pdERhdGEgPSAoKSA9PiB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9wZWNjYW5jeVwiICsgdXRpbHMuZ2V0UHJlZml4KCkgKyBcIi5ldGNjaGViYW8uY29tL3YxL3F1ZXJ5L2dldFBlY2NhbmN5TGlzdFwiLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdG9rZW46IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJyksXG4gICAgICAgICAgY2hhbm5lbElkOiB1dGlscy5nZXRDaGFubmVsSWQoKSxcbiAgICAgICAgICBwbGF0ZV9udW06dGhhdC5wbGF0ZV9udW0sXG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3M6IChyZXEpID0+IHtcbiAgICAgICAgICBsZXQganNvbiA9IHJlcS5kYXRhO1xuICAgICAgICAgIC8vICAgICAgICAgICAganNvbiA9IHtcbiAgICAgICAgICAvLyAgICAgICAgICAgICAgICBjb2RlOjAsXG4gICAgICAgICAgLy8gICAgICAgICAgICB9XG4gICAgICAgICAgY29uc29sZS5sb2coanNvbik7XG4gICAgICAgICAgaWYgKGpzb24uY29kZSA9PSAwKSB7XG4gICAgICAgICAgICB0aGF0Lmpzb25fZGF0YSA9IHRoYXQuZGF0YUZpbHRlcihqc29uLmRhdGEpO1xuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGpzb24uY29kZSA9PSAtMTAwMDEpIHtcbiAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfplJnor68nLFxuICAgICAgICAgICAgICBjb250ZW50OiBqc29uLm1zZyxcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgd2VweS5yZW1vdmVTdG9yYWdlKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiAndG9rZW4nXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIHRoYXQuJHJlZGlyZWN0KCcvcGFnZXMvbG9naW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn6ZSZ6K+vJyxcbiAgICAgICAgICAgICAgY29udGVudDoganNvbi5tc2csXG4gICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+mUmeivrycsXG4gICAgICAgICAgICBjb250ZW50OiAn572R57uc6ZSZ6K+v77yM6K+36YeN6K+VJyxcbiAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuIl19