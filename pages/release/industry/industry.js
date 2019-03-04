// pages/release/industry/industry.js
const api = require("../../../api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    industry:[],
    industryClassIndex:0,
    industryIndex:0,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  industrySelect(e){
    let that=this
    that.setData({
      industryIndex:e.currentTarget.dataset.index
    })
    wx.setStorageSync('industry',e.currentTarget.dataset.title)
    // wx.navigateBack({
    //   industry:e.currentTarget.dataset.title
    // })
    wx.navigateTo({
      url: '../detail/detail?industry='+e.currentTarget.dataset.title
    })
  },
  industryClass(e){
    let that=this
    that.setData({
      industryClassIndex:e.currentTarget.dataset.id,
      industryIndex:0
    })
  },
  getIndustry(){
    let that=this
    wx.request({
      url:api.classification.industry,
      method:'get',
      success(res){
        that.setData({
          industry:res.data.data
        })
      }
    })
  },
  onLoad: function (options) {
    this.getIndustry()
    
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