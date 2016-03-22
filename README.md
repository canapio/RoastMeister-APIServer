# RoastMeister-Server

![](https://github.com/canapio/RoastMeister-Server/blob/master/roast_meister_server_logo.png?raw=true)

En

This application is server application for Roast Meister(iOS) based on Node.js
* Authorization : When you run server first, node command with **Authorization** argv($ node server.js my_auth_key). Client must put **Authorization Key** in request header at Authorization Field, and then request api to server.
* Auto completion function : This server application collects word from user input in iOS client application.

Ko

이 앱은 Roast Meister(iOS) 앱을 위한 서버사이드 앱으로써 Node.js를 기반으로 동작합니다.
* 인증 : 처음 서버를 실행시킬때, 인자로 인증키값 또한 넣습니다($ node server.js my_auth_key). 클라이언트는 api를 호출할 때 해더에 Authorization 필드부분에 이 키값을 담아서 서버에 요청을 보내야합니다.
* 자동 완성 기능 : 클라이언트 앱의 입력들을 서버에 모으고, 모았던 자료를 클라이언트에게 가공하여 전달해줍니다.

## Prerequisites
* [Node.js](https://nodejs.org)
* [MongoDB](https://www.mongodb.org/)

## Getting Started
```bash
# Start the mongo server in a separate terminal
$ mongod

# clone repository
$ git clone https://github.com/canapio/RoastMeister-Server.git

# Run server.js (Input auth_key only first time. After second time, command $ node server.js)
$ node server.js auth_key
```


## Version
Version       | Release Date | Description                                             | Status     |
------------- | ------------ | ------------------------------------------------------- | ---------- |
v0.1          | 2016.03.01   | Auto completion (nation, farm, beankind, machine, faul) | Release    |


## API Protocol
[Here](https://github.com/canapio/RoastMeister-Server/wiki/API-Protocol)
