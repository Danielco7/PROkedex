import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import Moves from "./Moves";

function All_Moves() {
  const [movesarray, setmovesarray] = useState([]);

  useEffect(() => {
    async function getMoves() {
      const { data } = await Axios.get(
        "https://pokeapi.co/api/v2/move/?offset=0&limit=165"
      );
      await setmovesarray(data.results);
    }
    getMoves();
  }, []);
  return (
    <div>
      {movesarray.length > 163 ? (
        <div>
          <table className="moves_display">
            <thead className="table_header">
              <tr>
                <td className="moves_cont">
                  <th className="move_name">Name</th>{" "}
                  <th className="move_type">Type </th>{" "}
                  <th className="move_numbers">Power</th>{" "}
                  <th className="move_numbers">PP</th>{" "}
                  <th className="move_class">Category</th>
                  <th>Efect</th>
                </td>
              </tr>
            </thead>
            <tbody>
              {movesarray.map((item, i) => {
                return (
                  <div className="move_row">
                    <Moves key2={item.name} key={i} />
                  </div>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

export default All_Moves;
