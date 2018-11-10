export default (state = '', action) => {
  switch (action.type) {
    case 'RAISE_ERROR':
      return action.payload
    case 'OMIT_ERROR':
      return Object.assign(
        {},
        state,
        {
          isError: false,
          message: '',
          title: 'Message Alert',
          confirmLabel: 'Ok',
          hasCancel: false
        }
      )
    default:
      return state
  }
}