
type match = {
	[index: string]: string | string[] | undefined
	unnamed?: string[]
}

interface route {
	(path: string): null | match
}

declare function p2r(template: string | RegExp): route
export = p2r
