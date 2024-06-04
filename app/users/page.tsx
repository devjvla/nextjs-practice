import React, { Suspense } from 'react'
import UsersTable from './UsersTable';
import Link from 'next/link';
import Loading from '../loading';

interface Props {
  searchParams: {
    sortOrder: string; 
    orderType: string;
  }
}

const UsersPage = ({ searchParams: { sortOrder, orderType = "asc" } }: Props) => {
  return (
    <>
      <h1>Users</h1>
      <Link href="/users/new" className='btn btn-outline'>Add user</Link>
      {/* <SubmitBtn type="CREATE_USER" /> */}
      <Suspense fallback={<Loading />}>
        <UsersTable sortOrder={sortOrder} orderType={orderType} />
      </Suspense>
    </>
  )
}

export default UsersPage;