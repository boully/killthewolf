// pages/game/game.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    player_cards: [],
    left_cards: [],
  },

  check: function(e) {
    var index = e.currentTarget.dataset.id
    var card_type = e.currentTarget.dataset.type
    var local_player_cards = this.data.player_cards
    var local_left_cards = this.data.left_cards
    if (card_type == 'player')
      local_player_cards[index].showRole = !local_player_cards[index].showRole
    else 
      local_left_cards[index].showRole = !local_left_cards[index].showRole
    this.setData({
      player_cards: local_player_cards,
      left_cards: local_left_cards,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var local_player_cards = []
    var local_left_cards = []
    var local_players = JSON.parse(options.players)
    var local_roles = JSON.parse(options.roles)
    for (var i = 0; i < local_players.length; ++i) {
      local_player_cards.push({
        key: i,
        player: local_players[i],
        role: local_roles[i],
        showRole: false
      })
    }
    for (var i = 0; i < 3; ++i) {
      local_left_cards.push({
        key: i,
        player: "底牌" + i,
        role: local_roles[i + local_players.length],
        showRole: false
      })
    }
    console.log(local_player_cards)
    console.log(local_left_cards)
    this.setData ({
      player_cards: local_player_cards,
      left_cards: local_left_cards
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

  bindKeyInput: function (e) {
    var list = this.data.array;
    list.push(123);
    this.setData({
      array: list
    })
  }

})