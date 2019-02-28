const app = getApp()
Page({
  data: {
    headerImagesArr: [],
    itemCountentArr: [],
    animationInfo: {},
    animationOpacity: 0,
    cartIco: 'cart-empty',
    item: {}
  },
  // 去购物车
  goToCar(){
    my.switchTab({
      url:"/pages/shoppingCar/cart/cart"
    });
  },
  // 实习动画效果--添加商品到购物车
  addToCart() {
    var me = this

    me.setData({
      animationOpacity: 1
    })
    me.showAddToCartAnimation()

    // 商品ID存入缓存购物车
    var itemId = me.data.item.id;
    me.cartItemIncrease(itemId)
  },
  // 将商品放入购物车
  cartItemIncrease(itemId) {
    var me = this;
    var cartItemIdArray = my.getStorageSync({
      key: 'cartItemIdArray', // 缓存数据的key
    }).data;

    // 对cartItemIdArray进行判断空
    if (cartItemIdArray == null || cartItemIdArray == undefined) {
      cartItemIdArray = []
    }
    // 定义标识用于判断购物车缓存中师否含有当前页的商品
    var isItemAdded = false;
    for (var i = 0; i < cartItemIdArray.length; i++) {
      var item = cartItemIdArray[i];
      if (item != null && item != undefined && item.itemId == itemId) {
        cartItemIdArray.splice(i, 1)
        var counts = item.counts + 1
        // 构建的商品对象
        var cartItemnew = app.cartItem(itemId, counts)
        cartItemIdArray.push(cartItemnew)

        var isItemAdded = true;
        break;
      }

    }
    // 在没有添加过当前商品的时候， 新创建一个对象放入数组
    if (!isItemAdded) {
      // 构建的商品对象
      var cartItem = app.cartItem(itemId, 1)
      // 将这个对象放入购物车
      cartItemIdArray.push(cartItem)

    }
    my.setStorageSync({
      key: 'cartItemIdArray', // 缓存数据的key
      data: cartItemIdArray, // 要缓存的数据
    });
  },
  // 实习动画效果方法
  showAddToCartAnimation() {
    var me = this
    var animation = my.createAnimation({
      duration: 500
    })
    me.animation = animation;

    // 旋转
    // this.animation.translateX("296rpx").step()

    // 抛物线
    this.animation.rotate(-180).translateX("296rpx").step()

    this.setData({
      animationInfo: this.animation.export()
    })

    // 复原动画
    setTimeout(function () {
      this.setData({
        animationOpacity: 0,
        cartIco: 'cart-full'
      })
      setTimeout(function () {
        this.animation.rotate(0).translateX(0).step({
          duration: 0
        })
        this.setData({
          animationInfo: this.animation.export()
        })

      }.bind(this), 550)

    }.bind(this), 600)
  },
  onShow() {
    var animation = my.createAnimation();
    this.setData({
      // 导出动画效果
      animationInfo: animation.export()
    })
  },
  onLoad(params) {
    var me = this
    //	获取Id
    var itemId = params.itemId
    my.showNavigationBarLoading()
    my.showLoading({
      content: '正在加载中'
    });

    my.httpRequest({
      url: app.serverUrl + '/items/searchById?itemId=' + itemId,
      method: "POST",
      dataType: 'json',
      success: (res) => {
        let myData = res.data
        if (myData.status === 200) {
          var item = myData.data

          var headerImagesStr = item.headerImages;
          // 数据转为json数组
          var headerImagesArr = JSON.parse(headerImagesStr)

          // 数据转为json数组
          var itemCountentArr = JSON.parse(item.content)
          me.setData({
            item: item,
            itemCountentArr: itemCountentArr,
            headerImagesArr: headerImagesArr
          })
        }
      },
      complete: function (res) {
        my.hideNavigationBarLoading();
        my.hideLoading();
      }
    });

    // if (searchType === "cat") {
    //   my.showNavigationBarLoading()
    //   my.showLoading({
    //     content: '正在加载中'
    //   });
    //   my.httpRequest({
    //     url: app.serverUrl + '/items/searchByCat?catId=' + catId,
    //     method: "POST",
    //     dataType: 'json',
    //     success: (res) => {
    //       let myData = res.data
    //       if (myData.status === 200) {
    //         var itemList = myData.data
    //         console.log(itemList)
    //         me.setData({
    //           itemList: itemList,
    //           titleName: catName
    //         })
    //       }
    //     },
    //     complete: function (res) {
    //       my.hideNavigationBarLoading();
    //       my.hideLoading();
    //     }
    //   });
    // } else if (searchType == 'words') {
    //   my.showNavigationBarLoading()
    //   my.showLoading({
    //     content: '正在加载中'
    //   });

    //   my.httpRequest({
    //     url: app.serverUrl + '/items/search',
    //     method: "POST",
    //     data: { itemName: itemName },
    //     dataType: 'json',
    //     success: (res) => {
    //       let myData = res.data
    //       if (myData.status === 200) {
    //         var itemList = myData.data
    //         console.log(itemList)
    //         me.setData({
    //           itemList:itemList,
    //           titleName: "搜索结果"
    //         })
    //       }
    //     },
    //     complete: function (res) {
    //       my.hideNavigationBarLoading();
    //       my.hideLoading();
    //     }
    //   });
    // }
  },
  onReady() {
  }
});
