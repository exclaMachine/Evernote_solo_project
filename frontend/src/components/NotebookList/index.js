import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch} from 'react-router-dom'
// import notebook from "../../../../backend/db/models/notebook";

import { fetchNotebooks } from "../../store/notebooks";

const NotebookList = () => {
    const dispatch = useDispatch();

    // const notebooksObject = useSelector((state) => state.notebookState.entries);
    const notebooksObject = useSelector((state) => state.notebookState);

    console.log('noteObj', notebooksObject)
    const notebooks = Object.values(notebooksObject)

    useEffect(() => {
        dispatch(fetchNotebooks())
    }, [dispatch])

    return (
        <div>
            <h1>Notebook List</h1>
            <ul>
                {notebooks.map(({ id, title}) => (
                    <li key={id}>
                        {title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NotebookList;
