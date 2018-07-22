package control

import (
	"github.com/gorilla/websocket"
	"sync"
)

type MsgHub struct {
	WsConnMap map[string]*websocket.Conn
	sync.Mutex
}

var GlobalHub = MsgHub{
	WsConnMap:map[string]*websocket.Conn{},
}

func (hub *MsgHub) AddConn(user_id string, conn *websocket.Conn) {
	hub.Lock()
	hub.WsConnMap[user_id] = conn
	hub.Unlock()
}

func (hub *MsgHub) DelConn(user_id string) {
	hub.Lock()
	delete(hub.WsConnMap, user_id)
	hub.Unlock()
}