import React from 'react';
import ReactDOM from 'react-dom';
// react-hot-loader는 설치오류나서 설치 못함.(아마도 react 18버전에서는 안되는 듯함.)
// import { hot } from 'react-hot-loader/root';
// const Hot = hot(App);
import { Provider } from 'react-redux'; // react-redux 연결 사용

import store from './store';
import App from './App';


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);