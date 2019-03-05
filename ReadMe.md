# Data Scheme

**Data Model** framework based on [ECMAScript Decorator proposal](https://github.com/tc39/proposal-decorators)

[![NPM Dependency](https://david-dm.org/TechQuery/DataScheme.svg)](https://david-dm.org/TechQuery/DataScheme)
[![Build Status](https://travis-ci.com/TechQuery/DataScheme.svg?branch=master)](https://travis-ci.com/TechQuery/DataScheme)
[![](https://data.jsdelivr.com/v1/package/npm/data-scheme/badge?style=rounded)](https://www.jsdelivr.com/package/npm/data-scheme)

[![NPM](https://nodei.co/npm/data-scheme.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/data-scheme/)



## Basic Example

[`User.js`](https://tech-query.me/DataScheme/test-file/test/source/User.js.html)

```JavaScript
import Model, { mapGetter, is, Range, Email, Phone, URL } from 'data-scheme';


@mapGetter
export default  class User extends Model {

    @is(/^[\w-]{3,20}$/, '')
    set name(value) {  this.set('name', value);  }

    @is(Email, '')
    set email(value) {  this.set('email', value);  }

    @is( Phone )
    set phone(value) {  this.set('phone', value);  }

    @is([0, 1, 2],  2)
    set gender(value) {  this.set('gender', value);  }

    @is(Range( 1900 ))
    set birthYear(value) {  this.set('birthYear', value);  }

    @is(URL, 'http://example.com/test.jpg')
    set avatar(value) {  this.set('avatar', value);  }

    @is( URL )
    set URL(value) {  this.set('URL', value);  }

    @is( String )
    set description(value) {  this.set('description', value);  }
}
```

`index.js`

```JavaScript
import User from './User';

const user = new User({
    name:   'test',
    email:  'test@example.com'
});

user.phone = '+86-028-88888888';

console.log( user.valueOf() );
```

**Console output**

```JSON
{
    "name": "test",
    "email": "test@example.com",
    "gender": 2,
    "avatar": "http://example.com/test.jpg",
    "phone": "+86-028-88888888"
}
```


## Installation

```Shell
npm install data-scheme @babel/polyfill

npm install -D \
    @babel/cli \
    @babel/core \
    @babel/preset-env \
    @babel/plugin-proposal-decorators
```

`.babelrc`

```JSON
{
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": [
        [
            "@babel/plugin-proposal-decorators",
            {
                "decoratorsBeforeExport": true
            }
        ]
    ]
}
```


## Advanced usage

 - [Scheme Helper](https://tech-query.me/DataScheme/file/source/scheme.js.html)

 - [Inherited & Nested Model](https://tech-query.me/DataScheme/test-file/test/source/User.js.html#lineNumber33)


### Decorator hook

`hook.js`

```JavaScript
import { listen } from 'data-scheme';

listen('HTTP',  ({Class, method, path, contentType}) =>
    console.log(Class, method, path, contentType)
);
```

`User.js`

```JavaScript
import Model, { mapGetter, HTTP } from 'data-scheme';

@HTTP('POST', '/user')
@HTTP('GET', '/user')
@mapGetter
export default  class User extends Model {
    //  Field defination
}
```

`index.js`

```JavaScript
import './hook';

import User from './User';
```


## Learn more

 1. [Meta programming](https://github.com/tc39/proposal-decorators/blob/master/METAPROGRAMMING.md)

 2. [Decorator API (Stage-2)](https://github.com/tc39/proposal-decorators/blob/master/TAXONOMY.md)
