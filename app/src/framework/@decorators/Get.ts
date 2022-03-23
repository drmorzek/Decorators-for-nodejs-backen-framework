import {Route} from './Route';

export const Get = (path?: string)=> {
  return Route("get", path)
};
