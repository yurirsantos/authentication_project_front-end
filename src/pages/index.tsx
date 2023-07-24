'use client'
import { LoginType } from '@/Types/LoginType'
import { AlertError } from '@/components/alerts'
import { Button } from '@/components/buttons'
import { Label, styleInput } from '@/components/inputs'
import { TextError, Title } from '@/components/texts'
import ActionsUserType from '@/redux/user/actionTypes'
import { loginUser } from '@/redux/user/actions'
import { handlePhoneChange } from '@/services/identifiers'
import { authenticationUser } from '@/store/Authentication'
import { Eye, EyeSlash } from '@phosphor-icons/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginType>({
    defaultValues: {
      login: '',
      password: ''
    }
  })
  const [typePassword, setTypePassword] = useState<string>('password')
  const [iconPassword, setIconPassword] = useState(<Eye size={32} />)
  const dispatch = useDispatch()

  async function onSubmit(data: LoginType) {
    const returnAuthentication = await authenticationUser(data)
    if (returnAuthentication) {
      dispatch(
        loginUser(returnAuthentication.user, returnAuthentication.access_token)
      )
      window.location.replace('/homePage')
    } else {
      AlertError('Usuário ou senha incorreta, tente novamente.')
    }
  }

  return (
    <main className="flex justify-center items-center gap-5">
      <div className="w-[40%] m-auto">
        <img src="logomarca.png" className="h-[5%] absolute top-4 ml-5" />

        <div className="w-[70%] m-auto">
          <Title title="Login" />

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

          <div className="mt-1 mb-1">
            <Label text="Senha" />
            <span className="flex justify-start items-center w-[105%]">
              <input
                type={typePassword}
                id="password"
                placeholder="Informe sua Senha"
                className={styleInput}
                {...register('password', {
                  required: 'Informe esse campo'
                })}
                name="password"
              />
              <span
                className="relative z-20 right-10 cursor-pointer hover:scale-105 duration-150"
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
            {errors.password && <TextError text={errors.password.message} />}
          </div>

          <div className="mt-3 text-end">
            <a
              href="/forgotPassword"
              className="cursor-pointer hover:underline"
            >
              Esqueci minha senha
            </a>
          </div>

          <div className="lg:w-full flex justify-center items-center mt-5">
            <Button title="Conectar" onClick={handleSubmit(onSubmit)} />
          </div>

          <div className="mt-8 text-center">
            <p>Ainda não é cliente? </p>
            <a href="/register" className="font-bold text-lg hover:underline">
              Criar Conta
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
