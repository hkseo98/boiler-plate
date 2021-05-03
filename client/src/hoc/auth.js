import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'

export default function(SpecificComponent, option, adminRoute=null) {

    // option 3가지
    // null => 아무나 출입 가능
    // true => 로그인한 유저만 출입 가능
    // false => 로그읺란 유저는 출입 불가능

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        useEffect(() => {
            
            dispatch(auth()).then(response => {
                console.log(response)

                if(!response.payload.isAuth) {
                    if(option) {
                        props.history.push('/login')
                    }
                } else {
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        if(option === false) {
                            props.history.push('/')
                        }
                    }
                }
            })
            
        }, [])
        return <SpecificComponent/>
    }

    return AuthenticationCheck
}
    