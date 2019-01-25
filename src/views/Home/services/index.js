import request from '@/request';

export async function getPosts() {
  const resp = await request.get('/');
  return resp.data;
}
