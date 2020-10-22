// pages/request/request.js
// 引入时间组件
import { $wuxCalendar } from '../../miniprogram_npm/wux-weapp/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value3:[]
  },
  openCalendar3() {
    $wuxCalendar().open({
        value: this.data.value3,
        direction: 'vertical',
        onChange: (values, displayValues) => {
            console.log('onChange', values, displayValues)
            this.setData({
                value3: displayValues,
            })
          },
      })
  },
  nextPage(){
    wx.navigateTo({
      url: '../userInfo/userInfo',
    })
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