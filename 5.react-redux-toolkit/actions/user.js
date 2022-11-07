const {createAsyncThunk, isPending, isFulfilled, isRejected} = require('@reduxjs/toolkit');

// 비동기를 흉내낼 delay 함수
const delay = (time, value) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(value);
    }, time);
})


const logIn = createAsyncThunk('user/logIn', async(data, thunkAPI) => {
    // const state = thunkAPI.getState();
    // state.user.data  

    // loading, success, failure
    // isPending, fulfilled, rejected

    console.log(data);

    // result는 500초 뒤에 데이터를 리턴한다.
    const result = await delay(500, {
        userId: 1,
        nickName: 'chny'
    });

    return result;

    // try-catch로 안감싸는 이유 : 에러가 발생해야 thunk가 rejected 상태가 되기 때문에.

});

// acync action creater
// const logIn = (data) => {
//     console.log("여기는 와야지");
//     // 얘는 비동기니까 함수 리턴
//     return (dispatch, getState) => { // acync action
//         // 로그인 시도
//         dispatch(logInRequest(data));
        
//         try {
//             // 현재는 서버가 없으니, 로그인 되는 시간 2초로 지정
//             setTimeout(() => {
//                 dispatch(logInSuccess({
//                     userId: 1,
//                     nickName: 'chanyeong'
//                 }));
                
//             }, 2000);

//         } catch (e) {
//             dispatch(logInFailure(e));
//         }

//     };
// };

// 상수는 따로 빼준다. 오타를 방지, 수정 용이
const LOG_IN_REQUEST = 'LOG_IN_REQUEST';

// 로그인 요청
const logInRequest = (data) => {
    return {
        type: LOG_IN_REQUEST,
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


module.exports = {
    logIn, logInRequest, logInSuccess, logInFailure
}