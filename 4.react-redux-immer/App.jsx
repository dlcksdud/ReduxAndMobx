import React, { Component } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { logIn, logOut } from './actions/user';

class App extends Component {
    // state, dispatch 가져와야 함.

    onClick = () => {
        this.props.dispatchLogIn({
            id: 'zerolee',
            password: '비밀번호'
        });
    };

    onLogOut = () => {
        this.props.dispatchLogOut();
    };

    render() {
        const { user } = this.props;
        return (
            <div>
                {user.isLoggingIn ? <div>로그인 중</div> : user.data
                                                                ? <div>{user.data.nickName}</div> : '로그인 해주삼'}
                {!user.data ? 
                    <button onClick={this.onClick}>로그인</button>
                    : 
                    <button onClick={this.onLogOut}>로그아웃</button>
                }
            </div>
        );
    }
};


// state와 dispatch 가져오기.
const MapStateToProps = (state) => ({
    user: state.user,

}) // reselect (hooks에선 필요없음)

const mapDispatchToProps = (dispatch) => ({
    dispatchLogIn: (data) => dispatch(logIn(data)),
    dispatchLogOut: () => dispatch(logOut()),
})

export default connect(MapStateToProps, mapDispatchToProps)(App);
