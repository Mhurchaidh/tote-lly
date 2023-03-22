import { useContext, useState } from "react"
import { FilterContext } from "../context/filter"

export function SiteTab({site}) {

    const [_, setFilter] = useContext(FilterContext)

    return (
        <button onClick={() => setFilter(site.name)}>{site.name}</button>
    )
}