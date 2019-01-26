import request from '@/request';

export async function getPosts() {
  const resp = await request.get('/');
  return resp.data;
}

export async function getPostByID(id) {
  const resp = await request.get('/post/' + id);
  return resp.data;
}
