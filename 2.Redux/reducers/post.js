// initialState.posts 가 기본값이 []이기 때문에.
const initialState = [];

const postReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case 'ADD_POST':
            return [...prevState, action.data]
        // 오타 대비
        default:
            return prevState;
    }
};

module.exports = postReducer;