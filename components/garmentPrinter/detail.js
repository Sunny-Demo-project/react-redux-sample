import React from 'react';
import Card from '@material-ui/core/Card';
import Subheader from '@material-ui/core/ListSubheader';
import { formatDate } from '../../config/helper';
import '../style.css';
import getConnect from '../common/connect';

class GarmentPrinterDetail extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getGarmentPrinter(id);
    }
    render() {
        let { garmentPrinter } = this.props;
        return (
            <div className="product-list">
                <Subheader className={`subheader`}>
                    <div className="row pr-0 pl-0">
                        <div className="col-md-6 pr-0 pl-0">
                            <h1 className={`listHeadH1`} style={{ paddingLeft: "10px" }}>GarmentPrinter details</h1>
                        </div>
                    </div>
                </Subheader>
                <div className="row">
                    <div className="col-xs-12">
                        <Card>
                            <div className={`row pr-0 pl-0`}>
                                <div className="col-xs-12 pr-0 pl-0 hleft">
                                    ID #{!!garmentPrinter.id ? garmentPrinter.id : null}
                                </div>
                                <hr className="col-xs-12 divider" />
                                <div className="col-xs-6 pr-0 pl-0 sleft">
                                    Creation Date:
                            </div>
                                <div className="col-xs-6 pr-0 pl-0 tright">
                                    {formatDate(garmentPrinter.createdAt)}
                                </div>
                                <div className="col-xs-6 pr-0 pl-0 sleft">
                                    Last Update:
                            </div>
                                <div className="col-xs-6 pr-0 pl-0 tright">
                                    {formatDate(garmentPrinter.updatedAt)}
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default getConnect(GarmentPrinterDetail);

