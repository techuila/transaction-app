import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

import Header from './components/Header';
import Table from './components/Table';
import Modal from './components/Modal';

function App() {
	const defaultForm = { type: 'credit', amount: 0, desc: '' };
	const [transactions, setTransactions] = useState([]);
	const [form, setForm] = useState(defaultForm);
	const [show, setShow] = useState(false);

	const calculateBalance = (data) => {
		// Calculate for running balance
		let credit = 0,
			debit = 0;

		for (let x = data.length - 1; x >= 0; x--) {
			credit = credit + (data[x].credit || 0);
			debit = debit + (data[x].debit || 0);

			data[x].balance = credit - debit;
		}

		return data;
	};

	const handleAdd = async () => {
		const payload = { [form.type]: parseFloat(form.amount), desc: form.desc };
		const { data } = await axios.post('/api/transactions', payload);
		setTransactions((prevState) => {
			const result = [...prevState];
			result.unshift(data);
			return calculateBalance(result);
		});
		setForm(defaultForm);
		setShow(false);
	};

	const openModal = () => {
		setShow(true);
	};
	const handleClose = () => {
		setShow(false);
	};

	useEffect(() => {
		(async () => {
			let { data } = await axios.get('/api/transactions');
			const result = calculateBalance(data);
			setTransactions(result);
		})();
	}, []);

	return (
		<Container>
			<Row className='justify-content-md-center'>
				<Col md='6'>
					<Modal
						title={'New Transaction'}
						handleSave={handleAdd}
						handleClose={handleClose}
						show={show}
						form={form}
						setForm={setForm}
					/>

					<Header openModal={openModal} />
					<Table data={transactions} />
				</Col>
			</Row>
		</Container>
	);
}
export default App;
