# path2regexp

## Usage
```js
let p2r = require('path2regexp')

let route = p2r('/user/:login/:method?/:action')
console.log(route('/user/Midnighcoder/test')) // [ login: 'Midnighcoder', method: undefined, action: 'test' ]
console.log(route('/user/Midnighcoder/get/test')) // [ login: 'Midnighcoder', method: 'get', action: 'test' ]

// Unnamed parameters
let route2 = p2r('/user/(.*)/:action')
console.log(route('/user/get/test')) // [ 'get', action: 'test' ]

```