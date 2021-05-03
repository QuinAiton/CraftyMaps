import axios from 'axios';
export const getData = (url) => {
  axios.get(url).then((response) => response.json());
};
