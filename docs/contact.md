# Contact API Spec

## Create Contact API

- Endpoint : **PUT** /api/contacts

- Headers :
  Authorization : token

- Request Body :

```json
{
  "first-name": "Fadhil",
  "last-name": "fattah",
  "email": "email@dummy.com",
  "phone": "1424424444"
}
```

- Response Body Success :

```json
{
  "id": 1,
  "first-name": "Fadhil",
  "last-name": "fattah",
  "email": "email@dummy.com",
  "phone": "1424424444"
}
```

- Response Body Error :

```json
{
  "error": "Email is not valid"
}
```

## Update Contact API

- Endpoint : **PUT** /api/contacts/:id

- Headers :
  Authorization : token

- Request Body :

```json
{
  "first-name": "Fadhil",
  "last-name": "fattah",
  "email": "email@dummy.com",
  "phone": "1424424444"
}
```

- Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first-name": "Fadhil",
    "last-name": "fattah",
    "email": "email@dummy.com",
    "phone": "1424424444"
  }
}
```

- Response Body Errors :

```json
{
  "errors": "email is not valid"
}
```

## Get Contact API

- Endpoint : **GET** /api/contacts/:id

- Headers :
  Authorization : token

- Response Body Success :

```json
{
  "data": {
    "id" : 1
    "first-name": "Fadhil",
    "last-name": "fattah",
    "email": "email@dummy.com",
    "phone": "1424424444"
  }
}
```

- Response Body Error :

```json
{
  "errors": "Contact not found"
}
```

## Search Contact API

- Endpoint : **GET** /api/contacts/:id

- Headers :
  Authorization : token

- Query params :<br>
  **name** : Search by first_name or last_name using like, optional<br>
  **email** : Search by email using like, optional<br>
  **phone** : Search by phone using like, optional<br>
  **page** : number of page, default 1<br>
  **size** : size per page, default 10<br>

- Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "first-name": "Fadhil",
      "last-name": "fattah",
      "email": "email@dummy.com",
      "phone": "1424424444"
    },
    {
      "id": 2,
      "first-name": "Fadhil",
      "last-name": "fattah",
      "email": "email@dummy.com",
      "phone": "1424424444"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_items": 30
  }
}
```

- Response Body Error :

```json
{
  "errors": "Contact not found"
}
```

## Remove Contact API

- Endpoint : **DELETE** /api/contacts/:id

- Headers :
  Authorization : token

- Response Body Success :

```json
{
  "data": "OK"
}
```

- Response Body Error :

```json
{
  "errors": "Contact not found"
}
```
