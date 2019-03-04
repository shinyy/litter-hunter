// pages/my/release/Release.js
const api = require("../../../api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null,
    index:0,
    page:1,
    lastPage:'',
    type:'all'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  tabTap(e){
    let index=e.currentTarget.dataset.index
    let type=e.currentTarget.dataset.type
    this.setData({
      index,
      type,
      page:1
    })
    this.getList(type)
  },
  getList(type='all'){
    wx.showLoading({
      title: '玩命加载中'
    })
    let that=this
    wx.request({
      url:api.my.list+type,
      method:'get',
      header: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success(res){
        that.setData({
          list:res.data.data,
          lastPage:res.data.data.last_page
        })
        wx.hideLoading()
      }
    })
  },
  delInfo(e){
    let that=this
    let id=e.currentTarget.dataset.id
    let list=that.data.list
    let index=e.currentTarget.dataset.index
    wx.showModal({
      title: '确认删除该信息吗？',
      content: '删除后将不再可见',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url:api.my.destroy+id,
            method:'post',
            header: {
              'X-Requested-With': 'XMLHttpRequest',
              'Authorization': 'Bearer ' + wx.getStorageSync('token')
            },
            success(res){
              //删除本地数组 在不刷新下造成已删除假象
              list.data.splice(index,1)
              that.setData({
                list
              })
              wx.showToast({
                title:'删除成功'
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
    
  },
  onLoad: function (options) {
    this.getList()
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
  onReachBottom() {
      let that = this
      let page = that.data.page
      let list=  that.data.list
      let Url = api.my.list+'all'

      if (page <that.data.lastPage) {
        page++
        wx.showLoading({
          title: '玩命加载中'
        })
        wx.request({
          url: Url,
          method: 'get',
          header:{
            'X-Requested-With':'XMLHttpRequest',
            'Authorization': 'Bearer ' + wx.getStorageSync('token')
          },
          data: {
            page
          },
          success(res) {
            list.data=list.data.concat(res.data.data.data)
            that.setData({
              list,
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