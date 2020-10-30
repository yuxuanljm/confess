//app.js
App({
  //设置全局请求URL
  globalData:{
    URL: 'http://192.168.1.23',
  },
  wxRequest(method, url, data, callback, errFun) {
    swan.request({
      url: url,
      method: method,
      data: data,
      // 设置请求头
      header: {
        'content-type': method == 'GET'?'application/json':'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      dataType: 'json',
      success: function (res) {
        callback(res.data);f
      },
      fail: function (err) {
        errFun(res);
      }
    })
  },

  onLaunch: function () {
    // 展示本地存储能力
    // var logs = swan.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // swan.setStorageSync('logs', logs)
     //设置全局请求URL

    // 获取用户信息
    /*swan.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          swan.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })*/
  },

    cache:{

        put(k, v, t) {
            var seconds = parseInt(t);
            if (seconds > 0) {
                var timestamp = Date.parse(new Date());
                var endTime = timestamp / 1000 + seconds;
                swan.setStorageSync(k, endTime + "-" + v)
            }
        },

        putNonExport(k,v){
            swan.setStorageSync(k,v)
        },

        getNonExport(k){
            return swan.getStorageSync(k);
        },

        get(k) {
            var deadtime = parseInt(swan.getStorageSync(k).split('-')[0])

            if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
                return null;
            }else{
                return swan.getStorageSync(k).split('-')[1];
            }
        },

        remove(k) {
            swan.removeStorageSync(k);
            swan.removeStorageSync(k);
        },

        clear() {
            swan.clearStorageSync();
        }
    },

    checkLoginStatus:{
        checkSession() {
            swan.checkSession({
                success: res => {
                    console.log("登录状态有效",res)
                },
                fail: err => {
                    console.log(err);
                    // app.showToastFail("登录状态过期！")
                }
            });
        }
    },

    showToastFail(content) {
        swan.showToast({
            title: content,
            mask: false,
            icon:'none'
        });
    },
    showToastSuccess(content) {
        swan.showToast({
            title: content,
            mask: false,
        });
    },
    showConfirmWarning(title,content) {
        swan.showModal({
            title: title,
            content: content,
            showCancel: true,
            confirmText: '确定',
            cancelText: '取消',
            cancelColor: '#000000',
            confirmColor: '#F7544F',
            success: res => {
                console.log('res',res.confirm)
            }
        });
    }
})