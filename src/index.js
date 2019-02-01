exports.handler = (event, context, callback) => {
	console.info(event);
	console.info(context);
	callback(null, '1234');
};
