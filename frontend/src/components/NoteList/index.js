import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, NavLink} from 'react-router-dom'

import { fetchNotes, addNote, deleteNote, removeNote } from "../../store/notes";

const NoteList = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const notesObject = useSelector((state) => state.noteState.entries);

    // console.log('noteObj', notesObject)
    const notes = Object.values(notesObject)

    let usersNotes = notes.filter(note => note?.userId === sessionUser?.id)

    console.log('notes', notes)

    useEffect(() => {
        dispatch(fetchNotes())
        // return () => {
        //     dispatch(fetchNotes())
        // }
    }, [dispatch])

    let userNoteList;
    // if (sessionUser) {
    //     userNoteList = (
    //         <div>
    //         {/* <button>Add Note</button> */}
    //         <h1>Note List</h1>
    //         <ul>
    //             {usersNotes.map(({ id, title, updatedAt}) => (
    //                 <div>
    //                 <li key={id}>
    //                     {title}
    //                 </li>
    //                 <li>
    //                     {updatedAt}
    //                 </li>
    //                 </div>
    //             ))}
    //         </ul>
    //     </div>
    //     )
    // }


    return (
        //I think this is giving me an error if I refresh...
        // (userNoteList)
        <div>
            {/* <button>Add Note</button> */}
            <h1>Note List</h1>
            <ul>
                {usersNotes.map(({ id, title, updatedAt}) => (
        <div>
                    <li key={id}>
                    <button onClick={() => removeNote({id}) }>Delete</button>
                        {title}
                    </li>
                    <li>
                        {updatedAt}
                    </li>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default NoteList;
