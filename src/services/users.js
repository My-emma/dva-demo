import request from '../utils/request';
import { PAGE_SIZE } from '../constans/constans';

export function fetch({ page }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}
