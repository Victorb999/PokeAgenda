import axios from "axios";
import { API_URL } from "./config";
import {
  Pokedex,
  PokeEspecies,
  PokeGeneration,
  PokeType,
  PokeAbility,
  PokeMoves,
  PokemonSpecies,
  EvolutionChain,
} from "@/store/interfaces";

class ApiPokemon {
  urlpadrao: string;
  constructor() {
    this.urlpadrao = API_URL;
  }

  //busca o champ pelo id
  async getPokemon(id: string, url: string) {
    let pokeresposta = {} as Pokedex;
    await axios({
      method: "get",
      url: `${this.urlpadrao}/${url}/${id}`,
    })
      .then(response => {
        pokeresposta = response.data;
      })
      .catch(() => {
        return false;
      });
    return pokeresposta;
  }

  async getEspecie(id: string, url: string) {
    let pokeresposta = {} as PokeEspecies;
    await axios({
      method: "get",
      url: `${this.urlpadrao}/${url}/${id}`,
    })
      .then(response => {
        pokeresposta = response.data;
      })
      .catch(() => {
        return false;
      });
    return pokeresposta;
  }

  async getPokemonSpecie(id: string) {
    let pokeresposta = {} as PokemonSpecies;
    await axios({
      method: "get",
      url: `${this.urlpadrao}/pokemon-species/${id}`,
    })
      .then(response => {
        pokeresposta = response.data;
      })
      .catch(() => {
        return false;
      });
    return pokeresposta;
  }

  async getEvolutionChain(id: string) {
    let pokeresposta = {} as EvolutionChain;
    await axios({
      method: "get",
      url: `${this.urlpadrao}/evolution-chain/${id}`,
    })
      .then(response => {
        pokeresposta = response.data;
      })
      .catch(() => {
        return false;
      });
    return pokeresposta;
  }

  async getMove(id: string, url: string) {
    let pokeresposta = {} as PokeMoves;
    await axios({
      method: "get",
      url: `${this.urlpadrao}/${url}/${id}`,
    })
      .then(response => {
        pokeresposta = response.data;
      })
      .catch(() => {
        return false;
      });
    return pokeresposta;
  }

  async getAbility(id: string, url: string) {
    let pokeresposta = {} as PokeAbility;
    await axios({
      method: "get",
      url: `${this.urlpadrao}/${url}/${id}`,
    })
      .then(response => {
        pokeresposta = response.data;
      })
      .catch(() => {
        return false;
      });
    return pokeresposta;
  }

  async getType(id: string, url: string) {
    let pokeresposta = {} as PokeType;
    await axios({
      method: "get",
      url: `${this.urlpadrao}/${url}/${id}`,
    })
      .then(response => {
        pokeresposta = response.data;
      })
      .catch(() => {
        return false;
      });
    return pokeresposta;
  }

  async getTypes() {
    let pokeresposta = [] as Array<PokeType>;
    await axios({
      method: "get",
      url: `${this.urlpadrao}/type`,
    })
      .then(response => {
        pokeresposta = response.data.results;
      })
      .catch(() => {
        return false;
      });
    return pokeresposta;
  }

  async getGeneration(id: string, url: string) {
    let pokeresposta = {} as PokeGeneration;
    await axios({
      method: "get",
      url: `${this.urlpadrao}/${url}/${id}`,
    })
      .then(response => {
        pokeresposta = response.data;
      })
      .catch(() => {
        return false;
      });
    return pokeresposta;
  }

  async getGenerations() {
    let pokeresposta = [] as Array<PokeGeneration>;
    await axios({
      method: "get",
      url: `${this.urlpadrao}/generation`,
    })
      .then(response => {
        pokeresposta = response.data.results;
      })
      .catch(() => {
        return false;
      });
    return pokeresposta;
  }
}

export default ApiPokemon;
