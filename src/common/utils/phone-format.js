const formatPhoneNumber = (phone) => {
  const cleanPhone = phone.replace(/\D/g, '')
  const trimmedPhone = cleanPhone.replace(/^0+/, '')

  return `+62${trimmedPhone}`
}

const validatePhoneNumber = (phone) => {
  const phoneRegex = /^(0?8)\d{8,12}$/
  return phoneRegex.test(phone)
}

module.exports = {
  formatPhoneNumber,
  validatePhoneNumber
}
