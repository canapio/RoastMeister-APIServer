# RoastMeister-Server

## Protocol

```
Content-Type: application/x-www-form-urlencoded
```



#### 0. Test API
```GET / ```

This api is test api.



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

}
```



#### 2. Insert or Update Auto Completion
```POST / roastmeister001/autocomplete```

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

}
```
