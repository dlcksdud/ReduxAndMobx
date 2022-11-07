import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logIn } from './actions/user';
const userSlice = require('./reducers/userSlice');


const App = () => {
    // (state) => state.user.data
    // state가 initialState라고 생각하면 되고, 꺼내오고 싶은 걸 꺼내오면 됨.
    const user = useSelector((state) => state.user);
    const { email, password } = useSelector((state) => state.user);
    const {list} = useSelector((state) => state.post);
    const dispatch = useDispatch();

    // 비동기
    const onClick = useCallback(() => {
        dispatch(logIn({
            id: 'zerolee',
            password: '비밀번호'
        }));
    }, []);

    // 동기
    const onLogOut = useCallback(() => {
        dispatch(userSlice.actions.logOut());
    }, []);

    const onChangeEmail = useCallback((e) => {
        dispatch(userSlice.actions.setEmail(e.target.value))
    }, []);

    const onChangePassword = useCallback(() => {
        dispatch(userSlice.actions.setPassword(e.target.value))
    }, []);

    return (
        <div>
            {user.isLoggingIn 
                ? <div>로그인 중</div> 
                : user.data
                    ? <div>{user.data.nickName}</div> 
                    : '로그인 해주삼'}
            {!user.data ? 
                <button onClick={onClick}>로그인</button>
                : 
                <button onClick={onLogOut}>로그아웃</button>
            }
            <form action=''>
                <input type="email" value={email} onChange={onChangeEmail} />
                <input type="password" value={password} onChange={onChangePassword} />
            </form>
        </div>
    );
};

export default App;
