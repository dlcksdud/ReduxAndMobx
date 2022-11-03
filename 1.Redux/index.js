const { createStore } = require('redux');

/**
 * [ history 기능, 추적가능하게 하기 위해서. ]
 * initialState.compA = 'b' 라고 하면,
 * 'b'로 바꾸기 전의 값을 알 수 없음.
 *  
 */
const reducer = (prevState, action) => {
    switch (action.type) {
        case 'CHANGE_COMP_A':
            return {
                ...prevState,
                compA: action.data,
            };
        case 'CHANGE_COMP_B':
            return {
                ...prevState,
                compB: action.data,
            };
        case 'CHANGE_COMP_C':
            return {
                ...prevState,
                compC: action.data,
            };
        // 오타 대비
        default:
            return prevState;
    }
};

const initialState = {
    compA: 'a',
    compB: 12,
    compC: null,
};


// const nextState = {
//     compA: action.data,
//     compB: 12,
//     compC: null,
// };

// const nextState = {
//     ...initialState,
//     compA: action.data,
// };

const store = createStore(reducer, initialState);

//  이벤트 리스너
store.subscribe(() => { // react-redux안에 들어있어요.
    console.log('changed'); // 화면 바꿔주는 코드는 여기서
})

console.log('1st', store.getState());

// action 만들어보기
// action은 객체이다.
// type : action의 이름
// 변수명을 지어야 하는 상황을 피하면 코드가 깔끔해진다.
const changeCompA = (data) => {
    // 함수 자체가 action이 아니고 객체가 action이다.
    return {
        type: 'CHANGE_COMP_A',
        data
    }
};

//changeCompA('b');
//changeCompA('c');


// 내가 개인적으로 생각한 공식 : store.dispatch(action())
// store.dispatch({
//     type: 'CHANGE_COMP_A',
//     data: 'b',
// });
store.dispatch(changeCompA('b'));
console.log('2nd', store.getState());

