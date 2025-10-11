import { useEffect, useMemo, useState } from 'react'
import { getCharacter } from '../service/get-character'
import type { Option } from '@/utils/option'
import type { APIView } from '../model/model-view'
import type { SinglePageGetCharacters } from './characters.type'
import type { HttpError } from '@/utils/error/http'
import { optionUtility } from '@/utils/option'
import { resultUtility } from '@/utils/result'

export function useSinglePageCharacters() {
  const { createNone, createSome, isNone } = optionUtility()
  const { isNG } = resultUtility()

  const [fetchCharacter, setFetchCharacter] =
    useState<Option<Array<APIView>>>(createNone())

  const [error, setError] = useState<Option<HttpError>>(createNone())

  useEffect(() => {
    let isMounted = true

    ;(async () => {
      const result = await getCharacter()

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!isMounted) return

      if (isNG(result)) {
        setError(createSome(result.err))
        return
      }

      setFetchCharacter(createSome(result.value))
    })()

    return () => {
      isMounted = false
    }
  }, [])

  const isLoading: boolean = useMemo(() => {
    return isNone(fetchCharacter) && isNone(error)
  }, [fetchCharacter, error])

  const characters: Array<SinglePageGetCharacters> = useMemo(() => {
    if (isNone(fetchCharacter)) {
      return []
    }

    const mappedCharacters: Array<SinglePageGetCharacters> =
      fetchCharacter.value.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
      }))

    return mappedCharacters
  }, [fetchCharacter])

  return {
    isLoading,
    characters,
    error,
  }
}
