// 对房间建模，提供针对房间的一些操作，包括初始化，生成房间号，销毁房间
package room

import (
	"sync"
	"encoding/json"
	"log"
	"math/rand"
	"errors"
)

const (
	狼人 = iota
	守夜人
	爪牙
	预言家
	捣蛋鬼
	盗贼
	酒鬼
	失眠者
	ROLE_SIZE
)

type Role byte

var roleTable = map[string]Role {
	"狼人": 狼人,
	"守夜人": 守夜人,
	"爪牙": 爪牙,
	"预言家": 预言家,
	"捣蛋鬼": 捣蛋鬼,
	"盗贼": 盗贼,
	"酒鬼": 酒鬼,
	"失眠者": 失眠者,
}



type Room struct {
	Id           int
	Size         int  // max(Size) == Capacity - ReservedSize
	ReservedSize int
	Capacity     int
	Roles        []Role
	Players      []string
	mutex        sync.Mutex
}

// id应该是全局唯一的
func NewRoom(id int) *Room {
	return &Room{Id:id, Size:0, ReservedSize:0, Capacity:0}
}

// 初始化房间，参数是一个指定各个角色个数的json字符串，外加指定保留牌的个数，比如：
// {'狼人': 2, '守夜人': 2, '保留牌': 3}
// not thread safe
func (room *Room)  Init(roleConfig string) bool {
	conf := map[string]int{}
	err := json.Unmarshal([]byte(roleConfig), &conf)
	if err != nil {
		log.Println("create room failed: " + roleConfig)
		return false
	}
	var roleArray []Role
	for key, value := range conf {
		if key == "保留牌" {
			room.ReservedSize = value
			continue
		}
		for i := 0; i < value; i++ {
			roleArray = append(roleArray, roleTable[key])
		}
	}
	room.Capacity = len(roleArray)
	room.Roles = make([]Role, room.Capacity)
	// shuffle role array
	perm := rand.Perm(room.Capacity)
	for i, v := range perm {
		room.Roles[v] = roleArray[i]
	}
	return true
}

// thread-safe
func (room *Room) AdoptPlayer(playerId string) error {
	room.mutex.Lock()
	defer room.mutex.Unlock()
	if room.Size == (room.Capacity - room.ReservedSize){
		return errors.New("room is full")
	}
	room.Size += 1
	room.Players = append(room.Players, playerId)
	return nil
}

func (room *Room) AbandonPlayer(playerId string) error {
	room.mutex.Lock()
	defer room.mutex.Unlock()
	i, err := room.IndexOf(playerId)
	if err != nil {
		return err
	} else {
		// remove player
		room.Players = append(room.Players[:i], room.Players[i+1:]...)
		return nil
	}
}

func (room *Room) IndexOf(playerId string) (int, error) {
	for i, v := range room.Players {
		if playerId == v {
			return i, nil
		}
	}
	return 0, errors.New("can't find player")
}

func (room *Room) GetPlayerRole(playerId string) (Role, error) {
	i, err := room.IndexOf(playerId)
	if err == nil {
		return room.Roles[i], nil
	} else {
		return 0, err
	}
}

// 互换两名玩家角色
func (room *Room) SwitchTwoRole(firstPlayer, secondPlayer string) error {
	i, err := room.IndexOf(firstPlayer)
	if err != nil {
		return errors.New(err.Error() + " " + firstPlayer)
	}
	j, err := room.IndexOf(secondPlayer)
	if err != nil {
		return errors.New(err.Error() + " " + secondPlayer)
	}
	room.Roles[i], room.Roles[j] = room.Roles[j], room.Roles[i]
	return nil
}

// 根据角色查看玩家
func (room *Room) GetPlayerIdsByRole(role Role) []string {
	var i []int
	for k := 0; k < room.Size; k++ {
		if room.Roles[k] == role {
			i = append(i, k)
		}
	}
	var player []string
	for _, v := range i {
		player = append(player, room.Players[v])
	}
	return player
}

// 和保留牌换牌
// @params i为保留牌的编号，从0开始
func (room *Room) SwitchWithSaved(playerId string, i int) {
	if i >= 0 && i < room.ReservedSize {
		j, err := room.IndexOf(playerId)
		if err == nil {
			k := i + room.Size
			room.Roles[j], room.Roles[k] = room.Roles[k], room.Roles[j]
		}
	}
}

// 洗牌 https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
func (room *Room) Shuffle() {
	n := len(room.Roles) - 1
	for i := n; i > 0; i-- {
		j := rand.Intn(i + 1)
		room.Roles[i], room.Roles[j] = room.Roles[j], room.Roles[i]
	}
}
