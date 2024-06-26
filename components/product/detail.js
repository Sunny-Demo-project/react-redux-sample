import React from 'react';
import Card from '@material-ui/core/Card';
import Subheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { formatDate, formatStatus, getStatusClass } from '../../config/helper';
import '../style.css';
import Modal from '../common/actionModal';
import manage from '../../config/breadcrumbsManager';
import getConnect from '../common/connect';

const ArtworkList = ({ art, id }) => {
    return (
        <div className={`minHeight30`}>
            <div className={`row pr-0 pl-0 innerItem`}>
                <div className="col-xs-1 pr-0 pl-0">
                    {id}
                </div>
                <div className="col-xs-3 pr-0 pl-0">
                    {art.artworkImage ? <img height="50px" width="60px" src={art.artworkImage}  alt="Artwork Preview" /> : null}
                </div>
                <div className={`col-xs-2 pr-0 pl-0`}>
                    {art.name}
                </div>
                <div className={`col-xs-2 pr-0 pl-0`}>
                </div>
                <div className={`col-xs-3 pr-0 pl-0`}>
                </div>
            </div>
        </div>
    );
};

const TagList = ({ art, id }) => {
    return (
        <div className={`minHeight30`}>
            <div className={`row pr-0 pl-0 innerItem`}>
                <div className="col-xs-1 pr-0 pl-0">
                    {id}
                </div>
                <div className="col-xs-3 pr-0 pl-0">
                    {art.imageURL ? <img height="50px" width="60px" src={art.imageURL}  alt="Tag Preview" /> : null}
                </div>
                <div className={`col-xs-2 pr-0 pl-0`}>
                    {art.name}
                </div>
                <div className={`col-xs-2 pr-0 pl-0`}>
                    {art.license}
                </div>
                <div className={`col-xs-3 pr-0 pl-0`}>
                </div>
            </div>
        </div>
    );
};



const Head = () => (
    <Subheader className={`card prolisthead`} style={{ background: '#F1F1F5', borderRadius: '10px' }}>
        <div className="row pr-0 pl-0 ">
            <div className="col-xs-1 pr-0 pl-0"></div>
            <div className="col-xs-3 pr-0 pl-0">{'Preview'}</div>
            <div className="col-xs-2 pr-0 pl-0">{'Name'}</div>
            <div className="col-xs-2 pr-0 pl-0">{'License'}</div>
            <div className="col-xs-3 pr-0 pl-0">{'Notes'}</div>
        </div>
    </Subheader>
);

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: ''
        }
    }
    componentDidMount() {
        const id = this.props.match.params.productId;
        this.props.getProduct(id);
        this.props.getActionsByProduct(id);
    }
    componentWillReceiveProps(nextProps){
        if(this.props.product !== nextProps.product) {
            const productName = `${nextProps.product.name}`;
            this.setState({productName}, () => {
                this.props.setBreadcrumbs(manage(productName))
            })
        }
    }
    componentWillUnmount() {
        this.props.resetBreadcrumbs(manage(this.state.productName, true));
    }
    render() {
        const { product, productActions } = this.props;
        let imageUrl = product.baseProduct ? product.baseProduct.imageURL : null;
        product.status = product.status ? product.status : 'QUEUED';
        let index = 0;
        const artworkRows = product && !!product.stages ? product.stages.map((stage, stageIndex) => {
            return stage.artworks ? stage.artworks.map((artwork, artworkIndex) => {
                index = index + 1;
                return (
                    <ArtworkList
                        id={index}
                        key={index}
                        art={artwork}
                    />
                );
            }) : null;
        }) : null;
        const tagRows = product && !!product.tags ? product.tags.map((item, index) => {
            return (
                <TagList
                    id={index + 1}
                    key={index}
                    art={item}
                />
            );
        }) : null;
        return (
            <div className="product-list">
                <Subheader className={`subheader`}>
                    <div className="row pr-0 pl-0">
                        <div className="col-md-6 pr-0 pl-0">
                            <h1 className={`listHeadH1`}>Product details</h1>
                        </div>
                    </div>
                </Subheader>

                <div className="row detailsCard">
                    <div className="col-xs-5">
                        <Card>
                            <div className={`row pr-0 pl-0`}>
                                <div className={`col-xs-4 pr-0 pl-0 `}>
                                    <h5 className="txtlabelhead">Status</h5>
                                </div>
                                <div className={`col-xs-8 pr-0 pl-0 tright`}>
                                {product.status ? <span className={`actionstatus ${getStatusClass(product.status)}`}>{formatStatus(product.status)}</span> : null }
                                </div>

                                <div className="customdivider"></div>

                                <div className="col-xs-4 pr-0 pl-0">
                                    <h6 className="txtlabel">ID:</h6>
                                </div>
                                <div className="col-xs-8 pr-0 pl-0 tright">
                                    <p> {product.orderId}</p>
                                </div>
                                <div className="col-xs-4 pr-0 pl-0">
                                    <h6 className="txtlabel">Created Date</h6>
                                </div>
                                <div className="col-xs-8 pr-0 pl-0 tright">
                                    <p> {formatDate(product.createdAt)}</p>
                                </div>
                                <div className="col-xs-4 pr-0 pl-0">
                                    <h6 className="txtlabel"> Name:</h6>
                                </div>
                                <div className="col-xs-8 pr-0 pl-0 tright">
                                    <p>   {product.name}</p>
                                </div>
                                <div className="col-xs-4 pr-0 pl-0">
                                    <h6 className="txtlabel"> Color:</h6>
                                </div>
                                <div className="col-xs-8 pr-0 pl-0 tright">
                                    <p>  {product && product.baseProduct ? product.baseProduct.colour : null}</p>
                                </div>
                                <div className="col-xs-4 pr-0 pl-0">
                                    <h6 className="txtlabel">  Size:</h6>
                                </div>
                                <div className="col-xs-8 pr-0 pl-0 tright">
                                    <p>  {product && product.baseProduct ? product.baseProduct.size : null}</p>
                                </div>
                                <div className="col-xs-12 p-0">
                                    <Modal actions={productActions} name='Product History' />
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="col-xs-6">
                        <Card className='m300'>
                            {imageUrl ?  <img src={imageUrl} alt="" className="pro-img" /> : null}
                        </Card>
                    </div>

                </div>
                <div className="col-xs-12">
                    <h5 className="txtlabelhead">Artwork list</h5>
                </div>


                <div className="col-xs-12 p-0">
                    <Card>
                        <List>
                            <Head />
                            <Divider />
                            <div className={`mt-4`} />
                            {artworkRows}
                        </List>
                    </Card>
                </div>
                <div className="col-xs-12">
                    <h5 className="txtlabelhead">Tag list</h5>
                </div>
                <div className="col-xs-12 p-0">
                    <Card>
                        <List>
                            <Head />
                            <Divider />
                            <div className={`mt-4`} />
                            {tagRows}
                        </List>
                    </Card>
                </div>
            </div >
        );
    }
}

export default getConnect(ProductDetail);

