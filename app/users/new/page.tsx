'use client';
import React from 'react'
import SubmitBtn from '@/app/components/SubmitBtn'
import { useRouter } from 'next/navigation';

const NewUser = () => {
	const router = useRouter();

  return (
			<SubmitBtn type="CREATE_USER" router={router} />
    )
}

export default NewUser