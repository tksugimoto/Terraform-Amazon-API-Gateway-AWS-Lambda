exports.handler = (event, context, callback) => {
	console.info(event);
	console.info(context);
	const response = {
		statusCode: 200,
		body: JSON.stringify(event, null, '\t'),
	};
	callback(null, response);
};
