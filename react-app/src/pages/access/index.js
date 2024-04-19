import React from 'react'
import { AccessCard } from '../../components/index'
import { Logo2 } from '../../assets/imgs'
import * as Styles from './style'
import { NavLink } from 'react-router-dom';

export function Access() {
    return(
        <Styles.PageContent>
            <Styles.Left>
                <Styles.BgImage/>
            </Styles.Left>      
            <Styles.Right>
            {/* <NavLink to="/"> */}
                <Styles.ImgLogoInline src={Logo2}/>
            {/* </NavLink> */}
                <Styles.Center>
                    <AccessCard/>
                </Styles.Center>
            </Styles.Right>
        </Styles.PageContent>
    )
}