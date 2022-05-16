import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const SearchBar = ({placeholder, data}) => {

    console.log('data', data)
    const [searchInput, setSearchInput] = useState('')


    //can use title to search for since both notes and notebooks have titles so
    // this will work for both

    let foundNotes = data?.filter((note) => {

        return (note.title.toLowerCase()).includes(searchInput.toLowerCase())
    })

    console.log('found', foundNotes)

    const handleSearch = (e) => {
        e.preventDefault();


    }


    return (
        <>
        {/* <form onSubmit={handleSearch}> */}
            <input
            type='search'
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={placeholder}/>

            {foundNotes && searchInput.length > 0 && (
                <div className="data-result">
                {foundNotes.map((value, key) => {
                    return (<a className='data-item' key={key} href={`#${value?.id}`}>
                        {value?.title}
                    </a>)
                })}
                </div>
            )}
            {/* <button type='submit'>Search</button> */}
        {/* </form> */}
        </>
    )
}

export default SearchBar;
