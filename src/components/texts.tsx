import React from 'react'

type TitleType = {
  title: string
  stylePlus?: string
}

export function Title(props: TitleType) {
  return (
    <h1
      className={`xl:text-3xl text-2xl font-bold text-center ${props.stylePlus}`}
    >
      {props.title}
    </h1>
  )
}

type TextErrorType = {
  text: any
}

export function TextError(props: TextErrorType) {
  return <p className="text-red-600 mt-1 text-sm">{props.text}</p>
}
