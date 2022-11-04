const { createStore, compose, applyMiddleware } = require('redux');
const {composeWithDevTools} = require('redux-devtools-extension');
const reducer = require('./reducers/index');
const { logIn, logOut } = require('./actions/user');
const { addPost } = require('./actions/post');

//*********************************************************** */
const initialState = {
	user: {
		isLoggingIn: false,
		data: null,	
	},

	posts: [],
	// comments: [],
	// favorites: [],
	// history: [],
	// likes: [],
	// followers: [],
};

// 다음 state 어떻게 될지 생각
// const nextState = {
//     ...initialState,
//     posts: [action.data],
// }

// // 다음 state 어떻게 될지 생각
// const nextState = {
//     ...initialState,
//     posts: [...initialState.posts, action.data],
// }
//*********************************************************** */




//////////////////////////////////////////////////////////////
// const nextState = {
//     compA: action.data,
//     compB: 12,
//     compC: null,
// };

// const nextState = {
//     ...initialState,
//     compA: action.data,
// };
///////////////////////////////////////////////////////////////

/**
 * const enhancer = compose(
 *      applyMiddleware(),
 *      devtool,
 * );
 * * compose도 가능
 *  - 합성하는 함수.
 *  
 * * applyMiddleware
 *  - 3단 함수가 들어감.
 *  - 3단 함수 : 실행되는 시점마다 다르게 적용하고 싶을 때.
 *  - 사이사이 다르게 적용되는 거 필요없으면 한줄로 써주면 됨]
 * 
 *  dispatch 대신 next 쓰기도 함.
 */
const firstMiddleware = (store) => (dispatch) => (action) => {
    console.log('액션 로깅', action);
    // 기능 추가
    dispatch(action);
    // 기능 추가

};

// redux-thunk : 비동기를 제어하는 가장 유명한 미들웨어
const thunkMiddleware = (store) => (dispatch) => (action) => {
    // 비동기
    console.log(typeof action);
    if(typeof action === 'function') {
        // 비동기인 경우에는 action을 객체가 아니라, 함수로 넣어주겠다.
        return action(store.dispatch, store.getState);
    }
    // 동기
    return dispatch(action);
}


const enhancer = composeWithDevTools(
    applyMiddleware(
        firstMiddleware,
        thunkMiddleware
    ),
); 

// 배포환경에서 composeWithDevTools 쓰고 싶지 않을 때는 안전하게 구별해야 예전 다방처럼 redux구조가 노출되지 않음.
// const enhancer = process.env.NODE_ENV === 'production' 
//                     ?
//                 compose (
//                     applyMiddleware(
//                         firstMiddleware,
//                         thunkMiddleware
//                     ),
//                 )
//                     :
//                 composeWithDevTools (
//                     applyMiddleware(
//                         firstMiddleware,
//                         thunkMiddleware
//                     ),  
//                 )


// createStore(reducer, 초기state자리, enhancer자리)
const store = createStore(reducer, initialState, enhancer);

module.exports = store;

