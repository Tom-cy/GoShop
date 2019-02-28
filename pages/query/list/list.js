const app = getApp()
Page({
  data: {
    titleName: "",
    itemList:[]
  },
  onLoad(params) {
    var me = this
    //	分类页面用户模糊查询搜索的商品，若输入为空则显示商品推荐列表
    var searchType = params.searchType
    var itemName = params.itemName
    var catId = params.catId
    var catName = params.catName


    if (searchType === "cat") {
      my.showNavigationBarLoading()
      my.showLoading({
        content: '正在加载中'
      });

      my.httpRequest({
        url: app.serverUrl + '/items/searchByCat?catId=' + catId,
        method: "POST",
        dataType: 'json',
        success: (res) => {
          let myData = res.data
          if (myData.status === 200) {
            var itemList = myData.data
            me.setData({
              itemList: itemList,
              titleName: catName
            })
          }
        },
        complete: function (res) {
          my.hideNavigationBarLoading();
          my.hideLoading();
        }
      });
    } else if (searchType == 'words') {
      my.showNavigationBarLoading()
      my.showLoading({
        content: '正在加载中'
      });

      my.httpRequest({
        url: app.serverUrl + '/items/search',
        method: "POST",
        data: { itemName: itemName },
        dataType: 'json',
        success: (res) => {
          let myData = res.data
          if (myData.status === 200) {
            var itemList = myData.data
            
            me.setData({
              itemList:itemList,
              titleName: "搜索结果"
            })
          }
        },
        complete: function (res) {
          my.hideNavigationBarLoading();
          my.hideLoading();
        }
      });
    }
  },
  onReady() {
  }
});
