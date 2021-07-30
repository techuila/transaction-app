const router = require('express').Router();

class BaseController {
	name = 'base';
	router = router;

	constructor(model) {
		this.model = model;
	}

	sendResponse(data, code = 200) {
		return (res) => {
			res.status(code).json(data);
		};
	}

	list = async (req, res) => {
		const data = await this.model.findAll({ order: [['createdAt', 'desc']] });

		this.sendResponse(data)(res);
	};

	create = async (req, res) => {
		const payload = req.body;

		console.log(payload);

		const data = await this.model.create(payload);
		this.sendResponse(data)(res);
	};

	update = async (req, res) => {
		const { id } = req.param;
		const payload = req.body;

		const record = await this.model.findOne({ where: { id } });
		if (!record) {
			this.sendResponse({ msg: 'Record not found!' }, 404)(res);
		}
		await record.update(payload);
		this.sendResponse(record)(res);
	};
}

module.exports = BaseController;
