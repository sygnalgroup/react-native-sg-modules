import { persistAuthHeaders } from '../auth-headers'
import { persistData } from '../../utils/async-storage'

const persistHeaders = (response) => {
  if (response.ok) {
    if (response.headers['access-token']) {
      persistAuthHeaders(persistData)(response.headers)
    }
  }

  return response
}

export default persistHeaders
