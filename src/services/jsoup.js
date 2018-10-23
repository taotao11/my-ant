import request from '../utils/request';

export async function jsoup(param) {
  const options = {
    method: 'POST',
    body: param,
  };
  return request('/jsoupnode/selectNode',options);
}
export async function addJsoup(param) {
  const options = {
    method: 'POST',
    body: param,
  };
  return request('/jsoupnode/insert',options);
}
export async function addJsoupCon(param) {
  const options = {
    method: 'POST',
    body: param,
  };
  return request('/jsoup/insert',options);
}