const errorHandling = async (err, req, res, next) => {
  console.log("ERRORHANDLINGGGGGG", err);
  switch (err.name) {
    case "SequelizeValidationError":
      let dataErr = err.errors.map((er) => {
        return er.message
      })
      if (dataErr.length == 2) {
        dataErr = dataErr[1]
      } else {
        dataErr = dataErr[0]
      }
      res.status(400).json({
        message: dataErr
      })
      break;

    case "SequelizeUniqueConstraintError":
      let dataErr1 = err.errors.map((er) => {
        return er.message
      })
      if (dataErr1.length == 2) {
        dataErr1 = dataErr1[1]
      } else {
        dataErr1 = dataErr1[0]
      }
      res.status(400).json({
        message: dataErr1
      })
      break;
    case "loginError":
      res.status(401).json({
        message: "Invalid email or password",
      });
      break;
    case "JsonWebTokenError":
      res.status(401).json({
        message: "Invalid token"
      })
      break;
    case "Product Not Found":
      res.status(404).json({
        message: "Product not found",
      });
      break;
    case "Venue Not Found":
      res.status(404).json({
        message: "Venue Not Found",
      });
      break;
    case "Cathering Not Found":
      res.status(404).json({
        message: "Cathering Not Found",
      });
      break;
    case "Photography Not Found":
      res.status(404).json({
        message: "Photography Not Found",
      });
      break;
    case "Cart Not Found":
      res.status(404).json({
        message: "Cart Not Found",
      });
      break;
    case "Transaction Not Found":
      res.status(404).json({
        message: "Transaction Not Found",
      });
      break;
    case "User Not Found":
      res.status(404).json({
        message: "User Not Found",
      });
      break;
    default:
      res.status(500).json({
        message: "Internal Server Error",
      });
      break;
  }
};

module.exports = errorHandling;
