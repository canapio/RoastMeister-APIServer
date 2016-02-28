# RoastMeister-Server
This application is server application for Roast Meister(iOS) based on Node.js
* Auto completion function : This server application collects word from user input in iOS client application.


## Prerequisites
* [Node.js](https://nodejs.org)
* [MongoDB](https://www.mongodb.org/)

## Getting Started
```bash
# Start the mongo server in a separate terminal
$ mongod

# clone repository
$ git clone https://github.com/canapio/RoastMeister-Server.git

# move to nodejs folder
$ cd RoastMeister-Server/RoastMeisterServer001

# Run server.js (Input auth_key only first time. After second time, command $ node server.js)
$ node server.js auth_key
```


## Version
Version       | Release Date | Description                                          | Status     |
------------- | ------------ | ---------------------------------------------------- | ---------- |
v0.1          | -            | Auto completion (nation, farm, beankind, faul)       | Develop    |


## API Protocol
[Here](https://github.com/canapio/RoastMeister-Server/tree/master/Protocol)
