import axios from "axios";

const MARKDOWN_CONTENT_API_URL = "http://localhost:8080/api/v1/markdown/*"

class MarkdownContentService {
  
  getInfo() {
    return axios.get(MARKDOWN_CONTENT_API_URL)
  }
}

export default new MarkdownContentService();
