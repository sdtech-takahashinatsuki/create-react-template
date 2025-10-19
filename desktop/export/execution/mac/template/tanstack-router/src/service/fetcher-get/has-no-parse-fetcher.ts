import z from 'zod'
import { type Option } from '../../utils/option'
import { type HttpError } from '../../utils/error/http'
import { type Result } from '../../utils/result'
import { fetcher } from './fetcher'

export async function hasNoParseFetcher<T extends z.ZodType>({
  url,
  scheme,
  cache,
}: {
  url: Option<string>
  scheme: T
  cache?: RequestCache
}): Promise<Result<z.infer<T>, HttpError>> {
  return await fetcher<T>({
    url,
    scheme,
    cache,
  })
}
