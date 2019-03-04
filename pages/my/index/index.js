// pages/my/index.js
const api = require("../../../api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../../images/my_banner_refresh.png',
      '../../../images/my_banner_refresh.png',
      '../../../images/my_banner_refresh.png'      
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    info:null,
    headImg:''
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  getIndex(){
    let that=this
    wx.request({
      url:api.my.index,
      method:'get',
      header: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success(res){
        console.log(res.data.data)
        that.setData({
          info:res.data.data
        })
      }
    })
  },
  call(e){
    let info=this.data.info
    let type=e.currentTarget.dataset.type
    if(type==1){
      wx.makePhoneCall({
        phoneNumber:info.business_cooperation
      })
    }else{
      wx.makePhoneCall({
        phoneNumber:info.contact_us
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIndex()
    this.setData({
      headImg:wx.getStorageSync('userInfo').headimgurl
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