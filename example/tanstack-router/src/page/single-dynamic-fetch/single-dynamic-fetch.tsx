import { Box } from '@/components/ui'
import { CardListView } from '@/components/view'
import { useSinglePageCharacters } from '@/features/harry-potter'
import { ja } from '@/shared/lang/ja'
import { OPTION_SOME } from '@/utils/option'

function SingleDynamicFetch() {
  const { characters, isLoading, error } = useSinglePageCharacters()

  if (isLoading) {
    return <Box>Loading...</Box>
  }

  if (error.kind === OPTION_SOME) {
    return <Box>Error: {error.value.message}</Box>
  }

  if (characters.length === 0) {
    return <Box>No characters.</Box>
  }

  return (
    <CardListView
      potters={characters}
      title={ja.app.singleDynamicPotter.title}
    />
  )
}

export default SingleDynamicFetch
