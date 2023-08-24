import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/book";

class BookService {
  GetAllBook = async (payload) => {
   return axios.post(`${BASEURL}/all` , payload)
  };
 
}
// eslint-disable-next-line
export default new BookService();
