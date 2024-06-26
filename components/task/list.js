import React from 'react';
import Subheader from '@material-ui/core/ListSubheader';
import { useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { formatDate, formatStatus, getStatusClass, getActivePage } from '../../config/helper';
import '../style.css';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { Delete, PlayArrowOutlined, NotInterested, MoreVert } from '@material-ui/icons';
import DatePicker from '../common/date-picker';
import Pagination from '../common/pagination';
import mange from '../../config/breadcrumbsManager';
import getConnect from '../common/connect';

const MenuItems = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
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

const TaskListItem = ({ task, id }) => {
	let productsLength = 0;
	if (Array.isArray(task.picks)) {
		task.picks.forEach(pick => {
			productsLength += pick.products.length;
		})
	}
	const user = task.user;
	const assignedTo = user ? `${user.firstName ? `${user.firstName} ` : ''}${user.lastName ? user.lastName : ''}` : '';
	const history = useHistory();
	const navigateDetails = () => history.push(`/tasks/${task.id}`)
	return (
		<div className={`minHeight30`}>
			<div className={`row pr-0 pl-0 innerItem`}>
				<div className="col-xs-11 pr-0 pl-0 pntr" onClick={navigateDetails}>
					<div className="row pr-0 pl-0">
						<div className="col-xs-1 pr-0 pl-0" style={{ textAlign: "center" }}>
							{id}
						</div>
						<div className="col-xs-2 pr-0 pl-0">
							{task.name}
						</div>
						<div className={`col-xs-1 pr-0 pl-0`}>
							{task.status ? <div className={`actionstatus ${getStatusClass(task.status)}`}>{formatStatus(task.status)}</div> : null}
						</div>
						<div className={`col-xs-3 pr-0 pl-0`}>
							{assignedTo ? assignedTo : '-'}
						</div>
						<div className="col-xs-2 pr-0 pl-0">
							{formatDate(task.createdAt)}
						</div>
						<div className="col-xs-2 pr-0 pl-0">
							{formatDate(task.updatedAt)}
						</div>
						<div className={`col-xs-1 pr-0 pl-0`}>
							{productsLength}
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
		<div className="row pr-0 pl-0 ">
			<div className="col-xs-11 pr-0 pl-0" >
				<div className="row pr-0 pl-0 ">
					<div className="col-xs-1 pr-0 pl-0">Task Id</div>
					<div className="col-xs-2 pr-0 pl-0">Task Name</div>
					<div className="col-xs-1 pr-0 pl-0">{'Status'}</div>
					<div className="col-xs-3 pr-0 pl-0">{'Assigned to'}</div>
					<div className="col-xs-2 pr-0 pl-0">Order date</div>
					<div className="col-xs-2 pr-0 pl-0">Last Updated</div>
					<div className="col-xs-1 pr-0 pl-0">{'Items'}</div>
				</div>
			</div>
			<div className="col-xs-1 pr-0 pl-0">{'Actions'}</div>
		</div>
	</Subheader>
);

const ListHead = () => (
	<Subheader className={`subheader`}>
		<div className="row pr-0 pl-0">
			<div className="col-md-4 pr-0 pl-0">
				<h1 className={`listHeadH1`} style={{ paddingLeft: "10px" }}>Task List</h1>
			</div>
			<div className="col-md-4  pr-0 pl-0">
				<DatePicker />
			</div>
			<div className="col-md-2">
				<span className={`listdropdown2 card`}>
					Status:
					<select className={`select2`}>
						<option style={{ border: '0px', outline: '0px' }}>Default</option>
					</select>
				</span>
			</div>
			<div className="col-md-2">
				<span className={`listdropdown2 card`}>
					User:
					<select className={`select2`}>
						<option style={{ border: '0px', outline: '0px' }}>Default</option>
					</select>
				</span>
			</div>
		</div>
	</Subheader>
);

class TasksList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: 'All',
			page: 0,
			limit: 10
		}
	}
	componentDidMount() {
		// this.props.getTasks();
		this.props.getTasksByStatus();
		this.props.setBreadcrumbs(mange(['Tasks']));
	}
	onPageChange = page => {
		this.setState({page}, () => {
			this.props.getTasksByStatus({page});
		})
	}

	render() {
		const { statusTasks: {content, totalElements, number} } = this.props;
		let { page, limit } = this.state;
		let activePage = getActivePage(number, page);
		const rows = content ? content.map((item, index) => {
			return (
				<TaskListItem
					id={(activePage*limit) +index + 1}
					key={index}
					task={item}
				/>
			);
		}) : null;

		return (
			<div className="product-list">
				<ListHead />
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

export default getConnect(TasksList);