export default class Utils {
  _self = '';
  env = '-test';//-dev -test
  channelId = 'wzccb';

  constructor(that){
    this._self = that;
  }
  init(){
    // this._self.env = this._self.$wxapp.$app.globalData.env;
  }
  getPrefix(){
    //-dev -test
    return this.env;
  }
  getChannelId(){
    return this.channelId;
  }
}
