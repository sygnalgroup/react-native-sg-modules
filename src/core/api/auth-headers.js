export function retrieveAuthHeaders(retrieveData) {
  return async () => {
    if (!retrieveData) {
      return null;
    }

    const uid = await retrieveData('uid');
    const accessToken = await retrieveData('access-token');
    const tokenType = await retrieveData('token-type');
    const expiry = await retrieveData('expiry');
    const client = await retrieveData('client');

    return {
      uid,
      'access-token': accessToken,
      'token-type': tokenType,
      expiry,
      client,
    };
  };
}

export function persistAuthHeaders(persistData) {
  return async (headers) => {
    if (!persistData || !headers) {
      return;
    }

    await persistData('uid', headers.uid);
    await persistData('access-token', headers['access-token']);
    await persistData('expiry', headers.expiry);
    await persistData('client', headers.client);
  };
}

export function clearAuthHeaders(removeData) {
  return () => {
    if (!removeData) {
      return;
    }

    removeData('uid');
    removeData('access-token');
    removeData('expiry');
    removeData('client');
  };
}
