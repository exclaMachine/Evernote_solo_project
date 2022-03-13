import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, Switch} from 'react-router-dom'
import NotebookNoteList from "../NotebookNoteList";
// import notebook from "../../../../backend/db/models/notebook";
import './NotebookList.css'
import { fetchNotebooksThunk, removeNotebookThunk } from "../../store/notebooks";
import AboutFooter from "../Navigation/About";

const NotebookList = () => {
    const dispatch = useDispatch();

    const notebooksObject = useSelector((state) => state.notebookState.entries);
    // const notebooksObject = useSelector((state) => state.notebookState);
    const sessionUser = useSelector(state => state.session.user);

    console.log('noteObj', notebooksObject)
    const notebooks = Object.values(notebooksObject)

    let usersNotebooks = notebooks.filter(note => note?.userId === sessionUser?.id)



    useEffect(() => {
        dispatch(fetchNotebooksThunk())
    }, [dispatch])

    return (
        <div>
        <div>
            {/* <button>Add Notebook</button> */}
            <h1>List of Notebooks</h1>
            <ul>
                {usersNotebooks.map(({ id, title}) => (
                    <li className='background' key={id}>

                     <h2 className="notebook-title">Notebook: {title}</h2>
                    <button onClick={() => dispatch(removeNotebookThunk(id))}>Delete Notebook</button>
                     <NotebookNoteList id={id} title={title}/>
                    </li>
                ))}
            </ul>
        </div>
        <footer>
        <AboutFooter/>
        </footer>
        </div>
    )
}

export default NotebookList;
