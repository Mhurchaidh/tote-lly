import { useContext } from "react";
import { FilterContext } from "../context/filter";
import { SiteContext } from "../context/site";
import { SiteTab } from "./SiteTab";

export function SiteTabBar() {

    const [sites, setSites] = useContext(SiteContext)
    const [_, setFilter] = useContext(FilterContext)

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