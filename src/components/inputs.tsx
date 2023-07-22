import React from 'react'

export const styleInput =
  'input bg-white border-1 border-black w-full placeholder:italic rounded-none'
export const styleSelect = 'select select-bordered w-full'
export const styleTextarea =
  'textarea bg-white border-1 border-black w-full placeholder:italic h-44 rounded-none'

type LabelType = {
  text: string
}

export function Label(props: LabelType) {
  return <label className="label">{props.text}</label>
}
