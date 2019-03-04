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
    circular: true,    
    autoplay: true,
    interval: 3000,
    duration: 1000,
    tab: 0,
    showAuthority: false,
    info: null,
    special: [],
    news: null,
    page: 1,
    newsType: 'all',
    cityName: ''
  },
  //检测token
  checkToken() {
    let that = this
    if (!wx.getStorageSync('token')) {
      that.setData({
        showAuthority: true
      })
    }
  },
  //获取授权
  getSecret: function (e) {
    let that = this
    wx.showLoading({
      title: '玩命加载中'
    })
    wx.login({
      success: function (res) {
        wx.request({
          url: api.login,
          method: 'post',
          data: {
            code: res.code,
            // userInfo:e.detail.userInfo,
            // rawData:e.detail.rawData,
            // signature:e.detail.signature,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv
          },
          success: function (res) {
            wx.setStorageSync('token', res.data.data.access_token)
            // wx.setStorageSync('userInfo',e.detail.userInfo)
            wx.setStorageSync('userInfo', res.data.data.member_info)
            wx.hideLoading()
            that.setData({
              showAuthority: false
            })
          }
        })
      }
    })

  },
  searchJump() {
    wx.navigateTo({
      url: '../../classification/search/exhibition'
    })
  },
  getNews(type = 'all') {
    let that = this
    let latitude = wx.getStorageSync('lat')
    let longitude = wx.getStorageSync('lng')
    wx.request({
      url: api.index.new + type,
      method: 'get',
      data: {
        latitude,
        longitude
      },
      success(res) {
        that.setData({
          news: res.data.data
        })
      }

    })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  tab(e) {
    this.setData({
      tab: e.currentTarget.dataset.id
    })
  },
  getInfo() {
    let that = this
    wx.request({
      url: api.index.info,
      method: 'get',
      success(res) {
        that.setData({
          info: res.data.data
        })
      }
    })
  },
  getHot() {
    let that = this
    let latitude = wx.getStorageSync('lat')
    let longitude = wx.getStorageSync('lng')
    wx.request({
      url: api.index.hot,
      method: 'get',
      data: {
        latitude,
        longitude
      },
      success(res) {
        that.setData({
          hot: res.data.data
        })
      }
    })
  },
  getSpecial() {
    let that = this
    let latitude = wx.getStorageSync('lat')
    let longitude = wx.getStorageSync('lng')
    wx.request({
      url: api.index.special,
      method: 'get',
      data: {
        latitude,
        longitude
      },
      success(res) {
        that.setData({
          special: res.data.data
        })
      }
    })
  },
  newsTap(e) {
    let that = this
    let newsType = e.currentTarget.dataset.type
    that.setData({
      newsType,
      page: 1
    })
    that.getNews(newsType)
  },
  getCity() {
    let that = this
    if (!wx.getStorageSync('city')) {
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          wx.setStorageSync('lat', res.latitude)
          wx.setStorageSync('lng', res.longitude)
          wx.request({
            url: 'https://api.map.baidu.com/geocoder/v2/?ak=rARyIP0dCZ4RjZZdU55pGrgbj1Rn3PtU&location=' + res.latitude + ',' + res.longitude + '&output=json',
            success(res) {
              wx.setStorageSync('city', res.data.result.addressComponent.city.split('市').join(''))
              that.setData({
                cityName: res.data.result.addressComponent.city.split('市').join('')
              })
              that.getNews()//获取坐标后再请求 下同
              that.getHot()
              that.getSpecial()
            }
          })
        }
      })
    } else {
      that.setData({
        cityName: wx.getStorageSync('city')
      })
      that.getNews()
      that.getHot()
      that.getSpecial()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    this.checkToken()
    this.getInfo()
    // this.getSpecial()
    // this.getHot()

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
    // this.getCity()

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
    let news = that.data.news
    let newsType = that.data.newsType
    let Url = api.index.new + newsType
    let latitude = wx.getStorageSync('lat')
    let longitude = wx.getStorageSync('lng')

    if (page < news.last_page) {
      page++
      wx.showLoading({
        title: '玩命加载中'
      })
      wx.request({
        url: Url,
        method: 'get',
        header: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': 'Bearer ' + wx.getStorageSync('token')
        },
        data: {
          page,
          latitude,
          longitude
        },
        success(res) {
          news.data = news.data.concat(res.data.data.data)
          that.setData({
            news,
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