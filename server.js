const express = require('express')
const app = express()
const cors = require('cors')
// ====== We used this to convert our csv file to json ======
// const c2j = require('csvtojson')
// const inventory = './ecomm-inventory.csv'
// const sales = './ecomm-sales.csv'

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

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



app.listen(
    process.env.PORT || 7744, 
    () => console.log(`Example app listening at http://localhost:${process.env.PORT || 7744}`)
)