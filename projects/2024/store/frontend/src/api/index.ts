import axios from "axios";

const get = (url: string) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(url)
        .then((response) => {
          console.log("data", response.data);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    }, 500 + Math.random() * 1000);
  });

const basePath = "localhost:3000";

const getPromotions = () => get(`http://${basePath}/promotions`);
const getPromotion = (id: number) => get(`http://${basePath}/promotion/${id}`);
const getProduct = (id: number) => get(`http://${basePath}/product/${id}`);

export { getPromotions, getPromotion, getProduct };
