// mobx react 에서 observer를 제공해줌.
const { observable, autorun, runInAction, action, reaction } = require('mobx');

const state = observable({
    compA: 'a',
    compB: 12,
    compC: null,
});

// 감지기 역할
// autorun : state가 뭐든 바뀌면 실행이 됨
autorun(() => {
    console.log('changed', state.compA);
});

// 감지기 역할
// reaction : 첫번째 함수에서 리턴하는 값이 바뀌었을 때만 실행이 됨.
reaction(() => {
    return state.compB;
}, () => {
    console.log('reaction', state.compB);
})

// runInAction : 하나의 action으로 묶임.
// runInAction 2번 실행하니까 autorun도 2번 샐행됨.
runInAction(() => {
    state.compA = 'b';
    state.compB = 'c';
    state.compC = 'a';
})

runInAction(() => {
    state.compC = 'd';
})

// class 문법으로 쓰는 경우도 있음
// @ decorator 문법은 실험적인 문법이라 babel 같은거 써줘야 함.
// class UserStore {
//     @observable name = 'zero';
//     @observable age = 26;
//     @observable married = false;

//     @action
//     changeName(value) {
//         this.name = value;
//     }
// }

// 리덕스는 state가 가장 큰 객체 하나로 묶여야 한다.

