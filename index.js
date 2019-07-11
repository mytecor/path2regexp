
module.exports = path => {
	let regexp = new RegExp('^' + path.replace(/\/:(.*?)(\??)(?=$|\/)/g, (match, param, optional) => 
		optional? '(?:/(?<' + param + '>[^/]*))?': '/(?<' + param + '>[^/]*)') + '/?$')
	return path => {
		let match = regexp.exec(path)
		if(!match) return null

		let res = []

		let keys = Object.keys(match.groups)
		let vals = Object.values(match.groups)

		for(let i = 1; i < match.length; i++) {
			let pos = vals.indexOf(match[i])
			if(~pos) res[keys[pos]] = match[i]
			else res.push(match[i])
		}

		return res
	}
}
