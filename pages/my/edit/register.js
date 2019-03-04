// pages/my/register/register.js
const api = require("../../../api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    true_name:'',
    timer:60,
    interval:null,

    true_name: '',
    id_card: '',
    mobile: '',
    company_name: '',
    company_province: '',
    company_city: '',
    company_district: '',
    company_address: '',
    longitude: '',
    latitude: '',
    hy_id: '',
    is_receive: 0,
    code: '',

    industry: [],
    industryClassIndex: 0,
    industryIndex: 0,
    industryBlock: false,
    industryCur: '',
    region: ['广东省', '广州市', '海珠区'],
    noEmpty: true,
    hasInfo: false,//是否已注册

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
  checkEmpty() {
    let info = this.data.info
    if (info.true_name
      && info.id_card.length == 18
      // &&info.mobile.length==11
      // &&info.code
      && info.company_name
      && info.company_address
    ) {
      // this.setData({
      //   noEmpty: true,
      // })
      if(this.data.changeMobile){//如果改变了手机号
        if(info.mobile.length==11&&info.code){//如果手机号验证码都有
          this.setData({
            noEmpty: true,
          })
        }else{
          this.setData({
            noEmpty: false,
          })
        }
      }else{
        this.setData({
          noEmpty: true,
        })
      }
    } else {
      this.setData({
        noEmpty: false
      })
    }
  },
  // checkEmpty(){
  //   let dataObj={}
  //   if(this.data.true_name
  //     &&this.data.id_card.length==18
  //     &&this.data.mobile.length==11
  //     &&this.data.code
  //     &&this.data.company_name
  //     &&this.data.company_address
  //     &&this.data.industryCur
  //    ){
  //     dataObj={
  //       true_name:this.data.true_name,
  //       id_card:this.data.id_card,
  //       mobile:this.data.mobile,
  //       code:this.data.code,
  //       company_name:this.data.company_name,
  //       company_address:this.data.company_address,
  //       industryCur:this.data.industryCur
  //     }
  //     this.setData({
  //       noEmpty:true,
  //       dataObj
  //     })
  //     console.log(dataObj)
  //   }else{
  //     this.setData({
  //       noEmpty:false
  //     })
  //   }
  // },
  checkData() {
    let info = this.data.info



    if (this.data.true_name != info.true_name
      || this.data.id_card != info.id_card
      || this.data.company_name != info.company_name
      || this.data.company_address != info.company_address
      || this.data.hy_id != info.hy_id
      || this.data.region[0] != info.company_province
      || this.data.region[1] != info.company_city
      || this.data.region[2] != info.company_district
      || this.data.is_receive != info.is_receive

      || this.data.mobile != info.mobile
    ) {

      info.true_name = this.data.true_name || info.true_name
      info.id_card = this.data.id_card || info.id_card
      info.company_name = this.data.company_name || info.company_name
      info.company_address = this.data.company_address || info.company_address
      info.is_receive = this.data.is_receive || info.is_receive
      info.hy_id = this.data.hy_id || info.hy_id

      info.company_province = this.data.region[0] || info.company_province
      info.company_city = this.data.region[1] || info.company_city
      info.company_district = this.data.region[2] || info.company_district

      info.mobile = this.data.mobile || info.mobile

      console.log('info')
      this.setData({
        noEmpty: true,
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
    } else {
      this.setData({
        noEmpty: false
      })
    }
  },
  inputName(e) {
    let info = this.data.info
    info.true_name = e.detail.value
    this.setData({
      true_name: e.detail.value,
      info
    })
    this.checkEmpty()
  },
  inputCard(e) {
    let info = this.data.info
    info.id_card = e.detail.value
    this.setData({
      id_card: e.detail.value,
      info
    })
    this.checkEmpty()
  },
  inputMobile(e) {
    let info = this.data.info
    let mobile=this.data.mobile
    if (e.detail.value.length == 11) {
      if (e.detail.value != mobile) {
        info.mobile=e.detail.value
        this.setData({
          noEmpty: false,
          changeMobile:true,
          info
        })
    // this.checkEmpty()
        
      } else {
        info.mobile=e.detail.value
        this.setData({
          noEmpty: true,
          changeMobile:false,          
          info
        })
    // this.checkEmpty()
        
      }

    } else {
      let info = this.data.info      
      this.setData({
        noEmpty: false,
        changeMobile:false
      })
    }
  },
  inputCode(e) {
    let info = this.data.info
    info.code=e.detail.value 
    this.setData({
      code: e.detail.value,
      info
    })
    this.checkEmpty()
  },
  inputCompanyName(e) {
    let info = this.data.info
    info.company_name = e.detail.value
    this.setData({
      company_name: e.detail.value,
      info
    })
    this.checkEmpty()

  },
  inputAddress(e) {
    let info = this.data.info
    info.company_address = e.detail.value
    this.setData({
      company_address: e.detail.value
    })
    this.checkEmpty()

  },
  switchChange(e) {
    let info = this.data.info
    let is_receive = e.detail.value ? '1' : '0'
    info.is_receive = is_receive
    this.setData({
      is_receive,
      info
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  showTime(clear){//变量用于立即清除定时器
    let that=this
    let tempTime=that.data.timer 
    that.setData({
      timer:tempTime,
      showTimer:true
    })
    let interval=setInterval(function(){
      that.setData({
        timer:tempTime-1
      })
      tempTime--
      console.log(tempTime)
      if(tempTime<=0){
        clearInterval(interval)
        that.setData({
          timer:60,
          showTimer:false
        })
      }
    },1000)
    that.setData({
      interval:interval
    })
  },
  clearInterval(){
    let that=this
    let interval=that.data.interval
    clearInterval(interval)
    that.setData({
      timer:60,
      showTimer:false
    })
   },


  getCode() {
    let that = this
    wx.request({
      url: api.my.send,
      method: 'post',
      header: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      data: {
        mobile: that.data.info.mobile
      },
      success(res) {
        if (res.data.errcode == 0) {
          that.showTime() 
          wx.showToast({
            title: '验证码已发送',
            icon: 'warning',
            duration: 3000
          });
        } else {
          wx.showToast({
            title: res.data.errmsg,
            icon: 'warning',
            duration: 3000
          });
        }
      }
    })
  },
  update() {
    let that = this
    let dataObj = {}
    if (that.data.hasInfo) {
      let info = that.data.info
      dataObj = {
        true_name: info.true_name,
        id_card: info.id_card,
        mobile: info.mobile,
        company_name: info.company_name,
        company_province: info.company_province,
        company_city: info.company_city,
        company_district: info.company_district,
        company_address: info.company_address,
        // hy_id: info.hy_id,
        hy_id:that.data.hyId,   
        is_receive: info.is_receive,
        code:info.code
      }
    } else {
      dataObj = {
        true_name: that.data.true_name,
        id_card: that.data.id_card,
        mobile: that.data.mobile,
        company_name: that.data.company_name,
        company_province: that.data.region[0],
        company_city: that.data.region[1],
        company_district: that.data.region[2],
        company_address: that.data.company_address,
        // longitude:'133',
        // latitude:'23',
        // hy_id: that.data.hy_id,
        is_receive: that.data.is_receive,
        code: that.data.code
      }
    }


    wx.request({
      url: api.my.update,
      method: 'post',
      header: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      data: dataObj,
      success(res) {
        let err=[]
        if(!res.data.errcode&&res.data.errcode!=0){//暂留
          for(let x in res.data.errors){
            err.push(res.data.errors[x])
          }
          wx.showModal({
            title: '请完善信息',
            content: err.join(','),
          })
        }
        if (res.data.errcode == 0) {
          let userInfo = wx.getStorageSync('userInfo')
          userInfo.mobile = that.data.mobile
          wx.setStorageSync('userInfo', userInfo)
          wx.showToast({
            title: '信息保存成功',
            icon: 'warning',
            duration: 3000
          });
          setTimeout(function () {
            wx.navigateTo({
              url: '../register-finish/register-finish?type=edit'
            })
          }, 2000)
        } else {
          wx.showToast({
            title: res.data.errmsg,
            icon: 'warning',
            duration: 3000
          });
        }
      }
    })
  },
  industryBlockShow() {
    this.setData({
      industryBlock: true
    })
  },
  slideup(){
    this.setData({
      industryBlock: false,
    })
  },
  industrySelect(e) {
    let that = this
    let info = this.data.info
    info.hy_id=e.currentTarget.dataset.id
    that.setData({
      hy_id: e.currentTarget.dataset.id,
      industryIndex: e.currentTarget.dataset.index,
      industryCur: e.currentTarget.dataset.title,
      info
    })
    this.checkEmpty()

    
    //多选补丁
    let selectId=e.currentTarget.dataset.id
    let hyidObj=that.data.hyidObj
    let hyName=[]
    let hyId=[]
    if(hyidObj[selectId]){
      if( hyidObj.size>1){
        delete hyidObj[selectId]
        hyidObj.size--
      }else{
        wx.showToast({
          title:'至少选择一项'
        })
      }
    }else{
      if(hyidObj.size<3){
        hyidObj[selectId]=e.currentTarget.dataset.title
        hyidObj.size++
      }else{
        wx.showToast({
          title:'最多选择三项'
        })
      }
    }
    for(let x in hyidObj){
      if(x!='size'){
        hyName.push(hyidObj[x])
        hyId.push(x)
      }
     }
    that.setData({
      hyidObj,
      hyName:hyName.join(),
      hyId:hyId.join()
    })
    console.log(hyId.join())
  },



  industryClass(e) {
    let that = this
    that.setData({
      industryClassIndex: e.currentTarget.dataset.id,
      industryIndex: 0
    })
  },
  getIndustry() {
    let that = this
    wx.request({
      url: api.classification.industry,
      method: 'get',
      success(res) {
        that.setData({
          industry: res.data.data
        })
      }
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let info = this.data.info
    info.company_province = e.detail.value[0],
      info.company_city = e.detail.value[1],
      info.company_district = e.detail.value[2],
      this.setData({
        region: e.detail.value,
        info
      })
    // if(this.data.hasInfo){
    //   this.checkData()
    // }

  },
  getInfo() {
    let that = this
    wx.request({
      url: api.member_info,
      method: 'get',
      header: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success(res) {
        let hyidArr=res.data.data.hy_id.split(",")
        let hyName=res.data.data.hy_name.split(",")
        let hyidObj={}
        for(let i=0,len=hyidArr.length;i<len;i++){
          hyidObj[hyidArr[i]]=hyName[i]
        }
        hyidObj.size=hyidArr.length
        console.log(hyidArr)



        if (res.data.errcode == 0) {
          that.setData({
            info: res.data.data,
            mobile:res.data.data.mobile,
            hyidObj,
            hyId:hyidArr.join()
          })
          if (res.data.data.company_province) {
            let province = res.data.data.company_province
            let district = res.data.data.company_district
            let city = res.data.data.company_city
            that.setData({
              region: [province, city, district],
              hasInfo: true
            })
          } else {
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