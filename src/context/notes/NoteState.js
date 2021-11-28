
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "https://notabilityoncloud.herokuapp.com"
    const notesInitial = []
    const [notes, setnotes] = useState(notesInitial)

    //Get all notes
    const getNotes = async () => {
        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') //Since we have stored the authToken by the name of token in local storage.
            },
        });
        const json = await response.json()
        console.log(json)
        setnotes(json) //using the hook
    }



    //Add a note
    const addNote = async (title, description, tag) => {

        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') //Since we have stored the authToken by the name of token in local storage.
            },
            body: JSON.stringify({ title, description, tag })
        });

        //Logic to add on client side 
        const noteFromAPI = await response.json();
        setnotes(notes.concat(noteFromAPI))
    }

    //Delete a note
    const deleteNote = async (id) => { //giving the note ID from Noteitem.

        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') //Since we have stored the authToken by the name of token in local storage.
            }
        });
        const json = response.json();
        console.log(json)

        //Logic for client side
        // console.log("Deleting the note with ID = " + id);

        const newNotes = notes.filter((noteWithTrashID) => { return noteWithTrashID._id !== id }) //it will delete that note on which trash icon is clicked.You could have written any argument instead of noteWithTrash cause it will just filter taking that argument.
        setnotes(newNotes)
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {

        //API CALL (use fetch API using headers. Search on google)
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') //Since we have stored the authToken by the name of token in local storage.
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();


        //Logic to edit the note on client side
        //Since we can't the state therefore make a new variable to store newNotes
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) { //because mongodb mein notes ki id wala columns is _id
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setnotes(newNotes);
    }


    //Get user details


    const [user, setuser] = useState([])
    const getUser = async () => {
        //API call
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') //Since we have stored the authToken by the name of token in local storage.
            },
        });
        const jsonData = await response.json()
        setuser(jsonData) //using the hook
        // console.log(user)

    }


    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, user, getUser }}>
            {props.children}
        </noteContext.Provider>
    )



}

export default NoteState;

/* NOTES
1. By doing this you can access this state in any component. Just wrap the app.js code in noteState tag.
2. You could also pass a function that would be accessible in any component (as discussed in the video.)

3. <noteContext.Provider value={{notes, setnotes}}> ------> We are exporting notes and setnotes hook by which we can change the notes.
*/