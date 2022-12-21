import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Pokemons from "./pokmons";
import Types from "./Types";
import typesimg from "../typechart.png";

function All_Types() {
  const [typesarray, settypesarray] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const Get_Types = async () => {
      const { data } = await Axios.get("https://pokeapi.co/api/v2/type/");
      let alltype = data.results;
      let types = alltype.slice(0, 18);
      await settypesarray(types);
    };
    Get_Types();
  }, []);
  function handleClick(e) {
    navigate(`/type/${e}`);
  }

  return (
    <div>
      {typesarray.length > 16 ? (
        <div className="pokemons_display">
          {typesarray.map((item, i) => {
            return (
              <div onClick={() => handleClick(item.name)}>
                <Types key2={item} key={i} />
              </div>
            );
          })}
          <img className="typeimg" src={typesimg} alt="Logo" />
        </div>
      ) : null}
    </div>
  );
}

export default All_Types;
