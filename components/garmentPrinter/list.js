import React from 'react';
import Subheader from '@material-ui/core/ListSubheader';
import { useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import '../style.css';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { Delete, PlayArrowOutlined, NotInterested, Settings } from '@material-ui/icons';
import Add from '../common/addModal';
import Pagination from '../common/pagination';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import mange from '../../config/breadcrumbsManager';
import getConnect from '../common/connect';
import { getActivePage } from '../../config/helper';

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
				<Settings style={{ transform: 'rotate(90deg)' }} />
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

const GarmentPrinterListItem = ({ garmentPrinter, id }) => {
	const history = useHistory();
	const navigateDetails = () => history.push(`/garment-printers/${garmentPrinter.id}`)
	return (
		<div className={`minHeight30`}>
			<div className={`row pr-0 pl-0 innerItem`}>
				<div className="col-xs-11 pr-0 pl-0 pntr" onClick={navigateDetails}>
					<div className="row pr-0 pl-0">
						<div className="col-xs-1 pr-0 pl-0 tc">
							{id}
						</div>
						<div className="col-xs-3 pr-0 pl-0">
							{garmentPrinter.name}
						</div>
						<div className="col-xs-3 pr-0 pl-0">
							{garmentPrinter.zone}
						</div>
						<div className={`col-xs-2 pr-0 pl-0`}>
							{garmentPrinter.code}
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
			<div className="col-xs-11 pr-0 pl-0">
				<div className="row pr-0 pl-0">
					<div className="col-xs-1 pr-0 pl-0"></div>
					<div className="col-xs-3 pr-0 pl-0">{'Name'}</div>
					<div className="col-xs-3 pr-0 pl-0">{'Zone'}</div>
					<div className="col-xs-2 pr-0 pl-0">{'Barcode'}</div>
				</div>
			</div>
			<div className="col-xs-1 pr-0 pl-0">{'Settings'}</div>
		</div>
	</Subheader>
);

class GarmentPrintersList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			page: 0,
			limit: 10
		}
	}
	componentDidMount() {
		//this.props.getGarmentPrinters();
		this.props.getGarmentPrintersByActive();
		this.props.setBreadcrumbs(mange(['GarmentPrinters']));
	}
	handleSubmit = values => {
		this.props.addGarmentPrinter(values)
	}
	onPageChange = page => {
		this.setState({page}, () => {
			this.props.getGarmentPrintersByActive({page});
		})
	}
	onChange = e => {
		const { checked } = e.target;
		this.setState({active: checked}, () => {
			if(checked){
				this.props.getGarmentPrintersByActive({active: checked})
			} else {
				this.props.getGarmentPrintersByActive({page: this.state.page});
			}
		})
	}
	render() {
		const { activeGarmentPrinters: {content, totalElements, number} } = this.props;
		let { active, page, limit } = this.state;
		let activePage = getActivePage(number, page);
		const rows = content ? content.map((item, index) => {
			return (
				<GarmentPrinterListItem
					id={(activePage*limit) +index + 1}
					key={index}
					garmentPrinter={item}
				/>
			);
		}) : null;

		return (
			<div className="product-list">
				<Subheader className={`subheader`}>
					<div className="row pr-0 pl-0">
						<div className="col-md-8 pr-0 pl-0">
							<h1 className={`listHeadH1`} style={{ paddingLeft: "10px" }}>GarmentPrinter List</h1>
						</div>
						<div className="col-md-2">
							<Add name="Add Garment Printer" garment handleSubmit={this.handleSubmit} />
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

export default getConnect(GarmentPrintersList);