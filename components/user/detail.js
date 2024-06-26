import React from 'react';
import Card from '@material-ui/core/Card';
import Subheader from '@material-ui/core/ListSubheader';
import { formatDate } from '../../config/helper';
import '../style.css';
import Modal from '../common/actionModal';
import getConnect from '../common/connect';
class UserDetail extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getUser(id);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.user !== nextProps.user) {
            this.props.getActionsByUser(nextProps.user.userName);
        }
    }

    render() {
        let { user, userActions } = this.props;
        return (
            <div className="product-list">
                <Subheader className={`subheader`}>
                    <div className="row pr-0 pl-0">
                        <div className="col-md-6 pr-0 pl-0">
                            <h1 className={`listHeadH1`} style={{ paddingLeft: "10px" }}>User details</h1>
                        </div>
                    </div>
                </Subheader>
                <div className="row">
                    <div className="col-md-12">
                        <Card>
                            <div className={`row pr-0 pl-0`}>
                                <div className="col-xs-12 pr-0 pl-0 hleft">
                                    ID #{!!user.id ? user.id : null}
                                </div>
                                <hr className="col-xs-12 divider" />
                                <div className="col-xs-6 pr-0 pl-0 sleft">
                                    Creation Date:
                            </div>
                                <div className="col-xs-6 pr-0 pl-0 tright">
                                    {formatDate(user.createdAt)}
                                </div>
                                <div className="col-xs-6 pr-0 pl-0 sleft">
                                    Last Update:
                            </div>
                                <div className="col-xs-6 pr-0 pl-0 tright">
                                    {formatDate(user.updatedAt)}
                                </div>
                                <div className="col-xs-6 pr-0 pl-0">
                                    <Modal actions={userActions} name='User Actions' />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default getConnect(UserDetail);

