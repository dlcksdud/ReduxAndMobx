const {createAsyncThunk} = require('@reduxjs/toolkit');

// 비동기 흉내낼 delay 함수
const delay = (time, value) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(value);
    }, time);
})

// 문법
// createAsyncThunk('액션이름', )


const addPost = createAsyncThunk('post/add', async() => {
    return await delay(500, {
        title: '새 게시글',
        content: '내용내용내용',
    })
})


module.exports = {
    addPost
}