# rent view

[![Build Status](https://travis-ci.org/mrsuh/rent-view.svg?branch=master)](https://travis-ci.org/mrsuh/rent-view)

## Installation
```
sh bin/deploy
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
        port: 2000
    },
    
    db: {
        //hot database
        hot: {
            host: '127.0.0.1',
            port: 27017,
            database: 'rent-hot'
        },
        //cold database
        cold: {
             host: '127.0.0.1',
             port: 27017,
             database: 'rent-cold'
        }
    }
};
```