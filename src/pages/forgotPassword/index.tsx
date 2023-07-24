'use client'
import React, { useEffect, useRef, useState } from 'react'
import { ForgotPasswordType } from '@/Types/ForgotPasswordType'
import { Button } from '@/components/buttons'
import { Label, styleInput } from '@/components/inputs'
import { TextError, Title } from '@/components/texts'
import {
  forgotPasswordSendEmail,
  forgotPasswordSendSMS,
  replacePasswordUser
} from '@/store/User'
import { useForm } from 'react-hook-form'
import { Eye, EyeSlash, SpinnerGap } from '@phosphor-icons/react'
import { PasswordChangeCodeType } from '@/Types/PasswordChangeCodeType'
import { AlertError, AlertInfo } from '@/components/alerts'

interface CodeState {
  [index: number]: string
}

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ForgotPasswordType>({
    defaultValues: {
      login: ''
    }
  })
  const [sendCodeReplacePassword, setSendCodeReplacePassword] =
    useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingResetPassword, setLoadingResetPassword] =
    useState<boolean>(false)
  const [errorPasswordDifferent, setErrorPasswordDifferent] =
    useState<boolean>(false)
  const [errorPassword, setErrorPassword] = useState<boolean>(false)
  const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>('')
  const [password, setPassword] = useState<string>()
  const [confirmedPassword, setConfirmedPassword] = useState<string>('')
  const [typePassword, setTypePassword] = useState<string>('password')
  const [iconPassword, setIconPassword] = useState(<Eye size={32} />)
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
  const [loginUser, setLoginUser] = useState<string>('')

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
  async function onSubmit(data: ForgotPasswordType) {
    setLoginUser(data.login)

    if (data.login.includes('@')) {
      setLoading(true)
      const emailUser = data.login
      const returnForgotPasswordSendEmail = await forgotPasswordSendEmail(
        emailUser
      )
      if (returnForgotPasswordSendEmail) {
        setLoading(false)
        setSendCodeReplacePassword(true)
        setLoadingResetPassword(false)
        reset()
      }
    } else {
      const contactUser = data.login.replace(/\D/g, '')
      const returnForgotPasswordSendSMS = await forgotPasswordSendSMS(
        contactUser
      )
      if (returnForgotPasswordSendSMS) {
        setLoading(false)
        setSendCodeReplacePassword(true)
        setLoadingResetPassword(false)
        reset()
      }
    }
  }
  async function onSubmitReplacePassword() {
    if (password) {
      if (password == confirmedPassword) {
        const codeReplacePassword =
          code[0] + code[1] + code[2] + code[3].toString()
        const data: PasswordChangeCodeType = {
          code: parseInt(codeReplacePassword),
          password
        }

        const verifyPasswordBoolean = verifyPassword(password)
        if (verifyPasswordBoolean) {
          const returnReplacePasswordUser = await replacePasswordUser(data)
          if (returnReplacePasswordUser) {
            setPassword('')
            setConfirmedPassword('')
            setCode('')
            setSendCodeReplacePassword(false)
            window.location.replace('/')
          }
          setErrorPassword(false)
        } else {
          setErrorPasswordMessage(
            'Senha fraca! Senha deve conter no mínimo 8 caracteres, 1 número, 1 caractere especial'
          )
          AlertInfo(
            'Senha fraca! Senha deve conter no mínimo 8 caracteres, 1 número, 1 caractere especial'
          )
          setErrorPassword(true)
        }
      } else {
        AlertInfo('Verifique suas senhas! Elas são diferentes!')
      }
    }
  }
  function resetForgotPassword() {
    setLoadingResetPassword(true)
    onSubmit({ login: loginUser })
  }
  function verifyPassword(password: string) {
    if (password.length < 8) {
      return false
    }

    const specialCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/
    const number = /[0-9]/

    if (!specialCharacter.test(password) || !number.test(password)) {
      return false
    }

    return true
  }

  useEffect(() => {
    if (confirmedPassword && confirmedPassword != password) {
      setErrorPasswordDifferent(true)
    } else {
      setErrorPasswordDifferent(false)
    }
  }, [confirmedPassword, password])
  useEffect(() => {
    inputRefs[0].current?.focus()
  }, [])

  return (
    <main className="flex justify-center items-center gap-5">
      <div className="w-[40%] m-auto">
        <img src="logomarca.png" className="h-[5%] absolute top-4 ml-5" />

        <div className="w-[70%] m-auto">
          <Title title="Recuperar Senha" />

          {sendCodeReplacePassword ? (
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
          ) : (
            <div className="mt-1 mb-1">
              <Label text="E-mail ou Celular" />
              <input
                id="login"
                type="text"
                placeholder="Informe seu Login"
                className={styleInput}
                {...register('login', {
                  required: 'Informe esse campo'
                })}
                name="login"
              />

              {errors.login && <TextError text={errors.login.message} />}
            </div>
          )}

          {sendCodeReplacePassword && (
            <div className="mt-3 text-center">
              {loadingResetPassword ? (
                <p className="flex justify-center items-center gap-2">
                  Carregando
                  <SpinnerGap size={32} className="animate-spin" />
                </p>
              ) : (
                <p
                  className="cursor-pointer hover:underline"
                  onClick={resetForgotPassword}
                >
                  Não recebeu? Reenviar
                </p>
              )}
            </div>
          )}

          {sendCodeReplacePassword && (
            <div className="mt-10">
              <Title title="Nova Senha" />

              <div className="mb-1">
                <Label text="Senha" />
                <span className="flex justify-start items-center w-[105%]">
                  <input
                    type={typePassword}
                    id="password"
                    placeholder="Informe sua Senha"
                    className={styleInput}
                    onChange={(e: any) => {
                      setPassword(e.target.value)
                    }}
                    name="password"
                  />
                  <span
                    className="relative right-10 cursor-pointer hover:scale-105 duration-150"
                    onClick={() => {
                      if (typePassword == 'password') {
                        setTypePassword('text')
                        setIconPassword(<EyeSlash size={32} />)
                      } else {
                        setTypePassword('password')
                        setIconPassword(<Eye size={32} />)
                      }
                    }}
                  >
                    {iconPassword}
                  </span>
                </span>
                {errorPassword && <TextError text={errorPasswordMessage} />}
              </div>

              <div className="mt-1 mb-1">
                <Label text="Repetir Senha" />
                <span className="flex justify-start items-center w-[105%]">
                  <input
                    id="confirmedPassword"
                    type={typePassword}
                    placeholder="Repita sua Senha"
                    className={styleInput}
                    value={confirmedPassword}
                    onChange={(e: any) => {
                      setConfirmedPassword(e.target.value)
                    }}
                    name="confirmedPassword"
                  />
                  <span
                    className="relative right-10 cursor-pointer hover:scale-105 duration-150"
                    onClick={() => {
                      if (typePassword == 'password') {
                        setTypePassword('text')
                        setIconPassword(<EyeSlash size={32} />)
                      } else {
                        setTypePassword('password')
                        setIconPassword(<Eye size={32} />)
                      }
                    }}
                  >
                    {iconPassword}
                  </span>
                </span>
                {errorPasswordDifferent && (
                  <TextError text="Senhas são Diferentes!" />
                )}
              </div>
            </div>
          )}

          {sendCodeReplacePassword ? (
            <div className="lg:w-full flex justify-center items-center mt-5">
              <Button title="Trocar Senha" onClick={onSubmitReplacePassword} />
            </div>
          ) : (
            <div className="lg:w-full flex justify-center items-center mt-5">
              <Button
                title={
                  loading ? (
                    <p className="flex justify-start items-center gap-2">
                      Carregando
                      <SpinnerGap size={32} className="animate-spin" />
                    </p>
                  ) : (
                    'Recuperar'
                  )
                }
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          )}

          <div className="mt-3 text-center">
            <a href="/" className="text-md hover:underline">
              Voltar ao login
            </a>
          </div>
        </div>
      </div>
      <div className="w-[60%] m-auto">
        <img src="image.png" className="w-full h-screen" />
      </div>
    </main>
  )
}
