// pages/my/recharge/recharge.js
const api = require("../../../api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null,
    pay_finish:false,
    rechargeFromSp:false
  },
  getRechargeList(){
    let that=this
    wx.request({
      url:api.my.recharge_list,
      method:'get',
      header: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success(res){
        that.setData({
          list:res.data.data
        })
      }
    })
  },
  recharge(e){
    let that=this
    let coins=e.currentTarget.dataset.coins
    let money=e.currentTarget.dataset.money
    wx.request({
      url:api.my.recharge,
      method:'post',
      header: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      data:{
        coins
      },
      success(res){
        let order_sn=res.data.data.order_sn
        wx.request({
          url:api.my.pay,
          method:'post',
          header: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Bearer ' + wx.getStorageSync('token')
          },
          data:{
            order_sn
          },
          success(res){
            let payData=res.data.data
            payData.timeStamp=payData.timestamp
            wx.requestPayment({
              timeStamp: payData.timestamp,
              nonceStr: payData.nonceStr,
              package: payData.package,
              signType: payData.signType,
              paySign: payData.paySign,
              success(res){
                that.setData({
                  pay_finish:true,
                  coins,
                  money
                })
              },
              fail(res){
                wx.showToast({
                  title:'支付失败'
                })
              }
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRechargeList()
    if(options.rechargeFromSp){
      this.setData({
        rechargeFromSp:true
      })
    }
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