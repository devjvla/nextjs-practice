import React from 'react'
import Link from 'next/link';
import { sort } from 'fast-sort';

// interface UserAddress {
// 	street: string;
// 	suite: string;
// 	city: string;
// 	zipcode: string;
// 	get: { 
// 		lat: string;
// 		lng: string;
// 	}
// }
  
interface User {
	id: number;
	name: string;
	// username: string;
	email: string;
	// address: UserAddress
}

interface Props {
  sortOrder: string;
  orderType: string;
}

const UsersTable = async ({ sortOrder, orderType = "asc" }: Props) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', { cache: 'no-cache' });
  const users: User[] = await res.json();
  const sortedUsers = (sortOrder == "name") ?
    (orderType == "asc") ? sort(users).asc([u => u.name]) : sort(users).desc([u => u.name]) :
    (orderType == "asc") ? sort(users).asc([u => u.email]) : sort(users).desc([u => u.email])

  return (
    <>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th><Link href={`http://localhost:3000/users/?sortOrder=name&orderType=${orderType == "asc" ? "desc" : "asc"}`}>Name</Link></th>
            <th><Link href={`http://localhost:3000/users/?sortOrder=email&orderType=${orderType == "asc" ? "desc" : "asc"}`}>Email</Link></th>
          </tr>
        </thead>
        <tbody>
          { 
            sortedUsers.map(user => <tr key={user.id}>
                <td><a href={`http://localhost:3000/users/${user.id}`}>{user.name}</a></td>
                <td>{user.email}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </>
  )
}

export default UsersTable