# RoastMeister-Server

## Protocol

```
Content-Type: application/x-www-form-urlencoded
```

#### 1. Get Auto Completion List
```GET /autocomplete/:title```

This api response result with **q** search by sorting with deviceids's count.

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

