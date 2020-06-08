import React, { useState, SyntheticEvent, useEffect } from 'react';
import "../../style/login.scss";

import { User } from "../../dtos/user"
import UserHolder from "../../components/UserHolder/UserHolderContainer"


export interface ILoginProps {
    authUser: User;
    errorMessage: string;
    loginAction: (username: string, password: string) => void;
}

function LoginComponent(props: ILoginProps) {
    const [authUser, setAuthUser] = useState(props.authUser);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //@ts-ignore
    const [userDisplay, setUserdisplay] = useState(null as any)
    const [errorMessage, setErrorMessage] = useState(props.errorMessage);
    useEffect(() => {
        const displayUser = () => {
            let userDetail: any;
            if (authUser) {
                userDetail =
                    <div className="login-wrapper-user">
                        <UserHolder inGame={false} />
                    </div>;
                setUserdisplay(userDetail);
            }
        }
        displayUser();
    }, [authUser, errorMessage])
    let updateUsername = (e: any) => {
        setUsername(e.currentTarget.value);
    }

    let updatePassword = (e: any) => {
        setPassword(e.currentTarget.value);
    }

    let login = async () => {
        props.loginAction(username, password);
        setAuthUser(props.authUser);
        setErrorMessage(props.errorMessage);
    }


    return (
        <>
            <form className="login-wrapper">
                <div className="form-title unselect">USERNAME</div>
                <input className="form-input"
                    onChange={updateUsername}
                    value={username}
                    id="username" type="text"
                    placeholder="Enter Your Username" />

                <div className="form-title unselect">PASSWORD</div>
                <input className="form-input"
                    onChange={updatePassword}
                    value={password}
                    id="password" type="password"
                    placeholder="Enter Your Password" />

                <div className="button-container unselect" onClick={login}>
                    LOGIN
                    </div>
                {errorMessage ?
                    <div className="form-error">{errorMessage}</div>
                    : null
                }
            </form>
            {userDisplay}
        </>
    );

}

export default LoginComponent;