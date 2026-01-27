import closeWithGrace from 'close-with-grace'
import * as fs from 'fs'
import { styleText } from 'node:util'
import sourceMapSupport from 'source-map-support'

import 'dotenv/config'

sourceMapSupport.install({
	retrieveSourceMap: function (source) {
		const match = source.match(/^file:\/\/(.*)\?t=[.\d]+$/)
		if (match) {
			return {
				url: source,
				map: fs.readFileSync(`${match[1]}.map`, 'utf8'),
			}
		}
		return null
	},
})

closeWithGrace(async ({ err }) => {
	if (err) {
		console.error(styleText('red', String(err)))
		console.error(styleText('red', String(err.stack)))
		process.exit(1)
	}
})

if (process.env.MOCKS === 'true') {
	await import('./tests/mocks/index.ts')
}

if (process.env.NODE_ENV === 'production') {
	await import('./server-build/index.js')
} else {
	await import('./server/index.ts')
}
