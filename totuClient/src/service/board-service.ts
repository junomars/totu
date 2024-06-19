import axios from 'axios';

export default class BoardService {
  async fetchAllBoards(): Promise<string[]> {
    try {
      console.log("GET http://localhost:8080/boards");
      const response = await axios.get<string[]>('http://localhost:8080/boards');
      console.log("Received boards: ", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
    return []
  }
}
