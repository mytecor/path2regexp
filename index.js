
module.exports = route => {
	let isRegexp, hasParams

	if(typeof route == 'string') {
		isRegexp = /[^\\][\[\*\(]/.test(route)
		hasParams = ~route.indexOf(':')

		// Without regexp
		if(!hasParams && !isRegexp)
			return path => path == route? [] : null

		route = new RegExp('^' + route.replace(/\/:(.*?)(\??)(?=$|\/)/g, (match, param, optional) => 
			optional? '(?:/(?<' + param + '>[^/]*))?': '/(?<' + param + '>[^/]*)') + '/?$')
	} else isRegexp = true

	// Unnamed parameters
	if(isRegexp)
		if(hasParams) return path => {
			let match = route.exec(path)

			if(!match) return null
			if(match.length == 1) return []
			if(match.groups) {
				let res = []

				let keys = Object.keys(match.groups)
				let vals = Object.values(match.groups)

				for(let i = 1; i < match.length; i++) {
					let pos = vals.indexOf(match[i])
					if(~pos) {
						res[keys[pos]] = match[i]
						delete vals[pos]
					}
					else res.push(match[i])
				}

				return res
			}
			return match.slice(1)
		}
		else return path => {
			let match = route.exec(path)

			if(!match) return null
			if(match.length == 1) return []
			return match.slice(1)
		}

	// Named parameters
	return path => {
		let match = route.exec(path)
		if(!match) return null
		return Object.setPrototypeOf(Object.defineProperty(match.groups, 'length', {value: 0, writable: true}), Array.prototype) || []
	}
}
