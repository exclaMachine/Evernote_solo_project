import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch} from 'react-router-dom'
// import notebook from "../../../../backend/db/models/notebook";

import { fetchNotebooksThunk, removeNotebookThunk } from "../../store/notebooks";

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
            {/* <button>Add Notebook</button> */}
            <h1>Notebook List</h1>
            <ul>
                {usersNotebooks.map(({ id, title}) => (
                    <li key={id}>
                        {title}
                    <button onClick={() => dispatch(removeNotebookThunk(id))}>Delete Notebook</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NotebookList;
