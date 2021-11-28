import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""}) 
    let history = useHistory(); //use history is a hook from react-router-dom
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://notabilityoncloud.herokuapp.com/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        
        if (json.success){
            // Save the auth token in local storage and redirect
            localStorage.setItem('token', json.authToken); 
            props.showAlertProp("Yay! Account has been created successfully.", "success");
            history.push("/");
        }
        else{
            props.showAlertProp("Whoops! Something is wrong. Could you please check again?", "danger");
        }
    }

    //To take the whatever user is typing and change the empty credentials to whatever he has typed:
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className = "mt-4">
            <h2>Hola! Let's sign up, shall we?</h2>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={onChange} id="name" name = "name" aria-describedby="emailHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} id="email" name = "email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">Don't worry, we'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} id="password" name ="password" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChange} id="cpassword" name ="cpassword" minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary" style={{backgroundColor: "black"}} >Sign me up!</button>
            </form>
        </div>
    )
}

export default Signup
