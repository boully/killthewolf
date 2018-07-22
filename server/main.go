package main

import (
	"net/http"
	"github.com/gorilla/websocket"
	"log"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
} // use default options

func Init(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		log.Println("parse from failed:", err)
		return
	}
	user_id := r.Form.Get("user_id")
	log.Println("user_id:", user_id)
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}
	defer c.Close()
	for {
		mt, message, err := c.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			break
		}
		log.Printf("recv: %s", message)
		err = c.WriteMessage(mt, message)
		if err != nil {
			log.Println("write:", err)
			break
		}
	}
}
/*
 refer: https://tonybai.com/2015/04/30/go-and-https/
 in litter program use insecurity https client to visit server for now.
 */
func main() {
	http.HandleFunc("/", Init)
	if err := http.ListenAndServe(":8089", nil); err != nil {
		panic("ListenAndServe Error: " + err.Error())
	}
	// maybe need CA of qq's cloud
	//if err := http.ListenAndServeTLS(":8089",
	//	"conf/cert.pem",
	//	"conf/cert.key",
	//	nil); err != nil {
	//	panic("ListenAndServeTLS Error: " + err.Error())
	//}
}