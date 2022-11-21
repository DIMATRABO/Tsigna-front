import httpClient from './httpClient';

export const httpGet = (path, thenFunc, catchFunc, finallyFunc) => {
  httpClient
    .get(path)
    .then((response) => {
      if (thenFunc) thenFunc(response);
    })
    .catch((error) => {
      if (catchFunc) catchFunc(error);
    })
    .finally(() => {
      if (finallyFunc) finallyFunc();
    });
};

export const httpPost = (path, body, thenFunc, catchFunc, finallyFunc) => {
  httpClient
    .post(path, body)
    .then((response) => {
      if (thenFunc) thenFunc(response);
    })
    .catch((error) => {
      if (catchFunc) catchFunc(error);
    })
    .finally(() => {
      if (finallyFunc) finallyFunc();
    });
};

export const httpPut = (path, body, thenFunc, catchFunc, finallyFunc) => {
  httpClient
    .put(path, body)
    .then((response) => {
      if (thenFunc) thenFunc(response);
    })
    .catch((error) => {
      if (catchFunc) catchFunc(error);
    })
    .finally(() => {
      if (finallyFunc) finallyFunc();
    });
};

export const httpDelete = (path, thenFunc, catchFunc, finallyFunc) => {
  httpClient
    .delete(path)
    .then((response) => {
      if (thenFunc) thenFunc(response);
    })
    .catch((error) => {
      if (catchFunc) catchFunc(error);
    })
    .finally(() => {
      if (finallyFunc) finallyFunc();
    });
};
