# RoastMeister-Server

## Protocol

```
Content-Type: application/x-www-form-urlencoded
```

Host | Port |
-----|------|
api.canapio.com|3000|

#### 0. Test API
```GET / ```

This api is test api.

**Response**
```json
{
  "error": false,
  "message": "Wooooooooooooooooooooooooooo"
}
```

#### 1. Get Auto Completion List
```GET /roastmeister001/autocomplete/:title```

This api response result with **q** search by sorting with deviceids's count.
```:title``` only can use "**nation, farm, beankind, machine, faul**"

**Parameters**

Name      | Type   | Required | Description
--------- | ------ | -------- | ----------------------------------------------------------------------
q         | String | O        | Search all q(query) in :title collection with 'like' select function.
limit     | Number | O        | Default limitation is '8'. You cannot upper than 50.



**Response**
```json
{
  "error": false,
  "message": "success",
  "data": [
    {
      "_id": "56d2faa044620881083b550b",
      "created_at": "2016-02-28T13:48:16.345Z",
      "updated_at": "2016-02-28T13:48:24.370Z",
      "name": "El Naranjo",
      "count": 2
    },
    {
      "_id": "56d2fa3e44620881083b550a",
      "created_at": "2016-02-28T13:46:38.249Z",
      "updated_at": "2016-02-28T13:46:38.249Z",
      "name": "Panama",
      "count": 1
    },
    {
      "_id": "56d2fab444620881083b550c",
      "created_at": "2016-02-28T13:48:36.429Z",
      "updated_at": "2016-02-28T13:48:36.429Z",
      "name": "El Jocotillo",
      "count": 1
    }
  ]
}
```



#### 2. Insert or Update Auto Completion
```POST /roastmeister001/autocomplete```

This api request upsert(insert: if does not have word, update: else if have word) word each models.

**Parameters**

Name      | Type   | Required | Description
--------- | ------ | -------- | ----------------------------------------------------------------------
deviceid  | String | R        | if already **:title** has deviceid, do nothing. else insert new or increase count one.
nation    | String | O        |
farm      | String | O        |
beankind  | String | O        |
machine   | String | O        |
faul      | String | O        |



**Response**
```json
{
  "error": false,
  "message": "success",
  "data": {
    "upsert": 1,
    "error": 0
  }
}
```
