
module.exports = path => {
	let regexp = new RegExp('^' + path.replace(/\/:(.*?)(\??)(?=$|\/)/g, (match, param, optional) => 
		optional? '(?:/(?<' + param + '>[^/]*))?': '/(?<' + param + '>[^/]*)') + '/?$')
	let result = path => {
		let match = regexp.exec(path)
		if(!match) return null
		if(match.length == 1) return []

		match.shift()
		let res = Array.from(match)

		if(!match.groups) return res

		for(let i in match.groups) {
			delete res[res.indexOf(match.groups[i])]
			res[i] = match.groups[i]
		}

		return res
	}

	result.regexp = regexp
	return result
}
