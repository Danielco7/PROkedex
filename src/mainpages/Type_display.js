import React, { useEffect, useState } from 'react';
import {useParams,useNavigate} from "react-router-dom";
import Axios from 'axios'
import Pokemons from './pokmons';
import Moves from './Moves';



function Type_Display(match) {
    const [pokemonsarray, setpokemonsarray] = useState([])
    const [movesarray, setmovesarray] = useState([])


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
                for (let i = 0; i < data.moves.length; i++) {
                    const element = data.moves[i];
                    const elem2= await Number(element.url.slice(31,element.url.length-1))
                    if (elem2<166) {
                            await setmovesarray(oldArray => [...oldArray, elem2])
                            console.log(elem2);
                    }
                }
     }
         getPokemon()
     }, [])

     function handleClick(e) {
        navigate(`/pokemon/${e}`);
        window.location.reload();
     }
    

    return <div className='pokemon_info_cont' style={{paddingTop: "20px"}}>
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
   <div >
   <h1>move learn in this type</h1>
         <table className='moves_display'>
             <thead className='table_header' >
                 <tr >
                     <td className='moves_cont'>
                          <th className='move_name'>Name</th> <th className='move_type'>Type </th> <th className='move_numbers'>Power</th> <th className='move_numbers'>PP</th> <th className='move_class'>Category</th>
                      <th >Efect</th>
                      </td>
                 </tr>

             </thead>
             <tbody>
             {movesarray.map((item,i) => {
                return <div className='move_row'> 
                <Moves  key2={item} key={i}   />
               </div>})}
             </tbody>

         </table>
       </div>

    </div>;
}

export default Type_Display;