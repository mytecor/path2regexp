# path2regexp

## Usage
```js
let p2r = require('path2regexp')

// Optional parameters
let ex1 = p2r('/user/:login/:method?/:action')
console.log(ex1('/user/mytecor/test')) // {login: 'mytecor', method: undefined, action: 'test'}
console.log(ex1('/user/mytecor/get/test')) // {login: 'mytecor', method: 'get', action: 'test'}

// Unnamed parameters
let ex2 = p2r('/user/(.*)/:action')
console.log(ex2('/user/get/test')) // {unnamed: ['get'], action: 'test'}

// Regexp route
let ex3 = p2r(/\/user\/(.*)/)
console.log(ex3('/user/get/test')) // {unnamed: ['get/test']}

// Other routes
let ex4 = p2r('/user/(get|post)/:action')
console.log(ex4('/user/post/test')) // {unnamed: ['post'], action: 'test'}
```