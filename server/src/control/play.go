package control

import "net/http"
import (
	"room"
	"fmt"
)

// for /newroom/
// 使用post协议， postdata包括：playerId, jsonstr,
// playerId是创建房间的用户id，jsonstr是用来创建房间的配置的json字串
func CreateRoom(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		err := r.ParseForm()
		if err != nil {
			http.Error(w, "Please send a request body", http.StatusForbidden)
			return
		}
		playerId := r.Form.Get("playerId")
		confJsonStr := r.Form.Get("roomConf")
		if len(playerId) == 0 || len(confJsonStr) == 0 {
			http.Error(w, "Invalid request data", http.StatusForbidden)
			return
		}
		roomPool := room.GetRoomPool()
		roomId := roomPool.NewRoom(playerId)
		r, err := roomPool.GetRoom(roomId)
		if err != nil {
			http.Error(w, "Create room failed", http.StatusInternalServerError)
			return
		}
		if !r.Init(confJsonStr) {
			http.Error(w, "Init room failed", http.StatusInternalServerError)
			return
		}
		respJson := fmt.Sprint("{room_id:%d}", roomId)
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(respJson))
		return
	}
	http.Error(w, "Invalid protocol:" + r.Method, http.StatusForbidden)
}

func JoinRoom(w http.ResponseWriter, r *http.Request) {

}