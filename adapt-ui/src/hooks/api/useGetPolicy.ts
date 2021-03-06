import { useAsync } from 'react-use'
import { PolicyState } from 'src/types/policy'
import { axios } from './common'

export interface GetPolicyResponse {
  policy: PolicyState
  labelByURI: Record<string, string>
}

const getPolicy = (uri: string) => async () => {
  let { data } = await axios.get('/policies', { params: { uri } })
  return data
}

export const useGetPolicy = (uri: string) =>
  useAsync<() => Promise<GetPolicyResponse>>(getPolicy(uri), [uri])
