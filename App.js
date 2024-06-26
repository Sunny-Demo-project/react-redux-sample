import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import appStore from './config/store';
import OrderList from './components/order/list';
import Dashboard from './components/dashboard/dashboard';
import TaskList from './components/task/list';
import OrderItem from './components/order/item';
import ProductDetail from './components/product/detail';
import TaskDetail from './components/task/detail';
import Login from './components/auth/login';
import GarmentPrinterList from './components/garmentPrinter/list';
import GarmentPrinterDetail from './components/garmentPrinter/detail';
import ToteList from './components/tote/list';
import ToteDetail from './components/tote/detail';
import UserList from './components/user/list';
import UserDetail from './components/user/detail';
import BinList from './components/bin/list';
import BinDetail from './components/bin/detail';
import Drawer from './layouts/drawer';
import MuiTheme from './config/muiTheme';
import SettingsPage from './components/settings/page';
function App() {
  return (
    <Provider store={appStore}>
      <MuiThemeProvider theme={MuiTheme}>
        <Router>
          <div id="container">
            <div id="headContainer">
              <Drawer />
            </div>
            <div id="bodyContainer" className="currentPage">
              <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/orders" exact component={OrderList} />
                <Route path="/orders/:id" exact component={OrderItem} />
                <Route path="/orders/:id/:productId" exact component={ProductDetail} />
                <Route path="/tasks" exact component={TaskList} />
                <Route path="/tasks/:id" exact component={TaskDetail} />
                <Route path="/tasks/:id/:productId" exact component={ProductDetail} />
                <Route path="/garment-printers" exact component={GarmentPrinterList} />
                <Route path="/garment-printers/:id" exact component={GarmentPrinterDetail} />
                <Route path="/totes" exact component={ToteList} />
                <Route path="/totes/:id" exact component={ToteDetail} />
                <Route path="/users" exact component={UserList} />
                <Route path="/users/:id" exact component={UserDetail} />
                <Route path="/bins" exact component={BinList} />
                <Route path="/bins/:id" exact component={BinDetail} />
                <Route path="/settings" component={SettingsPage} />
                <Route path="*" exact component={Login} />
              </Switch>
            </div>
          </div>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
