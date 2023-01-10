// import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
// import { useQuery } from "react-query";

export const fetchChar = async (id) => {
  const baseUrl = "https://rickandmortyapi.com/api/character/" + id;
  const res = await axios.get(baseUrl);
  return res;
};

export const fetchCharLoc = async (loc) => {
  const allRes = loc.map((val) => axios.get(val));

  const allLoc = await axios.all(allRes).then((responses) => {
    return responses;
  });
  
  return allLoc;
};
