import React, { useEffect, useState } from 'react';
import {useParams,useNavigate} from "react-router-dom";
import Axios from 'axios'



function Pokemon_Display(match) {
    const [pokemon, setpokemon] = useState({
        name:'',
        number:'',
        img:'',
        height:'',
        weight:'',
        stats:[],
        type1:'',
        type2:'',
    })
    const [pokemonbefor, setpokemonbefor] = useState({
        id:'',
        name:''
    })
    const [pokemonafter, setpokemonafter] = useState({
        id:'',
        name:''
    })

    const navigate = useNavigate();
    const params= useParams();
    

    
    useEffect(() => {
        async function getPokemon() {

            const { data } = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
            console.log(data.stats);
            await setpokemon({
                name: data.name,
                number: data.id,
                img: data.sprites.front_default,
                height: data.height,
                weight: data.weight,
                stats: data.stats,
                type1: data.types[0].type.name,
            })
            if (data.types.length>1) {
                await setpokemon({
                    name: data.name,
                    number: data.id,
                    img: data.sprites.front_default,
                    height: data.height,
                    weight: data.weight,
                    stats: data.stats,
                    type1: data.types[0].type.name,
                    type2: data.types[1].type.name,
                })
            }
            if (data.id!==1) {
            const { data:data1 } = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${data.id-1}`)
            await setpokemonbefor({
                name: data1.name,
                id: data1.id,
            })
        }
        const { data:data2 } = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${data.id+1}`)
        await setpokemonafter({
            name: data2.name,
            id: data2.id,
        })

     }
         getPokemon()
     }, [])

     function handleClick_Pokemon(e) {
        navigate(`/pokemon/${e}`);
        window.location.reload();
        window.scrollTo(0, 100);
     }


     function handleClick_Type(e) {
        navigate(`/type/${e}`);
        window.location.reload();
        window.scrollTo(0, 0);
     }
    

    return <div className='pokemon_info_cont'>
        {pokemon.stats.length >5 ?  <div className=''>
   <h1 className='pokemon_displayer_name'>{params.id.charAt(0).toUpperCase() + params.id.slice(1)}</h1>
   <div className='pokemon_nav'>
   {pokemonbefor.name!=''?<button className='pre_pokemon' onClick={()=>handleClick_Pokemon(pokemonbefor.name)}>#{pokemonbefor.id} {pokemonbefor.name}</button>:<div></div>}
   {pokemonafter.name!=''?<button className='next_pokemon' onClick={()=>handleClick_Pokemon(pokemonafter.name)}>#{pokemonafter.id} {pokemonafter.name} </button>:<div></div>}
   </div>
   <img className='pokemon_img' src={`https://img.pokemondb.net/artwork/large/${params.id}.jpg`}></img>
   <div className='pokemon_data'>
       <h1>Porkédex data</h1>
       <div><p>National №: {pokemon.number}</p></div>
       <div className='type_name'>types: <div onClick={()=>handleClick_Type(pokemon.type1)} className={`${pokemon.type1} types`} >{pokemon.type1}</div> <div onClick={()=>handleClick_Type(pokemon.type2)} className={`${pokemon.type2} types`}>{pokemon.type2}</div></div>
       <div className='stats'>
       <div className='stats_name'>hp: {pokemon.stats[0].base_stat}</div><input type="range" className={`${pokemon.type1}_stats`} min="1" max="200" value={pokemon.stats[0].base_stat} id='range' readOnly/><br></br>
       <div className='stats_name'>attack: {pokemon.stats[1].base_stat}</div><input type="range" className={`${pokemon.type1}_stats`} min="1" max="200" value={pokemon.stats[1].base_stat} id='range' readOnly/><br></br>
       <div className='stats_name'>defense: {pokemon.stats[2].base_stat}</div><input type="range" className={`${pokemon.type1}_stats`} min="1" max="200" value={pokemon.stats[2].base_stat} id='range' readOnly/><br></br>
       <div className='stats_name'>special-attack: {pokemon.stats[3].base_stat}</div><input type="range" className={`${pokemon.type1}_stats`} min="1" max="200" value={pokemon.stats[3].base_stat} id='range' readOnly/><br></br>
       <div className='stats_name'>special-defense: {pokemon.stats[4].base_stat}</div><input type="range" className={`${pokemon.type1}_stats`} min="1" max="200" value={pokemon.stats[4].base_stat} id='range' readOnly/><br></br>
       <div className='stats_name'>speed: {pokemon.stats[5].base_stat}</div><input type="range" className={`${pokemon.type1}_stats`} min="1" max="200" value={pokemon.stats[5].base_stat} id='range' readOnly/><br></br>
       </div>
       <p>height: {pokemon.height}</p>
       <p>weight: {pokemon.weight}</p>

   </div>
 
    </div>:null}
    </div>;
}

export default Pokemon_Display;