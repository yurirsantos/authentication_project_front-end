'use client'
import { Button } from '@/components/buttons'
import { Title } from '@/components/texts'
import {
  activeAccountUser,
  resetSendEmailActiveAccountUser
} from '@/store/User'
import { SpinnerGap } from '@phosphor-icons/react'
import React, { useEffect, useRef, useState } from 'react'

interface CodeState {
  [index: number]: string
}

export default function ActiveAccount() {
  const [code, setCode] = useState<CodeState>({
    0: '',
    1: '',
    2: '',
    3: ''
  })
  const inputRefs: any = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ]
  const [loadingResetActiveAccount, setLoadingResetActiveAccount] =
    useState<boolean>(false)
  const emailUser = localStorage.getItem('@emailUser')

  async function activeAccount() {
    setLoadingResetActiveAccount(true)
    const codeActiveAccount = code[0] + code[1] + code[2] + code[3].toString()
    const returnActiveAccount = await activeAccountUser({
      code: parseInt(codeActiveAccount)
    })
    if (returnActiveAccount) {
      setLoadingResetActiveAccount(false)
      window.location.replace('/')
    }
  }
  function handleChangeCode(
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { value } = event.target

    if (/^\d*$/.test(value) && value.length <= 1) {
      const newCode = { ...code }
      newCode[index] = value
      setCode(newCode)

      if (value.length === 1 && index < 3) {
        inputRefs[index + 1].current?.focus()
      }
    } else if (value.length === 0) {
      if (index > 0) {
        const newCode = { ...code }
        newCode[index] = value
        setCode(newCode)
        inputRefs[index - 1].current?.focus()
      }
    }
  }
  function handleKeyDown(index: number, event: any) {
    if (event.key === 'Backspace' && index > 0 && code[index] === '') {
      inputRefs[index - 1].current.focus()
    }
  }
  async function resetActiveAccount() {
    if (emailUser) {
      setLoadingResetActiveAccount(true)
      const returnResetEmailActiveAccountUser =
        await resetSendEmailActiveAccountUser(emailUser)
      if (returnResetEmailActiveAccountUser) {
        setLoadingResetActiveAccount(false)
      }
    }
  }

  useEffect(() => {
    inputRefs[0].current?.focus()
  }, [])

  return (
    <main className="flex justify-center items-center gap-5">
      <div className="w-[40%] m-auto">
        <img src="logomarca.png" className="h-[5%] absolute top-4 ml-5" />
        <div className="w-[70%] m-auto">
          <Title title="Ativar Conta" />
          <div className="w-max m-auto">
            {Array.from({ length: 4 }).map((_, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                value={code[index]}
                maxLength={1}
                className="border ml-1 mr-1 border-black w-14 h-14 text-center text-2xl font-bold"
                onChange={e => handleChangeCode(index, e)}
                onKeyDown={e => handleKeyDown(index, e)}
              />
            ))}
          </div>

          <div className="mt-3 text-center">
            {loadingResetActiveAccount ? (
              <p className="flex justify-center items-center gap-2">
                Carregando
                <SpinnerGap size={32} className="animate-spin" />
              </p>
            ) : (
              <p
                className="cursor-pointer hover:underline"
                onClick={resetActiveAccount}
              >
                Não recebeu? Reenviar
              </p>
            )}
          </div>

          <div className="lg:w-full flex justify-center items-center mt-5">
            <Button title="Ativar Conta" onClick={activeAccount} />
          </div>
        </div>
      </div>
      <div className="w-[60%] m-auto">
        <img src="image.png" className="w-full h-screen" />
      </div>
    </main>
  )
}
