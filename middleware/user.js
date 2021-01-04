import jwtDecode from 'jwt-decode'

export default function (context) {
  const token = jwtDecode(context.$auth.strategy.token.get())
  // Sets user
  context.$auth.setUser(token.sub)
}
