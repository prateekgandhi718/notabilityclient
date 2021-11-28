import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import { useHistory } from 'react-router';

//Here we shall impliment our CRUD operations using the functions defined in NoteState.js to update the backend and write the client side logic to update the front end.

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context; //importing notes and getNotes from NoteState. addNote is seperate in AddNote component, which we will import later on.
    const history = useHistory();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        }
        else{
            history.push("/login")
        }
        // eslint-disable-next-line
    }, []) //useEffect is similar to componentDidMound. (Runs once)

    const ref = useRef(null)
    const refClose = useRef(null)


    //Time to edit the note.
    const [incomingNote, setnote] = useState({id: "", editedtitle: "", editeddescription: "", editedtag: ""})

    const updateNote = (element) => { //this element is a particular note and will come from when you'll click the edit icon
        ref.current.click() //What is this? Well, we have used ref={ref} in the Launch Demo Modal button. We want to display that modal when we click on update note button therefore we do ref.current.click() here and hide that original button using bootstrap class called d-none. Therefore, we are basically clicking that button but with the help of a function and using ref. This is called clicking Programitacally. 
        setnote({id: element._id, editedtitle: element.title, editeddescription: element.description, editedtag: element.tag}) //to show the current title, description and tag in the modal as well
    }

    //copy pasting from AddNote component

    const handleSubmit = (e)=>{
        console.log("Updating the note from current state to the updated state: ", incomingNote)

        editNote(incomingNote.id, incomingNote.editedtitle, incomingNote.editeddescription, incomingNote.editedtag)

        refClose.current.click(); //refclose is put in close button therefore when you will click on update button this function will run and then refClose.current.click() will run hence closing the modal.

        //Time to show an alert that the note has been updated
        props.showAlertProp("Abracadabra! The note has been updated.", "success")
    }

    const onChange = (e)=>{
        setnote({...incomingNote, [e.target.name]: e.target.value}) //Syntax: Spread operator. It is basically telling that whatever note is, keep that and overwrite whatever written ahead. e.target.name would be title, description and tag and e.target.value would be the text in each. Therefore it will be updated
    }
    return (
        <>
            <AddNote showAlertProp = {props.showAlertProp} />


            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Here the form will come again  */}
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="editedtitle" name="editedtitle" value = {incomingNote.editedtitle} aria-describedby="emailHelp" onChange={onChange} minLength= {5} required />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">description</label>
                                    <input type="text" className="form-control" id="editeddescription" name="editeddescription" value = {incomingNote.editeddescription} onChange={onChange} minLength= {5} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">tag</label>
                                    <input type="text" className="form-control" id="editedtag" name="editedtag" value = {incomingNote.editedtag} onChange={onChange} />
                                </div>

                                {/* <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref = {refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={incomingNote.editedtitle.length<5 || incomingNote.editeddescription.length<5} type="button" className="btn btn-primary" onClick={handleSubmit}>Update the note, just like that!</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="row my-3">
                    <h2>Your notes.</h2>
                    <div className="container">
                        {notes.length===0 && 'You have not written any notes. Fancy picking up the pen?'}
                    </div>
                    {notes.map((element) => {
                        return <Noteitem key={element._id} updateNoteProp={updateNote} noteprop={element} showAlertProp = {props.showAlertProp} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes




/* NOTES

We use key when using map, and our api is returning _id for every note and it's unique therefore we have used that.

Note that useRef hook is mostly used to target DOM items and clicking them Programitacally.

*/