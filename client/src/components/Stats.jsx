import { useContext, useEffect } from "react"
import { Link } from "react-router-dom";
import { ListingContext } from "../context/listing"
import { SoldItemContext } from "../context/solditems";
import { StatsContext } from "../context/stats";

export default function Stats() {

    const [listings, setListings] = useContext(ListingContext);
    const [soldItems, setSoldItems] = useContext(SoldItemContext);
    const [stats, setStats] = useContext(StatsContext);

    return (
        <div className="stats">
            <h1>Revenue: {'$' + stats.gross_income.toFixed(2)}</h1>
            <h1>Cost of Goods: {'$' + stats.cost_of_goods.toFixed(2)}</h1>
            <h1>Total Shipping: {'$' + stats.total_shipping.toFixed(2)}</h1>
        </div>
    )
}