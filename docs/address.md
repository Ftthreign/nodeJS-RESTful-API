# Address API Spec

## Create Address API

- Endpoint : **POST** /api/contacts/:contactID/addresses

- Headers :
  Authorization : token

- Request Body :

```json
{
  "street": "Jl.Mawar",
  "city": "lampung",
  "province": "LPG",
  "country": "IDR",
  "postal_code": "333"
}
```

- Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jl.Mawar",
    "city": "lampung",
    "country": "IDR",
    "postal_code": "333"
  }
}
```

- Response Body Error :

```json
{
  "errors": "Country is Required"
}
```

## Update Address API

- Endpoint : **PUT** /api/contacts/:contactID/addresses/:addressID

- Headers :
  Authorization : token

- Request Body :

```json
{
  "street": "Jl.Mawar",
  "city": "lampung",
  "province": "LPG",
  "country": "IDR",
  "postal_code": "333"
}
```

- Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jl.Mawar",
    "city": "lampung",
    "province": "LPG",
    "country": "IDR",
    "postal_code": "333"
  }
}
```

- Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## Get Address API

- Endpoint : **GET** /api/contacts/:contactId/addresses/:addressId

- Headers :
  Authorization : token

- Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jl.Mawar",
    "city": "lampung",
    "province": "LPG",
    "country": "IDR",
    "postal_code": "333"
  }
}
```

- Response Body Error :

```json
{
  "errors": "Contact not found"
}
```

## List Address API

- Endpoint : **GET** /api/contacts/:contactId/addresses

- Headers :
  Authorization : token

- Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jl.Mawar",
      "city": "lampung",
      "province": "LPG",
      "country": "IDR",
      "postal_code": "333"
    },
    {
      "id": 2,
      "street": "Jl.Mawar",
      "city": "lampung",
      "province": "LPG",
      "country": "IDR",
      "postal_code": "333"
    }
  ]
}
```

- Response Body Error :

```json
{
  "errors": "Contact not found"
}
```

## Remove Address API

- Endpoint : **DELETE** /api/contacts/:contactId/addresses/:addressId

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
  "errors": "Address not found"
}
```
