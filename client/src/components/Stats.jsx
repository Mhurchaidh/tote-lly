import { useContext, useEffect } from "react"
import { StatsContext } from "../context/stats";

export default function Stats() {

    const [stats, setStats] = useContext(StatsContext);

    return (
        <div className="stats">
            <h1 className="stat-title">Gross Revenue: </h1>
            <h1 className="stat-info">{'$' + stats.gross_income.toFixed(2)}</h1>
            <h1 className="stat-title">Cost of Goods: </h1>
            <h1 className="stat-info">{'$' + stats.cost_of_goods.toFixed(2)}</h1>
            <h1 className="stat-title">Tote-l Shipping: </h1>
            <h1 className="stat-info">{'$' + stats.total_shipping.toFixed(2)}</h1>
        </div>
    )
}