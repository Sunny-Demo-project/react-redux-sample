import React from 'react';
import Card from '@material-ui/core/Card';
import Subheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import { MoreVert } from '@material-ui/icons';
import '../style.css';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { formatDate, formatStatus, getStatusClass } from '../../config/helper';
import manage from '../../config/breadcrumbsManager';
import { useHistory } from 'react-router-dom';
import { Delete, PlayArrowOutlined, NotInterested } from '@material-ui/icons';
import Modal from '../common/actionModal';
import getConnect from '../common/connect';

const Head = () => (
    <Subheader className={`card prolisthead`} style={{ background: '#F1F1F5', borderRadius: '10px' }}>
        <div className="row pr-0 pl-0">
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
const ProductListItem = ({ product, id, url }) => {
    product.status = product.status ? product.status : 'QUEUED';
    const history = useHistory();
    const navigateDetails = () => history.push(`${url}/${product.id}`)
    return (
        <div className={`minHeight30`}>
            <div className={`row pr-0 pl-0 innerItem`}>
                <div className="col-xs-11 pr-0 pl-0 pntr" onClick={navigateDetails}>
                    <div className="row pr-0 pl-0">
                        <div className="col-xs-1 pr-0 pl-0">
                            {id}
                        </div>
                        <div className={`col-xs-2 pr-0 pl-0`}>
                            {product.name}
                        </div>
                        <div className={`col-xs-2 pr-0 pl-0`}>
                            {product.status ? <span className={`actionstatus ${getStatusClass(product.status)}`}>{formatStatus(product.status)}</span> : null}
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


class OrderItem extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getOrder(id);
        this.props.getProductsByOrder(id);
        this.props.getActionsByOrder(id);
        this.props.getActionsByOrder(id);
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.order !== nextProps.order) {
            this.props.setBreadcrumbs(manage(`Order #${nextProps.order.orderId}`));
        }
    }
    render() {
        let { order, orderProducts, location, orderActions } = this.props;
        order.status = order && order.status ? order.status : 'QUEUED';
        const rows = orderProducts ? orderProducts.map((product, index) => <ProductListItem url={location.pathname} key={index} id={index + 1} product={product} />) : null;
        const isAddress = order.shipment && order.shipment.address;
        return (
            <div className="row">
                <div className="col-xs-5">
                    <Card>
                        <div className={`row pr-0 pl-0`}>
                            <div className="col-xs-12 pr-0 pl-0 hleft">
                                <h6 className="txtlabelhead">Order details &nbsp;&nbsp; #{order.orderId}</h6>
                                <h6 className="txtlabelhead">({order.productIds ? `${order.productIds.length} ${order.productIds.length > 1 ? 'Items' : 'Item'}` : null})</h6>
                            </div>
                            <div className={`col-xs-6 pr-0 pl-0 h2left`}>
                                <h6 className="txtlabelhead">Status  </h6>
                            </div>
                            <div className={`col-xs-6 pr-0 pl-0 tright`}>
                                {order.status ? <span className={`actionstatus ${getStatusClass(order.status)}`}>{formatStatus(order.status)}</span> : null}
                            </div>
                            <div className="customdivider" ></div>
                            <div className="col-xs-6 pr-0 pl-0 sleft">
                                <h6 className="txtlabel"> Order Date </h6>
                            </div>
                            <div className="col-xs-6 pr-0 pl-0 tright">
                                {formatDate(order.createdAt)}
                            </div>
                            <div className="col-xs-6 pr-0 pl-0 sleft">
                                <h6 className="txtlabel"> Last Updated </h6>
                            </div>
                            <div className="col-xs-6 pr-0 pl-0 tright">
                                {formatDate(order.updatedAt)}
                            </div>
                            <div className='col-xs-6'>
                                <Modal actions={orderActions} name='Order Details' />
                            </div>
                            <div className='col-xs-6'>

                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-xs-7">
                    <Card>
                        <div className={`row pr-0 pl-0`}>
                            <div className="col-xs-12 pr-0 pl-0 hleft">
                                <h6 className="txtlabelhead">Shipment</h6>
                            </div>
                            <div className={`col-xs-12 pr-0 pl-0 h2left`}>
                                {isAddress ? order.shipment.address.fullName : null}
                            </div>
                            <div className="col-xs-6 pr-0 pl-0">
                                <div className='row'>
                                    <div className="col-xs-3 pr-0 pl-0 sleft">
                                        <h6 className="txtlabel"> Address </h6>
                                    </div>
                                    <div className="col-xs-7 pr-0 pl-0 tright">
                                        <span>{isAddress ? `${isAddress.line1} ${isAddress.line2}` : null}</span><br />
                                        <span>{isAddress ? `${isAddress.city} ${isAddress.region}` : null}</span>
                                    </div>
                                    <div className="col-xs-3 pr-0 pl-0 sleft">
                                        <h6 className="txtlabel"> Notes </h6>
                                    </div>
                                    <div className="col-xs-7 pr-0 pl-0 tright">
                                        <span>{isAddress ? isAddress.notes : null}</span>
                                    </div>

                                </div>
                            </div>
                            <div className="col-xs-6 pr-0 pl-0">
                                <div className='row'>
                                    <div className="col-xs-3 pr-0 pl-0 sleft">
                                        <h6 className="txtlabel"> Phone </h6>
                                    </div>
                                    <div className="col-xs-7 pr-0 pl-0 tright">
                                        {isAddress ? isAddress.phone : null}
                                    </div>
                                    <div className="col-xs-3 pr-0 pl-0 sleft">
                                        <h6 className="txtlabel"> Email </h6>
                                    </div>
                                    <div className="col-xs-7 pr-0 pl-0 tright">
                                        {isAddress ? isAddress.email : null}
                                    </div>
                                    <div className='col-xs-6'>

                                    </div>
                                    <div className='col-xs-6'>
                                        <button className="btn-default">
                                            Download Invoice
					                    </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-xs-12">
                    <Card style={{ padding: "10px" }}>
                        <List>
                            <Head />
                            <div className={`mt-4`} />
                            {rows}
                        </List>
                    </Card>
                </div>
            </div>
        );
    }
}

export default getConnect(OrderItem);