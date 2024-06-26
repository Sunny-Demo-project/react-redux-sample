import { connect } from 'react-redux';
import * as BinActions from '../../actions/binActions';
import * as MainActions from '../../actions/mainActions';
import * as GarmentPrinterActions from '../../actions/garmentPrinterActions';
import * as OrderActions from '../../actions/orderActions';
import * as ProductActions from '../../actions/productActions';
import * as TaskActions from '../../actions/taskActions';
import * as ToteActions from '../../actions/toteActions';
import * as ActionActions from '../../actions/actionActions';
import * as UserActions from '../../actions/userActions';
import { withRouter } from 'react-router-dom';

function mapStateToProps(state) {
	const { OrderReducer, ProductReducer, TaskReducer, MainReducer,
        BinReducer, UserReducer, GarmentPrinterReducer, ToteReducer, ActionReducer } = state;
	return {
        ...UserReducer, ...OrderReducer, ...ProductReducer, ...TaskReducer, ...BinReducer,
        ...MainReducer, ...GarmentPrinterReducer, ...ToteReducer, ...ActionReducer
	}
}

const getConnect = component => {
    return connect(mapStateToProps, {
        ...BinActions, ...MainActions , ...GarmentPrinterActions , ...OrderActions,  
        ...ProductActions, ...TaskActions, ...ToteActions, ...ActionActions, 
        ...UserActions
    })(withRouter(component))
}

export default getConnect;