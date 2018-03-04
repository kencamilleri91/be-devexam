var webpack = require('webpack');
var DevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new DevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	quiet: false,
	noInfo: false,
}).listen(3000, 'localhost', function (err) {
	if (err) { console.log(err); }
	console.log('Webpack server started at localhost:3000');
});