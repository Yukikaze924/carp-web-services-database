
# Project Title

A simple auth api server powered by Express.js through MySQL


## API Reference

#### Get user by account

```http
  GET /user/${account}
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :----------------------------|
| `account` | `string` | **Required**. user's account |

#### POST user (Create a new data line)

```http
  POST /user/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user`    | `Object` | **Required**. Put it inside body  |

