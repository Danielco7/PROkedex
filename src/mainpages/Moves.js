import React, { useEffect, useState } from 'react';
import { useNavigate  } from "react-router-dom";
import Axios from 'axios'


function Moves(props) {
    const [move, setmove] = useState({})

    const navigate = useNavigate();

    useEffect(() => {
        async function getPokemons() {
          const { data } = await Axios.get(`https://pokeapi.co/api/v2/move/${props.key2}`)
        //   console.log(data.flavor_text_entries[1].flavor_text);
          if (data.generation.name=="generation-i") {
              await setmove({
                  name: props.key2,
                  number: data.id,
                  brif: data.flavor_text_entries[1].flavor_text,
                  type1: data.type.name,
                  target: data.target.name,
                  power: data.power,
                  pp: data.pp,
                  damage_class: data.damage_class.name
                })
            }
                
        
     }
         getPokemons()
     }, [])
     
     function handleClick(e) {
        navigate(`/move/${e}`);
        window.location.reload();
        window.scrollTo(0,0);
     }
     function handleClick_Type(e) {
        navigate(`/type/${e}`);
        window.location.reload();
        window.scrollTo(0,0);
     }


    return <div>
     {move.name != undefined?<div>
    <div className='moves_cont'>
       
                <tr >
                    <td className='move_name' onClick={()=>handleClick(move.name)}>{move.name}</td>
                    <td onClick={()=>handleClick_Type(move.type1)} className={`${move.type1} types_small`}>{move.type1}</td>
                    {move.power!==null?<td className='move_numbers'>{move.power}</td>:<td className='move_numbers'>-</td>}
                    {move.pp!==null?<td className='move_numbers'>{move.pp}</td>:<td className='move_numbers'>-</td>}
                    {move.damage_class!==null?<td className='move_class'>{move.damage_class}</td>:<td>-</td>}
                    <td className='move_brif'>{move.brif}</td>
                </tr>
        
    </div>
    </div>:null}
    </div>
}
export default Moves