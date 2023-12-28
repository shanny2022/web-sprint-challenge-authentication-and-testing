const bcrypt = require('bcryptjs')

module.exports = (req, res, next) => {
  const { password } = req.user
  const passwordsMatch = bcrypt.compareSync(req.body.password, password)

  if (!passwordsMatch) {
    return next({
      status: 401,
      message: 'invalid credentials'
    })
  }

  return next()
}
