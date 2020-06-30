import * as React from 'react'

const SignUp = () => {
    const windowActive = typeof window !== 'undefined'
    
    const signIn = () => {
        if (windowActive) {
            const signedIn = window.localStorage.setItem('isSignedIn', true)
            console.log('SIGNING IN RESPONSE', signedIn)
        }
    }
    return (
        <React.Fragment>
            <h1>Sign Up</h1>
            <button onClick={signIn}>SIGN THIS PUPPY IN</button>
        </React.Fragment>
    )
}

export default SignUp;