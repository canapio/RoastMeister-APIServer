# RoastMeister-Server
This application is server application for Roast Meister(iOS) based on Node.js


## Prerequisites
* [Node.js](https://nodejs.org)
* [MongoDB](https://www.mongodb.org/)

## Getting Started
```bash
# Start the mongo server in a separate terminal
$ mongod

# Run server.js
$ node server.js
```


## Version
Version       | Release Date | Description                                          | Status     |
------------- | ------------ | ---------------------------------------------------- | ---------- |
v0.1          | -            | Auto completion (nation, farm, beankind, faul)       | Develop    |


## Protocol

```
Content-Type: application/x-www-form-urlencoded
```

#### 1. Get Auto Completion List
```GET /autocomplete/:title```
**Parameters**

Name      | Type   | Required | Description
--------- | ------ | -------- | ----------------------------------------------------------------------
q         | String | O        | Search all q(query) in :title collection with 'like' select function.
limit     | Number | O        | Default limitation is '8'. You cannot upper than 50.



**Response**
```json
{

}
```

