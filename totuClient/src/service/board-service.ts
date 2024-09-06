import axios from 'axios';
import {ENVIRONMENT} from "@/config/constants";

export default class BoardService {

  async fetchAllBoards(): Promise<string[]> {
    try {
      console.log(`GET https://${ENVIRONMENT.host}/api/fetchAllBoards`);
      const response = await axios.get<string[]>(`https://${ENVIRONMENT.host}/api/getAllBoards`);
      console.log("Received boards: ", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
    return []
  }
}
