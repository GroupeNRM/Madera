export default function({ store, redirect }) {
  if(!store.state.auth.user) {
    return redirect('/connexion');
  }

  if(!(store.state.auth.user.role !== 'ROLE_CLIENT' || store.state.auth.user.role !== 'ROLE_ADMIN')) {
    return redirect('/')
  }
}
