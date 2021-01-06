import jwtDecode from 'jwt-decode'

export default function (context) {
  const token = jwtDecode(context.$auth.strategy.token.get())
  // If user is a refuge, no main app for them
  if (token.userType === 'refuge') {
    window.location.href = '/refuge/' + token.sub
  }
}
