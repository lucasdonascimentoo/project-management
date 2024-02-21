import {useState} from 'react'
 
function Conditonal(){

    const [email, setEmail] = useState()
    const [userEmail, setUserEmail] = useState()

    function sendEmail(e){
        e.preventDefault()
        setUserEmail(email)
    }

    function clearEmail(e){
        setUserEmail('')
    }

    return(
        <div>
            <h2>Register your email</h2>
            <form>
                <input type="email" placeholder="Type your email" onChange={(e)=> setEmail(e.target.value)}/>
                <button type="submit" onClick={sendEmail}>Send email</button>
            </form>
            {userEmail &&(
                <div>
                    <p>The user email is: {userEmail}</p>
                    <button onClick={clearEmail}>Clear email</button>
                </div>
            )
            }
        </div>
    )
}

export default Conditonal