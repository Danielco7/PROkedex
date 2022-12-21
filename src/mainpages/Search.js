import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SearchBar({ placeholder, data, data2, data3 }) {
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

  const Serch = async (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const pokemonsarray = data;
    const typesarray = data2;
    const movesarray = data3;
    const newFilter = pokemonsarray
      .map((name) => name.pokemon_species.name)
      .filter((name) => name.includes(e.target.value));
    var numberarr1 = newFilter.map(function (value) {
      return `1${value} `;
    });
    const newFilter2 = typesarray
      .map((name) => name.name)
      .filter((name) => name.includes(e.target.value));
    var numberarr2 = newFilter2.map(function (value) {
      return `2${value} `;
    });
    const newFilter3 = movesarray
      .map((name) => name.name)
      .filter((name) => name.includes(e.target.value));
    var numberarr3 = newFilter3.map(function (value) {
      return `3${value} `;
    });
    const allfitler = numberarr1.concat(numberarr2, numberarr3);

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
  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={Serch}
        />
        <div className="serach_svg">
          <svg
            width="32"
            height="32"
            viewBox="0 0 67 67"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33.5 61.4167C48.9184 61.4167 61.4167 48.9184 61.4167 33.5C61.4167 18.0816 48.9184 5.58334 33.5 5.58334C18.0816 5.58334 5.58333 18.0816 5.58333 33.5C5.58333 48.9184 18.0816 61.4167 33.5 61.4167Z"
              stroke="black"
              stroke-width="4.1875"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M33.5 41.875C35.7212 41.875 37.8514 40.9926 39.422 39.422C40.9926 37.8514 41.875 35.7212 41.875 33.5C41.875 31.2788 40.9926 29.1486 39.422 27.578C37.8514 26.0074 35.7212 25.125 33.5 25.125C31.2788 25.125 29.1486 26.0074 27.578 27.578C26.0074 29.1486 25.125 31.2788 25.125 33.5C25.125 35.7212 26.0074 37.8514 27.578 39.422C29.1486 40.9926 31.2788 41.875 33.5 41.875V41.875Z"
              stroke="black"
              stroke-width="4.1875"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.58333 33.5H25.125M41.875 33.5H61.4167"
              stroke="black"
              stroke-width="4.1875"
            />
          </svg>
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            if (value.slice(0, 1) == "1") {
              return (
                <a
                  className="dataItem"
                  onClick={() => handleClick_Pokemon(value.slice(1))}
                  target="_blank"
                >
                  <p>{value.split("1")}</p>{" "}
                  <p className="serch_result_info">pokemon</p>
                </a>
              );
            }
            if (value.slice(0, 1) == "2") {
              value.split("2");
              return (
                <a
                  className="dataItem"
                  onClick={() => handleClick_Type(value.slice(1))}
                  target="_blank"
                >
                  <p>{value.split("2")}</p>{" "}
                  <p className="serch_result_info">type</p>
                </a>
              );
            }
            if (value.slice(0, 1) == "3") {
              value.split("3");
              return (
                <a
                  className="dataItem"
                  onClick={() => handleClick_Move(value.slice(1))}
                  target="_blank"
                >
                  <p>{value.split("3")}</p>{" "}
                  <p className="serch_result_info">move</p>
                </a>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
