import { useContext, useEffect } from "react"
import { FilterContext } from "../context/filter"
import { ListingContext } from "../context/listing"
import SoldItem from './SoldItem';
import { Droppable } from 'react-beautiful-dnd';
import { SoldItemContext } from "../context/solditems";
import { useNavigate } from "react-router-dom";


export default function SoldItems() {

    const [filter, setFilter] = useContext(FilterContext)
    const [soldItems, setSoldItems] = useContext(SoldItemContext)

    const navigate = useNavigate()

    useEffect(() => {
        fetch('/api/sold_items')
        .then(resp => resp.json())
        .then(resp => {setSoldItems(resp)})
        if(soldItems.length <= 0)
            navigate('/listings')
    }, [])

    const filterListings = () => {
        if(filter !== null) {
        return soldItems.filter(item => item.site_sold === filter)
    } else return soldItems
    }

    const mappedSoldItems = filterListings().map((item, index) => <SoldItem key={item.id} item={item} index={index}/>)

    return (
        <Droppable droppableId='drop-listings'>
                {provided => (
                    <div className="listings-display" {...provided.droppableProps} ref={provided.innerRef}>
                        {mappedSoldItems}
                        {provided.placeholder}
                    </div>
                )}
        </Droppable>
    )
}