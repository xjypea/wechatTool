// index.js
// 获取应用实例
const app = getApp()

//鲜益加  wx226de44c747ae7b6
//公益  wx566475d97a1a2d08

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad() {
    // 查看是否授权
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },
  bindGetUserInfo (e) {
    console.log(e.detail.userInfo)
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getUserProfile() {
    // 调用 wx.getUserProfile 前不能有其他异步操作
    wx.getUserProfile({
      desc: "完善用户信息",
      success: (infoRes) => {
        console.log(infoRes);
        const { userInfo } = infoRes;
        console.log(JSON.stringify(userInfo, null, 2));
      }
    });
  },
  onSub(){
    console.log(111);
    wx.requestSubscribeMessage({
      tmplIds: ['1PXL9StEJzQofjhZNdwMNpNYWQ_grD3aptBDqshxm6c'],
      success(res) { 
        console.log(res)
      },
      fail:function (err) {
          console.log(err)
      }
    })
  },
  dologin(){
    wx.login({
      success (res) {
        if (res.code) {
          console.log("code的值为："+res.code);
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  location(){
      wx.getLocation({
        type: 'wgs84',
        success (res) {
          const latitude = res.latitude
          const longitude = res.longitude
          const speed = res.speed
          const accuracy = res.accuracy
          console.log("纬度："+latitude,"经度"+longitude)
        }
      })
  },
  getPhoneNumber (e) {
    console.log("授权手机号:",e);
    console.log("encryptedData:",e.detail.encryptedData);
    console.log("iv:",e.detail.iv);
    wx.login({
      success: function(res){
        console.log("code:",res.code);
      }
    })
  },
  pay(){
    wx.requestPayment({
      timeStamp: '1650007255',
      nonceStr: '4ab275d4a96cb9a936524f43edee3e8e',
      package: 'wx151520464098822898b05bc19bf3810000',
      signType: 'MD5',
      paySign: '0A6DF50A9EC1622CF5CF0D93042BE029',  //prepay_id 
      success (res) {
        console.log('pay success', res)
       },
      fail (res) {
        console.error('pay fail', err)
       }
    })
  }
})
