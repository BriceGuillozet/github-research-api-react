import axios from 'axios';

const axiosReq = (url) => axios({
  method: 'get',
  url,
});

export default axiosReq;
