// pages/my/feedback/feedback.js
const api = require("../../../api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    description:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  descriptionInput(e){
    this.setData({
      description:e.detail.value
    })
  },
  submit(){
    let that=this
    if(that.data.description.length>=5){
      wx.request({
        url:api.my.feedback,
        method:'post',
        header: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': 'Bearer ' + wx.getStorageSync('token')
        },
        data:{
          description:that.data.description
        },
        success(res){
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }else{
      wx.showToast({
        title: '请输入反馈内容',
        icon: 'success',
        duration: 2000
      })
    }
  },
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