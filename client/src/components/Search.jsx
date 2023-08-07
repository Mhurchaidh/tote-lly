import { useContext } from "react"
import { SearchContext } from "../context/search"
import { motion } from 'framer-motion'

export default function Search() {

    const [searchValue, setSearchValue] = useContext(SearchContext)

    return (
        <input id='search-bar' 
               placeholder="- Search by Item Name or Order # -"
               value={searchValue}
               type='text'
               onChange={(e) => setSearchValue(e.target.value)}
            //    whileHover={{width: '21rem'}}
            //    whileFocus={{width: '21rem'}}
               />
    )
}