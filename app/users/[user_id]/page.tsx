import { notFound } from 'next/navigation';
import React from 'react'

interface Props {
	params: { user_id: number }
}

interface UserAddress {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	get: { 
		lat: string;
		lng: string;
	}
}
  
interface User {
	user_id: number;
	name: string;
	username: string;
	email: string;
	address: UserAddress
}

const UserDetailPage = async ({ params: { user_id }}: Props) => {
	const res = await fetch(`https://jsonplaceholder.typicode.com/users/${user_id}`);
	const user: User = await res.json();

	if(user_id > 10)
		notFound();

  return (
    <div>
		<h1>
			<span></span> / { user.name }
		</h1>
		<p>{user.name}</p>
	</div>
  )
}

export default UserDetailPage;