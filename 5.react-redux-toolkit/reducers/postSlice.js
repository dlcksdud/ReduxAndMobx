const {createSlice} =  require('@reduxjs/toolkit');
const {addPost} = require('../actions/post');

// initialState.posts 가 기본값이 []이기 때문에.
const initialState = {
    data: []
};

const postReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case 'ADD_POST':
            return [...prevState, action.data]
        // 오타 대비
        default:
            return prevState;
    }
};

const postSlice = createSlice({
    name: 'post',
    initialState,

    reducers: {
        // 동기적, 내부적
        clearPost(state, action) {
            state.data = [];
        }
    },
    extraReducers: (builder) => builder
        .addCase(addPost.pending, (state, action) => {

        })
        .addCase(addPost.fulfilled, (state, action) => {
            state.data.push(action.payload);
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

module.exports = postSlice;