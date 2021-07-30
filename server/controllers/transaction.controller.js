const BaseController = require('./base/base.controller.js');

class TransactionController extends BaseController {
	constructor(db) {
		super(db.transactions);
		this.db = db;
		this.name = 'transactions';

		this.setupRouter();
	}

	setupRouter() {
		this.router.get('/', this.list);
		this.router.post('/', this.create);
	}
}

module.exports = TransactionController;
