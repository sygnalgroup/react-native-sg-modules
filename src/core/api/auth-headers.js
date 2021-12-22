import { authHeaders } from '../../modules';

export const getAuthHeaders = () => {
  return authHeaders || ['uid', 'access-token', 'expiry', 'client'];
};

export function retrieveAuthHeaders(retrieveData) {
  return async () => {
    if (!retrieveData) {
      return null;
    }

    const headers = {};
    const headersKeys = getAuthHeaders();
    await Promise.all(
      headersKeys.map(async (key) => {
        headers[key] = await retrieveData(key);
      }),
    );
    return headers;
  };
}

export function persistAuthHeaders(persistData) {
  return async (headers) => {
    if (!persistData || !headers) {
      return;
    }

    const headersKeys = getAuthHeaders();
    await Promise.all(
      headersKeys.map(async (key) => {
        await persistData(key, headers[key]);
      }),
    );
  };
}

export function clearAuthHeaders(removeData) {
  return () => {
    if (!removeData) {
      return;
    }

    const headersKeys = getAuthHeaders();

    headersKeys.forEach((key) => {
      removeData(key);
    });
  };
}
