import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch} from 'react-router-dom'
import notebook from "../../../../backend/db/models/notebook";

import articleReducer, { fetchNotebooks } from "../../store/notebooks";

const NotebookList = () => {
    const dispatch = useDipatch();

    const notebooksObject = useSelector((state) => state.notebookState.entries);
    const notebooks = Object.values(notebooksObject)

    useEffect(() => {
        dispatch(fetchNotebooks())
    }, [dispatch])

    return (
        <div>
            <h1>Notebook List</h1>
            <ul>
                {notebooks.map(notebook => (
                    {notebook}
                ))}
            </ul>
        </div>
    )
}
