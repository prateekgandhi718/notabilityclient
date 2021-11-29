import React from 'react'
import Notes from './Notes';
import { useContext } from "react";
import noteContext from '../context/notes/noteContext';
import { useHistory } from "react-router";
import { useEffect } from 'react';
import { useState } from 'react';

const Home = (props) => {
    const context = useContext(noteContext);
    const { user, getUser } = context;
    const history = useHistory();

    const [time, settime] = useState("");
    const myDate = new Date();

    const getTheTime = (myDate) =>{
        if (myDate.getHours() < 12) {
            settime('morning');
        }
        else if (myDate.getHours() >= 12 & myDate.getHours() <= 17){
            settime('afternoon');
        }
        else{
            settime('evening');
        }
    }
    
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUser();
            getTheTime(myDate);
            
        }
        else{
            history.push('/login')
        }
        // eslint-disable-next-line
    }, [])



    return (
        <div>
            <h1 className ="mx-2 my-1">Good {time}, {user.name}.</h1>
            <h5 className = "mx-2 my-2">It's {myDate.toLocaleString('default', {weekday: 'long'})}, {myDate.toLocaleString('default', {month: 'long'})} {myDate.getDate()} </h5>
            <Notes showAlertProp = {props.showAlertProp} />

        </div>
    )
}

export default Home

/* Note that you're bringing this showAlertProp from App.js. Therefore from app.js to home.js and then again sending it to Notes.js. So, this is prop drilling and to save ourselves from this prop drilling we make use of ContextAPI. We could have used context API only but since we are only drilling it into 2 components it's okay.

*/