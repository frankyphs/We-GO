const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index")


const auth = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw {
        name: "JsonWebTokenError"
      }
    }

    const payload = verifyToken(access_token)

    const foundUser = await User.findByPk(payload.id)
    if (!foundUser) {
      throw {
        name: "User Not Found"
      }
    }

    req.additionalData = payload

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = auth