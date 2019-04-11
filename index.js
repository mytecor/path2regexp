
module.exports = path => {
	let regexp = RegExp('^' + path.replace(/\/:(.*?)(\??)(?=$|\/)/g, (match, param, optional) => {
		return optional? '(?:/(?<' + param + '>[^/]*))?': '/(?<' + param + '>[^/]*)'
	}) + '/?$', 'i')
	return {
		test: regexp.test,
		exec: path => {
			let match = regexp.exec(path)
			if(!match) return null
			delete match[0]

			let res = []
			for(let i in match.groups) {
				delete match[match.indexOf(match.groups[i])]
				res[i] = match.groups[i]
			}

			for(let i of match) if(i) res.push(i)
			return res
		}
	}
}