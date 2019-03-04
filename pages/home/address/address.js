// pages/home/address/address.js
const api = require("../../../api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView:'',
    cityIndex:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    tabIndex:0,
    searchSeen:false,
    cityList:null
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  jumpTo(e){
    this.setData({
      toView: e.currentTarget.dataset.opt
    })
  },
  tabTap(e){
    this.setData({
      tabIndex:e.currentTarget.dataset.index
    })
  },
  selectCity(e){
    wx.setStorageSync('city',e.currentTarget.dataset.city)
    wx.setStorageSync('lat',e.currentTarget.dataset.lat)
    wx.setStorageSync('lng',e.currentTarget.dataset.lng)
    wx.navigateTo({
      url: '../index/index'
    })
  },
  getCityList(){
    let that=this
    wx.request({
      // url:api.city_list,
      url:api.new_city_list,
      method:'get',
      success(res){
        console.log(res.data.data)
        that.setData({
          cityList:res.data.data
        })
        console.log(that.data.cityList)
      }
    })
  },
  getCity() {
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        // wx.setStorageSync('lat', res.latitude)
        // wx.setStorageSync('lng', res.longitude)
        wx.request({
          url: 'https://api.map.baidu.com/geocoder/v2/?ak=rARyIP0dCZ4RjZZdU55pGrgbj1Rn3PtU&location=' + res.latitude + ',' + res.longitude + '&output=json',
          success(res) {
            // wx.setStorageSync('city', res.data.result.addressComponent.city.split('市').join(''))
            that.setData({
              nowCityName: res.data.result.addressComponent.city.split('市').join('')
            })
          }
        })
      }
    })
  },
  search(e){
    let that=this
    let city=that.data.cityList
    let result=[]
    let word=e.detail.value.replace(/\s+/g, '')
    if(word!=''){
      that.setData({
        searchSeen:true
      })
      for(let key in city){
        for(let i=0,len=city[key].length;i<len;i++){
          if(city[key][i].region_name.indexOf(word)>-1){
            result.push(city[key][i])
            that.setData({
              result
            })
          }
        }
      }
      if(result.length==0){
        wx.showToast({
                title: '暂无收录',
                icon: 'success',
                duration: 2000
              })
      }
    }else{
      that.setData({
        searchSeen:false,
        result:[]
      })
    }
  },
  onLoad: function (options) {
    this.getCityList()
    this.getCity()
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