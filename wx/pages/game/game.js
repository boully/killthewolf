// pages/game/game.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    player_cards: [],
    left_cards: [],
    message: [
      "每人轮流看自己的牌\n看完后天黑请闭眼",
      "守卫请睁眼\n守卫请互认",
      "守卫请睁眼\n守卫请互认",
      "狼人请睁眼\n狼人请互认\n如果只有一个狼人，可以翻看一张底牌",
      "狼人请睁眼\n狼人请互认\n如果只有一个狼人，可以翻看一张底牌",
      "爪牙请睁眼\n狼人请竖起大拇指",
      "预言家请睁眼\n预言家可以翻看一张玩家身份或两张底牌",
      "盗贼请睁眼\n盗贼可以交换自己与换其他一名玩家的牌\n换完可以看牌",
      "捣蛋鬼请睁眼\n捣蛋鬼可以交换其他两名玩家的牌\n不可以看",
      "失眠者请睁眼\n失眠者可以翻看自己的牌有没有被换",
      "天亮请睁眼"
    ],
    allowCheckRole: true,
    stage: 0
  },

  check: function(e) {
    if (this.data.allowCheckRole) {
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
    }
  },

  next: function(e) {
    console.log("stage: " + this.data.stage)
    if (this.data.stage == 0) {  // 看牌 -> 守卫
      this.setData({
        stage: 1,
      })
      return
    }
    if (this.data.stage == 1) {  // 守卫点亮
      var local_player_cards = this.data.player_cards
      for (var i = 0; i < local_player_cards.length; ++i) {
        if (local_player_cards[i].role == 2 || local_player_cards[i].role == 3)
          local_player_cards[i].color = 'green'
      }
      this.setData({
        stage: 2,
        player_cards: local_player_cards
      })
      return
    }
    if (this.data.stage == 2) {  // 守卫 -> 狼人
      var local_player_cards = this.data.player_cards
      for (var i = 0; i < local_player_cards.length; ++i) {
        local_player_cards[i].color = 'blue'
      }
      console.log(local_player_cards)
      this.setData({
        stage: 3,
        player_cards: local_player_cards
      })
      return
    }
    if (this.data.stage == 3) {  // 狼人点亮
      var local_player_cards = this.data.player_cards
      for (var i = 0; i < local_player_cards.length; ++i) {
        if (local_player_cards[i].role == 0 || local_player_cards[i].role == 1)
          local_player_cards[i].color = 'green'
      }
      this.setData({
        stage: 4,
        player_cards: local_player_cards
      })
      return
    }
    if (this.data.stage == 4) {  // 狼人 -> 爪牙
      this.setData({
        stage: 5,
      })
      return
    }
    if (this.data.stage == 5) {  // 爪牙 -> 预言家
      var local_player_cards = this.data.player_cards
      for (var i = 0; i < local_player_cards.length; ++i) {
        local_player_cards[i].color = 'blue'
      }
      this.setData({
        stage: 6,
        player_cards: local_player_cards
      })
      return
    }
    if (this.data.stage == 6) {  // 预言家
      var local_player_cards = this.data.player_cards
      for (var i = 0; i < local_player_cards.length; ++i) {
        local_player_cards[i].color = 'blue'
      }
      this.setData({
        stage: 7,
      })
      return
    }
    if (this.data.stage == 7) {  // 盗贼
      this.setData({
        stage: 8,
      })
      return
    }
    if (this.data.stage == 8) {  // 捣蛋鬼
      this.setData({
        stage: 9,
      })
      return
    }
    if (this.data.stage == 9) {  // 失眠者
      this.setData({
        stage: 10,
      })
      return
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var local_player_cards = []
    var local_left_cards = []
    var local_players = JSON.parse(options.players)
    var local_roles = JSON.parse(options.roles)
    for (var i = 0; i < local_players.length; ++i) {
      local_player_cards.push({
        key: i,
        player: local_players[i],
        role: local_roles[i],
        showRole: false,
        color: 'blue'
      })
    }
    for (var i = 0; i < 3; ++i) {
      local_left_cards.push({
        key: i,
        player: "底牌" + i,
        role: local_roles[i + local_players.length],
        showRole: false,
        color: 'red'
      })
    }
    console.log(local_player_cards)
    console.log(local_left_cards)
    this.setData({
      player_cards: local_player_cards,
      left_cards: local_left_cards
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  bindKeyInput: function(e) {
    var list = this.data.array;
    list.push(123);
    this.setData({
      array: list
    })
  }

})