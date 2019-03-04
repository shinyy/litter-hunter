// components/columns/text/text.js
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
    name:String,
    fieldType:String,
    value:String,
    remark:String
  },
  data:{
    dateTrue:'',
    dateNextTrue:'',
    date:'',
    y:new Date().getFullYear(),
    m:new Date().getMonth()+1,
    d:new Date().getDate(),
    // dateN:'',
    // dN:new Date().getDate()+1,
  },
  methods:{
    input(e){
      let val=e.detail.value
      let type=e.currentTarget.dataset.type
      if(type=="DECIMAL"){
        val=parseFloat(val).toFixed(2)
      }
      this.triggerEvent('textInput',{
        val
      })
    },
    bindDateChange(e){
      this.triggerEvent('ticketDateInput',{
        ticketDate:e.detail.value
      })
      this.setData({
        date:e.detail.value
      })
    },
    dateFormat(){
      let m=this.data.m<10?'0'+this.data.m:this.data.m
      let d=this.data.d<10?'0'+this.data.d:this.data.d
      this.setData({
        dateTrue:this.data.y+"-"+m+"-"+d
      })
    },
  },
  ready(){
    this.dateFormat()
  }
})