import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Collapse from '@material-ui/core/Collapse';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
	DashboardOutlined, ExpandLess, ExpandMore, ListAltOutlined,
	CalendarTodayOutlined, HomeOutlined, SettingsOutlined, AccountCircleOutlined
} from '@material-ui/icons';
import './drawer.css';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import search from '../images/search-icon.svg';
import bell from '../images/bell-icon.svg';
import profile from '../images/profile.png';
import logo from '../images/logo.PNG';
import { connect } from 'react-redux';
const menuItems = [
	{
		title: 'Dashboard',
		url: '/dashboard',
		icon: <DashboardOutlined />,
		enabled: true
	},
	{
		title: 'Orders',
		url: '/orders',
		icon: <ListAltOutlined />,
		enabled: true
	},
	{
		title: 'Tasks',
		url: '/tasks',
		icon: <CalendarTodayOutlined />,
		enabled: true
	},
	{
		title: 'Warehouse',
		icon: <HomeOutlined />,
		urls: ['/totes', '/garment-printers', '/bins'],
		enabled: false,
		children: [
			{
				title: 'Garment Printers',
				url: '/garment-printers',
				enabled: true
			},
			{
				title: 'Totes',
				url: '/totes',
				enabled: true
			},
			{
				title: 'Bins',
				url: '/bins',
				enabled: true
			}
		]
	},
	{
		title: 'Users',
		url: '/users',
		icon: <AccountCircleOutlined />,
		enabled: true
	},
	{
		title: 'Settings',
		url: '/settings',
		icon: <SettingsOutlined />,
		enabled: true
	},
];

const NavListItem = ({ currentUrl, item, subItem }) => {
	const selectParent = item.urls ? item.urls.indexOf(currentUrl) > -1 : false;
	const urlSelected = currentUrl.startsWith(item.url);
	const $listItem = <ListItem button
		className={`${subItem ? 'subItemInnerDiv' : 'itemInnerDiv'}`}>
		{item.icon ? (
			<ListItemIcon className={'icon'}>
				<Icon className={
					urlSelected ? 'iconActive' : 'icon'
				}
				>
					{item.icon}
				</Icon>
			</ListItemIcon>
		) : null}
		<ListItemText
			primary={item.title}
			className={'item'}
			classes={{
				primary: 'listItemText'
			}}
		/>
	</ListItem>;
	const $render = item.enabled ? <Link to={item.url} className={urlSelected || selectParent ? 'linkActive' : 'link'}>{$listItem}</Link> : $listItem;
	return $render;
};

const SubNavListItem = ({ currentUrl, item }) => {
	const selectParent = item.urls ? item.urls.indexOf(currentUrl) > -1 : false;
	const urlSelected = currentUrl.startsWith(item.url);
	const urlMatch = item.children.some(i => currentUrl.startsWith(i.url));
	function subMenuClick() {
		setOpen(!open);
	}
	const [open, setOpen] = React.useState(urlMatch);
	const $listItem = <ListItem button onClick={subMenuClick}
		className={`${'itemInnerDiv'} ${item.icon ? '' : 'listItemPaddingLeft'}`}
	>
		{item.icon ? (
			<ListItemIcon className={'icon'}>
				<Icon className={
					urlSelected || urlMatch ? 'iconActive' : 'icon'
				}
				>
					{item.icon}
				</Icon>
			</ListItemIcon>
		) : null}

		<ListItemText
			classes={{
				primary: 'listItemText'
			}}
			primary={item.title}
			className={'item'}
		/>

		{open ? (
			<ExpandLess className={'expandIcon'} />
		) : (
				<ExpandMore className={'expandIcon'} />
			)}
	</ListItem>;
	const $render = item.enabled ? <Link to={item.url} className={urlSelected || selectParent || urlMatch ? 'linkActive' : 'link'}>{$listItem}</Link> : $listItem;

	return (
		<div>
			{$render}
			<SubNavList
				currentUrl={currentUrl}
				items={item.children}
				open={open}
			/>
		</div>
	);
};

const SubNavList = ({ currentUrl, items, open }) => (
	<Collapse in={open} unmountOnExit>
		<List component="div" disablePadding>
			{items.map((item, index) => {
				if (item.children && item.children.length > 0) {
					return (
						<SubNavListItem
							key={item.title + index}
							currentUrl={currentUrl}
							item={item}
						/>
					);
				} else {
					return (
						<NavListItem
							key={item.title + index}
							currentUrl={currentUrl}
							item={item}
							subItem
						/>
					);
				}
			})}
		</List>
	</Collapse>
);

const DrawerMenu = ({ location: { pathname }, breadcrumbs }) => {
	const items = menuItems.map((item, index) => {
		if (item.children) {
			return (
				<SubNavListItem
					key={index}
					currentUrl={pathname}
					item={item}
				/>
			);
		}
		return (
			<NavListItem
				key={index}
				currentUrl={pathname}
				item={item}
			/>
		);
	});
	const header = (
		<div className="header">
			<div className="row">
				<div className="col-md-2">
					<img src={logo} alt="" style={{ width: "100%", maxWidth: "200px", marginTop: "10px" }} />
				</div>
				<div className="col-md-8 pl-0 pr-0">
					<Breadcrumbs separator='>' style={{marginTop: '20px'}} aria-label="breadcrumb">
						<Typography color={`${!breadcrumbs || !breadcrumbs.length ? 'error' : 'textSecondary'}`} variant="subtitle2">Home</Typography>
						{breadcrumbs ? breadcrumbs.map((breadcrumb, key, all) => <Typography color={`${key+1 === all.length ? 'error' : 'textSecondary'}`} key={key} variant="subtitle2">{breadcrumb}</Typography>) : null}
					</Breadcrumbs>
				</div>
				<div className="right-navigation">
					<div className="row">
						<div className="col-xs-1" style={{ alignSelf: "center" }}>
							<img src={search} alt="" />
						</div>
						<div className="col-xs-2" style={{ alignSelf: "center" }}>
							<div className="notistatus">
								<img src={bell} alt="" />
								<span></span>
							</div>
						</div>
						<div className="col-xs-9">
							<div className="row">
								<div className="col-xs-3">
									<div className="imgBlock">
										<img
											src={profile}
											alt=""
											className="profile-img"
										/>
									</div>
								</div>
								<div className="col-xs-9" style={{ alignSelf: "center", paddingLeft: "0px" }}>
									<div className="textBlock  profileInfo">
										<Typography variant="h5" gutterBottom>
											Justin Walterson
							</Typography>
										<Typography variant="h6" gutterBottom>
											Marketing Admin
							</Typography>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
	return (
		<>
			<AppBar position={'fixed'} className="appbar header">
				<Toolbar className={'toolbar'}>
					{header}
				</Toolbar>
			</AppBar>
			<Drawer
				width="280px"
				anchor="left"
				className={'drawer'}
				variant="permanent"
				PaperProps={{
					classes: {
						root: 'drawerPaper'
					}
				}}
			>
				<List component="nav" className={'menu'}>
					<h3 className={'menuTitle'}>Dashboard</h3>
					{items}
				</List>
			</Drawer>
		</>
	);
};
function mapStateToProps(state) {
    const { MainReducer: { breadcrumbs } } = state;
    return {
        breadcrumbs
    }
}

export default connect(mapStateToProps, null)(withRouter(DrawerMenu));
