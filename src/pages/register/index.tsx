'use client'

import { UserType } from '@/Types/UserType'
import { AlertInfo } from '@/components/alerts'
import { Button } from '@/components/buttons'
import { Label, styleInput } from '@/components/inputs'
import { TextError, Title } from '@/components/texts'
import { handlePhoneChange } from '@/services/identifiers'
import { postUser } from '@/store/User'
import { Eye, EyeSlash } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UserType>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      acceptTerm: false,
      receiveOffers: false
    }
  })
  const [password, setPassword] = useState<string>()
  const [confirmedPassword, setConfirmedPassword] = useState<string>('')
  const [errorPasswordDifferent, setErrorPasswordDifferent] =
    useState<boolean>(false)
  const [typePassword, setTypePassword] = useState<string>('password')
  const [iconPassword, setIconPassword] = useState(<Eye size={32} />)

  async function onSubmit(data: UserType) {
    if (data.receiveOffers.toString() == 'yes') {
      data.receiveOffers = true
    } else {
      data.receiveOffers = false
    }
    data.phone = data.phone.replace(/\D/g, '')

    if (password != confirmedPassword) {
      AlertInfo('Verifique suas senhas! Elas são diferentes!')
    } else {
      const returnPostUser = await postUser(data)
      if (returnPostUser) {
        reset()
        setConfirmedPassword('')
      }
    }
  }

  useEffect(() => {
    if (confirmedPassword && confirmedPassword != password) {
      setErrorPasswordDifferent(true)
    } else {
      setErrorPasswordDifferent(false)
    }
  }, [confirmedPassword, password])

  return (
    <main className="flex justify-center items-center gap-5">
      <div className="w-[40%] m-auto">
        <img src="logomarca.png" className="lg:h-[5%] absolute top-4 ml-5" />

        <div className="w-[70%] m-auto">
          <Title title="Cadastre-se" />
          <div className="mt-1 mb-1">
            <Label text="Nome" />
            <input
              id="name"
              type="text"
              placeholder="Informe seu Nome"
              className={styleInput}
              {...register('name', {
                required: 'Informe esse campo',
                minLength: { value: 3, message: 'Informe um Nome Válido!' }
              })}
              name="name"
              minLength={3}
            />

            {errors.name && <TextError text={errors.name.message} />}
          </div>

          <div className="mt-1 mb-1">
            <Label text="E-mail" />
            <input
              type="email"
              placeholder="Informe seu E-mail"
              className={styleInput}
              {...register('email', {
                required: 'Informe esse campo',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: 'Informe um email válido!'
                }
              })}
            />
            {errors.email && <TextError text={errors.email.message} />}
          </div>

          <div className="mt-1 mb-1">
            <Label text="Celular" />
            <input
              type="text"
              id="phone"
              placeholder="Informe seu Contato"
              className={styleInput}
              {...register('phone', {
                required: 'Informe esse campo',
                maxLength: { value: 17, message: 'Contato Inválido!' }
              })}
              name="phone"
              onChange={handlePhoneChange}
              maxLength={17}
            />
            {errors.phone && <TextError text={errors.phone.message} />}
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
                onChange={(e: any) => {
                  setPassword(e.target.value)
                }}
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
            {errorPasswordDifferent && (
              <TextError text="Senhas são Diferentes!" />
            )}
          </div>

          <div className="mt-4 mb-3">
            <div className="flex justify-start items-center gap-2">
              <input
                type="checkbox"
                id="acceptTerm"
                {...register('acceptTerm', {
                  required: 'Informe esse campo'
                })}
                name="acceptTerm"
                className="checkbox-black accent-black checkbox-sm cursor-pointer"
              />
              <label htmlFor="acceptTerm" className="cursor-pointer">
                Eu li e aceito a{' '}
              </label>
              <a className="text-blue-500 underline cursor-pointer hover:text-blue-700 active:text-blue-900 focus:text-blue-700">
                política de privacidade
              </a>
              .
            </div>
            {errors.acceptTerm && (
              <TextError text={errors.acceptTerm.message} />
            )}
          </div>

          <div className="text-center mt-8">
            <p>Quero receber ofertas, novidades, conteúdos</p>
            <p>informativos e publicitários.</p>
            <div className="mt-3 flex justify-center items-center gap-3">
              <input
                id="radioYesReceiveOffers"
                type="radio"
                {...register('receiveOffers', {
                  required: 'Informe esse campo'
                })}
                value="yes"
                name="receiveOffers"
                className="radio radio-sm accent-black cursor-pointer"
              />
              <label htmlFor="radioYesReceiveOffers" className="cursor-pointer">
                Sim
              </label>

              <input
                id="radioNoReceiveOffers"
                type="radio"
                {...register('receiveOffers', {
                  required: 'Informe esse campo'
                })}
                value="no"
                name="receiveOffers"
                className="radio radio-sm accent-black cursor-pointer"
              />
              <label htmlFor="radioNoReceiveOffers" className="cursor-pointer">
                Não
              </label>
            </div>
          </div>

          <div className="lg:w-full flex justify-center items-center mt-5">
            <Button title="Cadastrar" onClick={handleSubmit(onSubmit)} />
          </div>

          <div className="mt-8 text-center">
            <p>Ainda já é cliente?</p>
            <a href="/" className="cursor-pointer hover:underline font-bold">
              Fazer Login
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
