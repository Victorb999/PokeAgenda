import axios from "axios";
import { API_URL } from "./config";

class ApiPokemon {
  urlpadrao: string;
  constructor() {
    this.urlpadrao = API_URL;
  }

  //busca o champ pelo id
  async getPokemon(id: string) {
    let pokeResposta = {};
    await axios({
      method: "get",
      url: `${this.urlpadrao}/pokemon/${id}`
    })
      .then(response => {
        pokeResposta = response.data;
      })
      .catch(() => {
        pokeResposta = false;
      });

    return pokeResposta;
  }
}

export default ApiPokemon;
