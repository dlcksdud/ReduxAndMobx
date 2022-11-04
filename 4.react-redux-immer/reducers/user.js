const { produce } = require('immer');

// initialState.user의 기본값 설정
const initialState = {
    isLoggingIn: false,
    data: null
};

// immer의 기본형
// nextState = produce(prevState, (draft) => {});

const userReducer = (prevState = initialState, action) => {

    // draft : prevState의 복사본이라 생각하면 쉽다.
    return produce(prevState, (draft) => {
        switch (action.type) {
            case 'LOG_IN_REQUEST':
                draft.data = null,
                draft.isLoggingIn = true;
                break;

            case 'LOG_IN_SUCCESS':
                draft.data = action.data;
                draft.isLoggingIn = false;
                break;
            
            case 'LOG_IN_FAILURE':
                draft.data = null;
                draft.isLoggingIn = false;
                break;
            
            case 'LOG_OUT':
                draft.data = null;
                break;
            // 오타 대비
            default:
                break;
        }
    });

    
};

module.exports = userReducer;