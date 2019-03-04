// components/columns/images/images.js
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
    hasImg:Object
    
  },
  data:{
    img:[],
    path:[]
  },
  methods:{
    chooseImg(){
      let that=this
      if(that.data.path.length>0){ //删除部分图片又上传新图片的情况
        let path=that.data.path
        console.log(path.length)
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
                img:that.data.img.concat(res.tempFilePaths),//仅展示用
                path:path.concat(res.tempFilePaths)//真实用以提交的真实路径
               })
              that.triggerEvent('imgInput',{
                // img:that.data.img,
                img:that.data.path,//传入真实路径                
                changeD:2,//此种情况暂定代号2
                pathLen:path.length,//编辑图片剩余的量
              })
            }
          }
        })
      }else{//初次上传或全部删除后重新上传
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
              that.triggerEvent('imgInput',{
                img:that.data.img,
                changeD:1
              })
              console.log(that.data.img)
            }
          }
        })
      }
     
    },
    delImg(e){
      let that=this
      let imgIndex=e.currentTarget.dataset.index
      let imgTemp=that.data.img
      
      imgTemp.splice(imgIndex,1)
      that.setData({
        img:imgTemp
      })
      that.triggerEvent('imgInput',{
        img:that.data.img,
      })

      if(that.data.path.length>0){
        let pathTemp=that.data.path//编辑发布所需的真是路径
        pathTemp.splice(imgIndex,1)
        that.setData({
          path:pathTemp
        })
        that.triggerEvent('imgInput',{
          path:that.data.path
        })
      }
    },
    checkImg(){
      let that=this
      let temp=[]
      let tempPath=[]
      if(that.data.hasImg){
        for(let i=0,len=that.data.hasImg.length;i<len;i++){
          temp.push(that.data.hasImg[i].fullpath)
          tempPath.push(that.data.hasImg[i].path)          
        }
        that.setData({
          img:temp,
          path:tempPath
        })
      }
    }
  },
  ready(){
    this.checkImg()
  }
})