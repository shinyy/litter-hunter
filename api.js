let api_root="https://h5.expo-hunter.com"

let api={
  login:api_root+'/api/login',
  country:api_root+'/api/country/list',
  city:api_root+'/api/country/city',
  city_list:api_root+'/api/city-list',
  new_city_list:api_root+'/api/region/city-list',
  category:api_root+'/api/info/category',
  image:api_root+'/api/upload/image',
  member_info:api_root+'/api/member/info',
  message:api_root+'/api/message/list',
  index:{
    info:api_root+'/api/index/info',
    special:api_root+'/api/index/special',
    hot:api_root+'/api/index/hot',
    new:api_root+'/api/index/new/'
  },
  classification:{
    industry:api_root+'/api/info/industry',
    list:api_root+'/api/info/list',
    search:api_root+'/api/info/search',    
    detail:api_root+'/api/info/',
    demandDetail:api_root+'/api/demand/',
    getPhone:api_root+'/api/info/view-mobile/',
    demand:api_root+'/api/demand/list'
  },
  release:{
    columns:api_root+'/api/info/columns',
    release:api_root+'/api/info/save',
    top_config:api_root+'/api/info/top-config',
    special_config:api_root+'/api/info/special-config',
    edit:api_root+'/api/info/edit/',
    update:api_root+'/api/info/update',
    demand:api_root+'/api/demand/save'
  },
  my:{
    index:api_root+'/api/member/index',
    update:api_root+'/api/member/update',
    send:api_root+'/api/sms/send',
    recharge_list:api_root+'/api/recharge/list',
    pay:api_root+'/api/pay',
    recharge:api_root+'/api/recharge',
    feedback:api_root+'/api/feedback',
    list:api_root+'/api/member/info-list/',
    destroy:api_root+'/api/info/destroy/',
    flows:api_root+'/api/member/flows',
    about:api_root+'/api/about_us'
  },
  header: {
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': 'Bearer ' + wx.getStorageSync('token')
  }
}

module.exports = api;