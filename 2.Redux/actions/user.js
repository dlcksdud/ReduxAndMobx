// acync action creater
const logIn = (data) => {
    console.log("여기는 와야지");
    // 얘는 비동기니까 함수 리턴
    return (dispatch, getState) => { // acync action
        // 로그인 시도
        dispatch(logInRequest(data));
        
        try {
            // 현재는 서버가 없으니, 로그인 되는 시간 2초로 지정
            setTimeout(() => {
                dispatch(logInSuccess({
                    userId: 1,
                    nickName: 'chanyeong'
                }));
                
            }, 2000);

        } catch (e) {
            dispatch(logInFailure(e));
        }

    };
};

// 로그인 요청
const logInRequest = (data) => {
    return {
        type: 'LOG_IN_REQUEST',
        data,
    }
}

// 로그인 성공
const logInSuccess = (data) => {
    return {
        type: 'LOG_IN_SUCCESS',
        data,
    }
}

// 로그인 실패
const logInFailure = (error) => {
    return {
        type: 'LOG_IN_FAILURE',
        error,
    }
}



// sync action creater
// 객체를 리턴하는 건 동기, 객체
// const logIn = (data) => {
//     // 함수 자체가 action이 아니고 객체가 action이다.
//     return {
//         type: 'LOG_IN',
//         data
//     }
// };

const logOut = () => {
    return {
        type: 'LOG_OUT',
    }
}

module.exports = {
    logIn, logOut, logInRequest, logInSuccess, logInFailure
}