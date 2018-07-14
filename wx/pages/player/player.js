// pages/player/player.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    players: ["a", "b", "c", "d", "e", "f"],
    roles: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    numPlayer: 0,
    inputValue: ""
  },

  getNumPlayer: function () {
    return this.data.roles.length - 3 - this.data.players.length
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      roles: JSON.parse(options.roles),
    })
    this.setData({
      numPlayer: this.getNumPlayer()
    })
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
    if (this.getNumPlayer() <= 0) {
      return
    }
    var players_local = this.data.players;
    players_local.push(e.detail.value.input);
    console.log(players_local);
    this.setData({
      players: players_local,
      numPlayer: this.getNumPlayer(),
      inputValue: ""
    })
  },

  delete: function(e) {
    var players_local = this.data.players;
    players_local.splice(e.target.dataset.index, 1);
    console.log(e);
    this.setData({
      players: players_local,
      numPlayer: this.getNumPlayer(),
      inputValue: ""
    })
  },

  navigate: function(e) {
    console.log('-------------click', e);
    if (this.getNumPlayer() != 0) {
      return
    }
    wx.navigateTo({
      url: '../../pages/game/game?' +
        'players=' + JSON.stringify(this.data.players) +
        '&roles=' + JSON.stringify(this.data.roles),
    })
  }
})
