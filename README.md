# rent view

[![Build Status](https://travis-ci.org/mrsuh/rent-view.svg?branch=master)](https://travis-ci.org/mrsuh/rent-view)

![Screen](/screen.png)

## Installation
```
sh bin/deploy.sh
```

## Run
```
node src/app.js
```

## Configuration
```javascript

module.exports = {
    //app server
    server: {
        host: '127.0.0.1',
        port: 5000
    },
    //database
    db: {
        host: '127.0.0.1',
        port: 2000,
        database: 'rent-collector'
    }
};
```