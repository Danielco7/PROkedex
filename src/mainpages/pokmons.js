import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function Pokemons(props) {
  const [pokemon, setpokemon] = useState("");
  const [pokemontypes, setpokemontypes] = useState({
    name: "",
    number: "",
    img: "",
    height: "",
    weight: "",
    stats: [],
    type1: "",
    type2: "",
  });
  const [pokemonimg, setpokemonimg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function getPokemons() {
      const { data } = await Axios.get(
        `https://pokeapi.co/api/v2/pokemon/${props.key2}`
      );
      // let allpok=data.pokemon_entries
      // let pokomons=allpok.slice(0,151)
      await setpokemon(data);
      await setpokemon({
        name: data.name,
        number: data.id,
        img: data.sprites.front_default,
        height: data.height,
        weight: data.weight,
        stats: data.stats,
        type1: data.types[0].type.name,
        type2: "1",
      });
      if (data.types.length > 1) {
        await setpokemon({
          name: data.name,
          number: data.id,
          img: data.sprites.front_default,
          height: data.height,
          weight: data.weight,
          stats: data.stats,
          type1: data.types[0].type.name,
          type2: data.types[1].type.name,
        });
      }
    }
    getPokemons();
  }, []);

  function handleClick(e) {
    navigate(`/pokemon/${e}`);
    window.location.reload();
    window.scrollTo(0, 0);
  }
  function handleClick_Type(e) {
    navigate(`/type/${e}`);
    window.location.reload();
    window.scrollTo(0, 0);
  }

  return (
    <div>
      <img
        className="pokimg"
        onClick={() => handleClick(pokemon.name)}
        src={pokemon.img}
      ></img>
      <div className="brif_info">
        <div>#{pokemon.number}</div>
        <div
          className="main_page_pokemon_name"
          onClick={() => handleClick(pokemon.name)}
        >
          <b>{pokemon.name}</b>
        </div>
        {pokemon.type2 === "1" ? (
          <div className="types_under_name">
            <div
              onClick={() => handleClick_Type(pokemon.type1)}
              className={`${pokemon.type1} types_small`}
            >
              {pokemon.type1}
            </div>
          </div>
        ) : (
          <div className="types_under_name">
            <div
              onClick={() => handleClick_Type(pokemon.type1)}
              className={`${pokemon.type1} types_small`}
            >
              {pokemon.type1}
            </div>
            <div
              onClick={() => handleClick_Type(pokemon.type2)}
              className={`${pokemon.type2} types_small`}
            >
              {pokemon.type2}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Pokemons;
