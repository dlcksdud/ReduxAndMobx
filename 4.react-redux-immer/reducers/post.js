const produce = require('immer');

// initialState.posts 가 기본값이 []이기 때문에.
const initialState = [];

const postReducer = (prevState = initialState, action) => {
    return produce(prevState, (draft) => {
        switch (action.type) {
            case 'ADD_POST':
                draft.push(action.data);
                break;
            // 오타 대비
            default:
                break;
        }

    })
};

module.exports = postReducer;