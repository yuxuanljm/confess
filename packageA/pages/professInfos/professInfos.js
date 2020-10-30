// pages/professInfos/professInfos.js
const isTel = (value) => !/^1[34578]\d{9}$/.test(value)
Page({
  onChange(e) {
      // console.log('onChange', e)
      this.setData({
          error: isTel(e.detail.value),
          value: e.detail.value,
      })
  },
  nextPage() {
    swan.navigateTo({
        url: '../success/success'
    });
  },
  onFocus(e) {
      this.setData({
          error: isTel(e.detail.value),
      })
      // console.log('onFocus', e)
  },
  onBlur(e) {
      this.setData({
          error: isTel(e.detail.value),
      })
      // console.log('onBlur', e)
  },
  onConfirm(e) {
      console.log('onConfirm', e)
  },
  onClear(e) {
      // console.log('onClear', e)
      this.setData({
          error: true,
          value: '',
      })
  },
  onError() {
      wx.showModal({
          title: 'Please enter 11 digits',
          showCancel: !1,
      })
  },
  /**
   * 页面的初始数据
   */
  /**
    * 页面的初始数据
    */
  data: {
    items:[
      { name: 'girl', value: '女',checked: 'true' },
      { name: 'boy', value: '男',  },
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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