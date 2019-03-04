// pages/message/index.js
const api = require("../../api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    list:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getMessage(){
    let that=this
    let page=that.data.page
    wx.request({
      url:api.message,
      method:'get',
      data:{
        // page,
      },
      success(res){
        console.log(res.data.data)
        that.setData({
          list:res.data.data
        })
      }
    })
  },
  onLoad: function (options) {
    this.getMessage()
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
    let that = this
    let page = that.data.page
    let list=that.data.list
    if(page<list.last_page){
      page++
      wx.showLoading({
        title: '玩命加载中'
      })
      wx.request({
        url:api.message,
        method:'get',
        data:{
          page
        },
        success(res){
          list.data=list.data.concat(res.data.data.data)
          that.setData({
            list,
            page
          })
          wx.hideLoading()
        }
      })
    }
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})