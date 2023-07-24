import Link from 'next/link'
import React from 'react'

type ButtonType = {
  title: any
  stylePlus?: string
  onClick?: any
  link?: string
  htmlFor?: string
}

export function Button(props: ButtonType) {
  const style =
    'btn bg-black hover:bg-gray-800 focus:bg-gray-800 active:bg-gray-800 w-max m-auto duration-150 text-white font-bold rounded-none text-xs'

  return props.link ? (
    <Link href={props.link} className={style} onClick={props.onClick}>
      {props.title}
    </Link>
  ) : (
    <button className={style} onClick={props.onClick}>
      {props.title}
    </button>
  )
}
