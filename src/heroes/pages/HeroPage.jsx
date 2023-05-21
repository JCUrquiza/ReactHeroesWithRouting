import { Navigate, useParams } from "react-router-dom"
import { getHeroById } from "../helpers";

export const HeroPage = () => {

    const { id } = useParams();

    const hero = getHeroById(id);
    
    if ( !hero ) {
        return <Navigate to="/marvel" />
    }

    return (
        <>
            <h1>HeroPage</h1>
        </>
    )

}
