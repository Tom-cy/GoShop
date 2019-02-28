const app = getApp()
Page({
  data: {
    carousels: [],
    recdata: [],
    newdata: []
  },
  onLoad(query) {
  },
  showItemList(e) {
    var itemId = e.target.dataset.itemId
    var catId = e.target.dataset.catId
    var searchType = e.target.dataset.searchType

    if (searchType == 1) {
      my.navigateTo({
        url: "/pages/query/item/item?itemId=" + itemId
      });
    } else if (searchType == 2) {
      my.navigateTo({
        url: "/pages/query/list/list?searchType=cat&catId=" + catId + "&catName=搜索结果"
      });
    }
  },
  showItem(e) {
    var itemId = e.target.dataset.itemId
    my.navigateTo({
      url: "/pages/query/item/item?itemId=" + itemId
    });
  },
  // //页面加载完成
  onReady() {
    var me = this
    // 获取轮播图数据
    my.httpRequest({
      url: app.serverUrl + '/index/carousels',
      method: "POST",
      success: (res) => {
        let data = res.data
        if (data.status === 200) {
          var carousels = data.data
          me.setData({
            carousels: carousels
          })
        }
      },
    });
    // 获取商品上新数据
    my.httpRequest({
      url: app.serverUrl + "/index/items/new",
      method: "POST",
      success: (res) => {
        let data = res.data
        if (data.status === 200) {
          var newdata = data.data
          me.setData({
            newdata: newdata
          })
        }
      },
    });
    // 获取热门推荐数据
    my.httpRequest({
      url: app.serverUrl + "/index/items/rec",
      method: "POST",
      success: (res) => {
        let data = res.data
        if (data.status === 200) {
          var recdata = data.data
          me.setData({
            recdata: recdata
          })
        }
      },
    });

  },
  onShow() {
    // var cartItemIdArray = my.getStorageSync({
    //   key: 'cartItemIdArray', // 缓存数据的key
    // }).data;
    // console.log("-----------------")
    // console.log(cartItemIdArray)
    // console.log("-----------------")
  }
});
