import { redirect } from 'react-router'

export let loader = () => {
	return redirect('/auth/login')
}
export default function Index() {
	return null
}
