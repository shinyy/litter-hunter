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
    formData:null,
    changeM:0,// 主图 0表示编辑未改，1表示编辑已改，2表示保留描述图并新增，无则表示初次上传
    changeD:0,//多图 同上
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
  //   let is_return=this.data.formData.is_return
  //   let type=e.currentTarget.dataset.type
  //   let formData=this.data.formData
  //   if(type!='ticket'){ //开始结束
  //     console.log('改了固定时间')
  //     formData.start_time=e.detail.value
  //     this.setData({
  //       date: e.detail.value,
  //       changeTimeOne:true,
  //       formData //测试这里是否必要  若删去改变时间则不会影响其他输入表单
  //     })
  
  //     let dC=e.detail.value.split("-")
  //     let y=parseInt(dC[0]),
  //         m=dC[1],
  //         d=dC[2],
  //         dN=parseInt(dC[2])+1<10?'0'+(parseInt(dC[2])+1):parseInt(dC[2])+1
  //     if(d==new Date(y,m,0).getDate()&&m!=12){
  //       formData.end_time=y+'-'+(new Date().getMonth()+2)+'-'+'01'
  //       this.setData({
  //         dateN:y+'-'+(new Date().getMonth()+2)+'-'+'01',
  //         dateNextTrue:y+'-'+(new Date().getMonth()+2)+'-'+'01',
  //         formData
  //       })
  //     }else if(d==new Date(y,m,0).getDate()&&m==12){
  //       formData.end_time=(y+1)+'-'+'01'+'-'+'01'
  //       this.setData({
  //         dateN:(y+1)+'-'+'01'+'-'+'01',
  //         dateNextTrue:(y+1)+'-'+'01'+'-'+'01',
  //         formData
  //       })
  //     }else{
  //       formData.end_time=y+'-'+m+'-'+dN
  //       this.setData({
  //         dateN:y+'-'+m+'-'+dN,
  //         dateNextTrue:y+'-'+m+'-'+dN,
  //         formData
  //       })
  //     }
  //   }else{ //机票往返   
  //     console.log('改了去返时间')  
  //     formData.dep_date=e.detail.value
  //     console.log(formData)
  //     this.setData({
  //       tDate: e.detail.value,
  //       // formData
  //       changeTimeTwo:true
  //     })
  
  //     let dC=e.detail.value.split("-")
  //     let y=parseInt(dC[0]),
  //         m=dC[1],
  //         d=dC[2],
  //         dN=parseInt(dC[2])+1<10?'0'+(parseInt(dC[2])+1):parseInt(dC[2])+1
  //     if(d==new Date(y,m,0).getDate()&&m!=12){
  //       formData.ret_date=y+'-'+(new Date().getMonth()+2)+'-'+'01'
  //       this.setData({
  //         tDateN:y+'-'+(new Date().getMonth()+2)+'-'+'01',
  //         tDateNextTrue:y+'-'+(new Date().getMonth()+2)+'-'+'01',
  //         formData
  //       })
  //     }else if(d==new Date(y,m,0).getDate()&&m==12){
  //       formData.ret_date=(y+1)+'-'+'01'+'-'+'01'
  //       this.setData({
  //         tDateN:(y+1)+'-'+'01'+'-'+'01',
  //         tDateNextTrue:(y+1)+'-'+'01'+'-'+'01',
  //         formData
  //       })
  //     }else{
  //       formData.ret_date=y+'-'+m+'-'+dN
  //       this.setData({
  //         tDateN:y+'-'+m+'-'+dN,
  //         tDateNextTrue:y+'-'+m+'-'+dN,
  //         formData
  //       })
  //     }

  //     if(is_return==0){//如果不是往返  则返程时间设置为空  否则影响必填字段
  //       this.setData({
  //         tDateN:''
  //       })
  //     }
  //   }
    
    
    
  // },
  bindDateChange: function (e) {
    let is_return=this.data.formData.is_return
    let type=e.currentTarget.dataset.type
    let formData=this.data.formData
    if(type!='ticket'){ //开始结束
      console.log('改了固定时间')
      formData.start_time=e.detail.value
      this.setData({
        // date: e.detail.value,
        dateN: e.detail.value,   
        changeTimeOne:true,
        formData //测试这里是否必要  若删去改变时间则不会影响其他输入表单
      })
  
      let dC=e.detail.value.split("-")
      let y=parseInt(dC[0]),
          m=dC[1],
          d=dC[2],
          dN=parseInt(dC[2])+1<10?'0'+(parseInt(dC[2])+1):parseInt(dC[2])+1
      if(d==new Date(y,m,0).getDate()&&m!=12){
        formData.end_time=y+'-'+(new Date().getMonth()+2)+'-'+'01'
        this.setData({
          // dateN:y+'-'+(new Date().getMonth()+2)+'-'+'01',
          // dateNextTrue:y+'-'+(new Date().getMonth()+2)+'-'+'01',
          dateNN:y+'-'+(new Date().getMonth()+2)+'-'+'01',
          dateNNTrue:y+'-'+(new Date().getMonth()+2)+'-'+'01',
          formData
        })
      }else if(d==new Date(y,m,0).getDate()&&m==12){
        formData.end_time=(y+1)+'-'+'01'+'-'+'01'
        this.setData({
          // dateN:(y+1)+'-'+'01'+'-'+'01',
          // dateNextTrue:(y+1)+'-'+'01'+'-'+'01',
          dateNN:(y+1)+'-'+'01'+'-'+'01',
          dateNNTrue:(y+1)+'-'+'01'+'-'+'01',
          formData
        })
      }else{
        formData.end_time=y+'-'+m+'-'+dN
        this.setData({
          // dateN:y+'-'+m+'-'+dN,
          // dateNextTrue:y+'-'+m+'-'+dN,
          dateNN:y+'-'+m+'-'+dN,
          dateNNTrue:y+'-'+m+'-'+dN,
          formData
        })
      }



    }else{ //机票往返   
      console.log('改了去返时间')  
      formData.dep_date=e.detail.value
      console.log(formData)
      this.setData({
        tDate: e.detail.value,
        // formData
        changeTimeTwo:true
      })
  
      let dC=e.detail.value.split("-")
      let y=parseInt(dC[0]),
          m=dC[1],
          d=dC[2],
          dN=parseInt(dC[2])+1<10?'0'+(parseInt(dC[2])+1):parseInt(dC[2])+1
      if(d==new Date(y,m,0).getDate()&&m!=12){
        formData.ret_date=y+'-'+(new Date().getMonth()+2)+'-'+'01'
        this.setData({
          tDateN:y+'-'+(new Date().getMonth()+2)+'-'+'01',
          tDateNextTrue:y+'-'+(new Date().getMonth()+2)+'-'+'01',
          formData
        })
      }else if(d==new Date(y,m,0).getDate()&&m==12){
        formData.ret_date=(y+1)+'-'+'01'+'-'+'01'
        this.setData({
          tDateN:(y+1)+'-'+'01'+'-'+'01',
          tDateNextTrue:(y+1)+'-'+'01'+'-'+'01',
          formData
        })
      }else{
        formData.ret_date=y+'-'+m+'-'+dN
        this.setData({
          tDateN:y+'-'+m+'-'+dN,
          tDateNextTrue:y+'-'+m+'-'+dN,
          formData
        })
      }

      if(is_return==0){//如果不是往返  则返程时间设置为空  否则影响必填字段
        this.setData({
          tDateN:''
        })
      }
    }
    
    
    
  },
  bindNextDateChange: function (e) {
    let type=e.currentTarget.dataset.type
    let formData=this.data.formData
    if(type!='ticket'){//开始结束
      formData.end_time=e.detail.value
      this.setData({
        // dateN: e.detail.value,
        dateNN:e.detail.value,
        formData
      })
    }else{//往返机票
      formData.ret_date=e.detail.value
      this.setData({
        tDateN: e.detail.value,
        formData
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
    if(this.data.d==new Date(this.data.y,this.data.m,0).getDate()&&this.data.m!=12){
      this.setData({
        dateN:this.data.y+'-'+(new Date().getMonth()+2)+'-'+'01',
        dateNextTrue:this.data.y+'-'+(new Date().getMonth()+2)+'-'+'01',
        // tDateN:this.data.y+'-'+(new Date().getMonth()+2)+'-'+'01',
        tDateNextTrue:this.data.y+'-'+(new Date().getMonth()+2)+'-'+'01',
        // 后天补丁
        dateNN:this.data.y+'-'+(new Date().getMonth()+2)+'-'+'02',
        dateNNTrue:this.data.y+'-'+(new Date().getMonth()+2)+'-'+'02',
      })
    }else if(this.data.d==new Date(this.data.y,this.data.m,0).getDate()&&this.data.m==12){
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
  getData(id=103,cid=1){
    let that=this
    that.setData({
      id
    })
    wx.request({
      url:api.release.edit+id,
      method:'get',
      header: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success(res){
        let formData=res.data.data 
        that.setData({
          formData
        })
        that.getColumns(cid)
      }
    })
  },
  getColumns(cid){
    let that=this
    let formData=that.data.formData
    wx.request({
      url:api.release.columns,
      // url:api.release.edit+cid,
      method:'get',
      data:{
        cid
      },
      header: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success(res){
        that.setData({
          columns:res.data.data
        })

        let columns=res.data.data//根据返回数据判断的提交字段
        let dataObj={cid}

        let mustDataObj=[]//必填字段
        let dataArr=[]//提交字段列表

        console.log(columns)
        console.log(formData)
        for(let i in columns){
          let dataType=columns[i].type
          let dataName=columns[i].field_name
          let dataRequire=columns[i].setting.require
          // 组成提交参数对象 渲染页面用
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
          //将已有数据填充到相应位置 
          dataObj={
            cid:formData.cid,
            city:formData.city_id,
            hy_id:formData.hy_id,
            end_time:formData.end_time,
            start_time:formData.start_time,
            
            // main_image:[],
            // desc_image:[],
            }
            
            for(let x in formData){
              // console.log(x)
              dataObj[x]=formData[x]
              // console.log(dataObj)
            }
            
          dataArr.push(dataName)
          that.setData({
            // [dataName]:'test',
            dataArr,
            dataObj,
            mustDataObj
          })
          //必填字段填充
            // for(let x=0,len=mustDataObj.length;x<len;x++){
            //   dataObj[mustDataObj[x]]=formData[mustDataObj[x]]
            // }
            dataObj.main_image=[]
            dataObj.main_image.push(formData.main_image.path)
            if(formData.desc_image.length>0){
              let temp=[]
              // for(let i=0,len=formData.desc_image.length;i<len;i++){
              //   dataObj.desc_image.push(formData.desc_image[i].path)
              // }
              for(let j=0,len=formData.desc_image.length;j<len;j++){
                temp.push(formData.desc_image[j].path)
              }
              dataObj.desc_image=temp
            }


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

    //formData是前端可见数据 所以这里也要修改 否则时间修改则变成原型
    let formData=that.data.formData
    formData[fieldname]=e.detail.val
    that.setData({
      dataObj,
      // formData
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
    // dataObj[fieldname]=e.detail.img
    console.log(e.detail)
    if(e.detail.path){
      dataObj[fieldname]=e.detail.path
    }else{
      dataObj[fieldname]=e.detail.img
    }

    that.setData({
      dataObj,
      changeM:e.detail.changeM,
      changeD:e.detail.changeD,
      pathLen:e.detail.pathLen

    })
  },
  // 组件传值end
  save(){
    let that=this
    let saveObj=that.data.dataObj
    console.log(that.data.dataObj)
    let mustDataObj=that.data.mustDataObj
    let formData=that.data.formData
    // console.log(that.data.formData)  
    // console.log(mustDataObj)
    let pass=[]
    //有则……无则
    saveObj.hy_id=that.data.hy_id?that.data.hy_id:saveObj.hy_id
    saveObj.city=that.data.cityId?that.data.cityId:saveObj.city
    // saveObj.start_time=that.data.date?that.data.date:saveObj.start_time
    // saveObj.end_time=that.data.dateN?that.data.dateN:saveObj.end_time  

    // saveObj.start_time=that.data.changeTimeOne?that.data.date:saveObj.start_time
    // saveObj.end_time=that.data.changeTimeOne?that.data.dateN:saveObj.end_time  
    saveObj.start_time=that.data.changeTimeOne?that.data.dateN:saveObj.start_time
    saveObj.end_time=that.data.changeTimeOne?that.data.dateNN:saveObj.end_time  

    // 机票时
    if(that.data.model_name=='air_ticket'||that.data.model_name=='group'){
      //无返程
      saveObj.dep_address=that.data.depCityId||formData.dep_address
      saveObj.ret_address=that.data.retCityId||formData.ret_address
      // saveObj.dep_date=that.data.tDate||formData.dep_date
      saveObj.dep_date=that.data.changeTimeTwo?that.data.tDate:formData.dep_date

      saveObj.dep_airport=that.data.dep_airport||formData.dep_airport
      saveObj.dep_arrival_airport=that.data.dep_arrival_airport||formData.dep_arrival_airport
      //有返程
      // if(that.data.tDateN){
      if(formData.is_return==1){
        saveObj.ret_date=that.data.tDateN||formData.ret_date
        saveObj.ret_airport=that.data.ret_airport||formData.ret_airport
        saveObj.ret_arrival_airport=that.data.ret_arrival_airport||formData.ret_arrival_airport
      }else{
        saveObj.ret_date=''
        saveObj.ret_airport=''
        saveObj.ret_arrival_airport=''
      }
    }
    // console.log(that.data.dataObj)
    // console.log(that.data.formData)      
    // console.log(mustDataObj)
    

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
              url: '../extension/extension?changeM='+that.data.changeM+'&changeD='+that.data.changeD+'&pathLen='+that.data.pathLen+'&id='+that.data.id
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
              url: '../extension/extension?changeM='+that.data.changeM+'&changeD='+that.data.changeD+'&pathLen='+that.data.pathLen+'&id='+that.data.id
            })
          }else{
            wx.showToast({
              title:'请完善表单信息',
              duration:3000
            })
          }
        }
      }else{//非机票活群组模式时
        if(pass.indexOf(false)==-1
          &&saveObj.hy_id
          &&saveObj.city){
            wx.setStorageSync('saveObj',saveObj)
            wx.navigateTo({
              url: '../extension/extension?changeM='+that.data.changeM+'&changeD='+that.data.changeD+'&pathLen='+that.data.pathLen+'&id='+that.data.id
            })
          }else{
            wx.showToast({
              title:'请完善表单信息',
              duration:3000
            })
          }
      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      // model_name:options.model_name||'air_ticket'
      model_name:options.model_name      
    })
    this.getMenberInfo()
    this.getData(options.id,options.cid)
    
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