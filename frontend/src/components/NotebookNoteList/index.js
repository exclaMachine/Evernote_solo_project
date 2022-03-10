import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, NavLink} from 'react-router-dom'
import AddNote from "../AddNoteForm";
import UpdateNote from "../EditNoteForm";
// import './NoteList.css'

import { fetchNotes, addNote, deleteNote, removeNote } from "../../store/notes";

const NotebookNoteList = (id) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const notesObject = useSelector((state) => state.noteState.entries);

    // console.log('noteObj', notesObject)
    const notes = Object.values(notesObject)

    let usersNotes = notes.filter(note => note?.userId === sessionUser?.id)
    let notebookNotes = usersNotes.filter(note => note?.notebookId === id)


    console.log('notes', notes)

    useEffect(() => {
        dispatch(fetchNotes())
        // return () => {
        //     dispatch(fetchNotes())
        // }
    }, [dispatch])


    return (
        //I think this is giving me an error if I refresh...
        // (userNoteList)
        <div>
            {/* <button>Add Note</button> */}
            <AddNote />
            <h1>Note List</h1>
            <ul>
                {notebookNotes.map(({ id, title, content, updatedAt}) => (
        <div>
                    <li key={id}>
                    <UpdateNote id={id}/>
                        <h1>{title}</h1>
                        <br></br>
                        {content}
                    <button onClick={() => dispatch(removeNote(id)) }>Delete</button>
                    </li>
                    {/* <li>
                        {updatedAt}
                    </li> */}
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default NotebookNoteList;
