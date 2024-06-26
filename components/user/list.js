import React from 'react';
import Subheader from '@material-ui/core/ListSubheader';
import { useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import '../style.css';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { Delete, PlayArrowOutlined, NotInterested, MoreVert } from '@material-ui/icons';
import Pagination from '../common/pagination';
import mange from '../../config/breadcrumbsManager';
import { getActivePage } from '../../config/helper';
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

const UserListItem = ({ user, id, userLastAction, userCurrentTask }) => {
	const history = useHistory();
	const navigateDetails = () => history.push(`/users/${user.id}`)
	const roles = user.roleNames ? user.roleNames.reduce((pV, cV) => `${pV},${cV}`) : null;
	return (
		<div className={`minHeight30`}>
			<div className={`row pr-0 pl-0 innerItem`}>
				<div className="col-xs-11 pr-0 pl-0 pntr" onClick={navigateDetails}>
					<div className="row pr-0 pl-0">
						<div className="col-xs-1 pr-0 pl-0 tc">
							{id}
						</div>
						<div className="col-xs-2 pr-0 pl-0">
							{user.firstName} {user.lastName}
						</div>
						<div className="col-xs-2 pr-0 pl-0">
							{roles}
						</div>
						<div className={`col-xs-2 pr-0 pl-0`}>
							{user.lastLogin}
						</div>
						<div className={`col-xs-2 pr-0 pl-0`}>
							{userLastAction ? userLastAction.message : null}
						</div>
						<div className={`col-xs-2 pr-0 pl-0`}>
							{userCurrentTask}
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
	<Subheader className={`card prolisthead`} style={{ background: '#F1F1F5', buserRadius: '10px' }}>
		<div className="row pr-0 pl-0 ">
			<div className="col-xs-1 pr-0 pl-0"></div>
			<div className="col-xs-2 pr-0 pl-0">{'Name'}</div>
			<div className="col-xs-2 pr-0 pl-0">{'Role'}</div>
			<div className="col-xs-2 pr-0 pl-0">{'Last login'}</div>
			<div className="col-xs-2 pr-0 pl-0">{'last action'}</div>
			<div className="col-xs-2 pr-0 pl-0">{'current task'}</div>
			<div className="col-xs-1 pr-0 pl-0">{'Actions'}</div>
		</div>
	</Subheader>
);

class UsersList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 0,
			limit: 10
		}
	}
	componentDidMount() {
		this.props.getUsers();
		this.props.getUsersByPage();
		this.props.setBreadcrumbs(mange(['Users']));
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.users !== nextProps.users) {
			const userNames = nextProps.users.map(nextPropUser => nextPropUser.userName);
			this.props.getLastActionByUsers(userNames);
			this.props.getCurrentTaskByUsers(userNames);
		}
	}
	onPageChange = page => {
		this.setState({page}, () => {
			this.props.getUsersByPage({page});
		})
	}
	render() {
		const { pageUsers: {content, totalElements, number}, usersLastAction, userCurrentTasks } = this.props;
		let { page, limit } = this.state;
		let activePage = getActivePage(number, page);
		const rows = content ? content.map((item, index) => {
			const userLastAction = usersLastAction[item.userName] ? usersLastAction[item.userName] : null;
			const userCurrentTask = userCurrentTasks[item.userName] ? userCurrentTasks[item.userName] : null;
			return (
				<UserListItem
					id={(activePage*limit)+ index + 1}
					key={index}
					user={item}
					userLastAction={userLastAction}
					userCurrentTask={userCurrentTask}
				/>
			);
		}) : null;

		return (
			<div className="product-list">
				<Subheader className={`subheader`}>
					<div className="row pr-0 pl-0">
						<div className="col-md-6 pr-0 pl-0">
							<h1 className={`listHeadH1`} style={{ paddingLeft: "10px" }}>User List</h1>
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

export default getConnect(UsersList);