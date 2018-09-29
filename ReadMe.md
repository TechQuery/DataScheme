# Data Scheme

**Data Model** framework based on [ECMAScript Decorator proposal](https://github.com/tc39/proposal-decorators)

[![NPM Dependency](https://david-dm.org/TechQuery/DataScheme.svg)](https://david-dm.org/TechQuery/DataScheme)

[![NPM](https://nodei.co/npm/data-scheme.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/data-scheme/)



## Usage

### Installation

```Shell
npm install data-scheme
npm install @babel/cli \
    @babel/core \
    @babel/preset-env \
    @babel/plugin-proposal-decorators
```

### Configuration

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

### Coding

```JavaScript
import DataScheme, { schemeOf, Email, Phone } from 'data-scheme';

@schemeOf({
    email:  Email,
    phone:  Phone
})
export class User extends DataScheme { }

const user = new User();

user.name = 'test';
user.email = 'test@example.com';
user.phone = '+86-028-88888888';
```

[Test cases](https://techquery.github.io/DataScheme/test-file/test/DataScheme.js.html#lineNumber29)



## Scheme Helper

https://techquery.github.io/DataScheme/file/source/index.js.html



## Learn more

 1. [Meta programming](https://github.com/tc39/proposal-decorators/blob/master/METAPROGRAMMING.md)

 2. [Decorator API (Stage-2)](https://github.com/tc39/proposal-decorators/blob/master/TAXONOMY.md)
