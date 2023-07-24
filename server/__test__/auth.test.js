const request = require('supertest');
const app = require('../app');
const { insertProduct, insertPhotography, insertVenue, insertCathering, insertUser } = require('../lib/createDataTest');
const { deletePhotography, deleteVenue, deleteCathering, deleteProduct, deleteUser } = require('../lib/deleteDataTest');
const xendit = require('xendit-node');

beforeAll(async () => {
  insertUser()
  insertVenue()
  insertPhotography()
  insertCathering()
  insertProduct()
})

afterAll(async () => {
  deleteUser()
  deleteVenue()
  deletePhotography()
  deleteCathering()
  deleteProduct()
})



let token = ""

describe('when POST /users/register', () => {
  it('should response 201 and persisted customer user', async () => {
    const requestPayload = {
      email: 'dadang@gmail.com',
      username: 'johndoe',
      password: '123456',
    };

    const response = await request(app)
      .post('/users/register')
      .send(requestPayload)
      .set('Accept', 'application/json');

    const { body } = response
    expect(response.status).toEqual(201);
    expect(body.message).toBeDefined();
  })
  it('should response 400 and error Username must be Unique', async () => {
    const requestPayload = {
      email: 'dadang@gmail.com',
      username: 'johndoe',
      password: '123456',
    };
    const response = await request(app)
      .post('/users/register')
      .send(requestPayload)
      .set('Accept', 'application/json');

    const { body } = response
    expect(response.status).toEqual(400);
    expect(body.message).toBeDefined();
  })
  it('should response 400 and error Email cant be null', async () => {
    const requestPayload = {
      email: null,
      username: 'johndoe',
      password: '123456',
    };
    const response = await request(app)
      .post('/users/register')
      .send(requestPayload)
      .set('Accept', 'application/json');

    const { body } = response
    expect(response.status).toEqual(400);
    expect(body.message).toBeDefined();
  })
  it('should response 400 and error Email cant be Empty', async () => {
    const requestPayload = {
      email: '',
      username: 'johndoe',
      password: '123456',
    };
    const response = await request(app)
      .post('/users/register')
      .send(requestPayload)
      .set('Accept', 'application/json');

    const { body } = response
    expect(response.status).toEqual(400);
    expect(body.message).toBeDefined();
  })
  it('should response 400 and error Email must be Unique', async () => {
    const requestPayload = {
      email: 'dadang@gmail.com',
      username: 'johndoe2',
      password: '123456',
    };
    const response = await request(app)
      .post('/users/register')
      .send(requestPayload)
      .set('Accept', 'application/json');

    const { body } = response
    expect(response.status).toEqual(400);
    expect(body.message).toBeDefined();
  })
  it('should response 400 and error password cant be null', async () => {
    const requestPayload = {
      email: 'dadang@gmail.com',
      password: ' ',
    };
    const response = await request(app)
      .post('/users/register')
      .send(requestPayload)
      .set('Accept', 'application/json');

    const { body } = response
    expect(response.status).toEqual(400);
    expect(body.message).toBeDefined();
  })
  it('should response 400 and error password cant be Empty', async () => {
    const requestPayload = {
      email: 'dadang@gmail.com',
      password: null,
    };
    const response = await request(app)
      .post('/users/register')
      .send(requestPayload)
      .set('Accept', 'application/json');

    const { body } = response
    expect(response.status).toEqual(400);
    expect(body.message).toBeDefined();
  })
  it('should response 400 and error Password minimum 5 characters', async () => {
    const requestPayload = {
      email: 'dadang@gmail.com',
      password: `1234`,
    };
    const response = await request(app)
      .post('/users/register')
      .send(requestPayload)
      .set('Accept', 'application/json');

    const { body } = response
    expect(response.status).toEqual(400);
    expect(body.message).toBeDefined();
  })
})

describe('when POST /users/login', () => {
  it('should response 201 and persisted customer user', async () => {
    const requestPayload = {
      email: 'dadang@gmail.com',
      password: `123456`,
    };
    const response = await request(app)
      .post('/users/login')
      .send(requestPayload)
      .set('Accept', 'application/json');

    const { body } = response
    expect(response.status).toEqual(201);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
    token = response.body.access_token
  })

  it('should response 401 and error Email Invalid', async () => {
    const requestPayload = {
      email: 'dadang2@gmail.com',
      password: `123456`,
    };
    const response = await request(app)
      .post('/users/login')
      .send(requestPayload)
      .set('Accept', 'application/json');

    const { body } = response
    expect(response.status).toEqual(401);
    expect(body.message).toBeDefined();
  })

  it('should response 401 and error Email is requred', async () => {
    const requestPayload = {
      email: null,
      password: `123456`,
    };
    const response = await request(app)
      .post('/users/login')
      .send(requestPayload)
      .set('Accept', 'application/json');

    const { body } = response
    expect(response.status).toEqual(401);
    expect(body.message).toBeDefined();
  })

  it('should response 401 and error Password Invalid', async () => {
    const requestPayload = {
      email: 'dadang2@gmail.com',
      password: `1234`,
    };
    const response = await request(app)
      .post('/users/login')
      .send(requestPayload)
      .set('Accept', 'application/json');

    const { body } = response
    expect(response.status).toEqual(401);
    expect(body.message).toBeDefined();
  })

  it('should response 401 and error Password is required', async () => {
    const requestPayload = {
      email: 'dadang2@gmail.com',
      password: null,
    }

    const response = await request(app)
      .post('/users/login')
      .send(requestPayload)
      .set('Accept', 'application/json');

    const { body } = response
    expect(response.status).toEqual(401);
    expect(body.message).toBeDefined();
  })
})

describe('when GET /users/', () => {
  it('should response 200 and Get Selected User', async () => {
    const response = await request(app)
      .get('/users')
      .set('access_token', `${token}`);

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })

  it('should response 401 and error User not login ', async () => {
    const response = await request(app)
      .get('/users')

    const { body } = response
    expect(response.status).toEqual(401);
    expect(body.message).toBeDefined();
  })

  it('should response 401 and error Acces Token Invalid ', async () => {
    const response = await request(app)
      .get('/users')
      .set('access_token', `dsaasdshadsajb`);

    const { body } = response
    expect(response.status).toEqual(401);
    expect(body.message).toBeDefined();
  })

  it('should response 404 and error User Not Found', async () => {
    const response = await request(app)
      .get('/users')
      .set('access_token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwLCJlbWFpbCI6ImRhZGFuZ0BnbWFpbC5jb20iLCJyb2xlIjoiQ3VzdG9tZXIiLCJpYXQiOjE2ODgzNjY5ODF9.3PMdWOTAa3b4MQbusyMHT881-E40fZuLJ5A2MfUNLzw`);

    const { body } = response
    expect(response.status).toEqual(404);
    expect(body.message).toBeDefined();
  })
})

describe('when GET /catherings', () => {
  it('should response 200 and Get Cathering', async () => {
    const response = await request(app)
      .get('/catherings')

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })

  it('should response 200 and Get Cathering with bellowPrice', async () => {
    const bellowPrice = {
      belowPrice: 2000000,
    }

    const response = await request(app)
      .get('/catherings')
      .query(bellowPrice)

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })

  it('should response 200 and Get Cathering with search Byname', async () => {
    const search = {
      search: `Mitra`,
    }
    const response = await request(app)
      .get('/catherings')
      .query(search)

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })

  it('should response 200 and Get Cathering with search price to lowest', async () => {
    const price = {
      price: `lowest`,
    }
    const response = await request(app)
      .get('/catherings')
      .query(price)

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })

  it('should response 200 and Get Cathering with search price to higest', async () => {
    const price = {
      price: `higest`,
    }
    const response = await request(app)
      .get('/catherings')
      .query(price)

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })
})

describe('when GET /catherings/:id', () => {
  it(`should response 200 and Get Cathering by id`, async () => {

    const response = await request(app)
      .get('/catherings/1')

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })
  it(`should response 404 and error Cathering data not Found`, async () => {

    const response = await request(app)
      .get('/catherings/100')

    const { body } = response
    expect(response.status).toEqual(404);
    expect(body.message).toBeDefined();
  })
  it(`should response 500 and error internal server Error`, async () => {
    const response = await request(app)
      .get('/catherings/:id')

    const { body } = response
    expect(response.status).toEqual(500);
    expect(body.message).toBeDefined();
  })
})

describe('when GET /photographies', () => {
  it('should response 200 and Get photographies', async () => {
    const response = await request(app)
      .get('/photographies')

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })

  it('should response 200 and Get photographies with bellowPrice', async () => {
    const bellowPrice = {
      belowPrice: 5000000,
    }

    const response = await request(app)
      .get('/photographies')
      .query(bellowPrice)

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })

  it('should response 200 and Get photographies with search Byname', async () => {
    const search = {
      search: `David`,
    }
    const response = await request(app)
      .get('/photographies')
      .query(search)

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })

  it('should response 200 and Get photographies with search price to lowest', async () => {
    const price = {
      price: `lowest`,
    }
    const response = await request(app)
      .get('/photographies')
      .query(price)

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })

  it('should response 200 and Get photographies with search price to higest', async () => {
    const price = {
      price: `higest`,
    }
    const response = await request(app)
      .get('/photographies')
      .query(price)

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })
})

describe('when GET /photographies/:id', () => {
  it(`should response 200 and Get photographies by id`, async () => {

    const response = await request(app)
      .get('/photographies/1')

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })
  it(`should response 404 and error photographies data not Found`, async () => {

    const response = await request(app)
      .get('/photographies/100')

    const { body } = response
    expect(response.status).toEqual(404);
    expect(body.message).toBeDefined();
  })
  it(`should response 500 and error internal server Error`, async () => {
    const response = await request(app)
      .get('/photographies/:id')

    const { body } = response
    expect(response.status).toEqual(500);
    expect(body.message).toBeDefined();
  })
})

describe('when GET /venues', () => {
  it('should response 200 and Get venues', async () => {
    const response = await request(app)
      .get('/venues')

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })

  it('should response 200 and Get venues with bellowPrice', async () => {
    const bellowPrice = {
      belowPrice: 5000000,
    }

    const response = await request(app)
      .get('/venues')
      .query(bellowPrice)

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })

  it('should response 200 and Get venues with search Byname', async () => {
    const search = {
      search: `David`,
    }
    const response = await request(app)
      .get('/venues')
      .query(search)

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })

  it('should response 200 and Get venues with search location', async () => {
    const location = {
      location: `Jakarta Utara`,
    }
    const response = await request(app)
      .get('/venues')
      .query(location)

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })

  it('should response 200 and Get venues with search price to lowest', async () => {
    const price = {
      price: `lowest`,
    }
    const response = await request(app)
      .get('/venues')
      .query(price)

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })

  it('should response 200 and Get venues with search price to higest', async () => {
    const price = {
      price: `higest`,
    }
    const response = await request(app)
      .get('/venues')
      .query(price)

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })
})

describe('when GET /venues/:id', () => {
  it(`should response 200 and Get venues by id`, async () => {

    const response = await request(app)
      .get('/venues/1')

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })
  it(`should response 404 and error venues data not Found`, async () => {

    const response = await request(app)
      .get('/venues/100')

    const { body } = response
    expect(response.status).toEqual(404);
    expect(body.message).toBeDefined();
  })
  it(`should response 500 and error internal server Error`, async () => {
    const response = await request(app)
      .get('/venues/:id')

    const { body } = response
    expect(response.status).toEqual(500);
    expect(body.message).toBeDefined();
  })
})

describe('when GET /products', () => {
  it('should response 200 and Get venues', async () => {
    const response = await request(app)
      .get('/products')

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })
})

describe('when GET /products/:id', () => {
  it('should response 200 and Get products', async () => {
    const response = await request(app)
      .get('/products/1')

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })
  it(`should response 404 and error products data not Found`, async () => {
    const response = await request(app)
      .get('/products/100')

    const { body } = response
    expect(response.status).toEqual(404);
    expect(body.message).toBeDefined();
  })

  it(`should response 500 and error internal server Error`, async () => {
    const response = await request(app)
      .get('/products/:id')

    const { body } = response
    expect(response.status).toEqual(500);
    expect(body.message).toBeDefined();
  })
})

describe('when POST /carts', () => {
  it('should response 201 and created cart', async () => {
    const requestPayload = {
      title: "test",
      bride: "test",
      groom: "test",
      weddingDate: "2023/08/18",
      contactNumber: 123456790,
      address: "test",
      PhotographyId: 1,
      CatheringId: 1,
      VenueId: 1,
      totalPrice: 100000000,
      pax: 300,
    };

    const response = await request(app)
      .post('/carts')
      .send(requestPayload)
      .set('access_token', `${token}`);

    const { body } = response
    expect(response.status).toEqual(201);
    expect(body.message).toBeDefined();
  })

  it('should response 400 and error Date input', async () => {
    const requestPayload = {
      title: "test",
      bride: "test",
      groom: "test",
      weddingDate: "2023/07/18",
      contactNumber: 123456790,
      address: "test",
      PhotographyId: 1,
      CatheringId: 1,
      VenueId: 1,
      totalPrice: 100000000,
      pax: 300,
    };

    const response = await request(app)
      .post('/carts')
      .send(requestPayload)
      .set('access_token', `${token}`);

    const { body } = response
    expect(response.status).toEqual(400);
    expect(body.message).toBeDefined();
  })
})

describe('when POST /carts/:idProduct', () => {
  it('should response 201 and created cart by id Product ', async () => {
    const requestPayload = {
      totalPrice: 10000000,
      pax: 100,
      groom: 'test',
      bride: 'test',
      weddingDate: "2023/08/18",
      contactNumber: 123456789,
      address: "asdfghjklq"
    }

    const response = await request(app)
      .post('/carts/1')
      .send(requestPayload)
      .set('access_token', `${token}`);

    const { body } = response
    expect(response.status).toEqual(201);
    expect(body.message).toBeDefined();
  })

  it('should response 400 and error Date input', async () => {
    const requestPayload = {
      totalPrice: 10000000,
      pax: 100,
      groom: 'test',
      bride: 'test',
      weddingDate: "2023/07/18",
      contactNumber: 123456789,
      address: "asdfghjklq"
    }

    const response = await request(app)
      .post('/carts/1')
      .send(requestPayload)
      .set('access_token', `${token}`);

    const { body } = response
    expect(response.status).toEqual(400);
    expect(body.message).toBeDefined();
  })

  it('should response 404 and error Cart Not Found', async () => {
    const requestPayload = {
      totalPrice: 10000000,
      pax: 100,
      groom: 'test',
      bride: 'test',
      weddingDate: "2023/07/18",
      contactNumber: 123456789,
      address: "asdfghjklq"
    }

    const response = await request(app)
      .post('/carts/100')
      .send(requestPayload)
      .set('access_token', `${token}`);

    const { body } = response
    expect(response.status).toEqual(404);
    expect(body.message).toBeDefined();
  })
})

describe('when GET /carts', () => {
  it('should response 200 and Get cart', async () => {
    const response = await request(app)
      .get('/carts')
      .set('access_token', `${token}`);

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })
})

describe(`when POST /transactions/payment/:cardid`, () => {
  it('should response 201 and Payment Gateway send', async () => {
    const payload = {
      title: 'test',
      totalAmount: 10000000
    }
    const response = await request(app)
      .post('/transactions/payment/1')
      .send(payload)
      .set('access_token', `${token}`);

    const { body } = response
    expect(response.status).toEqual(201);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })
})

describe(`when GET /transactions`, () => {
  it('should response 200 and transactions get User Id', async () => {
    const response = await request(app)
      .get('/transactions')
      .set('access_token', `${token}`);

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })
  it('should response 404 and transactions Not Found', async () => {
    const response = await request(app)
      .get('/transactions')
      .set('access_token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXRoaXJAZ21haWwuY29tIiwicm9sZSI6bnVsbCwidXNlcm5hbWUiOiJGYXRoaXIiLCJpYXQiOjE2ODg1MTA4MTF9.te2RFgxfyzND6Elo9YfSAkLXseMolqfARA4B9L19xkw`);

    const { body } = response
    expect(response.status).toEqual(404);
    expect(body.message).toBeDefined();
  })
})

describe(`when PACTH /transactions/update/:id`, () => {
  it('should response 200 and update status to paid send an invoice if the transaction is paid', async () => {
    const payload = {
      status: 'PAID'
    }

    const response = await request(app)
      .patch(`/transactions/update/1`)
      .send(payload)
      .set('access_token', `${token}`)

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body.message).toBeDefined();
  })
  it('should response 200 and Transaction Pending', async () => {
    const payload = {
      status: ''
    }

    const response = await request(app)
      .patch(`/transactions/update/1`)
      .send(payload)
      .set('access_token', `${token}`)

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body.message).toBeDefined();
  })
  it('should response 404 and error Transaction not found', async () => {
    const payload = {
      status: ''
    }

    const response = await request(app)
      .patch(`/transactions/update/100`)
      .send(payload)
      .set('access_token', `${token}`)

    const { body } = response
    expect(response.status).toEqual(404);
    expect(body.message).toBeDefined();
  })
})

describe(`when PATCH /carts/:cartid`, () => {
  it('should response 200 and Update status cart to paid', async () => {
    const response = await request(app)
      .patch('/carts/1')
      .set('access_token', `${token}`);

    const { body } = response
    expect(response.status).toEqual(200);
    expect(body).toBeDefined();
    expect(body).toBeInstanceOf(Object);
  })
  it('should response 404 and Cart Not Found', async () => {
    const response = await request(app)
      .patch('/carts/100')
      .set('access_token', `${token}`);

    const { body } = response
    expect(response.status).toEqual(404);
    expect(body.message).toBeDefined();
  })
})

describe('when DELETE /carts/:cartid', () => {
  it('should response 404 and Cart Not Found', async () => {
    const response = await request(app)
      .delete('/carts/100')
      .set('access_token', `${token}`);

    const { body } = response
    expect(response.status).toEqual(404);
    expect(body.message).toBeDefined();
  })

  it('should response 201 and Delete cart succes', async () => {
    const response = await request(app)
      .delete('/carts/1')
      .set('access_token', `${token}`);

    const { body } = response
    expect(response.status).toEqual(201);
    expect(body.message).toBeDefined();
  })
})













