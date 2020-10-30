// pages/mySelf/mySelf.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     loginUser:app.cache.getNonExport('loginUser'),
     toUserId:''
  },
  addFriends(){
    swan.navigateTo({
        url:"../addFriends/addFriends"
    })
  },
  onlineService(){
    swan.navigateTo({
        url:"../onlineService/onlineService"
    });
  },
  professHistory(){
    swan.navigateTo({
        url:"../peofessHistory/peofessHistory"
    })
  },
  toChatRoom(){

    if(this.data.toUserId == ''){
        app.showToastFail('toUserId is null !')
        return;
    }

    swan.navigateTo({
       url:`../chatRoom/chatRoom?toUserId=${this.data.toUserId}`
    });

  },

  getToUserId(e){
     this.setData({
         toUserId:e.detail.value
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.login()
  },

  login(){
    swan.login({
        success: res => {
            console.log('login success', res);
            var code = res.code;
            var username = "13571727709";
            let url = app.globalData.URL + `:8200/auth/login/${username}/${code}`;
            swan.request({
                url: url,
                method:'get',
                success:res=>{
                    console.log(res)

                    if(res.data.code != 200){
                        app.showToastFail(res.data.msg)
                        return;
                    }

                    this.setData({
                        loginUser:res.data.data,
                    })

                    if(res.data.data.aprisKeyWords == null || res.data.data.aprisKeyWords==''){
                        this.setData({
                            'loginUser.aprisKeyWords':['','',''],
                        })
                    }else{
                        this.setData({
                            'loginUser.aprisKeyWords':JSON.parse(res.data.data.aprisKeyWords)
                        })
                    }
                    app.cache.putNonExport("loginUser",this.data.loginUser);
                    app.showToastSuccess('登录成功！')
                },
                fail:err=>{
                    console.log(err)
                    app.showToastFail('登录失败！')
                }
            })
        },
        fail: err => {
            console.log('login fail', err);
            app.showToastFail('登录失败！')
        }
    });
  },

  onShow() {
    // 用户进入小程序检测小程序在手百的登陆态是否有效
    swan.checkSession({
        success: res => {
            console.log('用户的登陆态有效', res);
        },
        fail: err => {
            // 小程序的登陆态失效，需要再次登录
            swan.login({
                success: res => {
                    console.log('login success', res);
                },
                fail: err => {
                    console.log('login fail', err);
                }
            });
        }
    });
  },

  getUserInfo(e) {
    console.log("userInfo",e.detail.userInfo)
    console.log('用户名称', e.detail.userInfo.nickName)
    console.log('用户头像', e.detail.userInfo.avatarUrl)
    console.log('用户性别', e.detail.userInfo.gender)

    let url = app.globalData.URL + `:8100/user/update`;
    let data = app.cache.getNonExport('loginUser');
    this.setData({
        "data.nickName":e.detail.userInfo.nickName,
        "data.userPic":e.detail.userInfo.avatarUrl,
        "data.sex":e.detail.userInfo.gender,
        "data.aprisKeyWords":JSON.stringify(data.aprisKeyWords)
    })
    // data.nickName = e.detail.userInfo.nickName;
    // data.userPic = e.detail.userInfo.avatarUrl;
    // data.sex = e.detail.userInfo.gender
    // data.aprisKeyWords = JSON.stringify(data.aprisKeyWords);

    swan.request({
        url: url,
        method:'post',
        data:data,
        success:res=>{
            console.log(res);

            if(res.data.code != 200){
                app.showToastFail(res.data.msg)
                return;
            }

            this.setData({
                loginUser:res.data.data
            })
            console.log(this.data.loginUser);
            if(res.data.data.aprisKeyWords == null || res.data.data.aprisKeyWords==''){
                this.setData({
                    'loginUser.aprisKeyWords':['','',''],
                })
            }else{
                this.setData({
                    'loginUser.aprisKeyWords':JSON.parse(res.data.data.aprisKeyWords)
                })
            }
            app.cache.putNonExport("loginUser",this.data.loginUser);
            app.showToastSuccess('成功获取用户信息')
        },
        fail:err=>{
            console.log(err)
            app.showToastFail('获取用户信息失败')
        }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})