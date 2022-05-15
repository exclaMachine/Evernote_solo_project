import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, NavLink} from 'react-router-dom'
import AddNote from "../AddNoteForm";
import UpdateNote from "../EditNoteForm";
import './NoteList.css'
import AboutFooter from "../Navigation/About";
import { DateTime } from "luxon"
import SearchBar from "../Searchbar";

import { fetchNotes, addNote, deleteNote, removeNote } from "../../store/notes";

const NoteList = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const notesObject = useSelector((state) => state.noteState.entries);

    // console.log('noteObj', notesObject)
    const notes = Object.values(notesObject)


    let usersNotes = notes.filter(note => note?.userId === sessionUser?.id)
    const notesSorted = usersNotes.reverse();
    console.log('usersNotes', usersNotes);

    // let formatter = new Intl.DateTimeFormat("en-US", {
    //     year: 'numeric',
    //     month: "long",
    //     day: '2-digit',
    // })

    let SetDate = (sDate) => {
        let adjusted = sDate.replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2}).([0-9]{2}):([0-9]{2}):([0-9]{3}).$/, "$1/$2/$3 $4:$5:$6");
        return new Date(adjusted)
    }
    // let reverseOrder = arr => {
    //     for (let i = arr.length; i >= 0; i--) {

    //     }
    // }

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
        <div className='background'>
            {/* <button>Add Note</button> */}
            <AddNote />
            <SearchBar placeholder = {'Find a Note'} data={usersNotes}/>
            <h1>Note List</h1>
            <ul>

                {notesSorted.map(({ id, title, content, updatedAt}) => (
        <div>
                    <li key={id}>
                        {/* <h1>{title}</h1> */}
                        {/* <br></br> */}
                        {/* {content} */}
                    <UpdateNote id={id}/>
                    <h3>Updated on {SetDate(updatedAt).toString()}</h3>
                    <button onClick={() => dispatch(removeNote(id)) }>Delete Note</button>
                    </li>
                    {/* <li>
                        {updatedAt}
                    </li> */}
                    </div>

                ))}
            </ul>
            <footer>
            <AboutFooter/>
            </footer>
        </div>
    )
}

export default NoteList;
