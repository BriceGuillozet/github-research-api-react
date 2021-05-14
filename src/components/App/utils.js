import axios from 'axios';
import Const from './const';

export const request = (inputText, filters) => {
  axios({
    method: 'get',
    url: `${Const.BASE_URL}${inputText}${filters}`,
  });
};
