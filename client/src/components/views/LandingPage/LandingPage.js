import React, { useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';

function LandingPage(props) {
    useEffect(() => {
        axios.get('api/hello')
        .then(res => console.log(res.data))
    }, [])

    const onClickHandler = () => {
        axios.get('http://localhost:5000/api/users/logout')
            .then(res => {
                if(res.data.success) {
                    props.history.push('/login')
                } else {
                    alert('Error')
                }
            })
    }

    return (
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems:'center'
            , width: '100%', height: '100vh', flexDirection: 'column'
        }}>
            <h2>Home</h2>

            <button onClick={onClickHandler}>
                logout
            </button>
        </div>
    )
}

export default withRouter(LandingPage)
