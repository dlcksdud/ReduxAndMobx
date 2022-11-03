// initialState.user의 기본값 설정
const initialState = {
    isLoggingIn: false,
    data: null
};

const userReducer = (prevState = initialState, action) => {

    switch (action.type) {
        case 'LOG_IN':
            return {
                
                ...prevState,
                isLoggingIn: true,
                data: action.data,
            };
        case 'LOG_OUT':
            return {
                ...prevState,
                isLoggingIn: false,
                data: null,
            };
        // 오타 대비
        default:
            return prevState;
    }
};

module.exports = userReducer;