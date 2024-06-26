import React, { useState } from 'react';
import Subheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { formatDate } from '../../config/helper';
import '../style.css';
import Modal from '@material-ui/core/Modal';


export default function SimpleModal({ actions, name }) {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const rows = actions ? actions.map((action, index) => <ActionListItem key={index} action={action} id={index + 1} />) : null;
	return (
		<div>
			<button className="btn-default" onClick={handleOpen}>
				{name}
			</button>
			<Modal
				BackdropProps={{
					style: {
						backgroundColor: '#fff'
					}
				}}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={open}
				onClose={handleClose}
			>
				<div>
					<Subheader className={`subheader`}>
						<div className="row ">
							<div className="col-md-4">
								<h1 className={`listHeadH1`} style={{ paddingLeft: "10px" }}>{name}</h1>
							</div>
						</div>
					</Subheader>
					<List>
						<Head />
						<Divider />
						<div className={`mt-4`} />
						{rows}
					</List>
				</div>
			</Modal>
		</div>
	);
}
const ActionListItem = ({ action, id }) => {
	const sku = action.skus ? action.skus.reduce((b, c) => `${b}, ${c}`) : null;
	return (
		<div className={`minHeight30`}>
			<div className={`row pr-0 pl-0 innerItem`}>
				<div className="col-xs-1 pr-0 pl-0">
					{id}
				</div>
				<div className="col-xs-2 pr-0 pl-0">
					{action.details}
				</div>
				<div className={`col-xs-2 pr-0 pl-0`}>
					{sku}
				</div>
				<div className={`col-xs-2 pr-0 pl-0`}>
					{action.userName}
				</div>
				<div className="col-xs-2 pr-0 pl-0">
					{action.message}
				</div>
				<div className="col-xs-2 pr-0 pl-0">
					{formatDate(action.updatedAt)}
				</div>
			</div>
		</div>
	);
};

const Head = () => (
	<Subheader className={`card prolisthead`} style={{ background: '#F1F1F5', borderRadius: '10px' }}>
		<div className="row pr-0 pl-0">
			<div className="col-xs-1 pr-0 pl-0">Step</div>
			<div className="col-xs-2 pr-0 pl-0">{'Bar Code'}</div>
			<div className="col-xs-2 pr-0 pl-0">{'Sku'}</div>
			<div className="col-xs-2 pr-0 pl-0">{'UserName'}</div>
			<div className="col-xs-2 pr-0 pl-0">{'Action'}</div>
			<div className="col-xs-2 pr-0 pl-0">{'Date & Time'}</div>
		</div>
	</Subheader>
);
