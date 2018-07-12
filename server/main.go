package main

import (
	"golang.org/x/net/websocket"
	"fmt"
	"net/http"
)

func Echo(ws *websocket.Conn) {
	var err error

	for {
		var reply string

		if err = websocket.Message.Receive(ws, &reply); err != nil {
			fmt.Println("Can't receive")
			break
		}

		fmt.Println("Received back from client: " + reply)

		msg := "Received:  " + reply
		fmt.Println("Sending to client: " + msg)

		if err = websocket.Message.Send(ws, msg); err != nil {
			fmt.Println("Can't send")
			break
		}
	}
}
/*
 refer: https://tonybai.com/2015/04/30/go-and-https/
 in litter program use insecurity https client to visit server for now.
 */
func main() {
	http.Handle("/", websocket.Handler(Echo))
	// test: http://www.blue-zero.com/WebSocket/
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