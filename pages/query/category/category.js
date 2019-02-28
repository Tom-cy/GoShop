const app = getApp()
Page({
  data: {
    catedata:[]
  },
  onLoad() {},
  searchItems(e){
    let itemName = e.detail.value
    if(itemName != '' && itemName != undefined && itemName != null){
      my.navigateTo({
        url:  "/pages/query/list/list?searchType=words&itemName=" + itemName
      });
    }
  },
  onReady(){
    var me = this;
    my.httpRequest({
      url:  app.serverUrl + '/cats',
      method: "POST",
      success: (res) => {
        var data = res.data
        if(data.status ===200){
          var catedata= data.data
          me.setData({
            catedata:catedata
          })
        }
      },
    });
  }
});
