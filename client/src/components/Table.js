import { Table } from 'react-bootstrap';
import moment from 'moment';

function TransactionTable({ data }) {
	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>Date</th>
					<th>Description</th>
					<th>Credit</th>
					<th>Debit</th>
					<th>Running Balance</th>
				</tr>
			</thead>
			<tbody>
				{data.length ? (
					data.map((e) => (
						<tr key={e.id}>
							<td>{moment(e.createdAt).format('MM/DD/YYYY')}</td>
							<td>{e.desc}</td>
							<td>{e.credit}</td>
							<td>{e.debit}</td>
							<td>{e.balance}</td>
						</tr>
					))
				) : (
					<tr></tr>
				)}
			</tbody>
		</Table>
	);
}

export default TransactionTable;
