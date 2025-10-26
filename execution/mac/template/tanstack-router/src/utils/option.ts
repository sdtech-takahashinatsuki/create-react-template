import { isNull, isUndefined } from './is'

const basic = {
  OPTION_SOME: 'some',
  OPTION_NONE: 'none',
} as const

interface Some<T> {
  readonly kind: typeof basic.OPTION_SOME
  readonly value: T
}

interface None {
  readonly kind: typeof basic.OPTION_NONE
}

export type Option<T> = Some<NonNullable<T>> | None

export const optionUtility = (function () {
  const { OPTION_SOME, OPTION_NONE } = basic

  const createSome = <T>(value: NonNullable<T>): Option<T> => {
    return Object.freeze({
      kind: OPTION_SOME,
      value,
    })
  }

  const createNone = (): Option<never> => {
    return Object.freeze({
      kind: OPTION_NONE,
    })
  }

  const optionConversion = <T extends NonNullable<unknown>>(
    value: T | null | undefined,
  ): Option<T> => {
    if (isNull(value) || isUndefined(value)) {
      return createNone()
    }

    return createSome(value)
  }

  const isSome = <T extends NonNullable<unknown>>(
    opt: Option<T>,
  ): opt is Some<T> => {
    return opt.kind === OPTION_SOME
  }

  const isNone = <T>(opt: Option<T>): opt is None => {
    return opt.kind === OPTION_NONE
  }

  return Object.freeze({
    createSome,
    createNone,
    isSome,
    isNone,
    optionConversion,
  })
})()
