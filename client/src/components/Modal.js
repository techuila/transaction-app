import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function TransactionModal({
	handleSave,
	title,
	show,
	handleClose,
	form,
	setForm,
}) {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form>
					<Form.Group className='mb-3' controlId='TransactionForm'>
						<Form.Label>Transaction Type</Form.Label>
						<Form.Select
							onChange={(e) =>
								setForm((prevState) => ({ ...prevState, type: e.target.value }))
							}
							value={form.type}
						>
							<option value='credit'>Credit</option>
							<option value='debit'>Debit</option>
						</Form.Select>
					</Form.Group>

					<Form.Group className='mb-3' controlId='amount'>
						<Form.Label>Amount</Form.Label>
						<Form.Control
							type='number'
							value={form.amount}
							onChange={(e) =>
								setForm((prevState) => ({
									...prevState,
									amount: e.target.value,
								}))
							}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='descr'>
						<Form.Label>Description</Form.Label>
						<Form.Control
							type='text'
							value={form.desc}
							onChange={(e) =>
								setForm((prevState) => ({ ...prevState, desc: e.target.value }))
							}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>

			<Modal.Footer>
				<Button variant='secondary' onClick={handleClose}>
					Close
				</Button>
				<Button variant='primary' onClick={handleSave}>
					Save changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default TransactionModal;
