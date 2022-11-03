const { createStore } = require('redux');

/**
 * [ history 기능, 추적가능하게 하기 위해서. ]
 * initialState.compA = 'b' 라고 하면,
 * 'b'로 바꾸기 전의 값을 알 수 없음.
 *  
 */
const reducer = (prevState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...prevState,
                user: action.data,
            };
        case 'LOG_OUT':
            return {
                ...prevState,
                user: null,
            };
        case 'ADD_POST':
            return {
                ...prevState,
                // 배열에 어떻게 넣을지 모르겠다면,  
                posts: [...prevState.posts, action.data],
            };
        // 오타 대비
        default:
            return prevState;
    }
};

//*********************************************************** */
const initialState = {
    user: null,
    posts: []
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


const store = createStore(reducer, initialState);

//  이벤트 리스너
store.subscribe(() => { // react-redux안에 들어있어요.
    console.log('changed'); // 화면 바꿔주는 코드는 여기서
})

console.log('1st', store.getState());

// action 만들어보기
// action은 객체이다.
// type : action의 이름
// 변수명을 지어야 하는 상황을 피하면 코드가 깔끔해진다.
const logIn = (data) => {
    // 함수 자체가 action이 아니고 객체가 action이다.
    return {
        type: 'LOG_IN',
        data
    }
};

const logOut = () => {
    return {
        type: 'LOG_OUT',
    }
}


// 예제2 : 게시글 올리기
const addPost = (data) => {
    return {
        type: 'ADD_POST',
        data
    }
}

//changeCompA('b');
//changeCompA('c');


// 내가 개인적으로 생각한 공식 : store.dispatch(action())
store.dispatch(logIn({
    id: 1,
    name: 'cylee',
    admin: true,
}));

console.log('로그인 후', store.getState());

store.dispatch(addPost({
    userId: 1,
    id: 1,
    contents: 'hello redux',
}));

console.log('글쓰기 후', store.getState());

store.dispatch(logOut({
    // 로그아웃은 데이터 필요 없음.
}));


console.log('로그아웃 후', store.getState());

