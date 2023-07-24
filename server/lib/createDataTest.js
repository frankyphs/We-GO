
const { User, Venue, Product, Photography, Cathering } = require('../models/index');
const dataUser = require('../db/user.json');
const dataVenue = require('../db/venue.json');
const dataPhotography = require('../db/photography.json');
const dataCathering = require('../db/cathering.json');
const dataProduct = require('../db/product.json');

// Update createdAt and updatedAt properties for each dataset
const currentDate = new Date();

const data1 = dataUser.map((el) => ({
    ...el,
    createdAt: currentDate,
    updatedAt: currentDate,
}));

const data2 = dataVenue.map((el) => ({
    ...el,
    createdAt: currentDate,
    updatedAt: currentDate,
}));

const data3 = dataPhotography.map((el) => ({
    ...el,
    createdAt: currentDate,
    updatedAt: currentDate,
}));

const data4 = dataCathering.map((el) => ({
    ...el,
    createdAt: currentDate,
    updatedAt: currentDate,
}));

const data5 = dataProduct.map((el) => ({
    ...el,
    createdAt: currentDate,
    updatedAt: currentDate,
}));

const insertUser = async () => {
    try{
        await User.bulkCreate(data1)
    }catch(err){
        console.log(err);
    }
}

const insertVenue = async () => {
    try{
        await Venue.bulkCreate(data2)
    }catch(err){
        console.log(err);
    }
}

const insertPhotography = async () => {
    try{
        await Photography.bulkCreate(data3)
    }catch(err){
        console.log(err);
    }
}

const insertCathering = async () => {
    try{
        await Cathering.bulkCreate(data4)
    }catch(err){
        console.log(err);
    }
}

const insertProduct = async () => {
    try{
        await Product.bulkCreate(data5)
    }catch(err){
        console.log(err);
    }
}


module.exports = { insertUser, insertVenue, insertPhotography, insertCathering, insertProduct }