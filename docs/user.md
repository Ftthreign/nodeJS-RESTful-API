# User API Spec

## Register User API

- Endpoint : **POST** /api/users
- Request Body :

```json
{
  "username": "ftthreign",
  "password": "hash123",
  "name": "Ftthreign123"
}
```

- Response Body Success :

```json
{
  "data": {
    "username": "ftthreign",
    "name": "Ftthreign123"
  }
}
```

- Response Body Error :

```json
{
  "errors": "Username already registered"
}
```

## Login User API

- Endpoint : **POST** /api/users/login
- Request Body :

```json
{
  "username": "ftthreign",
  "password": "hash123"
}
```

- Response Body Success :

```json
{
  "data": {
    "token": "unique-token-uuid-generated"
  }
}
```

- Response Body Error :

```json
{
  "errors": "username or password wrong"
}
```

## Update User API

- Endpoint : **PATCH** /api/users/current

- Headers :
  Authorization : token

- Request Body :

```json
{
  "name": "newFtthreign123",
  "password": "newPass"
}
```

- Response Body Success

```json
{
  "data": {
    "username": "ftthreign",
    "name": "newFtthreign123"
  }
}
```

- Response Body Error

```json
{
  "errors": "Name length more than 100 character"
}
```

## Get User API

- Endpoint : **GET** /api/users/current

- Headers :
  Authorization : token

- Response Body Success :

```json
{
  "data": {
    "username": "ftthreign",
    "name": "Ftthreign123"
  }
}
```

- Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

- Endpoint : **DELETE** /api/users/logout

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
  "errors": "Unauthorized"
}
```
