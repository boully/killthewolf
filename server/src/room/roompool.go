package room

import (
	"sync"
	"errors"
)

type RoomPool struct {
	Rooms map[int]*Room
	Ids map[int]struct{}
	mutex sync.Mutex  // mutex for ids set
	room_mutex sync.Mutex // mutex for map
}

func GetRoomPool() *RoomPool {
	return &roomPool
}

func StringHash(str string) int {
	res := 0
	for _, c := range str {
		res = (res * 131) + int(c)
	}
	return res
}

// generate a unique id by hashing player's id string
// if hash conflicts, increase the id and continue testing
func (roomPool *RoomPool) generateUniqId(playerId string) int {
	id := StringHash(playerId)
	roomPool.mutex.Lock()
	for _, ok := roomPool.Ids[id]; ok ; {
		id += 1
		_, ok = roomPool.Ids[id]
	}
	roomPool.Ids[id] = struct{}{}
	roomPool.mutex.Unlock()
	return id
}

func (roomPool *RoomPool) NewRoom(playerId string) int {
	id := roomPool.generateUniqId(playerId)
	newRoom := NewRoom(id)
	roomPool.room_mutex.Lock()
	roomPool.Rooms[id] = newRoom
	roomPool.room_mutex.Unlock()
	return id
}

func (roomPool *RoomPool) GetRoom(id int) (*Room, error) {
	roomPool.room_mutex.Lock()
	defer roomPool.room_mutex.Unlock()
	if room, err := roomPool.Rooms[id]; err {
		return room, nil
	} else {
		return nil, errors.New("room doesn't exist")
	}
}

func (roomPool *RoomPool) DeleteRoom(id int) {
	roomPool.room_mutex.Lock()
	delete(roomPool.Rooms, id)
	roomPool.room_mutex.Unlock()

	roomPool.mutex.Lock()
	delete(roomPool.Ids, id)
	roomPool.mutex.Unlock()
}

var roomPool = RoomPool{
	Rooms: map[int]*Room{},
	Ids: map[int]struct{}{},
}