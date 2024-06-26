import React from 'react';
import Subheader from '@material-ui/core/ListSubheader';
import { useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { formatDate, getActivePage } from '../../config/helper';
import '../style.css';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { Delete, PlayArrowOutlined, NotInterested, MoreVert } from '@material-ui/icons';
import AddBin from '../common/addModal';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Pagination from '../common/pagination';
import mange from '../../config/breadcrumbsManager';
import getConnect from '../common/connect';

const MenuItems = ({ onDelete }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleDelete = () => {
		handleClose();
		onDelete()
	}
	return (
		<div>
			<IconButton onClick={handleClick}>
				<MoreVert style={{ transform: 'rotate(90deg)' }} />
			</IconButton>
			<Menu anchorEl={anchorEl} keepMounted
				open={Boolean(anchorEl)} onClose={handleClose}
			>
				<MenuItem onClick={handleClose}><PlayArrowOutlined /> Resume</MenuItem>
				<MenuItem onClick={handleClose}><NotInterested /> Hold</MenuItem>
				<MenuItem onClick={handleDelete}><Delete /> Cancel</MenuItem>
			</Menu>
		</div>
	);
}

const BinListItem = ({ bin, id, onDelete }) => {
	const history = useHistory();
	const navigateDetails = () => history.push(`/bins/${bin.id}`)
	const handleDelete = () => {
		onDelete(bin.id)
	}
	return (
		<div className={`minHeight30`}>
			<div className={`row pr-0 pl-0 innerItem`}>
				<div className="col-xs-1 pr-0 pl-0" style={{ textAlign: "center" }}>
					{id}
				</div>
				<div className="col-xs-10 pr-0 pl-0 pntr" onClick={navigateDetails}>
					<div className="row pr-0 pl-0">
						<div className="col-xs-3 pr-0 pl-0">
							{bin.type}
						</div>
						<div className="col-xs-2 pr-0 pl-0">
							{bin.code}
						</div>
						<div className={`col-xs-3 pr-0 pl-0`}>
						</div>
						<div className={`col-xs-3 pr-0 pl-0`}>
							{formatDate(bin.updatedAt)}
						</div>
						<div className={`col-xs-1 pr-0 pl-0`}>
							{bin.productBarcodes ? bin.productBarcodes.length : null}
						</div>
					</div>
				</div>
				<div className={`col-xs-1 pr-0 pl-0`}>
					<MenuItems onDelete={handleDelete} />
				</div>
			</div>
		</div>
	);
};

const Head = () => (
	<Subheader className={`card prolisthead`} style={{ background: '#F1F1F5', borderRadius: '10px' }}>
		<div className="row pr-0 pl-0 ">
			<div className="col-xs-1 pr-0 pl-0"></div>
			<div className="col-xs-10 pr-0 pl-0 pntr">
				<div className="row pr-0 pl-0">
					<div className="col-xs-3 pr-0 pl-0">{'Type'}</div>
					<div className="col-xs-2 pr-0 pl-0">{'Barcode'}</div>
					<div className="col-xs-3 pr-0 pl-0">{'Order Id'}</div>
					<div className="col-xs-3 pr-0 pl-0">{'Order Date'}</div>
					<div className="col-xs-1 pr-0 pl-0">{'Items'}</div>
				</div>
			</div>
			<div className="col-xs-1 pr-0 pl-0">{'Actions'}</div>
		</div>
	</Subheader>
);

class BinsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			page: 0,
			limit: 10
		}
	}
	componentDidMount() {
		// this.props.getBins();
		this.props.getBinsByActive();
		this.props.getBinTypes();
		this.props.setBreadcrumbs(mange(['Bins']));
	}
	handleSubmit = values => {
		this.props.createBin(values);
	}
	handlePrint = values => {}
	onPageChange = page => {
		this.setState({page}, () => {
			this.props.getBinsByActive({page});
		})
	}
	onDelete = id => {
		this.props.deleteBin(id);
	}
	onChange = e => {
		const { checked } = e.target;
		this.setState({active: checked}, () => {
			if(checked){
				this.props.getBinsByActive({active: checked})
			} else {
				this.props.getBinsByActive({page: this.state.page});
			}
		})
	}
	render() {
		const { binTypes, activeBins: {content, totalElements, number} } = this.props;
		let { active, page, limit } = this.state;
		let activePage = getActivePage(number, page);
		const rows = content ? content.map((item, index) => {
			return (
				<BinListItem
					id={(activePage*limit) +index + 1}
					key={index}
					bin={item}
					onDelete={this.onDelete}
				/>
			);
		}) : null;

		return (
			<div className="product-list">
				<Subheader className={`subheader`}>
					<div className="row pr-0 pl-0">
						<div className="col-md-6 pr-0 pl-0">
							<h1 className={`listHeadH1`} style={{ paddingLeft: "10px" }}>Bins</h1>
						</div>
						<div className="col-md-2 pr-0 pl-0">
							<AddBin name='Print Barcodes' handleSubmit={this.handlePrint} />
						</div>
						<div className="col-md-2 pr-0 pl-0">
							<AddBin name='Add new' handleSubmit={this.handleSubmit} types={binTypes} />
						</div>
						<div className="col-md-2 pr-0 pl-0">
							<FormControlLabel
								control={
									<Checkbox
										value={active}
										checked={active}
										onChange={this.onChange}
									/>
								}
								label={'Only Active'}
							/>
						</div>
					</div>
				</Subheader>
				<List>
					<Head />
					<Divider />
					<div className={`mt-4`} />
					{rows}
					<Pagination onPageChange={this.onPageChange} page={activePage} limit={limit} totalCount={totalElements} />
				</List>
			</div>
		);
	}
}

export default getConnect(BinsList);