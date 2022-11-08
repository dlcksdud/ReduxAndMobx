// mobx react 에서 observer를 제공해줌.
const { observable, autorun, runInAction, action, reaction } = require('mobx');


// redux는 state가 가장 큰 객체 하나로 묶여야 한다.
// mobx는 state를 따로따로 써줄 수 있다. redux처럼 initialState로 하나로 안묶어도 됨.
const userState = observable({
    isLoggingIn: true,
    data: null,
});

const postState = observable([]);

// 상황 가정 : 로그인을 하면서 동시에 글을 쓰고 싶다.
// mobx는 이렇게만 해줘도 가능
postState.push({idL: 1, content:'안녕하세요.'});
userState.data = {
    id: 1,
    nickname: 'chny',
}

// 굳이 묶고 싶다. 하면 runInAction으로 묶어주기
runInAction(() => {
    postState.push({idL: 1, content:'안녕하세요.'});
    userState.data = {
    id: 1,
    nickname: 'chny',
}
})

// 리덕스는 immer까지 있다고 해도, 로그인을 하면서 동시에 글을 쓰는 기능 불가.

class UserStore {
    // decorator 함수
    // @observable state = {};

    // decorator 못쓰면
    state = observable({
        name: 'zerocho',
        age: 26,
    })

    // @action
    // changeName(value) {
    //     this.state.name = value;
    // }
    
}

const userState = new UserStore();

const user1 = new UserStore(); // 싱글턴
const userState = observable({
    name: 'chny',
    age: 25,
    changeName(value) {
        this.name = value;
    }
})


