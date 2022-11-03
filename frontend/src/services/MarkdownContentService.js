import axios from "axios";

const MARKDOWN_CONTENT_API_URL = "http://localhost:8080/api/v1/markdown/"

class MarkdownContentService {

  getInfo(id) {
    return axios.get(MARKDOWN_CONTENT_API_URL + id)
  }
}

export default new MarkdownContentService();
