import React, { useEffect, useState } from 'react';
import {useParams,useNavigate} from "react-router-dom";
import Axios from 'axios'
import Pokemons from './pokmons';



function Move_Display(match) {
    const [pokemonsarray, setpokemonsarray] = useState([])
    const [move, setmove] = useState({})



    const navigate = useNavigate();
    const params= useParams();
    

    
    useEffect(() => {
        
        async function getMove() {
            console.log(params.id);

            const { data } = await Axios.get(`https://pokeapi.co/api/v2/move/${params.id}`)
            for (let i = 0; i < data.learned_by_pokemon.length; i++) {
                const element = data.learned_by_pokemon[i];
                const elem2= await Number(element.url.slice(34,element.url.length-1))
                if (elem2<152) {
                        await setpokemonsarray(oldArray => [...oldArray, elem2])
                }
            }
            await setmove(data)
            await setmove({
                name: params.id,
                number: data.id,
                brif: data.flavor_text_entries[1].flavor_text,
                type1: data.type.name,
                target: data.target.name,
                power: data.power,
                pp: data.pp,
                damage_class: data.damage_class.name
            })
     }
         getMove()
     }, [])

     function handleClick(e) {
        navigate(`/pokemon/${e}`);
        window.location.reload();
     }
    

    return <div className='pokemon_info_cont'>
   <h1 className='pokemon_displayer_name'>{move.name}</h1>
        <br></br>
        <br></br>
        <div className='pokemon_data'>
        <div> <h4>{move.number}</h4></div>
        <div> <h4>{move.type1}</h4></div>
        <div> <h4>{move.target}</h4></div>
        <div> <h4>{move.power}</h4></div>
        <div> <h4>{move.pp}</h4></div>
        <div><h4>{move.damage_class}</h4></div> 
        </div>
        
        {pokemonsarray.length >1 ?  <div className='pokemons_display'>
        {pokemonsarray.map((item,i) => {
            return <div >
      <Pokemons  key2={item} key={i}  />
     </div>})}
          </div>:null}
   {/* <img className='pokimg' src={`https://img.pokemondb.net/artwork/large/${params.id}.jpg`}></img> */}

    </div>;
}

export default Move_Display;