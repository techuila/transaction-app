import { Button } from 'react-bootstrap';

function Header({ openModal }) {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				marginBottom: '12px',
			}}
		>
			<h1>Office Transactions</h1>
			<Button onClick={openModal}>+ Add Transactions</Button>
		</div>
	);
}

export default Header;
