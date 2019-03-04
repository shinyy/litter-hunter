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
    depCityName:'',
    retCityName:'',    
    model_name:'',
    memberInfo:null,
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
    dateBlock:false,

    dateNN:'',
    dateNNTrue:'',
    dNN:new Date().getDate()+2,
    

    tDateTrue:'',
    tDateNextTrue:'',
    tDate:'',
    tDateN:'',


    cityType:'',
    dep_airport:"",
    dep_arrival_airport:"",
    ret_airport:"",
    ret_arrival_airport:""

  },
  slideup(){
    this.setData({
      industryBlock:!this.data.industryBlock
    })
  },
  notBack(){
    this.setData({
      tDateN:''
    })
  },
  airportInput(e){
    let type=e.currentTarget.dataset.type
    if(type=='dep'){
      this.setData({
        dep_airport:e.detail.value
      })
    }else if(type=='depA'){
      this.setData({
        dep_arrival_airport:e.detail.value
      })
    }else if(type=='ret'){
      this.setData({
        ret_airport:e.detail.value
      })
    }else if(type=='retA'){
      this.setData({
        ret_arrival_airport:e.detail.value
      })
    }
  },
  showCityBlock(e){
    this.setData({
      cityBlock:!this.data.cityBlock,
      cityType:e.currentTarget.dataset.type
    })
    if(e.detail.cityName){
      if(this.data.cityType=='dep'){
        this.setData({
          depCityName:e.detail.cityName,
          depCityId:e.detail.cityId
        })
      }else if(this.data.cityType=='ret'){
        this.setData({
          retCityName:e.detail.cityName,
          retCityId:e.detail.cityId
        })
      }else{
        this.setData({
          cityName:e.detail.cityName,
          cityId:e.detail.cityId
        })
      }
      
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
  // bindDateChange: function (e) {
  //   let type=e.currentTarget.dataset.type
  //   if(type!='ticket'){
  //     this.setData({
  //       date: e.detail.value,
  //     })
  //     let dC=e.detail.value.split("-")
  //     let y=parseInt(dC[0]),
  //         m=dC[1],
  //         d=dC[2],
  //         dN=parseInt(dC[2])+1<10?'0'+(parseInt(dC[2])+1):parseInt(dC[2])+1
  //     if(d==new Date(y,m,0).getDate()&&m!=12){
  //       this.setData({
  //         dateN:y+'-'+(new Date().getMonth()+2)+'-'+'01',
  //         dateNextTrue:y+'-'+(new Date().getMonth()+2)+'-'+'01'
  //       })
  //     }else if(d==new Date(y,m,0).getDate()&&m==12){
  //       this.setData({
  //         dateN:(y+1)+'-'+'01'+'-'+'01',
  //         dateNextTrue:(y+1)+'-'+'01'+'-'+'01'
  //       })
  //     }else{
  //       this.setData({
  //         dateN:y+'-'+m+'-'+dN,
  //         dateNextTrue:y+'-'+m+'-'+dN
  //       })
  //     }
  //   }else{
  //     this.setData({
  //       tDate: e.detail.value,
  //     })
  //     let dC=e.detail.value.split("-")
  //     let y=parseInt(dC[0]),
  //         m=dC[1],
  //         d=dC[2],
  //         dN=parseInt(dC[2])+1<10?'0'+(parseInt(dC[2])+1):parseInt(dC[2])+1
  //     if(d==new Date(y,m,0).getDate()&&m!=12){
  //       this.setData({
  //         tDateN:y+'-'+(new Date().getMonth()+2)+'-'+'01',
  //         tDateNextTrue:y+'-'+(new Date().getMonth()+2)+'-'+'01'
  //       })
  //     }else if(d==new Date(y,m,0).getDate()&&m==12){
  //       this.setData({
  //         tDateN:(y+1)+'-'+'01'+'-'+'01',
  //         tDateNextTrue:(y+1)+'-'+'01'+'-'+'01'
  //       })
  //     }else{
  //       this.setData({
  //         tDateN:y+'-'+m+'-'+dN,
  //         tDateNextTrue:y+'-'+m+'-'+dN
  //       })
  //     }
  //   }
  // },
  bindDateChange: function (e) {
    let type=e.currentTarget.dataset.type
    if(type!='ticket'){
      this.setData({
        // date: e.detail.value,
        dateN: e.detail.value        
      })
      let dC=e.detail.value.split("-")
      let y=parseInt(dC[0]),
          m=dC[1],
          d=dC[2],
          dN=parseInt(dC[2])+1<10?'0'+(parseInt(dC[2])+1):parseInt(dC[2])+1
      if(d==new Date(y,m,0).getDate()&&m!=12){
        this.setData({
          // dateN:y+'-'+(new Date().getMonth()+2)+'-'+'01',
          // dateNextTrue:y+'-'+(new Date().getMonth()+2)+'-'+'01'
          dateNN:y+'-'+(new Date().getMonth()+2)+'-'+'01',
          dateNNTrue:y+'-'+(new Date().getMonth()+2)+'-'+'01'          
        })
      }else if(d==new Date(y,m,0).getDate()&&m==12){
        this.setData({
          // dateN:(y+1)+'-'+'01'+'-'+'01',
          // dateNextTrue:(y+1)+'-'+'01'+'-'+'01'
          dateNN:(y+1)+'-'+'01'+'-'+'01',
          dateNNTrue:(y+1)+'-'+'01'+'-'+'01'
        })
      }else{
        this.setData({
          // dateN:y+'-'+m+'-'+dN,
          // dateNextTrue:y+'-'+m+'-'+dN
          dateNN:y+'-'+m+'-'+dN,
          dateNNTrue:y+'-'+m+'-'+dN
        })
      }



    }else{
      this.setData({
        tDate: e.detail.value,
      })
      let dC=e.detail.value.split("-")
      let y=parseInt(dC[0]),
          m=dC[1],
          d=dC[2],
          dN=parseInt(dC[2])+1<10?'0'+(parseInt(dC[2])+1):parseInt(dC[2])+1
      if(d==new Date(y,m,0).getDate()&&m!=12){
        this.setData({
          tDateN:y+'-'+(new Date().getMonth()+2)+'-'+'01',
          tDateNextTrue:y+'-'+(new Date().getMonth()+2)+'-'+'01'
        })
      }else if(d==new Date(y,m,0).getDate()&&m==12){
        this.setData({
          tDateN:(y+1)+'-'+'01'+'-'+'01',
          tDateNextTrue:(y+1)+'-'+'01'+'-'+'01'
        })
      }else{
        this.setData({
          tDateN:y+'-'+m+'-'+dN,
          tDateNextTrue:y+'-'+m+'-'+dN
        })
      }
    }
  },
  bindNextDateChange: function (e) {
    let type=e.currentTarget.dataset.type
    if(type!='ticket'){
      this.setData({
        // dateN: e.detail.value
        dateNN:e.detail.value
      })
    }else{
      this.setData({
        tDateN: e.detail.value
      })
    }
  },
  dateFormat(){
    let m=this.data.m<10?'0'+this.data.m:this.data.m
    let d=this.data.d<10?'0'+this.data.d:this.data.d
    this.setData({
      date:this.data.y+"-"+m+"-"+d,
      dateTrue:this.data.y+"-"+m+"-"+d,
      tDate:this.data.y+"-"+m+"-"+d,
      tDateTrue:this.data.y+"-"+m+"-"+d
    })
  },
  nextDate(){
    if(this.data.d==new Date(this.data.y,this.data.m,0).getDate()&&this.data.m!=12){//如果是当月最后一天但不是12月
      this.setData({
        dateN:this.data.y+'-'+(new Date().getMonth()+2)+'-'+'01',
        dateNextTrue:this.data.y+'-'+(new Date().getMonth()+2)+'-'+'01',
        // tDateN:this.data.y+'-'+(new Date().getMonth()+2)+'-'+'01',
        tDateNextTrue:this.data.y+'-'+(new Date().getMonth()+2)+'-'+'01',
        // 后天补丁
        dateNN:this.data.y+'-'+(new Date().getMonth()+2)+'-'+'02',
        dateNNTrue:this.data.y+'-'+(new Date().getMonth()+2)+'-'+'02',
      })
    }else if(this.data.d==new Date(this.data.y,this.data.m,0).getDate()&&this.data.m==12){//如果是当月最后一天且是12月
      this.setData({
        dateN:(this.data.y+1)+'-'+'01'+'-'+'01',
        dateNextTrue:(this.data.y+1)+'-'+'01'+'-'+'01',
        // tDateN:(this.data.y+1)+'-'+'01'+'-'+'01',
        tDateNextTrue:(this.data.y+1)+'-'+'01'+'-'+'01',
        // 后天补丁        
        dateNN:(this.data.y+1)+'-'+'01'+'-'+'02',
        dateNNTrue:(this.data.y+1)+'-'+'01'+'-'+'02',
      })
    }else{
      let m=this.data.m<10?'0'+this.data.m:this.data.m
      let d=this.data.dN<10?'0'+this.data.dN:this.data.dN
      let d2=this.data.dNN<10?'0'+this.data.dNN:this.data.dNN
      this.setData({
        dateN:this.data.y+'-'+m+'-'+d,
        dateNextTrue:this.data.y+'-'+m+'-'+d,
        // tDateN:this.data.y+'-'+m+'-'+d,
        tDateNextTrue:this.data.y+'-'+m+'-'+d,
        // 后天补丁        
        dateNN:this.data.y+'-'+m+'-'+d2,
        dateNNTrue:this.data.y+'-'+m+'-'+d2,
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
      industryCur:e.currentTarget.dataset.title,
      hy_id:e.currentTarget.dataset.id
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
  getMenberInfo(){
    let that=this
    wx.request({
      url:api.member_info,
      method:'get',
      header: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success(res){
        that.setData({
          memberInfo:res.data.data
        })
      }
    })
  },
  getColumns(cid=3){
    let that=this
    wx.request({
      url:api.release.columns,
      method:'get',
      data:{
        cid
      },
      success(res){
        that.setData({
          columns:res.data.data
        })

        let columns=res.data.data//根据返回数据判断的提交字段
        let dataObj={cid}
        let mustDataObj=[]//必填字段
        let dataArr=[]//提交字段列表
        for(let i in columns){
          let dataType=columns[i].type
          let dataName=columns[i].field_name
          let dataRequire=columns[i].setting.require
          // 组成提交参数对象
          if(dataType=='Textarea'||dataType=='Date'){
            dataObj[dataName]=''
          }else if(dataType=='Switch'){
            dataObj[dataName]=false
          }else if(dataType=='Image'||dataType=='Images'){
            dataObj[dataName]=[]            
          }else if(dataType=='Text'){
            dataObj[dataName]=''
          }
          //必填字段对象
          if(dataRequire==1){
            mustDataObj.push(dataName)
          }
          dataArr.push(dataName)
          that.setData({
            // [dataName]:'test',
            dataArr,
            dataObj,
            mustDataObj
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
    let that=this
    let saveObj=that.data.dataObj
    let mustDataObj=that.data.mustDataObj
    let pass=[]
    saveObj.hy_id=that.data.hy_id
    saveObj.city=that.data.cityId
    // saveObj.start_time=that.data.date
    // saveObj.end_time=that.data.dateN  
    saveObj.start_time=that.data.dateN
    saveObj.end_time=that.data.dateNN
    // 以下是酒店时间权宜之策
    saveObj.rz_date=that.data.date
    saveObj.tf_date=that.data.dateN 

    if(that.data.model_name=='air_ticket'||that.data.model_name=='group'){
      saveObj.dep_address=that.data.depCityId
      saveObj.ret_address=that.data.retCityId
      saveObj.dep_date=that.data.tDate
      saveObj.dep_airport=that.data.dep_airport
      saveObj.dep_arrival_airport=that.data.dep_arrival_airport
      if(that.data.tDateN){
        saveObj.ret_date=that.data.tDateN   
        saveObj.ret_airport=that.data.ret_airport
        saveObj.ret_arrival_airport=that.data.ret_arrival_airport
      }
    }
    
    
    for(let x in mustDataObj){
      if(saveObj[mustDataObj[x]]&&saveObj[mustDataObj[x]].length!=0&&saveObj[mustDataObj[x]]!='NaN'){
        pass.push(true)
      }else{
        pass.push(false)
      }
    }
    
      
      if(that.data.model_name=="air_ticket"||that.data.model_name=="group"){//机票活群组模式时
        if(that.data.tDateN){//选择了返程时
          if(pass.indexOf(false)==-1
          &&saveObj.hy_id
          &&saveObj.city
          &&saveObj.dep_address
          &&saveObj.ret_address
          &&saveObj.dep_airport
          &&saveObj.dep_arrival_airport
          &&saveObj.ret_airport
          &&saveObj.ret_arrival_airport){
            wx.setStorageSync('saveObj',saveObj)
            wx.navigateTo({
              url: '../extension/extension'
            })
          }else{
            wx.showToast({
              title:'请完善表单信息',
              duration:3000
            })
          }
        }else{//未选择返程时
          if(pass.indexOf(false)==-1
          &&saveObj.hy_id
          &&saveObj.city
          &&saveObj.dep_address
          &&saveObj.ret_address
          &&saveObj.dep_airport
          &&saveObj.dep_arrival_airport){
            wx.setStorageSync('saveObj',saveObj)
            wx.navigateTo({
              url: '../extension/extension'
            })
          }else{
            wx.showToast({
              title:'请完善表单信息',
              duration:3000
            })
          }
        }
      }else{//非机票活群组模式时
        console.log(mustDataObj)
        console.log(pass)
        
        console.log(pass.indexOf(false))
        if(pass.indexOf(false)==-1
          &&saveObj.hy_id
          &&saveObj.city){
            wx.setStorageSync('saveObj',saveObj)
            wx.navigateTo({
              url: '../extension/extension'
            })
          }else{
            wx.showToast({
              title:'请完善表单信息',
              duration:3000
            })
          }
      }
      // console.log(saveObj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      // model_name:options.model_name||'air_ticket'
      model_name:options.model_name      
    })
    this.getMenberInfo()
    this.getColumns(options.cid)
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