//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
  },

  toMyself(){
    swan.navigateTo({
      url: '../mySelf/mySelf',
    })
  },
  request(){
    swan.navigateTo({
      url: "../request/request",
      })
  },
  response(){
    swan.navigateTo({
      url: '../response/response',
    })
  },

  onLoad:function(){
    app.checkLoginStatus.checkSession();
  }

})
