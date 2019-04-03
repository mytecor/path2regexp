# path2regexp

## Usage
```js
let p2r = require('path2regexp')

let route = p2r('/user/:login/:method?/:action')
console.log(route.exec('/user/Midnighcoder/test')) // { login: 'Midnighcoder', method: undefined, action: 'test' }
console.log(route.exec('/user/Midnighcoder/get/test')) // { login: 'Midnighcoder', method: 'get', action: 'test' }
console.log(route.test('/user/Midnighcoder/test'))  // true

```