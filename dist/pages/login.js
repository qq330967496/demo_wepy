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

var Login = function (_wepy$page) {
  _inherits(Login, _wepy$page);

  function Login() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Login);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Login.__proto__ || Object.getPrototypeOf(Login)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.components = {}, _this.data = {
      phone: '', //手机号码
      idCode: '', //验证码
      isGetIdCode: true, //是否要获取验证码
      idCodeTime: 0
    }, _this.computed = {}, _this.methods = {
      bindPhone: function bindPhone(e) {
        _this.phone = e.detail.value;
      },
      bindIdCode: function bindIdCode(e) {
        _this.idCode = e.detail.value;
      },
      getIdCode: function getIdCode() {
        var that = _this;
        console.log('获取验证码');
        _wepy2.default.request({
          url: 'https://peccancy' + utils.getPrefix() + '.etcchebao.com/v1/home/sms',
          data: {
            phone: that.phone,
            channelId: utils.getChannelId()
          },
          success: function success(req) {
            var json = req.data;

            //            json = {
            //                code:0,
            //            }
            console.log('获取验证码', json);
            if (json.code == 0) {
              _wepy2.default.showModal({
                title: '提示',
                content: '已成功发送验证码',
                showCancel: false
              });

              _wepy2.default.setStorage({
                key: 'phone',
                data: that.phone
              });

              that.isGetIdCode = false;
              that.idCodeTime = 60;
              that.$apply();

              var intr = setInterval(function () {
                that.idCodeTime--;
                if (that.idCodeTime < 1) {
                  that.isGetIdCode = true;
                  clearInterval(intr);
                }
                that.$apply();
              }, 1000);
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

        //        wepy.request(url).then((d) => console.log(d));
      },
      login: function login(e) {
        console.log('登录');
        var that = _this;
        if (!that.phone || that.phone.length != 11) {
          _wepy2.default.showModal({
            title: '提示',
            content: '请输入正确的手机号',
            showCancel: false
          });
          return;
        }

        if (!that.idCode) {
          _wepy2.default.showModal({
            title: '提示',
            content: '验证码不能为空',
            showCancel: false
          });
          return;
        }

        _wepy2.default.request({
          url: 'https://peccancy' + utils.getPrefix() + '.etcchebao.com/v1/home/auth',
          data: {
            phone: that.phone,
            code: that.idCode,
            channelId: utils.getChannelId()
          },
          success: function success(req) {
            var json = req.data;
            //            json = {
            //                code:0,
            //            }
            console.log('登录', json);
            if (json.code == 0) {
              _wepy2.default.setStorage({
                key: 'token',
                data: json.data.token
              });
              that.$redirect('/pages/vehicle_list');
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
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  //绑定的方法


  //事件处理


  _createClass(Login, [{
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      utils = new _utils2.default(this);
      utils.init();
      var token = _wepy2.default.getStorageSync('token');
      if (token) {
        _wepy2.default.showLoading({
          title: '正在登录...'
        });
        that.$redirect('/pages/vehicle_list');
      }

      var s_phone = _wepy2.default.getStorageSync('phone');
      if (s_phone) {
        that.phone = s_phone;
      }
    }
  }]);

  return Login;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Login , 'pages/login'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbInV0aWxzIiwiTG9naW4iLCJjb25maWciLCJjb21wb25lbnRzIiwiZGF0YSIsInBob25lIiwiaWRDb2RlIiwiaXNHZXRJZENvZGUiLCJpZENvZGVUaW1lIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiYmluZFBob25lIiwiZSIsImRldGFpbCIsInZhbHVlIiwiYmluZElkQ29kZSIsImdldElkQ29kZSIsInRoYXQiLCJjb25zb2xlIiwibG9nIiwicmVxdWVzdCIsInVybCIsImdldFByZWZpeCIsImNoYW5uZWxJZCIsImdldENoYW5uZWxJZCIsInN1Y2Nlc3MiLCJyZXEiLCJqc29uIiwiY29kZSIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJzZXRTdG9yYWdlIiwia2V5IiwiJGFwcGx5IiwiaW50ciIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsIm1zZyIsImZhaWwiLCJsb2dpbiIsImxlbmd0aCIsInRva2VuIiwiJHJlZGlyZWN0IiwiZXZlbnRzIiwiaW5pdCIsImdldFN0b3JhZ2VTeW5jIiwic2hvd0xvYWRpbmciLCJzX3Bob25lIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSUEsY0FBSjs7SUFHcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUVuQkMsTSxHQUFTLEUsUUFDVEMsVSxHQUFhLEUsUUFFYkMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERixFQUNLO0FBQ1ZDLGNBQVEsRUFGSCxFQUVNO0FBQ1hDLG1CQUFZLElBSFAsRUFHWTtBQUNqQkMsa0JBQVc7QUFKTixLLFFBT1BDLFEsR0FBVyxFLFFBR1hDLE8sR0FBVTtBQUNSQyxpQkFBVSxtQkFBQ0MsQ0FBRCxFQUFLO0FBQ2IsY0FBS1AsS0FBTCxHQUFhTyxFQUFFQyxNQUFGLENBQVNDLEtBQXRCO0FBQ0QsT0FITztBQUlSQyxrQkFBVyxvQkFBQ0gsQ0FBRCxFQUFLO0FB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WkMscUJBQUksT0FEUTtBQUVaOUIsc0JBQUt1QixLQUFLdkIsSUFBTCxDQUFVdUM7QUFGSCxlQUFoQjtBQUlBMUIsbUJBQUsyQixTQUFMLENBQWUscUJBQWY7QUFDRCxhQU5ELE1BTUs7QUFDSCw2QkFBS2YsU0FBTCxDQUFlO0FBQ2JDLHVCQUFNLElBRE87QUFFYkMseUJBQVNKLEtBQUtZLEdBRkQ7QUFHYlAsNEJBQVc7QUFIRSxlQUFmO0FBS0Q7QUFFRixXQTNCVTtBQTRCWFEsZ0JBQUssZ0JBQUk7QUFDUCwyQkFBS1gsU0FBTCxDQUFlO0FBQ2JDLHFCQUFNLElBRE87QUFFYkMsdUJBQVEsVUFGSztBQUdiQywwQkFBVztBQUhFLGFBQWY7QUFLRDtBQWxDVSxTQUFiO0FBd0NEO0FBaklPLEssUUFxSVZhLE0sR0FBUyxFOzs7QUF0SVQ7OztBQXFJQTs7Ozs7NkJBR1M7QUFDUCxVQUFJNUIsT0FBTyxJQUFYO0FBQ0FqQixjQUFRLG9CQUFVLElBQVYsQ0FBUjtBQUNBQSxZQUFNOEMsSUFBTjtBQUNBLFVBQUlILFFBQVEsZUFBS0ksY0FBTCxDQUFvQixPQUFwQixDQUFaO0FBQ0EsVUFBR0osS0FBSCxFQUFTO0FBQ0wsdUJBQUtLLFdBQUwsQ0FBaUI7QUFDZmxCLGlCQUFPO0FBRFEsU0FBakI7QUFHQWIsYUFBSzJCLFNBQUwsQ0FBZSxxQkFBZjtBQUNIOztBQUVELFVBQUlLLFVBQVUsZUFBS0YsY0FBTCxDQUFvQixPQUFwQixDQUFkO0FBQ0EsVUFBR0UsT0FBSCxFQUFXO0FBQ1BoQyxhQUFLWixLQUFMLEdBQWE0QyxPQUFiO0FBQ0g7QUFDRjs7OztFQXRLZ0MsZUFBS0MsSTs7a0JBQW5CakQsSyIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgVXRpbHMgZnJvbSAnLi4vbGliL3V0aWxzLmpzJ1xuICBsZXQgdXRpbHM7XG5cblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpbiBleHRlbmRzIHdlcHkucGFnZSB7XG5cbiAgICBjb25maWcgPSB7fTtcbiAgICBjb21wb25lbnRzID0ge307XG5cbiAgICBkYXRhID0ge1xuICAgICAgcGhvbmU6ICcnLC8v5omL5py65Y+356CBXG4gICAgICBpZENvZGU6ICcnLC8v6aqM6K+B56CBXG4gICAgICBpc0dldElkQ29kZTp0cnVlLC8v5piv5ZCm6KaB6I635Y+W6aqM6K+B56CBXG4gICAgICBpZENvZGVUaW1lOjAsXG4gICAgfTtcblxuICAgIGNvbXB1dGVkID0ge307XG5cbiAgICAvL+e7keWumueahOaWueazlVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBiaW5kUGhvbmU6KGUpPT57XG4gICAgICAgIHRoaXMucGhvbmUgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgIH0sXG4gICAgICBiaW5kSWRDb2RlOihlKT0+e1xuICAgICAgICB0aGlzLmlkQ29kZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgfSxcbiAgICAgIGdldElkQ29kZTooKT0+e1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIGNvbnNvbGUubG9nKCfojrflj5bpqozor4HnoIEnKTtcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICdodHRwczovL3BlY2NhbmN5Jyt1dGlscy5nZXRQcmVmaXgoKSsnLmV0Y2NoZWJhby5jb20vdjEvaG9tZS9zbXMnLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHBob25lOnRoYXQucGhvbmUsXG4gICAgICAgICAgICBjaGFubmVsSWQgOiB1dGlscy5nZXRDaGFubmVsSWQoKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXEpID0+IHtcbiAgICAgICAgICAgIGxldCBqc29uID0gcmVxLmRhdGE7XG5cbi8vICAgICAgICAgICAganNvbiA9IHtcbi8vICAgICAgICAgICAgICAgIGNvZGU6MCxcbi8vICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+iOt+WPlumqjOivgeeggScsanNvbik7XG4gICAgICAgICAgICBpZihqc29uLmNvZGU9PTApe1xuICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6J+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogJ+W3suaIkOWKn+WPkemAgemqjOivgeeggScsXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbDpmYWxzZVxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe1xuICAgICAgICAgICAgICAgIGtleToncGhvbmUnLFxuICAgICAgICAgICAgICAgIGRhdGE6dGhhdC5waG9uZVxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICB0aGF0LmlzR2V0SWRDb2RlID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRoYXQuaWRDb2RlVGltZSA9IDYwO1xuICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xuXG4gICAgICAgICAgICAgIGxldCBpbnRyID0gc2V0SW50ZXJ2YWwoKCk9PntcbiAgICAgICAgICAgICAgICAgIHRoYXQuaWRDb2RlVGltZS0tO1xuICAgICAgICAgICAgICAgICAgaWYodGhhdC5pZENvZGVUaW1lPDEpe1xuICAgICAgICAgICAgICAgICAgICB0aGF0LmlzR2V0SWRDb2RlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludHIpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgfSwxMDAwKVxuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOifplJnor68nLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGpzb24ubXNnLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6ZmFsc2VcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6KCk9PntcbiAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6J+mUmeivrycsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6J+e9kee7nOmUmeivr++8jOivt+mHjeivlScsXG4gICAgICAgICAgICAgIHNob3dDYW5jZWw6ZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuLy8gICAgICAgIHdlcHkucmVxdWVzdCh1cmwpLnRoZW4oKGQpID0+IGNvbnNvbGUubG9nKGQpKTtcbiAgICAgIH0sXG4gICAgICBsb2dpbjooZSk9PntcbiAgICAgICAgY29uc29sZS5sb2coJ+eZu+W9lScpO1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIGlmKCF0aGF0LnBob25lIHx8IHRoYXQucGhvbmUubGVuZ3RoICE9IDExKXtcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTon5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6J+ivt+i+k+WFpeato+ehrueahOaJi+acuuWPtycsXG4gICAgICAgICAgICBzaG93Q2FuY2VsOmZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXRoYXQuaWRDb2RlKXtcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTon5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6J+mqjOivgeeggeS4jeiDveS4uuepuicsXG4gICAgICAgICAgICBzaG93Q2FuY2VsOmZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vcGVjY2FuY3knK3V0aWxzLmdldFByZWZpeCgpKycuZXRjY2hlYmFvLmNvbS92MS9ob21lL2F1dGgnLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHBob25lOnRoYXQucGhvbmUsXG4gICAgICAgICAgICBjb2RlOnRoYXQuaWRDb2RlLFxuICAgICAgICAgICAgY2hhbm5lbElkIDogdXRpbHMuZ2V0Q2hhbm5lbElkKCksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWNjZXNzOiAocmVxKSA9PiB7XG4gICAgICAgICAgICBsZXQganNvbiA9IHJlcS5kYXRhO1xuLy8gICAgICAgICAgICBqc29uID0ge1xuLy8gICAgICAgICAgICAgICAgY29kZTowLFxuLy8gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn55m75b2VJyxqc29uKTtcbiAgICAgICAgICAgIGlmKGpzb24uY29kZT09MCl7XG4gICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZSh7XG4gICAgICAgICAgICAgICAgICBrZXk6J3Rva2VuJyxcbiAgICAgICAgICAgICAgICAgIGRhdGE6anNvbi5kYXRhLnRva2VuXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB0aGF0LiRyZWRpcmVjdCgnL3BhZ2VzL3ZlaGljbGVfbGlzdCcpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTon6ZSZ6K+vJyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBqc29uLm1zZyxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOmZhbHNlXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOigpPT57XG4gICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOifplJnor68nLFxuICAgICAgICAgICAgICBjb250ZW50OifnvZHnu5zplJnor6/vvIzor7fph43or5UnLFxuICAgICAgICAgICAgICBzaG93Q2FuY2VsOmZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG5cblxuXG5cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy/kuovku7blpITnkIZcbiAgICBldmVudHMgPSB7fTtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgIHV0aWxzID0gbmV3IFV0aWxzKHRoaXMpO1xuICAgICAgdXRpbHMuaW5pdCgpO1xuICAgICAgbGV0IHRva2VuID0gd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKTtcbiAgICAgIGlmKHRva2VuKXtcbiAgICAgICAgICB3ZXB5LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5q2j5Zyo55m75b2VLi4uJyxcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoYXQuJHJlZGlyZWN0KCcvcGFnZXMvdmVoaWNsZV9saXN0Jyk7XG4gICAgICB9XG5cbiAgICAgIGxldCBzX3Bob25lID0gd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKTtcbiAgICAgIGlmKHNfcGhvbmUpe1xuICAgICAgICAgIHRoYXQucGhvbmUgPSBzX3Bob25lO1xuICAgICAgfVxuICAgIH1cbiAgfVxuIl19