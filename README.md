# path2regexp

## Usage
```js
let p2r = require('path2regexp')

// Optional parameters
let route = p2r('/user/:login/:method?/:action')
console.log(route('/user/mytecor/test')) // {login: 'mytecor', method: undefined, action: 'test'}
console.log(route('/user/mytecor/get/test')) // {login: 'mytecor', method: 'get', action: 'test'}

// Unnamed parameters
let route2 = p2r('/user/(.*)/:action')
console.log(route('/user/get/test')) // {unnamed: ['get'], action: 'test'}

// Regexp route
let route3 = p2r(/\/user\/(.*)/)
console.log(route('/user/get/test')) // {unnamed: ['get/test']}

// Other routes
let route4 = p2r('/user/(get|post)/:action')
console.log(route('/user/post/test')) // {unnamed: ['post'], action: 'test'}
```