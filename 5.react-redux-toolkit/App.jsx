import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createSelector} from '@reduxjs/toolkit'; // reselect

import { logIn } from './actions/user';
const userSlice = require('./reducers/userSlice');


const App = () => {
    // (state) => state.user.data
    // state가 initialState라고 생각하면 되고, 꺼내오고 싶은 걸 꺼내오면 됨.
    const user = useSelector((state) => state.user);

    // const { email, password } = useSelector((state) => state.user);
    // const [email, setEmail] = useState();
    // const [password, setPassword] = useState();
    const email = useSelector((state) => state.user.email);
    const password = useSelector((state) => state.user.password);

    const {list} = useSelector((state) => state.post);
    const dispatch = useDispatch();

    // const [isLoading, setLoading] = useState(false);
    // 로그인 로딩과 로그아웃 로딩을 다 합친다면,
    const [loadings, setLoadings] = useState({});
    const [errors, setErrors] = useState({});
    const [dones, setDones] = useState({});
    const [loadingIds, setLoadingIds] = useState([]);

    // 비동기
    const onClick = useCallback(async() => {
        // setLoading(true);
        // setDone(false);
        // setError(false);

        const id = new Date().valueOf();

        // 리덕스형
        setLoading((prev) => ({
            ...prev,
            [id]: { type: 'LOGIN_LOADING' }
        }))

        // 컴포넌트 형
        setLoadingIds((prev) => prev.concat(id));

        try {
            const response = await axios.post('/login');
            setDones((prev) => ({
                ...prev,
                [id]: {type: 'LOGIN_LOADING'}
            }));
        } catch (err) {
            setError(err);
        } finally {
            setLoadings((prev) => {
                const newObj = JSOM.parse(JSON.stringify(prev));
                delete newObj[id];
                return newObj;
            })
        }
    }, []);

    // 동기
    const onLogOut = useCallback(() => {
        dispatch(userSlice.actions.logOut());
    }, []);


    // input칸에서 글자 하나하나 칠 때마다 dispatch는 하지 말 것.
    const onChangeEmail = useCallback((e) => {
        setEmail(e.target.value)
    }, []);

    const onChangePassword = useCallback(() => {
        setPassword(e.target.value)
    }, []);
    
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch(userSlice.actions.setLoginForm({
            email,
            password,
        }))
    }, [dispatch, email, passowrd]);

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
            <form onSubmit={onSubmit}>
                <input type="email" value={email} onChange={onChangeEmail} />
                <input type="password" value={password} onChange={onChangePassword} />
    
            </form>
        </div>
    );
};

export default App;
