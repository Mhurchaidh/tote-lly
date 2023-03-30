import { useContext, useState } from "react"
import { FilterContext } from "../context/filter"
import { SiteContext } from "../context/site"
import { Draggable } from "react-beautiful-dnd"
import { motion } from 'framer-motion'

export function SiteTab({site}) {

    const initialFormData = {
        name: site.name,
        site_address: site.site_address
    }

    const [filter, setFilter] = useContext(FilterContext)
    const [editTab, setEditTab] = useState(false)
    const [formData, setFormData] = useState(initialFormData)
    const [sites, setSites] = useContext(SiteContext)

    const {name, site_address} = formData

    const handleClick = () => {
        setFilter(site.name)
        if(filter === site.name) {
            setEditTab(true)
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((formData) => ({...formData, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }

        fetch(`/api/sites/${site.id}`, config)
        .then(resp => resp.json())
        .then(resp => setSites(sites.map(site => site.id === resp.id ? resp : site)))
        .then(setEditTab(false))
    }

    const handleDelete = () => {
        fetch(`/api/sites/${site.id}`, {method: "DELETE"})
        .then(setSites(sites.filter(s => s.id !== site.id)))
        .then(setFilter(null))
    }

    return (
            <div>
                {editTab ?  
                <form onSubmit={handleSubmit}>
                    <label>Site Name: </label>
                    <input
                        name='name'
                        value={name}
                        onChange={handleChange}
                    />
                    <label>Site Address: </label>
                    <input
                        name='site_address'
                        value={site_address}
                        onChange={handleChange}
                    />
                    <button>Save</button>
                    <button onClick={() => setEditTab(false)}>Cancel</button>
                    <button onClick={handleDelete}>Delete</button>
                </form>
                : 
                <motion.button onClick={handleClick} whileTap={{scale: 0.9}} whileFocus={{backgroundColor: '#612C55', color: '#ecc5a0'}}>
                    {site.name}
                </motion.button>}
            </div>
    )
}