import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, NavLink} from 'react-router-dom'
import './Splashpage.css'
import AboutFooter from "../Navigation/About";

import { fetchNotes, addNote, deleteNote, removeNote } from "../../store/notes";

const Splashpage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const notesObject = useSelector((state) => state.noteState.entries);

    // console.log('noteObj', notesObject)
    const notes = Object.values(notesObject)

    let usersNotes = notes.filter(note => note?.userId === sessionUser?.id)


    useEffect(() => {
        dispatch(fetchNotes())

    }, [dispatch])



    return (
        <div>
            <h1>Home</h1>
            <div className="punctuators">
                <h2>Need help with the grammar and punctuation of your notes?</h2>
                <a href="https://www.webtoons.com/en/challenge/the-punctuators-super-powered-punctuation/list?title_no=318764">Check out <strong>The Punctuators: Super-Powered Punctuation</strong></a>
                <img src="./Web_1.jpg"></img>
            </div>

            <div className="scratch">
                <h2>Scratch Pad</h2>
                <textarea placeholder="start writing...">

                </textarea>
            </div>

            <ul>
                {usersNotes.map(({ id, title, content, updatedAt}) => (
                <div>
                    <li key={id}>
                        <h1>{title}</h1>
                        <br></br>
                        {content}
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

export default Splashpage;
