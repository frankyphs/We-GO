const { sequelize } = require("../models");

const deleteUser = async () => {
  await sequelize.queryInterface.bulkDelete(`Users`, null, {
    truncate: true, restartIdentity: true, cascade: true
  })
}
const deleteVenue = async () => {
  await sequelize.queryInterface.bulkDelete(`Venues`, null, {
    truncate: true, restartIdentity: true, cascade: true
  })
}
const deleteProduct = async () => {
  await sequelize.queryInterface.bulkDelete(`Products`, null, {
    truncate: true, restartIdentity: true, cascade: true
  })
}
const deleteCathering = async () => {
  await sequelize.queryInterface.bulkDelete(`Catherings`, null, {
    truncate: true, restartIdentity: true, cascade: true
  })
}
const deletePhotography = async () => {
  await sequelize.queryInterface.bulkDelete(`Photographies`, null, {
    truncate: true, restartIdentity: true, cascade: true
  })
}
const deleteCart = async () => {
  await sequelize.queryInterface.bulkDelete(`Carts`, null, {
    truncate: true, restartIdentity: true, cascade: true
  })
}
const deleteTransaction = async () => {
  await sequelize.queryInterface.bulkDelete(`Transactions`, null, {
    truncate: true, restartIdentity: true, cascade: true
  })
}


module.exports = { deleteUser, deleteVenue, deleteProduct, deleteCathering, deletePhotography, deleteCart, deleteTransaction }