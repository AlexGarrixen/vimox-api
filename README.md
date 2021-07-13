<p align="center">
  <img src="https://res.cloudinary.com/djiqx3siw/image/upload/v1624480890/Group_17_yk32tr.svg" />
</p>

<h3 align="center">
  This repository is the backend base of vimox, so you can modify it if you need to implement more features
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
