// pages/my/detail/detail.js
const api = require("../../../api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flows:null,
    page:1
  },
  getFlows(){
    let that=this
    wx.request({
      url:api.my.flows,
      method:"get",
      header: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success(res){
        console.log(res.data.data)
        that.setData({
          flows:res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFlows()
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
    let that=this
    let flows=that.data.flows
    let page=that.data.page
    let lastPage=flows.last_page
    let url=api.my.flows
    if(page<lastPage){
      page++,
      wx.showLoading({
        title:'玩命加载中'
      }),
      wx.request({
        url,
        method:'get',
        header: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': 'Bearer ' + wx.getStorageSync('token')
        },
        data:{page},
        success(res){
          console.log(res.data.data)
          flows.data=flows.data.concat(res.data.data.data)
          that.setData({
            flows,
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