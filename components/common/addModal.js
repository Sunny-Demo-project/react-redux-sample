import React, { useState } from 'react';
import Subheader from '@material-ui/core/ListSubheader';
import '../style.css';
import Modal from '@material-ui/core/Modal';
import AddForm from './addForm'; 
import AddForm2 from './addForm2'; 
import PrintForm from './printForm';
export default function SimpleModal({ name, handleSubmit, types, garment }) {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};
	const onSubmit = values => {
		handleSubmit(values)
		handleClose();
	}
	const handleClose = () => {
		setOpen(false);
	};
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
					{types ? <AddForm types={types} onSubmit={onSubmit} /> : garment ? <AddForm2 onSubmit={onSubmit} /> :  <PrintForm onSubmit={onSubmit} />}
				</div>
			</Modal>
		</div>
	);
}