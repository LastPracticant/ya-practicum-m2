import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'client/routing';
import { useEffect } from 'react';
import { authSelector, profileSelector } from '../store/selectors';
import {
    thunkSignin, thunkLogout, thunkCurrentUserInfo, thunkCheckAuth,
} from '../store';
import { CurrentUserInfoProps } from '../api';

export const useAuth = () => {
    const profile = useSelector(profileSelector);
    const { isAuth } = useSelector(authSelector);

    useEffect(() => {
        const dispatch = useDispatch();
        dispatch(thunkCheckAuth());
    }, []);

    return {
        isAuth,
        profile,
    };
};

//     const { isAuth } = useSelector(authSelector);
//     const dispatch = useDispatch();

//     const login = () => dispatch(thunkSignin);
//     const logout = () => dispatch(thunkLogout);

//     // if (!isAuth || !profile) {
//     //     history.push(ROUTES.SIGNIN.path);

//     // }

//     // if (!profile) {
//     //     logout();
//     // }
//     return {
//         isAuth, login, logout, profile,
//     };
// };
