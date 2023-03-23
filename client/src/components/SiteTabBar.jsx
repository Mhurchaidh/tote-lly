import { useContext, useEffect, useState } from "react";
import { FilterContext } from "../context/filter";
import { SiteContext } from "../context/site";
import { SiteTab } from "./SiteTab";
import styled from 'styled-components';

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
        <StyledTabBar columns={sites.length + 2}>
                <button onClick={() => setFilter(null)}>All</button>
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
        </StyledTabBar>
    )
}