import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'


const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let history = useHistory(); //use history is a hook from react-router-dom

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        //If the Email and password matches i.e., if success = true. Success is coming from backend.
        if (json.success){
            // Save the auth token in local storage and redirect
            localStorage.setItem('token', json.authToken); 
            props.showAlertProp("Yay! You have been logged in successfully.", "success");
            history.push("/");
        }
        else{
            
            props.showAlertProp("Whoops! Invalid Credentials :(", "danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className = "mt-4">
            <h2>Welcome back. Please login to use Notability.</h2>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We will not share your email with anyone.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login

/* NOTES

We have used onSubmit(done on a form) here rather than onClick (done on button). You can use either.

The good thing about onSubmit (done on a form) is when you write minlength and required in the divs in the form, they will work and provide an in-browser validation.

*/