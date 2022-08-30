import React, { useEffect, useState } from 'react';
import {useParams,useNavigate} from "react-router-dom";
import Axios from 'axios'
import Pokemons from './pokmons';



function Move_Display(match) {
    const [pokemonsarray, setpokemonsarray] = useState([])


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
     }
         getMove()
     }, [])

     function handleClick(e) {
        navigate(`/pokemon/${e}`);
        window.location.reload();
     }
    

    return <div>
        ljkahsdlkashdlkasjd
        <br></br>
        <br></br>
        <div >
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

export default Move_Display;