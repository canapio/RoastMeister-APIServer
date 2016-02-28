# RoastMeister-Server

## Protocol

```
Content-Type: application/x-www-form-urlencoded
```

#### 1. Get Auto Completion List
```GET /roastmeister001/autocomplete/:title```

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
