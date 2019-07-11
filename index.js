
module.exports = route => {
	let hasUnnamed = ~route.indexOf('(')

	// Without regexp
	if(!~route.indexOf(':') && !hasUnnamed)
		return path => path == route? [] : null

	let regexp = new RegExp('^' + route.replace(/\/:(.*?)(\??)(?=$|\/)/g, (match, param, optional) => 
		optional? '(?:/(?<' + param + '>[^/]*))?': '/(?<' + param + '>[^/]*)') + '/?$')

	// Unnamed parameters
	if(hasUnnamed) return path => {
		let match = regexp.exec(path)

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

	return path => {
		let match = regexp.exec(path)
		if(!match) return null
		return Object.setPrototypeOf(Object.defineProperty(match.groups, 'length', {value: 0, writable: true}), Array.prototype) || []
	}
}
