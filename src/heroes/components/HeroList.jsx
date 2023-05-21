import { useMemo } from 'react';
import { HeroCard } from './';
import { getHeroesByPublisher } from '../helpers';

export const HeroList = ({ publisher }) => {

    // Hook de useMemo, cuando el 'publisher' cambié, se dispara el método
    // del primer parámetro.
    const heroes = useMemo( () => getHeroesByPublisher(publisher), [publisher]);
    console.log(heroes);

    return (
        <div className='row rows-cols-1 row-cols-md-3 g-3'>
            {
                heroes.map( hero => (
                    <HeroCard key={hero.id} {...hero} />
                ))
            }
        </div>
    )
}
