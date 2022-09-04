import React, { useState } from "react";
import {useParams,useNavigate} from "react-router-dom";


function SearchBar({ placeholder, data, data2 ,data3 }) {
  const [filteredData, setFilteredData] = useState([]);
  const [filteredData2, setFilteredData2] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const navigate = useNavigate();

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    console.log(data);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const Serch=async(e)=> {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
        const pokemonsarray = data
        const typesarray = data2
        const movesarray = data3
        const newFilter=pokemonsarray.map((name) => name.pokemon_species.name).filter(name => name.includes(e.target.value))
        var numberarr1 = newFilter.map( function(value) { 
            return `1${value} `
        } );
        const newFilter2=typesarray.map((name) => name.name).filter(name => name.includes(e.target.value))
        var numberarr2 = newFilter2.map( function(value) { 
            return `2${value} `
        } );
        const newFilter3=movesarray.map((name) => name.name).filter(name => name.includes(e.target.value))
        var numberarr3 = newFilter3.map( function(value) { 
            return `3${value} `
        } );
        const allfitler=numberarr1.concat(numberarr2 , numberarr3 )

    if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(allfitler);
      }
    };
    function handleClick_Pokemon(e) {
        navigate(`/pokemon/${e}`);
        window.location.reload();
     }
     function handleClick_Type(e) {
        navigate(`/type/${e}`);
        window.location.reload();
     }
     function handleClick_Move(e) {
      navigate(`/move/${e}`);
      window.location.reload();
   }
  return <div className="search">
    
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={Serch}
        />
        <div className="searchIcon">
          {/* {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            // <CloseIcon id="clearBtn" onClick={clearInput} />
          )} */}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {

              if (value.slice(0,1)=='1') {
                  return    <a className="dataItem" onClick={()=>handleClick_Pokemon(value.slice(1))} target="_blank">
                  <p>{value.split("1")}</p> <p className="serch_result_info">pokemon</p>
                </a>;
              }
              if (value.slice(0,1)=='2') { value.split("2");
                return    <a className="dataItem" onClick={()=>handleClick_Type(value.slice(1))} target="_blank">
                <p>{value.split("2")}</p> <p className="serch_result_info">type</p>
              </a>;
            }
            if (value.slice(0,1)=='3') { value.split("3");
            return    <a className="dataItem" onClick={()=>handleClick_Move(value.slice(1))} target="_blank">
            <p>{value.split("3")}</p> <p className="serch_result_info">move</p>
          </a>;
          }
          })}
        </div>
      )}
    </div>
}

export default SearchBar;