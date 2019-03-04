// components/city/city.js
const api = require("../../api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
Component({
  properties: {
    cssType:String
  },
  data:{
    toView:'',
    cityTabIndex:0,
    cityList:null,
    cityIndex:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
  },
  methods:{
    slideup(){
      this.triggerEvent('hideCityBlock',{})
    },
    jumpTo(e){
      this.setData({
        toView: e.currentTarget.dataset.opt
      })
    },
    cityTabTap(e){
      this.setData({
        cityTabIndex:e.currentTarget.dataset.index
      })
    },
    selectCity(e){
      this.triggerEvent('hideCityBlock',{
        cityName:e.currentTarget.dataset.city,
        cityId:e.currentTarget.dataset.id
      })
    },
    getCityList(){
      let that=this
      wx.request({
        url:api.city_list,
        // url:api.new_city_list,        
        method:'get',
        success(res){
          that.setData({
            cityList:res.data.data
          })
        }
      })
    },
  },
  ready(){
    this.getCityList()
  },
})