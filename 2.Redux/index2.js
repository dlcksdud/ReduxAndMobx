const { createStore, compose, applyMiddleware } = require('redux');
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
 *  - 사이사이 다르게 적용되는 거 필요없으면 한줄로 써주면 됨
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
    if(typeof action === 'function') {
        // 비동기인 경우에는 action을 객체가 아니라, 함수로 넣어주겠다.
        return action(store.dispatch, store.getState);
    }
    // 동기
    return dispatch(action);
}


const enhancer = applyMiddleware(
    firstMiddleware,
    thunkMiddleware
);

// createStore(reducer, 초기state자리, enhancer자리)
const store = createStore(reducer, initialState, enhancer);

//  이벤트 리스너
store.subscribe(() => { // react-redux안에 들어있어요.
    console.log('changed'); // 화면 바꿔주는 코드는 여기서
})

console.log('1st', store.getState());


// 내가 개인적으로 생각한 공식 : store.dispatch(action())
store.dispatch(logIn({
    id: 1,
    name: 'cylee',
    admin: true,
}));

//store.dispatch({
//    type: 'LOG_IN_REQUEST',
//});

console.log('로그인 후', store.getState());


// store.dispatch(addPost({
//     userId: 1,
//     id: 1,
//     contents: 'hello redux',
// }));

// console.log('글쓰기 후', store.getState());

// store.dispatch(logOut({
//     // 로그아웃은 데이터 필요 없음.
// }));


// console.log('로그아웃 후', store.getState());

