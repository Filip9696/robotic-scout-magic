// This is the root component of the App, contains the app state, router
// and other things.
import React, { Component, Fragment } from 'react';
import { Router } from '@reach/router';
import { hot } from 'react-hot-loader/root';
import Loadable from 'react-loadable';
import Theme from './Theme';
// MUI
import CircularProgress from '@material-ui/core/CircularProgress';

// Pages
import AppBar from './AppBar';

import '../css/App.css';

const Loader = () => <div className='container' style={{
    display: 'flex',
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
}}>
    <CircularProgress />
</div>;

const AppLoader = Loadable({
    loader: () => fetch('./all-forms.json').then(res => res.json()).then(json => {
        return () => <App formData={json}/>;
    }),
    loading: Loader,
});
const PageLoadable = (dynamic_import) => Loadable({ loader: dynamic_import, loading: Loader });

const MainPage = PageLoadable(() => import('./MainPage'));
const FormPage = PageLoadable(() => import('./FormPage'));

class App extends Component {
    constructor() {
        super();
    }
    render() {
        const formData = this.props.formData;
        return <Fragment>
            <AppBar formData={formData} url={location.pathname} />
            <div className='container'>
                <Router>
                    <MainPage path='/' formData={formData} />
                    <FormPage path='/form/:formID' formData={formData} />
                </Router>
            </div>
        </Fragment>;
    }
}

const PreLoadedApp = () => <Theme>
    <AppLoader />
</Theme>;
 
export default hot(PreLoadedApp);
