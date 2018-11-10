export const raiseError = payload => ({
  type: 'RAISE_ERROR',
  payload,
})

export const omitError = payload => ({
  type: 'OMIT_ERROR',
  payload,
})