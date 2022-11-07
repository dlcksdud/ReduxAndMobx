const { configureStore, getDefaultMiddleware } = require('@reduxjs/toolkit');

const reducer = require('./reducers/index');

const firstMiddleware = (store) => (next) => (action) => {
    console.log('로깅', action);
    // 기능 추가
    next(action);
    // 기능 추가

};

const store = configureStore({
    reducer, 
    // custom middleware 사용하는 법
    // middleware: [firstMiddleware], // 이렇게 하면 기존에 내장된 thunkMiddleware는 사라짐.
    middleware: [firstMiddleware, ...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',

});


module.exports = store;

