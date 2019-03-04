// pages/release/extension/extension.js
const api = require("../../../api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spacil:1,
    setTop:1,
    topList:null,
    topKey:'',//不为空即开启了置顶
    topVal:'',
    price:'',
    nowPrice:'',//与num同时不为空即为开启了特价
    num:'',
    coins:'',  
    specialCoins:'',  
    topCoins:'',
    totalCoins:''
  },
  checkSpecial(){
    if(this.data.nowPrice&&this.data.num){//判断是否同时有现价和数量
      this.setData({
        specialCoins:this.data.coins
      })
    }else{
      this.setData({
        specialCoins:''
      })
    }
    console.log(this.data.specialCoins)
  },
  nowPrice(e){
    let val=e.detail.value
    val=parseFloat(val).toFixed(2)
    this.setData({
      nowPrice:val
    })
    this.checkSpecial()
    this.total()
  },
  inputNum(e){
    let val=e.detail.value
    val=parseInt(val)
    this.setData({
      num:val
    })
    this.checkSpecial()  
    this.total()  
  },
  topSelect(e){//置顶选择
    this.setData({
      topKey:e.currentTarget.dataset.key,
      topVal:e.currentTarget.dataset.val,
      topCoins:e.currentTarget.dataset.key.split("-")[0],      
      setTop:1
    })
    this.total()
  },
  total(){//总金币
    let coins=this.data.coins
    let specialCoins=this.data.specialCoins
    let topCoins=this.data.topCoins
    let totalCoins=this.data.totalCoins
    if(specialCoins&&topCoins){
      totalCoins=parseInt(specialCoins)+parseInt(topCoins)
      this.setData({
        totalCoins
      })
    }else if(!specialCoins&&topCoins){
      this.setData({
        totalCoins:topCoins
      })
    }else if(specialCoins&&!topCoins){
      this.setData({
        totalCoins:specialCoins
      })
    }else{
      this.setData({
        totalCoins:''
      })
    }
  },
  specialConfig(){
    let that=this
    wx.request({
      url:api.release.special_config,
      method:'get',
      header: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success(res){
        that.setData({
          coins:res.data.data.coins
        })
      }
    })
  },
  spacilBtn(){
    let price=wx.getStorageSync('saveObj').origin_price
    this.setData({
      price
    })
    if(this.data.spacil==1){
      this.setData({
        spacil:0
      })
    }else{
      wx.showToast({
        title:'特价已关闭',
        duration: 3000
      })
      this.setData({
        spacil:1,
        nowPrice:'',
        num:'',
        specialCoins:''
      })
      this.total()
    }
  },
  setTopBtn(){
    if(this.data.topKey){
      this.setData({
        topKey:'',
        topVal:'',
        topCoins:'',
        setTop:1
      })
      this.total()
    }else{
      if(this.data.setTop==1){
        this.setData({
          setTop:0
        })
      }
    }
  },
  hideMask(){
    this.setData({
      setTop:1
    })
  },
  topConfig(){
    let that=this
    wx.request({
      url:api.release.top_config,
      method:'get',
      success(res){
        that.setData({
          topList:res.data.data
        })
      }
    })
  },
  uploadImg(){
    let that=this
    let fileStr=[]
    let img=wx.getStorageSync('saveObj').main_image
    wx.uploadFile({
      url:api.image,
      header:{
        'X-Requested-With':'XMLHttpRequest',
        'Authorization': 'Bearer ' + wx.getStorageSync('token'),
        "Content-Type":"multipart/form-data"
      },
      filePath:img[0],
      name:"file",
      formData:{
        prefix:"info"
      },
      success(res){
        fileStr.push(JSON.parse(res.data).data[0].name)
        that.setData({
          main_image:fileStr[0]
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },
  uploadImgs(){
    let that=this
    let fileStr=[]
    let imgs=wx.getStorageSync('saveObj').desc_image
    for(let i=0,len=imgs.length;i<len;i++){
        wx.uploadFile({
          url:api.image,
          header:{
            'X-Requested-With':'XMLHttpRequest',
            'Authorization': 'Bearer ' + wx.getStorageSync('token'),
            "Content-Type":"multipart/form-data"
          },
          filePath:imgs[i],
          name:"file",
          formData:{
            prefix:"info"
          },
          success(res){
            fileStr.push(JSON.parse(res.data).data[0].name)
            if(fileStr.length == len){
              that.setData({
                desc_image:fileStr.join()
              })
            }
          }
        })
    }
  },
  uploadImgsSp(){
    let that=this
    let fileStr=[]
    let imgs=wx.getStorageSync('saveObj').desc_image
    let pathLen=that.data.options.pathLen//获取未改动图片的数量
    let uploadImg=imgs.slice(pathLen)//截取新上传的图片
    imgs.length=pathLen//截取未改动图片

    for(let i=0,len=uploadImg.length;i<len;i++){
        wx.uploadFile({
          url:api.image,
          header:{
            'X-Requested-With':'XMLHttpRequest',
            'Authorization': 'Bearer ' + wx.getStorageSync('token'),
            "Content-Type":"multipart/form-data"
          },
          filePath:uploadImg[i],
          name:"file",
          formData:{
            prefix:"info"
          },
          success(res){
            fileStr.push(JSON.parse(res.data).data[0].name)
            if(fileStr.length == len){
              imgs=imgs.concat(fileStr)
              that.setData({
                // desc_image:fileStr.join()
                desc_image:imgs.join()
              })
            }
          }
        })
      
    }
   
  },
  submit1(){
    let that=this
    let saveObj=wx.getStorageSync('saveObj')
    let type=that.data.options.type
    console.log(that.data.options.changeD)
    if(type=='demand'){//需求
      console.log('需求')
    }else{//供应
      if(that.data.options.changeD!=0&&that.data.options.changeD!=1&&that.data.options.changeD!=2){
        console.log('首次发布')
      }else{
        console.log('供应编辑')
      }
    }
  },
  submit(){
    let that=this
    let saveObj=wx.getStorageSync('saveObj')
    let type=that.data.options.type
    // let URL=that.data.options.changeD===false?api.release.release:api.release.update
    let URL
    if(type=='demand'){//需求
      URL=api.release.demand
    }else{//供应
      if(that.data.options.changeD!=0&&that.data.options.changeD!=1&&that.data.options.changeD!=2){
        URL=api.release.release
      }else{
        URL=api.release.update
      }
    }
    


    // saveObj.main_image=that.data.main_image
    // saveObj.desc_image=that.data.desc_image
    if(that.data.options.changeM==0){
      saveObj.main_image=saveObj.main_image[0].toString()
    }else{
      saveObj.main_image=that.data.main_image
    }
    if(that.data.options.changeD==0){
      saveObj.desc_image=saveObj.desc_image.join()
    }else{
      saveObj.desc_image=that.data.desc_image
    }


    if(that.data.topKey){//若开启了置顶
      saveObj.is_top=1
      saveObj.coins_top=that.data.topKey
    }
    if(that.data.nowPrice&&that.data.num){
      saveObj.is_special=1
      saveObj.special_price=that.data.nowPrice
      saveObj.remain_num=that.data.num
    }
    saveObj.id=that.data.options.id
    wx.request({
      // url:api.release.release,
      url:URL,
      method:'post',
      header: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      data:saveObj,
      success(res){
        console.log(res.data.errcode)
        if(res.data.errcode==0){
          wx.showToast({  
            title: '发布成功', 
            icon:'warning', 
            duration: 3000  
          }); 
          setTimeout(function(){
            wx.navigateTo({
              url: '../success/success'
            })
          },500)
        }else if(res.data.errcode==10003){
          wx.showModal({
            title: res.data.errmsg,
            content: '点击“确定”去充值',
            success(res){
              if(res.confirm){
                wx.navigateTo({
                  url:'../../my/recharge/recharge?rechargeFromSp=true'
                })
                //从发布处跳转
                // wx.setStorageSync('rechargeFromSp', true)
              }else if(res.cancel){
                console.log('取消')                
              }
            }
          })
        }else{
          wx.showToast({  
            title: res.data.errmsg,             
            icon:'warning', 
            duration: 3000  
          });
        }
      },
      fail(res){
        wx.showToast({  
          title: '发布失败', 
          icon:'warning', 
          duration: 3000  
        }); 
      }
    })
  },
  other(){
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options.type='demand'
    console.log(options)
    
    this.setData({
      options
    })
    if(options.changeM!=0){
      this.uploadImg()
    }
    if(options.changeD!=0&&options.changeD!=2){
      this.uploadImgs()      
    }else if(options.changeD==2){
      this.uploadImgsSp()      
    }

    

    this.topConfig()
    this.specialConfig()
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