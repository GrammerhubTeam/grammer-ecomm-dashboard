import * as React from 'react'
import { useHistory } from "react-router-dom"

// localStorage['usersTable'] = [{username: "grammerKid", password: "abc123"}]

const SignUp = () => {
    const [usersTable, setUsersTable] = React.useState(
        // WE HAVE TO JSON.PARSE BC WE STRINGIFIED IT
        JSON.parse(localStorage.getItem('usersTable')) || []
    ) // <== database
    const [newUser, setNewUser] = React.useState({});
    const windowActive = typeof window !== 'undefined'
    const thisHistory = useHistory()
    
    const signIn = () => {
        if (windowActive) {
            const signedIn = window.localStorage.setItem('isSignedIn', true)
            console.log('SIGNING IN RESPONSE', signedIn)
        }
    }

    const submitHandler = ()=>{
        // validation (SKIPPING THIS FOR NOW)

        // if exists ✓
        const userExists = usersTable.find(user => user.username === newUser.username)
        if(userExists){
            alert('YOU HAVE ALREADY SIGNED UP NUMNUTS')
            console.warn('%cYOU HAVE ALREADY SIGNED UP NUMNUTS', 'color: red, background-color: black')
        } else {
            const newData = JSON.stringify([
                ...usersTable,
                newUser
            ])
            console.log('NEW DATA', newData)
            localStorage.setItem('usersTable', newData)

            signIn()
            thisHistory.push('/login')
        }
        // add to table ✓

        // redirect to login page ✓
        
        
    }

    const updateUsername = (e) => {
        console.log('THE INSERTED USERNAME IS', e.target.value)
        setNewUser({ ...newUser, username: e.target.value })
    }

    const updatePassword = (e) => {
        console.log('THE INSERTED PASSWORD IS ', e.target.value)
        setNewUser({ ...newUser, password: e.target.value })
        
    }
    return (
        <React.Fragment>
            <h1>Sign Up</h1>
            {/* <button onClick={signIn}>SIGN THIS PUPPY IN</button> */}
            <form>
                <label htmlFor="userName">userName</label>
                <input id="userName" placeholder="username" value={newUser.username} onChange={updateUsername} />
                <label htmlFor="password">password</label>
                <input id="password" placeholder="password" value={newUser.password} onChange={updatePassword} />
                <button id="submit" onClick={submitHandler}>Submit</button>
            </form>
            
        </React.Fragment>
    )
}

export default SignUp;
