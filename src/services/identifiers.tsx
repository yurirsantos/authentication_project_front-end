import { searchCep } from './viaCep'

export function formatCpf(event: any) {
  const value = event.replace(/\D/g, '')
  const maskedValue = value.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.$2.$3-$4'
  )

  return maskedValue
}
export function formatCnpj(event: any) {
  const value = event.replace(/\D/g, '')
  const maskedValue = value.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5'
  )

  return maskedValue
}
export function formatPhone(event: any) {
  const value = event.replace(/\D/g, '')
  const maskedValue = value.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1)$2-$3')

  return maskedValue
}
export function formatCep(event: any) {
  const value = event.replace(/\D/g, '')
  const maskedValue = value.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3')

  return maskedValue
}
export function formatCurrency(event: React.ChangeEvent<HTMLInputElement>) {
  const value = event.target.value
  const numericValue = parseFloat(value.replace(/\D/g, ''))
  const maskedValue = (numericValue / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })

  return maskedValue
}

export function handleCpfChange(event: React.ChangeEvent<HTMLInputElement>) {
  const value = event.target.value.replace(/\D/g, '')
  const maskedValue = value.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.$2.$3-$4'
  )

  event.target.value = maskedValue
}
export function handleCnpjChange(event: React.ChangeEvent<HTMLInputElement>) {
  const value = event.target.value.replace(/\D/g, '')
  const maskedValue = value.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5'
  )

  event.target.value = maskedValue
}
export function handleCepChange(event: React.ChangeEvent<HTMLInputElement>) {
  const value = event.target.value.replace(/\D/g, '')
  const maskedValue = value.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3')

  event.target.value = maskedValue
}
export function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
  const value = event.target.value.replace(/\D/g, '')
  const maskedValue = value.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1)$2-$3')

  event.target.value = maskedValue
}
export function handleCurrencyChange(
  event: React.ChangeEvent<HTMLInputElement>
) {
  const value = event.target.value
  const numericValue = parseFloat(value.replace(/\D/g, ''))
  const maskedValue = (numericValue / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })

  event.target.value = maskedValue
}
