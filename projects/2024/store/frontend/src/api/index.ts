import axios from "axios";

const get = (url: string) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(url)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    }, 500 + Math.random() * 1000);
  });

const post = (url: string, data: any) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .post(url, data, {
          withCredentials: true,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    }, 1000);
  });

const basePath = "localhost:3000";

const getPromotions = () => get(`http://${basePath}/promotions`);
const getPromotion = (id: number) => get(`http://${basePath}/promotion/${id}`);
const getProduct = (id: string) => get(`http://${basePath}/product/${id}`);

const registerUser = (user: User) => post(`http://${basePath}/register`, { user }) as Promise<Response>;
const loginUser = (user: User) => post(`http://${basePath}/login`, { user }) as Promise<Response>;
function getUser() {
  //* Load user token from cookie
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("session="))
    ?.split("=")[1];
  return get(`http://${basePath}/getUser?token=${token}`) as Promise<Response>;
}
export { getPromotions, getPromotion, getProduct, registerUser, loginUser, getUser };
