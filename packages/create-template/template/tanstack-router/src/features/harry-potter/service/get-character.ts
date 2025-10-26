import { appConfig } from '@/shared/config/config'
import { APIScheme } from '../model/model-res'
import { parseApi } from './parse-api'
import type { Result } from '@/utils/result'
import type { APIView } from '../model/model-view'
import { hasParseFetcher } from '@/services/fetcher-get'
import type { Option } from '@/utils/option'
import type { FetcherError } from '@/utils/error/fetcher'

export async function getCharacter(
  cache?: RequestCache,
): Promise<Result<Option<Array<APIView>>, FetcherError>> {
  return await hasParseFetcher({
    url: appConfig.apiKey,
    scheme: APIScheme,
    cache,
    parse: parseApi,
  })
}
