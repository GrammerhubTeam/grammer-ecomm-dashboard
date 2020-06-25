const express = require('express')
const app = express()
const cartRouter = require('./cart')
const bodyParser = require('body-parser')
const cors = require('cors')
// ====== We used this to convert our csv file to json ======
// const c2j = require('csvtojson')
// const inventory = './ecomm-inventory.csv'
// const sales = './ecomm-sales.csv'

// ----------- AUX VALUES ------------------
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


// STATUS CODES (apple example)

// ----------- MIDDLEWARE ------------------

app.use('/api/cart', cartRouter)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// kyle youre not being smart here !!!
app.use(cors(corsOptions))

// const cors2 = (corsOptions) => (req, res, next) => {
//     //handle differently based on cors options
//     return res.status(corsOptions.optionsSuccessStatus || 200).send(...)
// }

// // !!!!!!!!! THIS IS WHAT WE WILL USE FOR AUTHENTICATION !!!!!!!
// app.use((req, res, next) => {

// })

// ----------- ROUTES ------------------

app.post('/blah', (req, res) => {
    // console.log('THE BODY IS ===> ' + JSON.stringify(req.body) + 
    // '\nTHE BODY MESSAGE IS ===> ' + req.body.message +
    // '\nTHE BODY HEADERS ARE ===> ' + JSON.stringify(req.headers))
    return res.status(201).send(
        'THE BODY IS ===> ' + JSON.stringify(req.body) + 
        '\nTHE BODY MESSAGE IS ===> ' + req.body.message +
        '\nTHE BODY HEADERS ARE ===> ' + JSON.stringify(req.headers)
    )
})

app.get('/inventory', cors(corsOptions), async (req, res) => {
    const MongoClient = require('mongodb').MongoClient;

    try {
        // Connect to the db
        MongoClient.connect("mongodb://localhost:27017/furniture-test", async (err, db) => {
            if(err) throw err;

            db.collection('test').find().limit(250).toArray(function(err, items) {
                if(err) throw err;
                
                return res.send(items)    
            });          
        });
    } catch (err) {
        console.error(err)
    }
})

app.get('/piechart', async (req, res) => {
    this.request(sale)
})

// ----------- LISTEN TO CALLS ------------------

app.listen(
    process.env.PORT || 7744, 
    () => console.log(`Example app listening at http://localhost:${process.env.PORT || 7744}`)
)