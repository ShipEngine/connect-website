// Third Party
import React, { FunctionComponent } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import { Affix, Button, Layout, Menu, Breadcrumb, Modal } from 'antd';
import { ExclamationOutlined } from '@ant-design/icons';

// Utils & Types
import routes from './routes';
import { AppProvider } from './contexts/app-context';
import { AppStatusProvider, useAppStatus } from './contexts/app-status-context';

// Screens
import AppInfoScreen from './screens/app-info-screen';
import CancelPickupsMethodScreen from './screens/cancel-pickups-method-screen';
import CancelShipmenstMethodScreen from './screens/cancel-shipments-method-screen';
import ConnectMethodScreen from './screens/connect-method-screen';
import CreateManifestMethodScreen from './screens/create-manifest-method-screen';
import CreateShipmentMethodScreen from './screens/create-shipment-method-screen';
import RateShipmentMethodScreen from './screens/rate-shipment-method-screen';
import SchedulePickupMethodScreen from './screens/schedule-pickup-method-screen';
import TrackShipmentMethodScreen from './screens/track-shipment-method-screen';

// Styles & Assets
import './app.css';
import logo from './assets/svgs/shipengine-connect-logo.svg';

const App: FunctionComponent = () => {
  return (
    <AppProvider>
      <AppStatusProvider>
        <Router>
          <AppLayout />
        </Router>
      </AppStatusProvider>
    </AppProvider>
  );
};

const AppLayout: FunctionComponent = () => {
  const location = useLocation();
  const { appStatus } = useAppStatus();
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <Layout>
      <Layout.Header style={{ backgroundColor: "#fff", height: "82px", boxShadow: "0 5px 20px rgba(22,41,72,.1)", zIndex: 1 }}>
        <a href='https://connect.shipengine.com/' target='_blank' rel="noopener noreferrer" style={{ margin: "0 0 0 9px" }}>
          <img src={logo} alt='logo' style={{ height: '40px' }} />
        </a>
      </Layout.Header>
      <Layout>
        <Layout.Sider
          width={220}
          className='site-layout-background'
          theme='light'>
          <Menu
            mode='inline'
            selectedKeys={[location.pathname]}
            style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item key={routes.appsInfoPath()} style={{ marginTop: '0px' }}>
              <Link to={routes.appsInfoPath()}>App Info</Link>
            </Menu.Item>
            <Menu.Item key={routes.connectMethodPath()}>
              <Link to={routes.connectMethodPath()}>Connect</Link>
            </Menu.Item>
            {/* <Menu.Item key={routes.createShipmentMethodPath()}>
              <Link to={routes.createShipmentMethodPath()}>
                Create Shipment
              </Link>
            </Menu.Item>
            <Menu.Item key={routes.cancelShipmentsMethodPath()}>
              <Link to={routes.cancelShipmentsMethodPath()}>
                Cancel Shipment
              </Link>
            </Menu.Item>
            <Menu.Item key={routes.rateShipmentMethodPath()}>
              <Link to={routes.rateShipmentMethodPath()}>Rate Shipment</Link>
            </Menu.Item>
            <Menu.Item key={routes.trackShipmentMethodPath()}>
              <Link to={routes.trackShipmentMethodPath()}>Track Shipment</Link>
            </Menu.Item>
            <Menu.Item key={routes.createManifestMethodPath()}>
              <Link to={routes.createManifestMethodPath()}>
                Create Manifest
              </Link>
            </Menu.Item>
            <Menu.Item key={routes.schedulePickupMethodPath()}>
              <Link to={routes.schedulePickupMethodPath()}>
                Schedule Pickups
              </Link>
            </Menu.Item>
            <Menu.Item key={routes.cancelPickupsMethodPath()}>
              <Link to={routes.cancelPickupsMethodPath()}>Cancel Pickups</Link>
            </Menu.Item> */}
          </Menu>
        </Layout.Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item key='1'>
              <Link to={routes.appsInfoPath()}>App Info</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item key='2'>
              {setBreadcrumb(location.pathname)}
            </Breadcrumb.Item>
          </Breadcrumb>
          <Layout.Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: '95vh',
            }}>
            <Switch>
              <Route exact path={routes.appsInfoPath()}>
                <AppInfoScreen />
              </Route>

              <Route path={routes.connectMethodPath()}>
                <ConnectMethodScreen />
              </Route>

              <Route path={routes.createShipmentMethodPath()}>
                <CreateShipmentMethodScreen />
              </Route>

              <Route path={routes.cancelShipmentsMethodPath()}>
                <CancelShipmenstMethodScreen />
              </Route>

              <Route path={routes.rateShipmentMethodPath()}>
                <RateShipmentMethodScreen />
              </Route>

              <Route path={routes.trackShipmentMethodPath()}>
                <TrackShipmentMethodScreen />
              </Route>

              <Route path={routes.createManifestMethodPath()}>
                <CreateManifestMethodScreen />
              </Route>

              <Route path={routes.schedulePickupMethodPath()}>
                <SchedulePickupMethodScreen />
              </Route>

              <Route path={routes.cancelPickupsMethodPath()}>
                <CancelPickupsMethodScreen />
              </Route>

              <Redirect to={routes.appsInfoPath()}></Redirect>
            </Switch>
            <Modal
              title='App Error'
              footer={null}
              visible={modalVisible}
              closable={true}
              onCancel={() => {
                setModalVisible(false);
              }}>
              <code>{appStatus?.error?.message}</code>
            </Modal>
            {appStatus && appStatus.status === 'down' && (
              <Affix
                style={{ position: 'absolute', bottom: '25px', right: '40px' }}>
                <Button
                  onClick={() => {
                    setModalVisible(!modalVisible);
                  }}
                  type='primary'
                  style={{
                    backgroundColor: 'red',
                    borderColor: 'darkred',
                    boxShadow: '2px 2px 2px 0px rgba(0,0,0,0.75)',
                  }}
                  icon={<ExclamationOutlined />}></Button>
              </Affix>
            )}
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

const setBreadcrumb = (pathname: string): string => {
  switch (pathname) {
    case routes.appsInfoPath():
      return '';
    case routes.connectMethodPath():
      return 'Connect';
    case routes.createShipmentMethodPath():
      return 'Create Shipment';
    case routes.cancelShipmentsMethodPath():
      return 'Cancel Shipment';
    case routes.rateShipmentMethodPath():
      return 'Rate Shipment';
    case routes.trackShipmentMethodPath():
      return 'Track Shipment';
    case routes.createManifestMethodPath():
      return 'Create Manifest';
    case routes.schedulePickupMethodPath():
      return 'Schedule Pickup';
    case routes.cancelPickupsMethodPath():
      return 'Cancel Pickups';
    default:
      return '';
  }
};

export default App;
