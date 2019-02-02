const url = require('url');
const http = require('http');
const https = require('https');

const Protocols = {
	HTTP:  'http:',
	HTTPS: 'https:',
};

const EventType = {
	Echo: 'echo',
	Proxy: 'proxy',
};

exports.handler = (event, context, callback) => {
	console.info(event);
	console.info(context);
	const type = event.queryStringParameters && event.queryStringParameters.type || EventType.Echo;
	if (type === EventType.Echo) {
		console.info('echo event');
		const response = {
			statusCode: 200,
			body: JSON.stringify(event, null, '\t'),
		};
		callback(null, response);
		return;
	}
	if (type === EventType.Proxy) {
		const target = event.queryStringParameters.target;
		console.info(`Request proxy started: ${target}`);

		/**
		 * @param {function} resolve
		 * @returns {function(http.IncomingMessage): void}
		 */
		const onResponse = (resolve) => (res) => {
			let rawData = '';
			res.setEncoding('utf8').on('data', (chunk) => {
				rawData += chunk;
			}).on('end', () => {
				resolve(rawData);
			});
		};

		Promise.resolve().then(() => {
			if (!target) throw new Error('target URL is empty.');
			return new url.URL(target);
		}).then(targetURL => {
			if (!Object.values(Protocols).includes(targetURL.protocol)) {
				throw new Error(`target URL(${targetURL})'s protocol(${targetURL.protocol}) is invalid.`);
			}

			if (targetURL.protocol === Protocols.HTTP) {
				return new Promise((resolve, reject) => {
					http.request(targetURL, onResponse(resolve)).on('error', reject).end();
				});
			}
			if (targetURL.protocol === Protocols.HTTPS) {
				return new Promise((resolve, reject) => {
					https.request(targetURL, onResponse(resolve)).on('error', reject).end();
				});
			}
		}).then(responseBody => {
			console.info(`Request proxy completed: ${target}`);
			console.info({
				responseBody,
			});
			const response = {
				statusCode: 200,
				headers: {
					'Content-Type': 'text/plain',
				},
				body: responseBody,
			};
			callback(null, response);
		}).catch(err => {
			console.error(err);
			const response = {
				statusCode: 400,
				headers: {
					'Content-Type': 'text/plain',
				},
				body: err.message,
			};
			callback(null, response);
		});
		return;
	}
	const errMessage = `type(${type}) is invalid.`;
	console.error({
		errMessage,
	});
	const response = {
		statusCode: 400,
		headers: {
			'Content-Type': 'text/plain',
		},
		body: errMessage,
	};
	callback(null, response);
};
