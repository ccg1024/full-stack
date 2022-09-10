import axios from 'axios';

const INDEX_API_BASE_URL = "http://localhost:8080/api/v1/";

class IndexService {
  
  getInfo() {
    return axios.get(INDEX_API_BASE_URL)
  }
}

export default new IndexService();
