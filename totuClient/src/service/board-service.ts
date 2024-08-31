import axios from 'axios';

export default class BoardService {
  async fetchAllBoards(): Promise<string[]> {
    try {
      console.log("GET https://8080--main--juno-sandbox--juno.coder.tartarus.cloud/boards");
      const response = await axios.get<string[]>('https://8080--main--juno-sandbox--juno.coder.tartarus.cloud/boards');
      console.log("Received boards: ", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
    return []
  }
}
