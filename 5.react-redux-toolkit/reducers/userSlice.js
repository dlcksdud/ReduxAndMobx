const { createSlice, createSerializableStateInvariantMiddleware } = require('@reduxjs/toolkit');
const { logIn } = require('../actions/user');

// initialState.user의 기본값 설정
const initialState = {
    isLoggingIn: false,
    data: null,
    email: '',
    password: ''
};

// const userReducer = (prevState = initialState, action) => {
//     return produce(prevState, (draft) => {
//         switch (action.type) {
//             case 'LOG_IN_REQUEST':
//                 draft.data = null;
//                 draft.isLoggingIn = true;
//                 break;
//             case 'LOG_IN_SUCCESS':
//                 draft.data = action.data;
//                 draft.isLoggingIn = false;
//                 break;
//             case 'LOG_IN_FAILURE':
//                 draft.data = null;
//                 draft.isLoggingIn = false;
//                 break;
//             case 'LOG_OUT':
//                 draft.data = null;
//                 break;
//             // 오타 대비
//             default:
//                 break;
//         }
//     })

    
// };

const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        // 동기적, 내부적
        logOut(state, action) {
            state.data = null;
        },
        setEmail(state, action) {
            state.email = action.payload;
        },
        setPassword(state, action) {
            state.password = action.payload;
        }
    },
    extraReducers: {
        // 비동기적, 외부적

        // 로딩
        // 액션이름이 user/login 이니까 // user/login/pending이 되는거임.
        // [login.pending] 변수 안에 -> user/login/pending이 들어있는 것.
        // tookit이 변수명까지 만들어준 것.
        [logIn.pending](state, action) {
            state.isLoggingIn = true;
        },
        // 성공
        // user/login/fullfilled
        [logIn.fullfilled](state, action) {
            state.data = action.payload;
            draft.isLoggingIn = false;
        },
        // 실패
        // user/login/rejected
        [logIn.rejected](state, action) {

        }
    }
})

module.exports = userSlice;