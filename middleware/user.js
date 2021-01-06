import jwtDecode from 'jwt-decode'

export default function (context) {
  if (context.$auth.loggedIn) {
    const token = jwtDecode(context.$auth.strategy.token.get())
    // Sets user
    context.$auth.setUser(token.sub)
  }
}
