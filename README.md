<p align="center">
  <img src="https://res.cloudinary.com/djiqx3siw/image/upload/v1624480890/Group_17_yk32tr.svg" />
</p>

<h3 align="center">
  This repository is the backend base of vimox
</h3>

# Branches

- **develop** -> any pull request of changes this branch
- **main** -> don´t modify, this is what is running in production

# How to run locally

```bash
$ npm install
$ npm run dev
```

#### Set enviroment variables .env.development | .env.production

```
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
SECRET_JWT=
SECRET_REFRESH_JWT=
SECRET_RESET_PASSWORD=
SENDGRID_API_KEY=
ORIGIN_CLIENTS=
SENDGRID_CLIENT=
```

| Name                  | Description                                            | Example                                                              |
|-----------------------|--------------------------------------------------------|----------------------------------------------------------------------|
| DB_NAME               | Database name mongo                                    |                                                                      |
| DB_USER               | Database user mongo                                    |                                                                      |
| DB_PASSWORD           | Database password mongo                                |                                                                      |
| DB_HOST               | Database host mongo                                    |                                                                      |
| SECRET_JWT            | Secret key to sign the token                           |                                                                      |
| SECRET_REFRESH_JWT    | Secret key to sign refresh token                       |                                                                      |
| SECRET_RESET_PASSWORD | Secret key to sign password reset token                |                                                                      |
| SENDGRID_API_KEY      | Api key of Sendgrid                                    |                                                                      |
| ORIGIN_CLIENTS        |  Whitelist of clients that will not be blocked by cors | http://localhost:3000 or http://localhost:3000~http://localhost:4000 |
| SENDGRID_CLIENT       | Frontend client url                                    | http://localhost:3000                                                |
