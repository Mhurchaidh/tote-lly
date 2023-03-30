import { useContext, useEffect, useState } from "react";
import { FilterContext } from "../context/filter";
import { SiteContext } from "../context/site";
import { SiteTab } from "./SiteTab";
import styled from 'styled-components';
import Search from './Search';
import { Link } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";
import { Droppable } from "react-beautiful-dnd";
import { motion } from 'framer-motion';

const StyledTabBar = styled.div`
    display: grid;
    grid-template-columns: ${props => `repeat(${props.columns}, max-content)`};
    position: relative;
    max-width: min-content;
    gap: 2rem;
    margin: 0 auto;
    margin-bottom: 1rem;
    text-align: center;
`
export default function SiteTabBar() {

    const initialFormData = {
        name: '',
        site_address: ''
    }

    const [sites, setSites] = useContext(SiteContext)
    const [_, setFilter] = useContext(FilterContext)
    const [addingSite, setAddingSite] = useState(false)
    const [formData, setFormData] = useState(initialFormData)
    const [showStats, setShowStats] = useState(false)

    const {name, site_address} = formData;

    useEffect(() => {
        fetch('/api/sites')
        .then(resp => resp.json())
        .then(sites => setSites(sites))
    },[])

    const listedSites = sites?.map(site => {
        return <SiteTab key={site.id} site={site}/>
    })

    const handleAddSite = () => {
        setAddingSite(!addingSite)
    }

    const handleChange = (e) => {
        const {name, value} = e.target

        setFormData((formData) => ({...formData, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }

        fetch('/api/sites', config)
        .then(resp => resp.json())
        .then(resp => setSites([...sites, resp]))
        .then(setAddingSite(false))
    }

    return (
        <StyledTabBar columns={sites.length + 5}>
            {showStats ? <Link to='listings'><button id='hide-stat-button' onClick={() => setShowStats(false)}>Hide Stats</button></Link> : <Link to='stats'><button id='show-stat-button' onClick={() => setShowStats(true)}>Show Stats</button></Link>}
            {showStats ? null : <Search/>}
                <motion.button onClick={() => setFilter(null)} whileTap={{scale: 0.9}}>All</motion.button>
                {listedSites}
                {addingSite ? 
                <form onSubmit={handleSubmit}>
                    <label>Site Name: </label>
                    <input
                        name='name'
                        value={name}
                        placeholder='...'
                        onChange={handleChange}
                    />
                    <label>Site Address: </label>
                    <input
                        name='site_address'
                        value={site_address}
                        placeholder='...'
                        onChange={handleChange}
                    />
                    <button>Submit</button>
                    <button onClick={handleAddSite}>Cancel</button>
                </form>
                 : 
                 <button onClick={handleAddSite}>+</button>}
                 <CategoryFilter/>
        </StyledTabBar>
    )
}