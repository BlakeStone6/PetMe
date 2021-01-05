export default function (context) {
  if (!(context.$auth.user === context.params.id)) window.location.href = '/'
}
