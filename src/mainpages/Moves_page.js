import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import { BrowserRouter as Router, Switch, Routes ,Route , Redirect,} from "react-router-dom";
import Moves from './Moves';


function All_Moves() {
    const [movesarray, setmovesarray] = useState([])


    useEffect(() => {
        async function getMoves() {
            const { data } = await Axios.get('https://pokeapi.co/api/v2/move/?offset=0&limit=165')
            await setmovesarray(data.results)
  
     }
         getMoves()
     }, [])
     return <div >
     {movesarray.length >16 ?  <div >
         <table className='moves_display'>
             {/* <thead>
                 <tr >
                     <th>Name</th>
                     <th>Type </th>
                     <th>Category</th>
                     <th>Power</th>
                     <th>Accurcy</th>
                     <th>PP</th>
                     <th>Efect</th>
                 </tr>
             </thead> */}
             <tbody>
             {movesarray.map((item,i) => {
                return <tr> <td>
                <Moves  key2={item.name} key={i}   />
                      </td>
               </tr>})}
                 
                 {/* <tr>
                     <td>alskdjasl</td>
                     <td>alskdjasl</td>
                     <td>alskdjasl</td>
                     <td>alskdjasl</td>
                     <td>alskdjasl</td>
                     <td>alskdjasl</td>
                     <td>alskdjasl</td>
                 </tr> */}
             </tbody>

         </table>
       </div>
       :null}

 </div>;
}

export default All_Moves;