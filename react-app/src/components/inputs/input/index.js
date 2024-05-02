import React, { useState } from 'react';
import * as Styles from './style';

export function Input({type, name, placeholder, value}) {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handlesetIsShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    const inputType = isShowPassword ? 'text' : 'password';

    return(
        <Styles.Content>
            {type === "user" && <Styles.UserIcon />}
            {type === "email" && <Styles.EmailIcon />}
            {(type === "password" && !isShowPassword || isShowPassword)?
                <>
                    {(type === "password" && !isShowPassword) && <Styles.LockIcon onClick={handlesetIsShowPassword}/>}
                    {(type === "password" && isShowPassword) && <Styles.LockOpenIcon onClick={handlesetIsShowPassword}/>}
                    <Styles.Input type={inputType} name={name} placeholder={placeholder} value={value} />
                </>
                :
                <Styles.Input type={type} name={name} placeholder={placeholder} value={value} />
            }
        </Styles.Content>
    )
}
