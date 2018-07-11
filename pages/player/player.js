// pages/player/player.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_array: ["aaaa", "bbbb", "cccc"]
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
  
  },

  add: function(e) {
    var user_array_local = this.data.user_array;
    user_array_local.push(e.detail.value.input);
    console.log(user_array_local);
    this.setData({
      user_array: user_array_local,
    })
  },

  delete: function(e) {
    var user_array_local = this.data.user_array;
    user_array_local.splice(e.target.dataset.index, 1);
    console.log(e);
    this.setData({
      user_array: user_array_local,
    })
  }
})