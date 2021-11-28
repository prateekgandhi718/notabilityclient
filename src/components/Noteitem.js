import React from 'react'
import { useContext} from 'react'
import noteContext from '../context/notes/noteContext'


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;

    return (
    <div className="col-md-3">
        <div className="card my-3">
            <div className="card-body">
                <h5 className="card-title">{props.noteprop.title}</h5>
                <p className="card-text">{props.noteprop.description}</p>
                <i className="fas fa-trash mx-2" onClick = { ()=>{deleteNote(props.noteprop._id); props.showAlertProp("Whoosh! It's gone.", "warning")}}></i>
                <i className="far fa-edit mx-2" onClick ={()=>{ props.updateNoteProp(props.noteprop) }} ></i>
            </div>
        </div>
    </div>
    )
}

export default Noteitem


/* NOTES
{props.noteprop.title} because noteprop is passing an element which has title, description.... of a note therefore another . to access that


Importing the deleteNote fucntion using context because we would want to delete a node when we click on the trash icon.

props.updateNoteProp is basically the updateNote function which is taking the whole note therefore passing the whole element which is props.noteprop. 
*/
