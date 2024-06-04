import React from 'react'

interface Props {
	params: { photo_id: number }
}

const UserPhotosPage = ({ params: { photo_id }}: Props) => {
  return (
    <div>UserPhotosPage {photo_id}</div>
  )
}

export default UserPhotosPage;