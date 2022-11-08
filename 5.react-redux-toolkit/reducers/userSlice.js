const { createSlice, createSerializableStateInvariantMiddleware } = require('@reduxjs/toolkit');
const { logIn } = require('../actions/user');

// initialState.user의 기본값 설정
const initialState = {
    isLoggingIn: false,
    // isLoggedIn: false,
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
    extraReducers: (builder) => builder
        .addCase(logIn.pending, (state, action) => {
            state.data = null;
            state.isLoggingIn = true;
            state.isLoggedIn = false;
            state.error = false;
        })
        .addCase(logIn.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoggingIn = false;
            state.isLoggedIn = true;
        })
        .addCase(addPost.rejected, (state, action) => {

        })

        // 여러 action 간의 공통인거 처리 할떄.
        .addMatcher((action) => {
            return action.type.includes('/pending');
        }, (state, action) => {
            state.isLoading = true;
        })
        
        .addDefaultCase((state, action) => {
            // default 일 때, 어떻게 할지.
        })
})

module.exports = userSlice;