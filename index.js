
module.exports = function p2r(route) {
	let hasUnnamed = true, hasNamed

	if(typeof route == 'string') {
		hasNamed = route.includes(':')
		hasUnnamed = /[^\\][\[\*\(]/.test(route)

		if(!hasNamed && !hasUnnamed) return path => path == route? {} : null

		route = new RegExp('^' + route.replace(/\/:(.*?)(\??)(?=$|\/)/g, (match, param, optional) =>
			optional? '(?:/(?<' + param + '>[^/]*))?' : '/(?<' + param + '>[^/]*)') + '/?$')
	}

	if(hasNamed && hasUnnamed) return path => {
		let match = route.exec(path)
		if(!match) return null

		// Named and unnamed parameters
		let
			res = match.groups,
			vals = Object.values(match.groups),
			unnamed = res.unnamed = []

		for(let i = 1; i < match.length; i++) {
			let pos = vals.indexOf(match[i])
			if(!~pos) unnamed.push(match[i])
			delete vals[pos]
		}

		return res
	}

	return path => {
		let match = route.exec(path)
		if(!match) return null

		// Named or unnamed parameters
		return match.groups || {unnamed: match.slice(1)}
	}
}
