import jwtDecode from 'jwt-decode'

export default function (context, redirect) {
  const token = jwtDecode(context.$auth.strategy.token.get())
  // Add the userAgent property to the context
  if (token.userType === 'refuge') {
    window.location.href = '/refuge/' + token.sub
  }
}
