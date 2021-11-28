import React from 'react'
import { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context; //importing addNote function from NoteState

    //Defining a state of a note which is empty. 
    const [incomingNote, setnote] = useState({title: "", description: "", tag: ""})

    const handleSubmit = (e)=>{
        e.preventDefault();
        addNote(incomingNote.title, incomingNote.description, incomingNote.tag)  //Using our add Note function. addNote function is defined in NoteState.js

        //Now when you click on submit the fields should be empty again, therefore
        setnote({title: "", description: "", tag: ""})

        //Time to show alert
        props.showAlertProp("Yay! The note has been added successfully", "success")
    }

    const onChange = (e)=>{
        setnote({...incomingNote, [e.target.name]: e.target.value}) //Syntax: Spread operator. It is basically telling that whatever note is, keep that and overwrite whatever written ahead. e.target.name would be title, description and tag and e.target.value would be the text in each. Therefore it will be updated
    }

    return (
        <div>
            <div className="container my-3">
                <h2>Add a note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange = {onChange} value={incomingNote.title} minLength= {5} required />
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange = {onChange} value={incomingNote.description} minLength= {5} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange = {onChange} value = {incomingNote.tag}/>
                    </div>
                    
                    <button disabled={incomingNote.title.length<5 || incomingNote.description.length<5} type="submit" className="btn btn-primary" onClick = {handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
