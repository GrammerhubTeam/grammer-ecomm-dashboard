const express = require('express')
const cors = require('cors')
const c2j = require('csvtojson')
const inventory = './ecomm-inventory.csv'
const sales = './ecomm-sales.csv'

const app = express()

// const request = (file) => {
//     c2j().fromFile(file)
//     .then((jsonObj)=>{
//         console.log(jsonObj)
//         res.send(jsonObj)
//     })
//     .catch((err) => {
//         console.log(err)
//         res.send('WE MESSED UP')
//     })
// }

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
}

app.use(cors(corsOptions))

app.get('/inventory', cors(corsOptions), async (req, res) => {
    const usObj = {
        InvoiceNo: '536365',
        StockCode: '71053',
        Description: 'WHITE METAL LANTERN',
        Quantity: '6',
        InvoiceDate: '12/1/2010 8:26',
        UnitPrice: '9.99',
        CustomerID: '17850',
        Country: 'United States'
    }
    // this is the csvtojson file
    c2j().fromFile(inventory)
        .then((jsonObj)=>{
            const toBeTransitioned = jsonObj.slice(0, 2)
            toBeTransitioned.unshift(usObj)
            const transitioned = toBeTransitioned.reduce((prev, cur, i) => {
                // console.log('PREV', prev)
                // console.log('CUR', cur)
                // if (cur.Country === "United Kingdom") {
                //     return {
                //         ...prev,
                //         [cur.Country]: cur.UnitPrice
                //     }
                // }
                console.log('INDEX', i, 'PREV IS', prev)

                return { 
                    ...prev, 
                    // && AND, || OR
                    // [cur.Country] just says set cur.Country as the key
                    // (prev[cur.Country] || 0) means if the key already existed, else 0
                    [cur.Country]: [ ...(prev[cur.Country] || []), cur.UnitPrice ]
                }
            }, {})
            console.log(jsonObj.slice(0, 2))
            res.send(transitioned)
        })
        .catch((err) => {
            console.log(err)
            res.send('WE MESSED UP')
        })
})

app.get('/piechart', async (req, res) => {
    this.request(sale)
})


app.listen(
    process.env.PORT || 7744, 
    () => console.log(`Example app listening at http://localhost:${process.env.PORT || 7744}`)
)
