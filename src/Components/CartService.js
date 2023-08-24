const ENDPOINT = "https://book-e-sell-node-api.vercel.app/api/cart";

const add = async (data) => {
    const url = `${ENDPOINT}`;
    return request
      .post(url, data)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return Promise.reject(e.response);
      });
  };