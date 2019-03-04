// pages/classification/exhibition/exhibition.js
const api = require("../../../api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex:-1,
    cityIndex:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    price1:[1000,2000,3000,4000,5000],
    price2:[2000,3000,4000,5000,"5000以上"],
    toView:'',
    industry:[],
    industryClassIndex:0,
    industryIndex:0,
    cityList:null,
    list:null,
    page:1,    
    model_name:"",
    cid:0,
    ticketTab:['单程','往返'],
    ticketTabIndex:0,
    cityTabIndex:0,
    category:null,
    categoryClassIndex:'supply',
    categoryIndex:'',
    lastPage:'',
    
    hy_id:'',
    city_id:'',
    order:'',
    minPrice:'',
    maxPrice:'',
    start_time:'',
    end_time:'',

    dateTrue:'',
    dateNextTrue:'',

    date:'',
    y:new Date().getFullYear(),
    m:new Date().getMonth()+1,
    d:new Date().getDate(),

    dateN:'',
    // yN:new Date().getFullYear(),
    // mN:new Date().getMonth()+1,
    dN:new Date().getDate()+1,
    index:0,
    index2:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  categorySelect(e){
    console.log(e.currentTarget.dataset.category)
    let cid=e.currentTarget.dataset.category
    this.setData({
      categoryIndex:e.currentTarget.dataset.id,
      cid
    })
    this.checkScreen(cid)
  },
  categoryClass(e){
    this.setData({
      categoryClassIndex:e.currentTarget.dataset.id,
      categoryIndex:''
    })
  },
  getCategory(){
    let that=this
    wx.request({
      url:api.category,
      method:'get',
      success(res){
        console.log(res.data.data)
        that.setData({
          category:res.data.data
        })
      }
    })
  },
  addressInput(e){
    let that=this
    let selectAddressType=e.currentTarget.dataset.type
    that.setData({
      selectAddress:1,
      selectAddressType
    })
  },
  hideCityBlock(e){
    console.log(e.detail.cityName,e.detail.cityId)
    let that=this
    that.setData({
      selectAddress:0
    })
    if(that.data.selectAddressType=="dep"){
      that.setData({
        dep_address:e.detail.cityId,
        dep_address_name:e.detail.cityName
      })
    }else{
      that.setData({
        ret_address:e.detail.cityId,
        ret_address_name:e.detail.cityName
      })
    }
  },
  getList(cid=2){
    let that=this
    wx.request({
      url:api.classification.list,
      method:'get',
      data:{
        page:1,
        cid
      },
      success(res){
        console.log(res.data.data)
        that.setData({
          list:res.data.data
        })
      }

    })

  },
  
  cityTabTap(e){
    this.setData({
      cityTabIndex:e.currentTarget.dataset.index
    })
  },
  ticketTabTap(e){
    this.setData({
      ticketTabIndex:e.currentTarget.dataset.index
    })
  },
  // getCountry(){
  //   let that=this
  //   wx.request({
  //     url:api.country,
  //     method:'get',
  //     data:{
  //       front:1
  //     },
  //     success(res){
  //       console.log(res)
  //     }
  //   })
  // },
  // getCity(){
  //   let that=this
  //   wx.request({
  //     url:api.city,
  //     method:'get',
  //     data:{
  //       q:1,
  //       front:1
  //     },
  //     success(res){
  //       console.log(res)
  //     }
  //   })
  // },
  getCityList(){
    let that=this
    wx.request({
      url:api.city_list,
      method:'get',
      success(res){
        that.setData({
          cityList:res.data.data
        })
      }
    })
  },
  checkScreen(cid){
    let that=this
    let hy_id=that.data.hy_id
    let city_id=that.data.city_id
    let order=that.data.order
    let keyword=that.data.keyword
    let dataObj={}
    if(that.data.model_name!='air_ticket'&&that.data.model_name!='group'){
      let minPrice=that.data.minPrice
      let maxPrice=that.data.maxPrice
      let start_time=that.data.start_time
      let end_time=that.data.end_time
      dataObj={
          cid,
          page:1,
          hy_id,
          city_id,
          order,
          minPrice,
          maxPrice,
          start_time,
          end_time,
          keyword
      }
    }else{
      let dep_address=that.data.dep_address
      let ret_address=that.data.ret_address
      let dep_date=that.data.dep_date
      let ret_date=that.data.ticketTabIndex==1?that.data.ret_date:''
      dataObj={
          cid,
          page:1,
          hy_id,
          city_id,
          order,
          dep_address,
          ret_address,
          dep_date,
          ret_date,
          keyword
      }
    }
    // let dataObj={
    //     cid,
    //     page:1,
    //     hy_id,
    //     city_id,
    //     order,
    //     minPrice,
    //     maxPrice,
    //     start_time,
    //     end_time,

    //     dep_address,
    //     ret_address,
    //     dep_date,
    //     ret_date
    // }
    console.log(dataObj)

    that.setData({
      dataObj, 
      page:1,
      tabIndex:-1  
    })
    
      if(keyword){
        wx.request({
          url:api.classification.search,
          method:'get',
          data:dataObj,
          success(res){
            that.setData({
              list:res.data.data,
              lastPage:res.data.data.last_page
            })
          }
    
        })
      }else{
        wx.request({
          url:api.classification.list,
          method:'get',
          data:dataObj,
          success(res){
            // console.log(res.data.data)
            that.setData({
              list:res.data.data
            })
          }
    
        })
      }
      
  },
  selectOrder(e){
    let that=this
    let order=e.currentTarget.dataset.order
    that.setData({
      order,    
    })
    that.checkScreen(that.data.cid)
  },
  selectCity(e){
    let that=this
    let city_id=e.currentTarget.dataset.id
    that.setData({
      city_id,    
    })
    that.checkScreen(that.data.cid)
  },
  industrySelect(e){
    let that=this
    that.setData({
      industryIndex:e.currentTarget.dataset.id,
      hy_id:e.currentTarget.dataset.hy_id,
    })
    that.checkScreen(that.data.cid)
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
  bindPickerChange: function (e) {
    let index=this.data.index
    let index2=this.data.index2

    let id=e.currentTarget.dataset.id
    if(id=="start"){
      this.setData({
        index: e.detail.value
      })
      if(e.detail.value>index&&e.detail.value>index2){
        this.setData({
          index2:e.detail.value
        })
      }
    }else if(id=="end"){
      this.setData({
        index2: e.detail.value
      })
      if(e.detail.value<=index){
        this.setData({
          index:e.detail.value
        })
      }
    }
    
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      start_time: e.detail.value,
      dep_date:e.detail.value,
      dep_date_show:e.detail.value//show后续仅作展示用
    })
    let dC=e.detail.value.split("-")
    let y=parseInt(dC[0]),
        m=dC[1],
        d=dC[2],
        dN=parseInt(dC[2])+1<10?'0'+(parseInt(dC[2])+1):parseInt(dC[2])+1

    if(d==new Date(y,m,0).getDate()&&m!=12){
      this.setData({
        dateN:y+'-'+(new Date().getMonth()+2)+'-'+'01',
        dateNextTrue:y+'-'+(new Date().getMonth()+2)+'-'+'01',
        end_time:y+'-'+(new Date().getMonth()+2)+'-'+'01',
        ret_date:y+'-'+(new Date().getMonth()+2)+'-'+'01',
        ret_date_show:y+'-'+(new Date().getMonth()+2)+'-'+'01'        
        
      })
    }else if(d==new Date(y,m,0).getDate()&&m==12){
      this.setData({
        dateN:(y+1)+'-'+'01'+'-'+'01',
        dateNextTrue:(y+1)+'-'+'01'+'-'+'01',
        end_time:(y+1)+'-'+'01'+'-'+'01',
        ret_date:(y+1)+'-'+'01'+'-'+'01',
        ret_date_show:(y+1)+'-'+'01'+'-'+'01',        
      })
    }else{
      this.setData({
        dateN:y+'-'+m+'-'+dN,
        dateNextTrue:y+'-'+m+'-'+dN,
        end_time:y+'-'+m+'-'+dN,
        ret_date:y+'-'+m+'-'+dN,
        ret_date_show:y+'-'+m+'-'+dN,        
      })
    }
    
  },
  bindNextDateChange: function (e) {
    this.setData({
      dateN: e.detail.value,
      end_time:e.detail.value,
      ret_date:e.detail.value, 
      ret_date_show:e.detail.value       
    })
  },
  minPriceInput(e){
    let val=e.detail.value
    val=parseFloat(val).toFixed(2)
    this.setData({
      minPrice:val,
      minPriceInput:e.detail.value//仅作为输入框展示用
    })
  },
  maxPriceInput(e){
    let val=e.detail.value
    val=parseFloat(val).toFixed(2)
    this.setData({
      maxPrice:val,
      maxPriceInput:e.detail.value
    })
  },
  submitScreen(){
    this.checkScreen(this.data.cid)
  },
  reset(){
    //顺便也要特殊处理后一天
    let dC=this.data.dateTrue.split("-")
    let y=parseInt(dC[0]),
        m=dC[1],
        d=dC[2],
        dN=parseInt(dC[2])+1<10?'0'+(parseInt(dC[2])+1):parseInt(dC[2])+1

    if(d==new Date(y,m,0).getDate()&&m!=12){
      this.setData({
        dateN:y+'-'+(new Date().getMonth()+2)+'-'+'01',
        dateNextTrue:y+'-'+(new Date().getMonth()+2)+'-'+'01'
      })
    }else if(d==new Date(y,m,0).getDate()&&m==12){
      this.setData({
        dateN:(y+1)+'-'+'01'+'-'+'01',
        dateNextTrue:(y+1)+'-'+'01'+'-'+'01'
      })
    }else{
      this.setData({
        dateN:y+'-'+m+'-'+dN,
        dateNextTrue:y+'-'+m+'-'+dN
      })
    }

    this.setData({
      minPrice:'',
      maxPrice:'',
      minPriceInput:'',
      maxPriceInput:'',
      start_time:'',
      end_time:'',
      date:this.data.dateTrue,


      dep_address:'',
      ret_address:'',
      dep_date:'',
      ret_date:'',
      dep_date_show:'',
      ret_date_show:'',
      dep_address_name:'',
      ret_address_name:''

    })
  },
  tabTap(e){
    let index=e.currentTarget.dataset.index
    if(index!=this.data.tabIndex){
      this.setData({
        tabIndex:index
      })
    }else{
      this.setData({
        tabIndex:-1,
        selectAddress:0
      })
    }
    
  },
  jumpTo(e){
    this.setData({
      toView: e.currentTarget.dataset.opt
    })
  },
  dateFormat(){
    let m=this.data.m<10?'0'+this.data.m:this.data.m
    let d=this.data.d<10?'0'+this.data.d:this.data.d
    this.setData({
      date:this.data.y+"-"+m+"-"+d,
      dateTrue:this.data.y+"-"+m+"-"+d
    })
  },
  nextDate(){
    if(this.data.d==new Date(this.data.y,this.data.m,0).getDate()&&this.data.m!=12){
      this.setData({
        // dN:'01',
        // mN:new Date().getMonth()+2,
        dateN:this.data.y+'-'+(new Date().getMonth()+2)+'-'+'01',
        dateNextTrue:this.data.y+'-'+(new Date().getMonth()+2)+'-'+'01'
      })
    }else if(this.data.d==new Date(this.data.y,this.data.m,0).getDate()&&this.data.m==12){
      this.setData({
        // dN:'01',
        // mN:'01',
        // yN:this.data.y+1,
        dateN:(this.data.y+1)+'-'+'01'+'-'+'01',
        dateNextTrue:(this.data.y+1)+'-'+'01'+'-'+'01'
      })
    }else{
      let m=this.data.m<10?'0'+this.data.m:this.data.m
      let d=this.data.dN<10?'0'+this.data.dN:this.data.dN
      this.setData({
        dateN:this.data.y+'-'+m+'-'+d,
        dateNextTrue:this.data.y+'-'+m+'-'+d
      })
    }
  },
  keywordInput(e){
    let keyword=e.detail.value
    let that=this
    that.setData({
      keyword
    })
    that.checkScreen(that.data.cid)
  },
  onLoad: function (options) {
    this.setData({
      // model_name:options.model_name||'air_ticket',
      model_name:options.model_name,      
      cid:options.cid
    })
    console.log(options.model_name)
    this.dateFormat()
    this.nextDate()
    this.getIndustry()
    // this.getCountry()
    // this.getCity()
    this.getCityList()
    // this.getList(options.cid)
    this.getCategory()
    
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
    let that = this
    // let page = that.data.page
    let list=  that.data.list
    // let Url = api.classification.list
    let Url = api.classification.search    
    let dataObj=that.data.dataObj
    let page=dataObj.page
    let lastPage=that.data.lastPage

    if (page <lastPage) {
      dataObj.page++
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
        // data: {
        //   page,
        //   cid:that.data.cid||1
        // },
        data:dataObj,
        success(res) {
          console.log(list.data)
          console.log(res.data.data.data)
          
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