import { useContext } from "react"
import { SearchContext } from "../context/search"

export default function Search() {

    const [searchValue, setSearchValue] = useContext(SearchContext)

    return (
        <input id='search-bar' 
               placeholder="- Search by Item Name or Order # -"
               value={searchValue}
               type='text'
               onChange={(e) => setSearchValue(e.target.value)}
               />
    )
}