export function formatPhone(event: any) {
  const value = event.replace(/\D/g, '')
  const maskedValue = value.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1)$2-$3')

  return maskedValue
}

export function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
  const value = event.target.value.replace(/\D/g, '')
  const maskedValue = value.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1)$2-$3')

  event.target.value = maskedValue
}
