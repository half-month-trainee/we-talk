import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { UserContext } from '../context/UserContext'

export const Intro = observer(() => {
  const userStore = useContext(UserContext)

  return (
    <div>
      hi
    </div>
  )
})
