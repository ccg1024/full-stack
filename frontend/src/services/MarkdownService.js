import axios from "axios";

const MARKDOWN_API_URL = "http://localhost:8080/api/v1/markdown"

class MarkdownService {

  getInfo() {
    return axios.get(MARKDOWN_API_URL)
  }
}

export default new MarkdownService();
