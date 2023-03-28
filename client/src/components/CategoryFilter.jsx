import { useContext, useEffect } from "react"
import { CategoryContext } from "../context/categories";
import { CategoryFilterContext } from "../context/categoryfilter";

export default function CategoryFilter() {

    const [categories, setCategories] = useContext(CategoryContext);
    const [filterCategory, setFilteredCategory] = useContext(CategoryFilterContext);

    useEffect(() => {
        fetch('/api/categories')
        .then(resp => resp.json())
        .then(resp => setCategories(resp))
    }, [])

    const mappedCategories = categories?.map(category => <option key={category.id} value={category.name}>{category.name}</option>)

    return (
        <select id='category-dropdown' onChange={(e) => setFilteredCategory(e.target.value)}>
            <option value='all'>All Categories</option>
            {mappedCategories}
        </select>
    )
}