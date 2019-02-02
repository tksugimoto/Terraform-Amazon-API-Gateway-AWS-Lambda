const EventType = {
	Echo: 'echo',
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
