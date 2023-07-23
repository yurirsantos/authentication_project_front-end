'use client'
import { UserType } from '@/Types/UserType'
import { Button } from '@/components/buttons'
import { Title } from '@/components/texts'
import React from 'react'
import { useSelector } from 'react-redux'

export default function HomePage() {
  const user: UserType = useSelector((state: any) => state.userReducer.user)
  return (
    <main>
      <Title title={`Olá, ${user.name}!`} />
      <Button title="Sair" link="/" />
    </main>
  )
}
