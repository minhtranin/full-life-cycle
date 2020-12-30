import request from '../utils/request';

export function query(params) {
  const offset = params?.offset || '';
  const limit = params?.limit || '';
  return request(`http://localhost:8888/application-service/?offset=${offset}&limit=${limit}`);
}

export function destroy(param) {
  return request(`http://localhost:8888/application-service/?id=${param.id}`,
    {
      method: 'DELETE',
    }
  );
}

export function update(param) {
  return request(`http://localhost:8888/application-service/`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(param),
    }
  );
}

export function create(param) {
  return request(`http://localhost:8888/application-service/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(param),
    }
  );
}