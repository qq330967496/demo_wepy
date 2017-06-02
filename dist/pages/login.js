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
        wx.showLoading({
          title: '获取验证码中',
          mask: true
        });
        _wepy2.default.request({
          url: 'https://peccancy' + utils.getPrefix() + '.etcchebao.com/v1/home/sms',
          data: {
            phone: that.phone,
            channelId: utils.getChannelId()
          },
          complete: function complete() {
            //            wx.hideLoading();
          },
          success: function success(req) {
            var json = req.data;

            //            json = {
            //                code:0,
            //            }
            console.log('获取验证码', json);
            if (json.code == 0) {
              wx.showToast({
                icon: 'success',
                title: '已成功发送验证码'
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

        wx.showLoading({
          title: '登录中',
          mask: true
        });
        _wepy2.default.request({
          url: 'https://peccancy' + utils.getPrefix() + '.etcchebao.com/v1/home/auth',
          data: {
            phone: that.phone,
            code: that.idCode,
            channelId: utils.getChannelId()
          },
          complete: function complete() {
            wx.hideLoading();
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
        wx.showLoading({
          title: '登录中',
          mask: true
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbInV0aWxzIiwiTG9naW4iLCJjb25maWciLCJjb21wb25lbnRzIiwiZGF0YSIsInBob25lIiwiaWRDb2RlIiwiaXNHZXRJZENvZGUiLCJpZENvZGVUaW1lIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiYmluZFBob25lIiwiZSIsImRldGFpbCIsInZhbHVlIiwiYmluZElkQ29kZSIsImdldElkQ29kZSIsInRoYXQiLCJjb25zb2xlIiwibG9nIiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsInJlcXVlc3QiLCJ1cmwiLCJnZXRQcmVmaXgiLCJjaGFubmVsSWQiLCJnZXRDaGFubmVsSWQiLCJjb21wbGV0ZSIsInN1Y2Nlc3MiLCJyZXEiLCJqc29uIiwiY29kZSIsInNob3dUb2FzdCIsImljb24iLCJzZXRTdG9yYWdlIiwia2V5IiwiJGFwcGx5IiwiaW50ciIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsImhpZGVMb2FkaW5nIiwic2hvd01vZGFsIiwiY29udGVudCIsIm1zZyIsInNob3dDYW5jZWwiLCJmYWlsIiwibG9naW4iLCJsZW5ndGgiLCJ0b2tlbiIsIiRyZWRpcmVjdCIsImV2ZW50cyIsImluaXQiLCJnZXRTdG9yYWdlU3luYyIsInNfcGhvbmUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFDQSxJQUFJQSxjQUFKOztJQUdxQkMsSzs7Ozs7Ozs7Ozs7Ozs7b0xBRW5CQyxNLEdBQVMsRSxRQUNUQyxVLEdBQWEsRSxRQUViQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGLEVBQ0s7QUFDVkMsY0FBUSxFQUZILEVBRU07QUFDWEMsbUJBQVksSUFIUCxFQUdZO0FBQ2pCQyxrQkFBVztBQUpOLEssUUFPUEMsUSxHQUFXLEUsUUFHWEMsTyxHQUFVO0FBQ1JDLGlCQUFVLG1CQUFDQyxDQUFELEVBQUs7QUFDYixjQUFLUCxLQUFMLEdBQWFPLEVBQUVDLE1B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O0FBRUQsVUFBSUksVUFBVSxlQUFLRCxjQUFMLENBQW9CLE9BQXBCLENBQWQ7QUFDQSxVQUFHQyxPQUFILEVBQVc7QUFDUHRDLGFBQUtaLEtBQUwsR0FBYWtELE9BQWI7QUFDSDtBQUNGOzs7O0VBdExnQyxlQUFLQyxJOztrQkFBbkJ2RCxLIiwiZmlsZSI6ImxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBVdGlscyBmcm9tICcuLi9saWIvdXRpbHMuanMnXG4gIGxldCB1dGlscztcblxuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2luIGV4dGVuZHMgd2VweS5wYWdlIHtcblxuICAgIGNvbmZpZyA9IHt9O1xuICAgIGNvbXBvbmVudHMgPSB7fTtcblxuICAgIGRhdGEgPSB7XG4gICAgICBwaG9uZTogJycsLy/miYvmnLrlj7fnoIFcbiAgICAgIGlkQ29kZTogJycsLy/pqozor4HnoIFcbiAgICAgIGlzR2V0SWRDb2RlOnRydWUsLy/mmK/lkKbopoHojrflj5bpqozor4HnoIFcbiAgICAgIGlkQ29kZVRpbWU6MCxcbiAgICB9O1xuXG4gICAgY29tcHV0ZWQgPSB7fTtcblxuICAgIC8v57uR5a6a55qE5pa55rOVXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGJpbmRQaG9uZTooZSk9PntcbiAgICAgICAgdGhpcy5waG9uZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgfSxcbiAgICAgIGJpbmRJZENvZGU6KGUpPT57XG4gICAgICAgIHRoaXMuaWRDb2RlID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICB9LFxuICAgICAgZ2V0SWRDb2RlOigpPT57XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgY29uc29sZS5sb2coJ+iOt+WPlumqjOivgeeggScpO1xuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6J+iOt+WPlumqjOivgeeggeS4rScsXG4gICAgICAgICAgbWFzazp0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICdodHRwczovL3BlY2NhbmN5Jyt1dGlscy5nZXRQcmVmaXgoKSsnLmV0Y2NoZWJhby5jb20vdjEvaG9tZS9zbXMnLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHBob25lOnRoYXQucGhvbmUsXG4gICAgICAgICAgICBjaGFubmVsSWQgOiB1dGlscy5nZXRDaGFubmVsSWQoKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbXBsZXRlOigpPT57XG4vLyAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWNjZXNzOiAocmVxKSA9PiB7XG4gICAgICAgICAgICBsZXQganNvbiA9IHJlcS5kYXRhO1xuXG4vLyAgICAgICAgICAgIGpzb24gPSB7XG4vLyAgICAgICAgICAgICAgICBjb2RlOjAsXG4vLyAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfojrflj5bpqozor4HnoIEnLGpzb24pO1xuICAgICAgICAgICAgaWYoanNvbi5jb2RlPT0wKXtcbiAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICBpY29uOidzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICB0aXRsZTon5bey5oiQ5Yqf5Y+R6YCB6aqM6K+B56CBJyxcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlKHtcbiAgICAgICAgICAgICAgICBrZXk6J3Bob25lJyxcbiAgICAgICAgICAgICAgICBkYXRhOnRoYXQucGhvbmVcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgdGhhdC5pc0dldElkQ29kZSA9IGZhbHNlO1xuICAgICAgICAgICAgICB0aGF0LmlkQ29kZVRpbWUgPSA2MDtcbiAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcblxuICAgICAgICAgICAgICBsZXQgaW50ciA9IHNldEludGVydmFsKCgpPT57XG4gICAgICAgICAgICAgICAgICB0aGF0LmlkQ29kZVRpbWUtLTtcbiAgICAgICAgICAgICAgICAgIGlmKHRoYXQuaWRDb2RlVGltZTwxKXtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pc0dldElkQ29kZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRyKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgICAgICAgIH0sMTAwMClcblxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTon6ZSZ6K+vJyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBqc29uLm1zZyxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOmZhbHNlXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOigpPT57XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTon6ZSZ6K+vJyxcbiAgICAgICAgICAgICAgY29udGVudDon572R57uc6ZSZ6K+v77yM6K+36YeN6K+VJyxcbiAgICAgICAgICAgICAgc2hvd0NhbmNlbDpmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuXG4vLyAgICAgICAgd2VweS5yZXF1ZXN0KHVybCkudGhlbigoZCkgPT4gY29uc29sZS5sb2coZCkpO1xuICAgICAgfSxcbiAgICAgIGxvZ2luOihlKT0+e1xuICAgICAgICBjb25zb2xlLmxvZygn55m75b2VJyk7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgaWYoIXRoYXQucGhvbmUgfHwgdGhhdC5waG9uZS5sZW5ndGggIT0gMTEpe1xuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOifmj5DnpLonLFxuICAgICAgICAgICAgY29udGVudDon6K+36L6T5YWl5q2j56Gu55qE5omL5py65Y+3JyxcbiAgICAgICAgICAgIHNob3dDYW5jZWw6ZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZighdGhhdC5pZENvZGUpe1xuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOifmj5DnpLonLFxuICAgICAgICAgICAgY29udGVudDon6aqM6K+B56CB5LiN6IO95Li656m6JyxcbiAgICAgICAgICAgIHNob3dDYW5jZWw6ZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6J+eZu+W9leS4rScsXG4gICAgICAgICAgbWFzazp0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vcGVjY2FuY3knK3V0aWxzLmdldFByZWZpeCgpKycuZXRjY2hlYmFvLmNvbS92MS9ob21lL2F1dGgnLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHBob25lOnRoYXQucGhvbmUsXG4gICAgICAgICAgICBjb2RlOnRoYXQuaWRDb2RlLFxuICAgICAgICAgICAgY2hhbm5lbElkIDogdXRpbHMuZ2V0Q2hhbm5lbElkKCksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb21wbGV0ZTooKT0+e1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXEpID0+IHtcbiAgICAgICAgICAgIGxldCBqc29uID0gcmVxLmRhdGE7XG4vLyAgICAgICAgICAgIGpzb24gPSB7XG4vLyAgICAgICAgICAgICAgICBjb2RlOjAsXG4vLyAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnmbvlvZUnLGpzb24pO1xuICAgICAgICAgICAgaWYoanNvbi5jb2RlPT0wKXtcbiAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlKHtcbiAgICAgICAgICAgICAgICAgIGtleTondG9rZW4nLFxuICAgICAgICAgICAgICAgICAgZGF0YTpqc29uLmRhdGEudG9rZW5cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoYXQuJHJlZGlyZWN0KCcvcGFnZXMvdmVoaWNsZV9saXN0Jyk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOifplJnor68nLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGpzb24ubXNnLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6ZmFsc2VcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6KCk9PntcbiAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6J+mUmeivrycsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6J+e9kee7nOmUmeivr++8jOivt+mHjeivlScsXG4gICAgICAgICAgICAgIHNob3dDYW5jZWw6ZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuXG5cblxuICAgICAgfVxuICAgIH07XG5cbiAgICAvL+S6i+S7tuWkhOeQhlxuICAgIGV2ZW50cyA9IHt9O1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgdXRpbHMgPSBuZXcgVXRpbHModGhpcyk7XG4gICAgICB1dGlscy5pbml0KCk7XG4gICAgICBsZXQgdG9rZW4gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpO1xuICAgICAgaWYodG9rZW4pe1xuICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICAgIHRpdGxlOiAn55m75b2V5LitJyxcbiAgICAgICAgICAgIG1hc2s6dHJ1ZSxcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoYXQuJHJlZGlyZWN0KCcvcGFnZXMvdmVoaWNsZV9saXN0Jyk7XG4gICAgICB9XG5cbiAgICAgIGxldCBzX3Bob25lID0gd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKTtcbiAgICAgIGlmKHNfcGhvbmUpe1xuICAgICAgICAgIHRoYXQucGhvbmUgPSBzX3Bob25lO1xuICAgICAgfVxuICAgIH1cbiAgfVxuIl19