import React from 'react';
import Card from '@material-ui/core/Card';
import Subheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
import { formatDate, formatStatus, getStatusClass } from '../../config/helper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import '../style.css';
import { Delete, PlayArrowOutlined, NotInterested, MoreVert } from '@material-ui/icons';
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

const ProductList = ({ product, id, url }) => {
    product.status = product.status ? product.status : 'QUEUED';
    const history = useHistory();
    const navigateDetails = () =>  history.push(`${url}/${product.id}`)
    return (
        <div className={`minHeight30`}>
            <div className={`row pr-0 pl-0 innerItem`}>
                <div className="col-xs-11 pr-0 pl-0 pntr" onClick={navigateDetails}>
                    <div className="row pr-0 pl-0">
                        <div className="col-xs-1 pr-0 pl-0" style={{ textAlign: "center" }}>
                            {id}
                        </div>
                        <div className={`col-xs-2 pr-0 pl-0`}>
                            {product.name}
                        </div>
                        <div className={`col-xs-2 pr-0 pl-0`}>
                            {product.status ? <div className={`actionstatus ${getStatusClass(product.status)}`}>{formatStatus(product.status)}</div> : null}
                        </div>
                        <div className={`col-xs-2 pr-0 pl-0`}>
                            {formatDate(product.updatedAt)}
                        </div>
                        <div className={`col-xs-2 pr-0 pl-0`}>
                            {product.sku}
                        </div>
                        <div className={`col-xs-2 pr-0 pl-0`}>
                            {product.barcode}
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
            <div className="col-xs-1 pr-0 pl-0"></div>
            <div className="col-xs-2 pr-0 pl-0">{'Product name'}</div>
            <div className="col-xs-2 pr-0 pl-0">{'Status'}</div>
            <div className="col-xs-2 pr-0 pl-0">{'Last update'}</div>
            <div className="col-xs-2 pr-0 pl-0">{'SKU'}</div>
            <div className="col-xs-2 pr-0 pl-0">{'Barcode'}</div>
            <div className="col-xs-1 pr-0 pl-0">{'Actions'}</div>
        </div>
    </Subheader>
);

const DetailHead = () => (
    <Subheader className={`subheader`}>
        <div className="row pr-0 pl-0">
            <div className="col-md-6 pr-0 pl-0">
                <h1 className={`listHeadH1`} style={{ paddingLeft: "10px" }}>Pick task details</h1>
            </div>
        </div>
    </Subheader>
);

class TaskDetail extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getTask(id);
        this.props.getProductsByTask(id);
        this.props.getUsers();
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.task !== nextProps.task) {
            this.props.setBreadcrumbs(mange(`Task ${nextProps.task.name}`));
        }
    }
    render() {
        let { task, taskProducts, location, users } = this.props;
        console.log(task)
        task.status = task && task.status ? task.status : 'QUEUED';
        const rows = taskProducts ? taskProducts.map((item, index) => {
            return (
                <ProductList
                    url={location.pathname}
                    id={index + 1}
                    key={index}
                    product={item}
                />
            );
        }) : null;
        const userOption = users ? users.map((user, id) =>  <option key={id} style={{ border: '0px', outline: '0px' }}>{user.firstName} {user.lastName}</option>) : null;
        return (
            <div className="product-list">
                <DetailHead />
                <div className="row">
                    <div className="col-xs-5">
                        <Card>
                            <div className={`row pr-0 pl-0`}>
                                <div className="col-xs-12 pr-0 pl-0 hleft">
                                    ID #{!!task.id ? task.id : null}
                                </div>
                                <div className={`col-xs-6 pr-0 pl-0 h2left`}>
                                    Status
                            </div>
                                <div className={`col-xs-6 pr-0 pl-0 tright`}>
                                    {task.status ? <span className={`actionstatus ${getStatusClass(task.status)}`}>{formatStatus(task.status)}</span> : null}
                                </div>
                                <hr className="col-xs-12 divider" />
                                <div className="col-xs-6 pr-0 pl-0 sleft">
                                    Creation Date:
                            </div>
                                <div className="col-xs-6 pr-0 pl-0 tright">
                                    {formatDate(task.createdAt)}
                                </div>
                                <div className="col-xs-6 pr-0 pl-0 sleft">
                                    Last Update:
                            </div>
                                <div className="col-xs-6 pr-0 pl-0 tright">
                                    {formatDate(task.updatedAt)}
                                </div>
                                <div className="col-xs-6 pr-0 pl-0 sleft">
                                    No Of Products
                            </div>
                                <div className="col-xs-6 pr-0 pl-0 tright">
                                    {taskProducts ? taskProducts.length : null}
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="col-xs-7">
                        <Card>
                            <div className={`row pr-0 pl-0`}>
                                <div className="col-xs-12 pr-0 pl-0 hleft">
                                    User
                            </div>
                                <hr className="col-xs-12 divider" />
                                <div className={`col-xs-6 pr-0 pl-0 h2left`}>
                                    Assign to user
                            </div>
                                <div className={`col-xs-6 pr-0 pl-0 tright`}>
                                    <span className={`listdropdown2 card`}>
                                        <select className={`select2`}>
                                            <option selected disabled>Select user</option>
                                        {userOption}
                                        </select>
                                    </span>
                                </div>
                                <hr className="col-xs-12 divider" />
                                <div className="col-xs-6 pr-0 pl-0 sleft">
                                    Number of Active tasks:
                            </div>
                                <div className="col-xs-6 pr-0 pl-0 tright">
                                    10
                                </div>
                                <div className="col-xs-6">
                                </div>
                                <div className="col-xs-1">
                                    <button className="btn-default">
                                        Update
					                </button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>


                <p>Pick task product list</p>

                <div className="col-xs-12">
                    <Card>
                        <List>
                            <Head />
                            <Divider />
                            <div className={`mt-4`} />
                            {rows}
                        </List>
                    </Card>
                </div>
            </div>
        );
    }
}

export default getConnect(TaskDetail);

