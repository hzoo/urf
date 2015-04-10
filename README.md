# URF

URF statistics. (There is another project to fetch data)

- Using [webpack/react-starter](https://github.com/webpack/react-starter) (without prerender, flux, etc)
    + react, es6 (babel)
- MySQL db, socket.io
- Heroku

## Install
```text
# check package.json
npm install
```

## Config
- Create a json file at `lib/config.json` to connect to your database
```json
{
    "DB_HOST": "",
    "DB_USER": "",
    "DB_PASSWORD": "",
    "DB_NAME": "",
    "SSL_CA": "a.pem",
    "SSL_CERT": "a.pem",
    "SSL_KEY": "a.pem"
}
```

## Dev Server

``` text
# start the webpack-dev-server in HMR mode
# start the server in dev mode
npm run hot-dev-server && npm run start-dev

# open this url in your browser
http://localhost:8080/
```

## Production compilation and server

``` text
# build the client bundle (createed in `build/`)
# start the server in production mode
npm run build && npm run start

# open this url in your browser
http://localhost:8081/
```

## Code
- All application code is in `app/`
- Server code in `lib/`
