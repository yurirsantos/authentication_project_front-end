import React from 'react'
import { toast } from 'react-toastify'

export function AlertSuccess(text: string) {
  return toast.success(text, {
    position: 'top-left',
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored'
  })
}

export function AlertError(text: string) {
  return toast.error(text, {
    position: 'top-left',
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored'
  })
}

export function AlertWarn(text: string) {
  return toast.warn(text, {
    position: 'top-left',
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored'
  })
}

export function AlertInfo(text: string) {
  return toast.info(text, {
    position: 'top-left',
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored'
  })
}
