const express = require('express');
const db = require('./models');
const nl = require('node-loopie');
const path = require('path');

class MainApplication {
	constructor(express, options) {
		this.app = express();
		this.express = express;
		this.options = options;

		this.setupMiddleware();
	}

	setupMiddleware() {
		this.app.use(this.express.json());
		this.app.use(this.express.urlencoded({ extended: true }));
	}

	setupRoutes(controllers) {
		controllers.forEach((controller) => {
			this.app.use(`/api/${controller.name}`, controller.router);
		});
	}

	start() {
		this.app.listen(
			this.options.PORT,
			console.log(`Server is running at PORT ${this.options.PORT}`)
		);
	}
}

const server_1 = new MainApplication(express, { PORT: 8923 });
const controllers = [];
nl(path.resolve('controllers'), (file, fileName) => {
	const Controller = require(path.resolve('controllers', file));
	controllers.push(new Controller(db));
});
server_1.setupRoutes(controllers);

server_1.start();
