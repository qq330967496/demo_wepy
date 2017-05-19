"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),Index=function(e){function t(){var e,a,n,o;_classCallCheck(this,t);for(var l=arguments.length,r=Array(l),i=0;i<l;i++)r[i]=arguments[i];return a=n=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(r))),n.config={},n.components={},n.data={img_mode:"",plate_num:"",frame_num:"",engine_num:"",plate_val:"粤A",isShowPlat:!1,plate_data:{},plate_short:[],plate_letter:[],plate_init:""},n.computed={},n.methods={bindPlateNum:function(e){this.plate_num=e.detail.value},bindFrameNum:function(e){this.frame_num=e.detail.value},bindEngineNum:function(e){this.engine_num=e.detail.value},toSearch:function(e){var t=this;console.log("查询"),console.log("车辆号码：",t.plate_val+t.plate_num),console.log("车架号码：",t.frame_num),console.log("发动机号：",t.engine_num)},init_plate:function(){var e=n;_wepy2.default.request({url:"https://peccancy.etcchebao.com/v1/query/provinces",success:function(t){if(e.plate_short=[],e.plate_letter=[],e.plate_data=t.data.data,console.log(t.data),0==t.data.code){for(var a=0;a<t.data.data.length;a++)if(e.plate_short.push(t.data.data[a].province),"粤"==t.data.data[a].province)for(var n=0;n<t.data.data[a].citys.length;n++)e.plate_letter.push(t.data.data[a].citys[n].city_code);e.plate_init=[14,0]}}})},plate_picker_change:function(e){var t=n,a=e.detail.value;a[0]!=t.plate_init[0]?(t.plate_init=a,n.methods.set_plate_letter(a[0])):t.plate_init=a},set_plate_letter:function(e){var t=n;t.plate_letter=[];for(var a=0;a<t.plate_data[e].citys.length;a++)t.plate_letter.push(t.plate_data[e].citys[a].city_code);t.plate_init=[e,0]},open_plate:function(){n.isShowPlat=!0},close_plate:function(){var e=n;e.isShowPlat=!1,e.plate_val=e.plate_short[e.plate_init[0]],e.plate_val+=e.plate_letter[e.plate_init[1]]}},n.events={},o=a,_possibleConstructorReturn(n,o)}return _inherits(t,e),_createClass(t,[{key:"onLoad",value:function(){var e=this;e.img_mode=this.$wxapp.$app.globalData.img_mode,e.methods.init_plate()}}]),t}(_wepy2.default.page);Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(Index,"pages/index"));