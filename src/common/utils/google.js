const ExtractUsernameFromEmail = (email) => {
    return email.split('@')[0].replace(/\s+/g, '')
}

module.exports = {
    ExtractUsernameFromEmail
}
