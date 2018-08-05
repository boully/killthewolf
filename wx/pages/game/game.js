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
    checked_player: [],
    checked_left: [],
    num_wolf_player: 0,
    stage: 0
  },

  initStage: function() {
    var local_player_cards = this.data.player_cards
    var local_left_cards = this.data.left_cards
    for (var i = 0; i < local_player_cards.length; ++i) {
      local_player_cards[i].showRole = false
    }
    for (var i = 0; i < local_left_cards.length; ++i) {
      local_left_cards[i].showRole = false
    }
    this.setData({
      player_cards: local_player_cards,
      left_cards: local_left_cards,
    })
  },

  allowCheckPlayer: function(e) {
    var stage = this.data.stage
    var clicked_index = e.currentTarget.dataset.id
    var clicked_init_role = this.data.player_cards[clicked_index].init_role
    var local_checked_player = this.data.checked_player
    var local_checked_left = this.data.checked_left
    if (stage == 0) {
      return true
    }
    if (stage == 6 && clicked_init_role != 5 && local_checked_left.length == 0 &&
        (local_checked_player.length == 0 || local_checked_player.indexOf(clicked_index) >= 0)) {
      return true
    }
    if (stage == 9 && clicked_init_role == 9) {
      return true
    }
    return false
  },

  allowCheckLeft: function(e) {
    var stage = this.data.stage
    var clicked_index = e.currentTarget.dataset.id
    var clicked_init_role = this.data.left_cards[clicked_index].init_role
    var local_checked_player = this.data.checked_player
    var local_checked_left = this.data.checked_left
    if (stage == 4 && this.data.num_wolf_player == 1 && this.data.checked_player.length == 0 &&
        (this.data.checked_left.length == 0 || this.data.checked_left.indexOf(clicked_index) >= 0)) {
      return true
    }
    if (stage == 6 && this.data.checked_player.length == 0 && 
      (this.data.checked_left.length < 2 || this.data.checked_left.indexOf(clicked_index) >= 0)) {
      return true
    }
    return false
  },

  allowSwitch: function(e) {
    var stage = this.data.stage
    var clicked_index = e.currentTarget.dataset.id
    var clicked_init_role = this.data.player_cards[clicked_index].init_role
    var local_checked_player = this.data.checked_player
    var local_player_cards = this.data.player_cards
    if (stage == 7 && clicked_init_role != 6 && local_checked_player.length == 0) {
      var robber_index = -1;
      for (var i = 0; i < local_player_cards.length; ++i) {
        if (local_player_cards[i].init_role == 6) {
          robber_index = i
        }
      }
      if (robber_index != -1) {
        local_player_cards[robber_index].current_role = local_player_cards[clicked_index].current_role
        local_player_cards[robber_index].showRole = true
        local_player_cards[robber_index].color = 'green'
        local_player_cards[clicked_index].current_role = 6
      }
      this.setData({
        player_cards: local_player_cards
      })
      return true
    }
    if (stage == 8 && clicked_init_role != 7 && local_checked_player.length < 2) {
      if (local_checked_player.length == 1) {
        var prev_clicked_index = local_checked_player[0]
        var prev_clicked_role = local_player_cards[prev_clicked_index].current_role
        local_player_cards[prev_clicked_index].current_role = local_player_cards[clicked_index].current_role
        local_player_cards[clicked_index].current_role = prev_clicked_role
        this.setData({
          player_cards: local_player_cards
        })
      }
      return true
    }
    return false
  },

  check: function(e) {
    var index = e.currentTarget.dataset.id
    var card_type = e.currentTarget.dataset.type
    var local_player_cards = this.data.player_cards
    var local_left_cards = this.data.left_cards
    var local_checked_player = new Set(this.data.checked_player)
    var local_checked_left = new Set(this.data.checked_left)
    if (card_type == 'player' && this.allowCheckPlayer(e)) {
      local_player_cards[index].showRole = !local_player_cards[index].showRole
      local_checked_player.add(index)
    }
    if (card_type == 'left' && this.allowCheckLeft(e)) {
      local_left_cards[index].showRole = !local_left_cards[index].showRole
      local_checked_left.add(index)
    }
    if (card_type == 'player' && this.allowSwitch(e)) {
      local_checked_player.add(index)
      local_player_cards[index].color = 'green'
    }
    this.setData({
      player_cards: local_player_cards,
      left_cards: local_left_cards,
      checked_player: [...local_checked_player],
      checked_left: [...local_checked_left]
    })
    console.log(local_checked_player)
    console.log(this.data)
  },

  next: function(e) {
    console.log("stage: " + (this.data.stage))
    this.initStage()
    var local_player_cards = this.data.player_cards
    if (this.data.stage == 0) {
      this.setData({
        stage: 1,  // -> 守卫
        checked_player: [],
        checked_left: []
      })
      return
    }
    if (this.data.stage == 1) {
      for (var i = 0; i < local_player_cards.length; ++i) {
        if (local_player_cards[i].init_role == 2 || local_player_cards[i].init_role == 3)
          local_player_cards[i].color = 'green'
      }
      this.setData({
        stage: 2,  // 守卫点亮
        player_cards: local_player_cards,
        checked_player: [],
        checked_left: []
      })
      console.log(this.data)
      return
    }
    if (this.data.stage == 2) {
      var local_num_wolf_player = 0
      for (var i = 0; i < local_player_cards.length; ++i) {
        local_player_cards[i].color = 'blue'
        if (local_player_cards[i].init_role == 0 || local_player_cards[i].init_role == 1) {
          local_num_wolf_player++
        }
      }
      this.setData({
        stage: 3,  // -> 狼人
        player_cards: local_player_cards,
        num_wolf_player: local_num_wolf_player,
        checked_player: [],
        checked_left: []
      })
      return
    }
    if (this.data.stage == 3) {
      var numWolf = 0
      for (var i = 0; i < local_player_cards.length; ++i) {
        if (local_player_cards[i].init_role == 0 || local_player_cards[i].init_role == 1) {
          local_player_cards[i].color = 'green'
        }
      }
      this.setData({
        stage: 4,  // 狼人点亮
        player_cards: local_player_cards,
        checked_player: [],
        checked_left: []
      })
      return
    }
    if (this.data.stage == 4) {
      this.setData({
        stage: 5,  // -> 爪牙
        checked_player: [],
        checked_left: []
      })
      return
    }
    if (this.data.stage == 5) {
      for (var i = 0; i < local_player_cards.length; ++i) {
        local_player_cards[i].color = 'blue'
      }
      this.setData({
        stage: 6,  // -> 预言家
        player_cards: local_player_cards,
        checked_player: [],
        checked_left: []
      })
      return
    }
    if (this.data.stage == 6) {
      for (var i = 0; i < local_player_cards.length; ++i) {
        local_player_cards[i].color = 'blue'
      }
      this.setData({
        stage: 7,  // -> 盗贼
        checked_player: [],
        checked_left: []
      })
      return
    }
    if (this.data.stage == 7) {
      console.log("stage 7: check")
      console.log(this.data)
      if (this.data.checked_player.length == 0) {
        return
      }
      for (var i = 0; i < local_player_cards.length; ++i) {
        local_player_cards[i].color = 'blue'
      }
      this.setData({
        stage: 8,  // -> 捣蛋鬼
        player_cards: local_player_cards,
        checked_player: [],
        checked_left: []
      })
      return
    }
    if (this.data.stage == 8) {
      if (this.data.checked_player.length < 2) {
        return
      }
      for (var i = 0; i < local_player_cards.length; ++i) {
        local_player_cards[i].color = 'blue'
      }
      this.setData({
        stage: 9,  // -> 失眠者
        player_cards: local_player_cards,
        checked_player: [],
        checked_left: []
      })
      return
    }
    if (this.data.stage == 9) {
      for (var i = 0; i < local_player_cards.length; ++i) {
        local_player_cards[i].showRole = true
      }
      this.setData({
        stage: 10,  // -> 天亮
        player_cards: local_player_cards
      })
      return
    }
  },

  switchRole: function() {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var local_player_cards = []
    var local_left_cards = []
    // var local_players = JSON.parse(options.players)
    // var local_roles = JSON.parse(options.roles)
    var local_players = ["a", "b", "c", "d", "e", "f", "g"]
    var local_roles = [9, 1, 2, 3, 4, 5, 6, 7, 8, 0]
    for (var i = 0; i < local_players.length; ++i) {
      local_player_cards.push({
        key: i,
        player: local_players[i],
        init_role: local_roles[i],
        current_role: local_roles[i],
        showRole: false,
        color: 'blue'
      })
    }
    for (var i = 0; i < 3; ++i) {
      local_left_cards.push({
        key: i,
        player: "底牌" + i,
        init_role: local_roles[i + local_players.length],
        current_role: local_roles[i + local_players.length],
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