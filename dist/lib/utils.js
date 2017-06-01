'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
  function Utils(that) {
    _classCallCheck(this, Utils);

    this._self = '';
    this.env = '-dev';
    this.env = '-test';
    this.env = '';
    this.channelId = 'wzccb';

    this._self = that;
  }

  _createClass(Utils, [{
    key: 'init',
    value: function init() {
      // this._self.env = this._self.$wxapp.$app.globalData.env;
    }
  }, {
    key: 'getPrefix',
    value: function getPrefix() {
      //-dev -test
      return this.env;
    }
  }, {
    key: 'getChannelId',
    value: function getChannelId() {
      return this.channelId;
    }
  }]);

  return Utils;
}();

exports.default = Utils;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbIlV0aWxzIiwidGhhdCIsIl9zZWxmIiwiZW52IiwiY2hhbm5lbElkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQXFCQSxLO0FBT25CLGlCQUFZQyxJQUFaLEVBQWlCO0FBQUE7O0FBQUEsU0FOakJDLEtBTWlCLEdBTlQsRUFNUztBQUFBLFNBTGpCQyxHQUtpQixHQUxYLE1BS1c7QUFBQSxTQUpqQkEsR0FJaUIsR0FKWCxPQUlXO0FBQUEsU0FIakJBLEdBR2lCLEdBSFgsRUFHVztBQUFBLFNBRmpCQyxTQUVpQixHQUZMLE9BRUs7O0FBQ2YsU0FBS0YsS0FBTCxHQUFhRCxJQUFiO0FBQ0Q7Ozs7MkJBQ0s7QUFDSjtBQUNEOzs7Z0NBQ1U7QUFDVDtBQUNBLGFBQU8sS0FBS0UsR0FBWjtBQUNEOzs7bUNBQ2E7QUFDWixhQUFPLEtBQUtDLFNBQVo7QUFDRDs7Ozs7O2tCQW5Ca0JKLEsiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBVdGlscyB7XG4gIF9zZWxmID0gJyc7XG4gIGVudiA9ICctZGV2JztcbiAgZW52ID0gJy10ZXN0JztcbiAgZW52ID0gJyc7XG4gIGNoYW5uZWxJZCA9ICd3emNjYic7XG5cbiAgY29uc3RydWN0b3IodGhhdCl7XG4gICAgdGhpcy5fc2VsZiA9IHRoYXQ7XG4gIH1cbiAgaW5pdCgpe1xuICAgIC8vIHRoaXMuX3NlbGYuZW52ID0gdGhpcy5fc2VsZi4kd3hhcHAuJGFwcC5nbG9iYWxEYXRhLmVudjtcbiAgfVxuICBnZXRQcmVmaXgoKXtcbiAgICAvLy1kZXYgLXRlc3RcbiAgICByZXR1cm4gdGhpcy5lbnY7XG4gIH1cbiAgZ2V0Q2hhbm5lbElkKCl7XG4gICAgcmV0dXJuIHRoaXMuY2hhbm5lbElkO1xuICB9XG59XG4iXX0=