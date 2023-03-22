import { useContext, useEffect } from "react";
import { FilterContext } from "../context/filter";
import { SiteContext } from "../context/site";
import { SiteTab } from "./SiteTab";

export default function SiteTabBar() {

    const [sites, setSites] = useContext(SiteContext)
    const [_, setFilter] = useContext(FilterContext)

    useEffect(() => {
        fetch('/api/sites')
        .then(resp => resp.json())
        .then(sites => setSites(sites))
    },[])

    const listedSites = sites?.map(site => {
        return <SiteTab key={site.id} site={site}/>
    })

    return (
        <div id='site-tab-bar'>
            <button onClick={() => setFilter(null)}>All</button>
            {listedSites}
        </div>
    )
}