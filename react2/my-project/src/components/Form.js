import {useState} from 'react'

function Form(){

    function RegisterUser(e){
        e.preventDefault()
        console.log(`The user ${name} was registered with the password: ${password}`)
    }

    const  [name, setName] = useState()
    const  [password, setPassword] = useState()
    return(
        <div>
            <h1>My Register</h1>
            <form onSubmit={RegisterUser}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" placeholder="Type your name"  onChange = {(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Type your password" onChange = {(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <input type="submit" value="Register"/>
                </div>
            </form>
        </div>
    )
}

export default Form