// pages/contact/contact.js
const app = getApp();
var msgList = [];
var windowWidth = swan.getSystemInfoSync().windowWidth;
var windowHeight = swan.getSystemInfoSync().windowHeight;
var keyHeight = 0;
var webSocket;

function startWebSocket(that) {
  console.log("start...")
  swan.connectSocket({
    url: `ws://192.168.1.23:9100/chat/${swan.getStorageSync('loginUser').id}`,
    data: {},
    method: 'GET',
    success: function (res) {
      console.log("connectSocket 成功")
    },
    fail: function (res) {
      console.log("connectSocket 失败")
    }
  })

  swan.onSocketError(function () {
  })

  swan.onSocketMessage(function (data_) {
    socketOperation(data_)
  })

  swan.onSocketClose(function (res) {
    console.log("close...");
  })

  swan.onSocketMessage(function (data) {
    console.log("收到信息", data)
    if (!JSON.parse(data.data).system) {
       msgList.push({
         speaker:  'server',
         contentType:  'text',
         content: JSON.parse(data.data).message.msg
       })
    }
    that.setData({
      msgList,
    })

  })
}
//连接websocket
function sendMessage(that) {
  var mCmd = { "fromUserId": swan.getStorageSync('loginUser').id, "toUserId": that.data.toUserId, "message": { "msg": that.data.inputVal } }
  swan.sendSocketMessage({
    data: JSON.stringify(mCmd),
    success: function (res) {
      console.log("发送信息成功",mCmd);
    },
    fail: function (res) {
      console.log("发送信息失败",mCmd)
    }
  });
  that.setData({
    inputVal:''
  })
}

/**
 * 初始化数据
 */
function initData(that) {
  msgList = [{
    speaker: 'server',
    contentType: 'text',
    content: '欢迎来到英雄联盟，敌军还有30秒到达战场，请做好准备！'
  },
  {
    speaker: 'customer',
    contentType: 'text',
    content: '我怕是走错片场了...'
  }
  ]
  that.setData({
    msgList,
  })

}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '100vh',
    inputBottom: 0,
    inputVal: '',
    toUserId:''
  },

  method: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //connect();
    this.setData({
        toUserId:options.toUserId
    })

    if(this.data.toUserId == '' || this.data.toUserId == undefined){
        app.showToastFail('toUserId不能为空！')
        return;
    }

    app.checkLoginStatus.checkSession();
    startWebSocket(this);
    initData(this);
    this.setData({
      // cusHeadIcon: app.globalData.userInfo.avatarUrl,
    });

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

onHide:function(){

},
  //
 onUnload: function(){
    var that = this;
    console.log(that);
    swan.showModal({
        title: '是否返回',
        content: "返回将退出聊天，是否继续？",
        showCancel: true,
        confirmText: '退出',
        cancelText: '继续聊天',
        cancelColor: '#000000',
        confirmColor: '#F7544F',
        success: (res)  => {
            console.log(res)
            if(res.confirm){
                swan.closeSocket();
            }else{
                swan.navigateTo({
                    url:`/pages/chatRoom/chatRoom?toUserId=${this.data.toUserId}`,
                });
            }
        }
    });
 },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 获取聚焦
   */
  focus: function (e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);
  },

  //失去聚焦(软键盘消失)
  blur: function (e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  sendClick: function (e) {
    console.log(e)
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    this.setData({
      msgList,
      inputVal: e.detail.value
    });

    // console.log(this.data.inputVal)
    sendMessage(this);
  },

  /**
   * 退回上一页
   */
  toBackClick: function () {
      swan.navigateBack({})
  }
})
