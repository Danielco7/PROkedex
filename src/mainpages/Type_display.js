import React, { useEffect, useState } from 'react';
import {useParams,useNavigate} from "react-router-dom";
import Axios from 'axios'
import Pokemons from './pokmons';



function Type_Display(match) {
    const [pokemonsarray, setpokemonsarray] = useState([])


    const navigate = useNavigate();
    const params= useParams();
    

    
    useEffect(() => {
        async function getPokemon() {

            const { data } = await Axios.get(`https://pokeapi.co/api/v2/type/${params.id}`)
            for (let i = 0; i < data.pokemon.length; i++) {
                const element = data.pokemon[i];
                const elem2= await Number(element.pokemon.url.slice(34,element.pokemon.url.length-1))
                if (elem2<152) {
                        await setpokemonsarray(oldArray => [...oldArray, elem2])
                    
                }

                
            }
     }
         getPokemon()
     }, [])

     function handleClick(e) {
        navigate(`/pokemon/${e}`);
        window.location.reload();
     }
    

    return <div>
        <br></br>
        <br></br>
        <div className={`${params.id} types`}>
   {params.id}
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

export default Type_Display;