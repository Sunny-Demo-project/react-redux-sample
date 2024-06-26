import React from 'react';
import Subheader from '@material-ui/core/ListSubheader';
import '../style.css';
import getConnect from '../common/connect';

class SettingsPage extends React.Component {
    render() {
        return (
            <div className="product-list">
                <Subheader className={`subheader`}>
                    <div className="row pr-0 pl-0">
                        <div className="col-md-6 pr-0 pl-0">
                            <h1 className={`listHeadH1`}>Settings</h1>
                        </div>
                    </div>
                </Subheader>
            </div>
        );
    }
}

export default getConnect(SettingsPage);

