'use client'
import { ForgotPasswordType } from '@/Types/ForgotPasswordType'
import { AlertInfo } from '@/components/alerts'
import { Button } from '@/components/buttons'
import { Label, styleInput } from '@/components/inputs'
import { TextError, Title } from '@/components/texts'
import { forgotPasswordSendEmail, forgotPasswordSendSMS } from '@/store/User'
import React from 'react'
import { useForm } from 'react-hook-form'

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

  async function onSubmit(data: ForgotPasswordType) {
    if (data.login.includes('@')) {
      const emailUser = data.login
      const returnForgotPasswordSendEmail = await forgotPasswordSendEmail(
        emailUser
      )
      if (returnForgotPasswordSendEmail) {
        reset()
      }
    } else {
      const contactUser = data.login.replace(/\D/g, '')
      const returnForgotPasswordSendSMS = await forgotPasswordSendSMS(
        contactUser
      )
      if (returnForgotPasswordSendSMS) {
        reset()
      }
    }
  }
  function resendMessage() {
    AlertInfo('Função em Desenvolvimento')
  }

  return (
    <main className="flex justify-center items-center gap-5">
      <div className="w-[40%] m-auto">
        <img src="logomarca.png" className="h-[5%] absolute top-4 ml-5" />

        <div className="w-[70%] m-auto">
          <Title title="Recuperar Senha" />

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

          <div className="mt-3 text-end">
            <p
              className="cursor-pointer hover:underline"
              onClick={resendMessage}
            >
              Não recebeu? Reenviar
            </p>
          </div>

          <div className="lg:w-full flex justify-center items-center mt-5">
            <Button title="Recuperar" onClick={handleSubmit(onSubmit)} />
          </div>

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
