import PreOwned from "@/pageComponents/PreOwned";
import { Searcher } from "@/components";

export const metadata = {
    title: 'RE Autos | Seminuevos',
    description: 'Autos usados, o seminuevos a los mejores precios',
}

export default function Page() {
    return (
        <div id="main-preowned">
            <div className="searcher-container">
                <Searcher />
            </div>

            <PreOwned />
        </div>
    )
}
