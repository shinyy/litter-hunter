// pages/my/register/register.js
const api = require("../../../api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
        true_name:'',
        id_card:'',
        mobile:'',
        company_name:'',
        company_province:'',
        company_city:'',
        company_district:'',
        company_address:'',
        longitude:'',
        latitude:'',
        hy_id:'',
        is_receive:0,
        code:'',

        industry:[],
        industryClassIndex:0,
        industryIndex:0,
        industryBlock:false,
        industryCur:'',
        region: ['广东省', '广州市', '海珠区'],
        noEmpty:false,
        hasInfo:false,//是否已注册

        latitude: 23.099994,
        longitude: 113.324520,
        markers: [{
          id: 1,
          latitude: 23.099994,
          longitude: 113.324520,
          name: 'T.I.T 创意园'
        }],
        covers: [{
          latitude: 23.099994,
          longitude: 113.344520,
          iconPath: '/image/location.png'
        }, {
          latitude: 23.099994,
          longitude: 113.304520,
          iconPath: '/image/location.png'
        }]

  },
  checkEmpty(){
    let dataObj={}
    if(this.data.true_name
      &&this.data.id_card.length==18
      &&this.data.mobile.length==11
      &&this.data.code
      &&this.data.company_name
      &&this.data.company_address
      &&this.data.industryCur
     ){
      dataObj={
        true_name:this.data.true_name,
        id_card:this.data.id_card,
        mobile:this.data.mobile,
        code:this.data.code,
        company_name:this.data.company_name,
        company_address:this.data.company_address,
        industryCur:this.data.industryCur
      }
      this.setData({
        noEmpty:true,
        dataObj
      })
      console.log(dataObj)
    }else{
      this.setData({
        noEmpty:false
      })
    }
  },
  checkData(){
    let info=this.data.info
    
    

    if(this.data.true_name!=info.true_name
      ||this.data.id_card!=info.id_card
      ||this.data.company_name!=info.company_name
      ||this.data.company_address!=info.company_address
      ||this.data.hy_id!=info.hy_id
      ||this.data.region[0]!=info.company_province
      ||this.data.region[1]!=info.company_city
      ||this.data.region[2]!=info.company_district
      ||this.data.is_receive!=info.is_receive

      ||this.data.mobile!=info.mobile
    ){

      info.true_name=this.data.true_name||info.true_name
      info.id_card=this.data.id_card||info.id_card
      info.company_name=this.data.company_name||info.company_name
      info.company_address=this.data.company_address||info.company_address
      info.is_receive=this.data.is_receive||info.is_receive
      info.hy_id=this.data.hy_id||info.hy_id

      info.company_province=this.data.region[0]||info.company_province
      info.company_city=this.data.region[1]||info.company_city
      info.company_district=this.data.region[2]||info.company_district

      info.mobile=this.data.mobile||info.mobile

      console.log('info')
      this.setData({
        noEmpty:true,
        info
      })


      // if(info.true_name
      //   &&info.id_card.length==18
      //   &&this.data.mobile.length==11
      //   // &&this.data.code
      //   &&info.company_name
      //   &&info.company_address
      //   // &&info.industryCur
      // ){
      //   console.log('修改了')
      //   this.setData({
      //     noEmpty:true
      //   })
      // }
    }else{
      this.setData({
        noEmpty:false
      })
    }
  },
  inputName(e){
    this.setData({
      true_name:e.detail.value
    })
    if(!this.data.hasInfo){
      this.checkEmpty()
    }else{
      this.checkData()
    }
  },
  inputCard(e){
    this.setData({
      id_card:e.detail.value
    })
    if(!this.data.hasInfo){
      this.checkEmpty()
    }else{
      this.checkData()
    }  
  },
  inputMobile(e){
    this.setData({
      mobile:e.detail.value
    })
    if(!this.data.hasInfo){
      this.checkEmpty()
    }else{
      this.checkData()
    }    
  },
  inputCode(e){
    this.setData({
      code:e.detail.value
    })
    if(!this.data.hasInfo){
      this.checkEmpty()
    }else{
      this.checkData()
    }    
    
  },
  inputCompanyName(e){
    this.setData({
      company_name:e.detail.value
    })
    if(!this.data.hasInfo){
      this.checkEmpty()
    }else{
      this.checkData()
    }    
    
  },
  inputAddress(e){
    this.setData({
      company_address:e.detail.value
    })
    if(!this.data.hasInfo){
      this.checkEmpty()
    }else{
      this.checkData()
    }    
    
  },
  switchChange(e){
    let is_receive=e.detail.value?'1':'0'
    this.setData({
      is_receive
    })
    if(this.data.hasInfo){
      this.checkData()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getCode(){
    let that=this
    wx.request({
      url:api.my.send,
      method:'post',
      header: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      data:{
        mobile:that.data.mobile
      },
      success(res){
        console.log(res)
        if(res.data.errcode==0){
          wx.showToast({  
            title: '验证码已发送', 
            icon:'warning', 
            duration: 3000  
          });
        }else{
          wx.showToast({  
            title: res.data.errmsg, 
            icon:'warning', 
            duration: 3000  
          });
        }
      }
    })
  },
  update(){
    let that=this
    let dataObj={}
    if(that.data.hasInfo){
      let info=that.data.info
      dataObj={
        true_name:info.true_name,
        id_card:info.id_card,
        mobile:info.mobile,
        company_name:info.company_name,
        company_province:info.company_province,
        company_city:info.company_city,
        company_district:info.company_district,        
        company_address:info.company_address,
        hy_id:info.hy_id,
        is_receive:info.is_receive,
        // code:that.data.code
      }
    }else{
      dataObj={
        true_name:that.data.true_name,
        id_card:that.data.id_card,
        mobile:that.data.mobile,
        company_name:that.data.company_name,
        company_province:that.data.region[0],
        company_city:that.data.region[1],
        company_district:that.data.region[2],        
        company_address:that.data.company_address,
        // longitude:'133',
        // latitude:'23',
        hy_id:that.data.hy_id,
        is_receive:that.data.is_receive,
        code:that.data.code
      }
    }


    wx.request({
      url:api.my.update,
      method:'post',
      header: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      data:dataObj,
      success(res){
        if(res.data.errcode==0){
          let userInfo=wx.getStorageSync('userInfo')
          userInfo.mobile=that.data.mobile
          wx.setStorageSync('userInfo',userInfo)
          wx.showToast({  
            title: '信息保存成功,即将跳转', 
            icon:'warning', 
            duration: 3000  
          }); 
          setTimeout(function(){
            wx.navigateTo({
              url: '../register-finish/register-finish'
            })
          },2000)
        }else{
          wx.showToast({  
            title: res.data.errmsg, 
            icon:'warning', 
            duration: 3000  
          }); 
        }
      }
    })
  },
  industryBlockShow(){
    this.setData({
      industryBlock:true
    })
  },
  industrySelect(e){
    let that=this
    that.setData({
      hy_id:e.currentTarget.dataset.id,
      industryIndex:e.currentTarget.dataset.index,
      industryBlock:false,
      industryCur:e.currentTarget.dataset.title
    })
    if(!that.data.hasInfo){
      this.checkEmpty()
    }else{
      this.checkData()
    }
    
    // wx.setStorageSync('industry',e.currentTarget.dataset.title)
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
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    if(this.data.hasInfo){
      this.checkData()
    }
    
  },
  getInfo(){
    let that=this
    wx.request({
      url:api.member_info,
      method:'get',
      header: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success(res){
        console.log(res.data.data)
        console.log(res.data.errcode)
        if(res.data.errcode==0){
          that.setData({
            info:res.data.data
          })
          if(res.data.data.company_province){
            let province=res.data.data.company_province
            let district=res.data.data.company_district
            let city=res.data.data.company_city
            that.setData({
              region: [province, city, district],
              hasInfo:true
            })
          }else{
            that.setData({
              region: ['广东省', '广州市', '海珠区'],
              
            })
          }
        }
      }
    })
  },
  onLoad: function (options) {
    this.getIndustry()
    this.getInfo()
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