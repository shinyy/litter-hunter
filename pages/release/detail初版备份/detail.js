// pages/release/detail/detail.js
const api = require("../../../api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // industry:['陶瓷','计算机'],
    // industry:'',
    // industryIndex:'',
    industry:[],
    industryClassIndex:0,
    industryIndex:0,
    industryBlock:false,
    industryCur:'',
    img:[],
    headImg:[],
    columns:[],
    cityBlock:false,
    cityName:'',
    cityId:'',
    // date:'',
    // dateTrue:'',
    // y:new Date().getFullYear(),
    // m:new Date().getMonth()+1,
    // d:new Date().getDate(),

    dateTrue:'',
    dateNextTrue:'',
    date:'',
    y:new Date().getFullYear(),
    m:new Date().getMonth()+1,
    d:new Date().getDate(),
    dateN:'',
    dN:new Date().getDate()+1,
    dateBlock:false
  },
  showCityBlock(e){
    this.setData({
      cityBlock:!this.data.cityBlock,
    })
    if(e.detail.cityName){
      this.setData({
        cityName:e.detail.cityName,
        cityId:e.detail.id
      })
    }
  },
  dateSubmit(){
    this.setData({
      dateBlock:false
    })
  },
  dateBlockShow(){
    this.setData({
      dateBlock:true
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
    })

    let dC=e.detail.value.split("-")
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
    
  },
  bindNextDateChange: function (e) {
    this.setData({
      dateN: e.detail.value
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
  industryBlockShow(){
    this.setData({
      industryBlock:true
    })
  },
  industrySelect(e){
    let that=this
    that.setData({
      industryIndex:e.currentTarget.dataset.index,
      industryBlock:false,
      industryCur:e.currentTarget.dataset.title
    })
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
  dateFormat(){
    let m=this.data.m<10?'0'+this.data.m:this.data.m
    let d=this.data.d<10?'0'+this.data.d:this.data.d
    this.setData({
      date:this.data.y+"-"+m+"-"+d,
      dateTrue:this.data.y+"-"+m+"-"+d
    })
  },
  industryPickerChange(e){
    this.setData({
      industryIndex:e.detail.value
    })
  },
  chooseImg(){
    let that=this
    wx.chooseImage({
      count:9,
      sizeType:['compressed'],
      sourceType: ['album', 'camera'],
      success(res){
        if(that.data.img.concat(res.tempFilePaths).length>9){
          wx.showToast({  
            title: '最多上传九张图片', 
            icon:'warning', 
            duration: 3000  
          }); 
        }else{
          that.setData({
            img:that.data.img.concat(res.tempFilePaths)
          })
        }
      }
    })
  },
  delImg(e){
    let that=this
    let imgIndex=e.currentTarget.dataset.index
    let imgTemp=that.data.img
    imgTemp.splice(imgIndex,1)
    that.setData({
      img:imgTemp
    })
  },

  chooseImgSp(){
    let that=this
    wx.chooseImage({
      count:1,
      sizeType:['compressed'],
      sourceType: ['album', 'camera'],
      success(res){
        console.log(res)
        if(that.data.headImg.concat(res.tempFilePaths).length>1){
          wx.showToast({  
            title: '最多上传一张图片', 
            icon:'warning', 
            duration: 3000  
          }); 
        }else{
          that.setData({
            headImg:that.data.headImg.concat(res.tempFilePaths)
          })
        }
      }
    })
  },
  delImgSp(e){
    let that=this
    let imgIndex=e.currentTarget.dataset.index
    let imgTemp=that.data.headImg
    imgTemp.splice(imgIndex,1)
    that.setData({
      headImg:imgTemp
    })
  },
  getColumns(){
    let that=this
    wx.request({
      url:api.release.columns,
      method:'get',
      data:{
        cid:2
      },
      success(res){
        that.setData({
          columns:res.data.data
        })

        let columns=res.data.data//根据返回数据判断的提交字段
        let dataObj={}
        let dataArr=[]//提交字段列表
        for(let i=0,len=columns.length;i<len;i++){
          
          let dataType=columns[i].type
          let dataName=columns[i].field_name
          if(dataType=='Textarea'||dataType=='Date'){
            dataObj[dataName]=''
          }else if(dataType=='Switch'){
            dataObj[dataName]=false
          }else if(dataType=='Image'||dataType=='Images'){
            dataObj[dataName]=null            
          }else if(dataType=='Text'){
            dataObj[dataName]=''
          }
          
          dataArr.push(dataName)
          that.setData({
            // [dataName]:'test',
            dataArr,
            dataObj
          })
        }
      }
    })
  },
  // 组件传值
  textInput(e){
    // console.log(e.detail.val)
    let that=this
    let dataObj=that.data.dataObj
    let fieldname=e.currentTarget.dataset.fieldname
    dataObj[fieldname]=e.detail.val
    that.setData({
      dataObj
    })
  },
  ticketDateInput(e){
    // console.log(e.detail.ticketDate)
    // console.log(e.currentTarget.dataset.fieldname)
    let that=this
    let dataObj=that.data.dataObj
    let fieldname=e.currentTarget.dataset.fieldname
    dataObj[fieldname]=e.detail.ticketDate
    that.setData({
      dataObj
    })
  },
  imgInput(e){
    let that=this
    let dataObj=that.data.dataObj
    let fieldname=e.currentTarget.dataset.fieldname
    dataObj[fieldname]=e.detail.img
    that.setData({
      dataObj
    })
  },
  // 组件传值end
  save(){
    // let columns=this.data.columns
    // let dataObj={}
    // for(let i=0,len=columns.length;i<len;i++){
    //   dataObj[columns[i].field_name]='test'
    // }
    // console.log(dataObj)
    console.log(this.data.dataObj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getColumns()
    this.dateFormat()
    this.nextDate()
    this.getIndustry()
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