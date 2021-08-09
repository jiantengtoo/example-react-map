import axios from "axios";
import { endpointsToValidator, validateJSON } from "./runtimeValidators";
import _ from 'lodash';

const instance = axios.create()

instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    const result = endpointsToValidator.filter((item) => {
      return (item.method === response.config.method && item.url === response.config.url);
    })

    if (_.isEmpty(result)) {
      return response;
    } 

    if (validateJSON(response.data,result[0].validator)) {
      return response;
    } 

    return Promise.reject('Fail validation!');
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;