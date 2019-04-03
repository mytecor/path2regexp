
module.exports = path => {
	let params = []
	let regexp = RegExp('^' + path.replace(/\/:(.*?)(\??)(?=$|\/)/g, (match, param, optional) => {
		params.push(param)
		return optional? '(?:\/([^\/]+?))?': '\/([^\/]+?)'
	}) + '(?:\/)?$', 'i')
	return {
		test: regexp.test,
		exec: path => {
			let match = regexp.exec(path)
			if(!match) return null
			let resParams = {}
			params.forEach((param, i) => resParams[param] = match[i+1])
			return resParams
		}
	}
}