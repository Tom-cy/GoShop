App({
  serverUrl: 'https://www.imoocdsp.com',
  onLaunch(options) {
  },
  onShow(options) {
  },

  // 构建全局购物车商品对象， { 商品ID ， 购买数}

  cartItem(itemId, counts) {
    var cartItem = new Object()
    cartItem.itemId = itemId;
    cartItem.counts = counts;
    return cartItem
  }
});
