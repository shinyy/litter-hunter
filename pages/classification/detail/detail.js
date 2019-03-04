// pages/classification/detail/detail.js
const api = require("../../../api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['../../images/banner.png'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    id: '',
    showAuthority: false,    
    detail: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getInfo(id = 2) {
    let that = this
    let type = that.data.type
    let url = type == 'demand' ? api.classification.demandDetail : api.classification.detail
    console.log(type)
    wx.request({
      url: url + id,
      method: 'get',
      success(res) {
        console.log(res.data.data)
        that.setData({
          detail: res.data.data
        })
      }
    })
  },
  call() {
    let that = this
    let view_pay = that.data.detail.view_pay
    let view_pay_coins= that.data.detail.view_pay_coins
    if (view_pay) {
      if(view_pay_coins>0){
        wx.showModal({
          title: '是否确花费'+view_pay_coins+'金币进行联系？',
          content: '点击“确定”联系',
          success(res) {
            if (res.confirm) {
              wx.request({
                url: api.classification.getPhone + that.data.id,
                method: 'get',
                header: {
                  'X-Requested-With': 'XMLHttpRequest',
                  'Authorization': 'Bearer ' + wx.getStorageSync('token')
                },
                success(res) {
                  console.log(res.data.errcode)
                  if (res.data.errcode == 10001) {
                    wx.showModal({
                      title: res.data.errmsg,
                      content: '点击“确定”去充值',
                      success(res) {
                        if (res.confirm) {
                          wx.navigateTo({
                            url: '../../my/recharge/recharge'
                          })
                        } else if (res.cancel) {
                          console.log('取消')
                        }
                      }
                    })
                  } else if (res.data.errcode == 0) {
                    wx.makePhoneCall({
                      phoneNumber: res.data.data.mobile
                    })
                  }
                }
              })
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
      }else{
        wx.request({
          url: api.classification.getPhone + that.data.id,
          method: 'get',
          header: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Bearer ' + wx.getStorageSync('token')
          },
          success(res) {
            console.log(res.data.errcode)
            if (res.data.errcode == 10001) {
              wx.showModal({
                title: res.data.errmsg,
                content: '点击“确定”去充值',
                success(res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../../my/recharge/recharge'
                    })
                  } else if (res.cancel) {
                    console.log('取消')
                  }
                }
              })
            } else if (res.data.errcode == 0) {
              wx.makePhoneCall({
                phoneNumber: res.data.data.mobile
              })
            }
          }
        })
      }
      
    } else {
      wx.makePhoneCall({
        phoneNumber: that.data.detail.member.mobile
      })
    }
  },
  checkInfo(){
    let userInfo=wx.getStorageSync('userInfo')
    if(!userInfo.mobile){
      wx.showModal({
        title: '尚未完成注册',
        content: '点击“确定”跳转注册',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../../my/register/register'
            })
          }
        }
      })
    }else{
      this.call()
    }
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
  onLoad: function (options) {
    this.checkToken()
    this.setData({
      id: options.id,
      // type:options.type||'demand'
      type: options.type
    })
    this.getInfo(options.id)
  },
  share(e) {

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
  onShareAppMessage: function (options) {
    console.log(options)
    let that = this
    let detail = that.data.detail
    if (options.from == "button") {
      return {
        title: detail.title,
        imageUrl: detail.main_image,
        path: 'pages/classification/detail/detail?id=' + that.data.id + '&type=' + that.data.type
      }
    }
  }
})