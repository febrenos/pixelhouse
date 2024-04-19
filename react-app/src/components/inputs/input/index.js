import React, { useState } from 'react'
import * as Styles from './style'
// import {Card, ButtonCard} from './style'

export function Input({type, name, placeholder}) {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const handlesetIsShowPassword= () => {
        setIsShowPassword(!isShowPassword)
      };
    const inputType = isShowPassword ? 'text' : 'password';
    
    return(
        <Styles.Content>
            {name === "user" && <Styles.UserIcon />}
            {name === "email" && <Styles.EmailIcon />}
            {(name === "password" && !isShowPassword || isShowPassword)?
                <>
                    {(name === "password" && !isShowPassword) && <Styles.LockIcon onClick={handlesetIsShowPassword}/>}
                    {(name === "password" && isShowPassword) && <Styles.LockOpenIcon onClick={handlesetIsShowPassword}/>}
                    <Styles.Input type={inputType} name={name} placeholder={placeholder}/>
                </>
                :
                <Styles.Input type={type} name={name} placeholder={placeholder}/>
            }
        </Styles.Content>
    )
}