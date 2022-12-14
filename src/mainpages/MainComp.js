import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  Link,
  HashRouter
} from "react-router-dom";
import Axios from "axios";
import { withRouter } from "react-router";
import All_Pokemons from "./Home_pokemon_page";
import All_Moves from "./Moves_page";
import Pokemon_Display from "./Pokemon_Display";
import All_Types from "./Types_page";
import Type_Display from "./Type_display";
import "../css/navbar.css";
import "../css/allaround.css";
import "../css/displayers.css";
import "../css/main_pages.css";
import Logo from "../logo.png";
import SearchBar from "./Search";
import Move_Display from "./Move_Display";

function MainComp() {
  const [pokemonsarray, setpokemonsarray] = useState([]);
  const [typesarray, settypesarray] = useState([]);
  const [movesarray, setmovesarray] = useState([]);

  useEffect(() => {
    const Get_Pokemons = async () => {
      const { data } = await Axios.get("https://pokeapi.co/api/v2/pokedex/1/");
      let allpok = data.pokemon_entries;
      let pokomons = allpok.slice(0, 151);
      await setpokemonsarray(pokomons);

      const { data: data1 } = await Axios.get(
        "https://pokeapi.co/api/v2/type/"
      );
      let alltype = data1.results;
      let types = alltype.slice(0, 18);
      await settypesarray(types);

      const { data: data2 } = await Axios.get(
        "https://pokeapi.co/api/v2/move/?offset=0&limit=165"
      );
      let allmove = data2.results;
      console.log(allmove);
      await setmovesarray(allmove);
    };
    Get_Pokemons();
  }, []);

  function scrollClick(e) {
    window.scrollTo(100, 0);
  }
  const Pokemon = ({ match }) => {
    return <h1>user {match.params.username}</h1>;
  };

  return (
    <HashRouter>
      <div className="navbar_cont">
        <div className="header">
          <img src={Logo} />
        </div>
        <div className="navbar">
          <ul className="links_nav">
            <div className="links">
              <Link to="/pokemon">Home</Link>
            </div>
            <div className="links">
              <Link to="/move">moves</Link>
            </div>
            <div className="links">
              <Link to="/type">types</Link>
            </div>
          </ul>
          <ul>
            <div className="serchcont">
              <SearchBar
                placeholder={"Search..."}
                data={pokemonsarray}
                data2={typesarray}
                data3={movesarray}
              />
            </div>
          </ul>
        </div>
      </div>
      <Routes>
        <Route exact path="/pokemon" element={<All_Pokemons />} />
        <Route exact path="/" element={<All_Pokemons />} />
        <Route path="/pokemon/:id" element={<Pokemon_Display />} />
        <Route exact path="/move" element={<All_Moves />} />
        <Route exact path="/move/:id" element={<Move_Display />} />
        <Route exact path="/type" element={<All_Types />} />
        <Route path="/type/:id" element={<Type_Display />} />
      </Routes>
      <div onClick={() => scrollClick("e")} id="scrolltotop" title="Go to top">
        Top
      </div>
    </HashRouter>
  );
}

export default MainComp;
