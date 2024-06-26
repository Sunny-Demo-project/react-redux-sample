import React, { useState } from 'react';
import Subheader from '@material-ui/core/ListSubheader';
import { useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { formatDate, formatStatus, TASK_STATUSES, getStatusClass, getActivePage } from '../../config/helper';
import '../style.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Delete, PlayArrowOutlined, NotInterested, Search, MoreVert } from '@material-ui/icons';
import manage from '../../config/breadcrumbsManager';
import DatePicker from '../common/date-picker';
import Pagination from '../common/pagination';
import getConnect from '../common/connect';

const MenuItems = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
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
				<MenuItem onClick={handleClose}><Delete /> Cancel</MenuItem>
			</Menu>
		</div>
	);
}

const OrderListItem = ({ order, id }) => {
	order.status = order.status ? order.status : 'QUEUED';
	const history = useHistory();
	const navigateDetails = () => history.push(`/orders/${order.id}`)
	return (
		<div className={`minHeight30`}>
			<div className={`row pr-0 pl-0 innerItem`}>
				<div className="col-xs-11 pr-0 pl-0 pntr" onClick={navigateDetails}>
					<div className="row pr-0 pl-0">
						<div className="col-xs-1 pr-0 pl-0" style={{ textAlign: "center" }}>
							{id}
						</div>
						<div className="col-xs-2 pr-0 pl-0">
							#{order.orderId}
						</div>
						<div className={`col-xs-2 pr-0 pl-0`}>
							{order.status ? <div className={`actionstatus ${getStatusClass(order.status)}`}>{formatStatus(order.status)}</div> : null}
						</div>
						<div className={`col-xs-2 pr-0 pl-0`}>
							{order.shipment.address.fullName}
						</div>
						
						<div className="col-xs-2 pr-0 pl-0">
							{formatDate(order.createdAt)}
						</div>
						<div className="col-xs-2 pr-0 pl-0">
							{formatDate(order.updatedAt)}
						</div>
						<div className={`col-xs-1 pr-0 pl-0`}>
							{order.productIds.length}
						</div>

					</div>
				</div>
				<div className={`col-xs-1 pr-0 pl-0`}>
					<MenuItems />
				</div>
			</div>
		</div>
	);
};

const Head = () => (
	<Subheader className={`card prolisthead`} style={{ background: '#F1F1F5', borderRadius: '10px' }}>
		<div className="row pr-0 pl-0">
			<div className="col-xs-11 pr-0 pl-0">
				<div className="row pr-0 pl-0">
					<div className="col-xs-1 pr-0 pl-0"></div>
					<div className="col-xs-2 pr-0 pl-0">{'Order Id'}</div>
					<div className="col-xs-2 pr-0 pl-0">{'Status'}</div>
					<div className="col-xs-2 pr-0 pl-0">{'Customer Name'}</div>
					<div className="col-xs-2 pr-0 pl-0">{'Order date'}</div>
					<div className="col-xs-2 pr-0 pl-0">{'Last updated'}</div>
					<div className="col-xs-1 pr-0 pl-0">{'items'}</div>
				</div>
			</div>
			<div className="col-xs-1 pr-0 pl-0">{'Actions'}</div>
		</div>
	</Subheader>
);

const ListHead = ({ onChangeStatus }) => {
	const [status, setStatus] = useState('All');
	const chageStatus = e => {
		const { value } = e.target;
		setStatus(value);
		onChangeStatus(value);
	}
	return (<Subheader className={`subheader`}>
		<div className="row ">
			<div className="col-md-4">
				<h1 className={`listHeadH1`} style={{ paddingLeft: "10px" }}>Orders</h1>
			</div>
			<div className="col-md-4">
				<DatePicker />
			</div>
			<div className="col-md-2">
				<span className={`listdropdown2 card`}>
					Status:
					<select value={status} className={`select2`} onChange={chageStatus}>
						<option style={{ border: '0px', outline: '0px' }} value="All">All</option>
						{TASK_STATUSES.map((taskStatus, idx) => <option key={idx} style={{ border: '0px', outline: '0px' }} value={taskStatus}>{taskStatus}</option>)}
					</select>
				</span>
			</div>
			<div className="col-md-2">
				<div className={`searchbox`}>
					<input type="text" placeholder="Type to Search…" />
					<Search />
				</div>
			</div>

		</div>
	</Subheader>);
}

class OrdersList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: 'All',
			page: 0,
			limit: 10
		}
	}
	componentDidMount() {
		//this.props.getOrders();
		this.props.getOrdersByStatus();
		this.props.setBreadcrumbs(manage(['Orders']));
	}
	onChangeStatus = status => {
		this.setState({ status }, () => {
		});
	}
	onPageChange = page => {
		this.setState({page}, () => {
			this.props.getOrdersByStatus({page});
		})
	}
	render() {
		const { statusOrders: {content, totalElements, number} } = this.props;
		let { page, limit } = this.state;
		let activePage = getActivePage(number, page);
		const rows = content ? content.map((item, index) => {
			return <OrderListItem
				id={(activePage*limit)+index + 1}
				key={index}
				order={item}
			/>;
		}) : null;

		return (
			<div className="product-list">
				<ListHead onChangeStatus={this.onChangeStatus} />
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

export default getConnect(OrdersList);