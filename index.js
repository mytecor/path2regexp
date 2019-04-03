
module.exports = path => {
	let params = []
	return {
		params,
		regexp: RegExp('^' + path.replace(/\/:(.*?)(\??)(?=$|\/)/g, (match, param, optional) => {
			params.push(param)
			return optional? '(?:\/([^\/]+?))?': '\/([^\/]+?)'
		}) + '(?:\/)?$', 'i'),
		exec: function(path) {
			let match = this.regexp.exec(path)
			if(!match) return null
			let params = {}
			this.params.forEach((param, i) => params[param] = match[i+1])
			return params
		}
	}
}