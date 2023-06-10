import { useContext, useEffect } from "react";
import { CategoryContext } from "../context/categories";
import { CategoryFilterContext } from "../context/categoryfilter";
import { motion } from 'framer-motion';

export default function CategoryFilter() {

    const [categories, setCategories] = useContext(CategoryContext);
    const [_, setFilteredCategory] = useContext(CategoryFilterContext);

    useEffect(() => {
        fetch('/api/categories')
        .then(resp => resp.json())
        .then(resp => setCategories(resp))
    }, [])

    const mappedCategories = categories?.map(category => <option key={category.id} value={category.name}>{category.name}</option>)

    return (
        <motion.select id='category-dropdown' 
                       onChange={(e) => setFilteredCategory(e.target.value)}
                       whileHover={{borderColor: ""}}
                       >
            <option value='all'>All Categories</option>
            {mappedCategories}
        </motion.select>
    )
}