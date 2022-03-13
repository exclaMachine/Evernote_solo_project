import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, NavLink} from 'react-router-dom'
import AddNote from "../AddNoteForm";
import UpdateNote from "../EditNoteForm";
// import './NoteList.css'
import AboutFooter from "../Navigation/About";

import { fetchNotes, addNote, deleteNote, removeNote } from "../../store/notes";

const NotebookNoteList = ({id, title}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const notesObject = useSelector((state) => state.noteState.entries);
    // console.log('IIIIID', id);
    // console.log('noteObj', notesObject)
    const notes = Object.values(notesObject)

    let usersNotes = notes.filter(note => note?.userId === sessionUser?.id)
    // console.log('right page', usersNotes)
    let notebookNotes = usersNotes.filter(note => note?.notebookId === id)
    // console.log('notebookNotes', notebookNotes)

    let SetDate = (sDate) => {
        let adjusted = sDate.replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2}).([0-9]{2}):([0-9]{2}):([0-9]{3}).$/, "$1/$2/$3 $4:$5:$6");
        return new Date(adjusted)
    }

    // console.log('notes', notes)

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
            <AddNote id={id}/>
            <h1>Notes in "{title}" notebook</h1>
            <ul>
                {notebookNotes.map(({ id, title, content, updatedAt}) => (
        <div>
                    <li key={id}>
                    <UpdateNote id={id}/>
                        {/* <h1>{title}</h1> */}
                        <br></br>
                        {/* {content} */}
                    {updatedAt}
                    <button onClick={() => dispatch(removeNote(id)) }>Delete Note</button>
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
