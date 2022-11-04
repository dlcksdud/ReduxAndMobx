// 예제2 : 게시글 올리기
const addPost = (data) => {
    return {
        type: 'ADD_POST',
        data
    }
}

module.exports = {
    addPost
}