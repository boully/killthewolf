page1:

req: {
  "action": "create_room",
  "param": {
    "room_size" : 6
  }
}

resp: {
  "status": 0,
  "data": {
    "room_key" : 1234
  }
}

req: {
  "action": "join_room",
  "param": {
    "room_key": 1234
  }
}

resp: {
  "status": 0,
}