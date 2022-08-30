import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import Pokemons from './pokmons';


function All_Pokemons() {
    const [pokemonsarray, setpokemonsarray] = useState([])



    useEffect(() => {

        const Get_Pokemons= async()=> {



            const { data } = await Axios.get('https://pokeapi.co/api/v2/pokedex/1/')
            let allpok=data.pokemon_entries
            let pokomons=allpok.slice(0,151)
            await setpokemonsarray(pokomons)

     }
         Get_Pokemons()
    }, [])


    return <div>
        {pokemonsarray.length >150 ?  <div className='pokemons_display'>
        {pokemonsarray.map((item,i) => {
            return <div  >
      <Pokemons  key2={item.pokemon_species.name} key={i}  />
     </div>})}
          </div>:null}

    </div>;
}

export default All_Pokemons;