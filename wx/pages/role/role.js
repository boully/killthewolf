// pages/role/role.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: getApp().globalData.array,
    roles: [],
  },

  select: function(e) {
    var local_array = this.data.array;
    var local_roles = new Set(this.data.roles);
    local_array[e.currentTarget.dataset.id].color = "green";
    local_roles.add(e.currentTarget.dataset.id)
    this.setData({
      array: local_array,
      roles: [...local_roles]
    })
  },

  navigate: function(e) {
    wx.navigateTo({
      url: '../../pages/player/player?roles=' + JSON.stringify(this.data.roles),
    })
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