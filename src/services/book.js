import request from '../utils/request';

export async function query(param) {
  const options = {
    method: 'POST',
    body: param,
  };
  return request('/book/selectByPageAll',options);
}

export async function section(param) {
  const options = {
    method: 'POST',
    body: param,
  };
  return request('/book/section',options);
}

export async function text(param) {
  const options = {
    method: 'POST',
    body: param,
  };
  return request('/book/content',options);
}
export async function jsoup(param) {
  const options = {
    method: 'POST',
    body: param,
  };
  return request('/jsoupnode/selectNode',options);
}