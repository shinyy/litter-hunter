// pages/release/index/index.js
const api = require("../../../api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:0,
    category:null,
    hasInfo:false
  },
  tab(e){
    this.setData({
      tab:e.currentTarget.dataset.id
    })
  },
  getCategory(){
    let that=this
    wx.request({
      url:api.category,
      method:'get',
      success(res){
        that.setData({
          category:res.data.data
        })
      }
    })
  },
  checkInfo(){
    let userInfo=wx.getStorageSync('userInfo')
    if(!userInfo.mobile){
      this.setData({
        hasInfo:false
      })
      wx.showToast({  
        title: '请先完善信息', 
        icon:'warning', 
        duration: 3000  
      })
      setTimeout(function(){
        wx.navigateTo({
          url: '../../my/register/register'
        })
      },1000)
    }else{
      this.setData({
        hasInfo:true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategory()
    this.checkInfo()
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