import React, { useEffect, lazy, Suspense } from 'react';
import { Layout, BackTop, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';

import MyHeader from '../Header/Header';
import MyFooter from '../Footer/Footer';
import Loading from '../Loading/Loading';
import NotFound from '../NotFound/NotFound';
import Animation from '../Animation/Animation';

import { reduxState } from '../../interfaces/state';
import { Data as LoginData } from '../../interfaces/localstorage';
import { localName } from '../../config/default.json';

import { actions } from '../../redux/ducks/system';

import './index.css';

// lazy
const homePromise = import('../Home/Home');
const Home = lazy(() => homePromise);
const loginPromise = import('../Login/Login');
const Login = lazy(() => loginPromise);
const systemPromise = import('../ManagementSystem/Index');
const System = lazy(() => systemPromise);
const aboutPromise = import('../About/About');
const About = lazy(() => aboutPromise);
const userPromise = import('../User/User');
const User = lazy(() => userPromise);
const settingPromise = import('../Setting/Setting');
const Setting = lazy(() => settingPromise);
const articlePromise = import('../Article/Article');
const Article = lazy(() => articlePromise);

const { Content } = Layout;


function App() {
  const { isLogin } = useSelector((item: reduxState) => item.user);
  const { isLoading } = useSelector((item: reduxState) => item.system);
  const history = useHistory();
  const dispatch = useDispatch();

  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      const action = actions.systemLoaded();
      dispatch(action);
      console.clear();
      console.log('loaed!');
    }
  }

  useEffect(() => {
    if (!isLogin) {
      if (history.location.pathname === '/login') return;

      const localItem = localStorage.getItem(localName);
      if (localItem !== null) {
        const loginData: LoginData = JSON.parse(localItem);
        if (loginData.isLogin) history.push('/login');
      }
    }
  });

  return (
    <>
      <Loading style={{ opacity: isLoading ? 1 : 0 }} />
      <Switch>
        <Route exact strict path={['/', '/about', '/user', '/setting', '/article/*']}>
          <Layout className="index">
            <MyHeader />
            <Content className="index-content">
              <Suspense fallback={<div className="index-loading"><Spin /></div>}>
                <Route exact path="/" children={props => Animation(<Home />, props, '/')} />
                <Route path="/about" children={props => Animation(<About />, props, '/about')} />
                <Route path="/user" children={props => Animation(<User />, props, '/user')} />
                <Route path="/setting" children={props => Animation(<Setting />, props, '/setting')} />
                <Route path="/article/*" children={props => Animation(<Article />, props, '/article/*')} />
              </Suspense>
            </Content>
            <MyFooter />
            <BackTop style={{
              right: '10px',
              bottom: '30px'
            }} />
          </Layout>
        </Route>
        <Suspense fallback={<div className="index-loading"><Spin /></div>}>
          <Route exact strict path="/login" children={props => Animation(<Login />, props, '/login')} />
          <Route exact strict path="/management/*" children={props => Animation(<System />, props, '/management/*')} />
        </Suspense>
        <Route path="*" children={props => Animation(<NotFound />, props, '/404')} />
      </Switch>
    </>
  );
}

export default App;
