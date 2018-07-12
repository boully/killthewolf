//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    array: [{
        id: 1,
        name: "狼人",
        color: "blue"
      }, {
        id: 2,
        name: "狼人",
        color: "blue"
      },
      {
        id: 3,
        name: "爪牙",
        color: "blue"
      }, {
        id: 4,
        name: "守卫",
        color: "blue"
      },
      {
        id: 5,
        name: "守卫",
        color: "blue"
      }, {
        id: 6,
        name: "预言家",
        color: "blue"
      },
      {
        id: 7,
        name: "强盗",
        color: "blue"
      }, {
        id: 8,
        name: "捣蛋鬼",
        color: "blue"
      },
      {
        id: 9,
        name: "酒鬼",
        color: "blue"
      }, {
        id: 10,
        name: "失眠者",
        color: "blue"
      },
      {
        id: 11,
        name: "平民",
        color: "blue"
      }, {
        id: 12,
        name: "平民",
        color: "blue"
      }
    ],
  }
})