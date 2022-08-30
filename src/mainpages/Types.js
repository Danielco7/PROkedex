import React, { useEffect, useState } from 'react';
import Axios from 'axios'



function Types(props) {
    const [type, settype] = useState('')
    const [pokemonimg, setpokemonimg] = useState('')



    useEffect(() => {
        async function getPokemons() {

                    //   const { data } = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${props.key2.pokemon_species.name}`)
            // let allpok=data.pokemon_entries
            // let pokomons=allpok.slice(0,151)
            // await setpokemon(data)
            // await setpokemonimg(data.sprites.front_default)
     }
         getPokemons()
     }, [])


    return <div className={`${props.key2.name} types`}>
{/* {pokemon}
{props.key2.pokemon_species.url} */}
        {/* <button onClick={()=>handleClick()}>{props.key2.pokemon_species.name}</button> */}
        {/* <img className='pokimg' src={pokemonimg}></img> */}
        {props.key2.name}
    </div>
}
export default Types