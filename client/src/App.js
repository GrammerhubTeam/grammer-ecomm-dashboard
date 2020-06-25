import React from 'react'
// import logo from './logo.svg';
import { Bar, Line, Polar, Doughnut } from 'react-chartjs-2'
// import jwt from 'jsonwebtoken'
import axios from 'axios'
import './App.css'

const App = () => {

  const [data, setData] = React.useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: [
          '#120136','#035AA6','#40BAD5','#FCBF1E','#120136','#035AA6','#40BAD5','#FCBF1E','#120136','#035AA6','#40BAD5','#FCBF1E',
        ],
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: [
          '#120136','#035AA6','#40BAD5','#FCBF1E','#120136','#035AA6','#40BAD5','#FCBF1E','#120136','#035AA6','#40BAD5','#FCBF1E',
        ],
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      },
    ]
  })

  const [doughnutData, setDoughnutData] = React.useState({
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        // label: 'My Doughnut dataset',
        data: [1,2,3,4,5,6],
        backgroundColor: [
          '#120136','#035AA6','#40BAD5','#FCBF1E','#120136','#035AA6','#40BAD5','#FCBF1E','#120136','#035AA6','#40BAD5','#FCBF1E',
        ],
        hoverBackgroundColor: [
          '#120136','#035AA6','#40BAD5','#FCBF1E','#120136','#035AA6','#40BAD5','#FCBF1E','#120136','#035AA6','#40BAD5','#FCBF1E',
        ]
      },
    ]
  })

  const [polarData, setPolarData] = React.useState({
    labels: ["USA", "Canada", "Chile", "Colombia", "France", "United Kingdom"],
    datasets: [
      {
        // label: 'My Polar dataset',
        data: [1,2,3,4,5,6],
        backgroundColor: [
          '#120136','#035AA6','#40BAD5','#FCBF1E','#120136','#035AA6','#40BAD5','#FCBF1E','#120136','#035AA6','#40BAD5','#FCBF1E',
        ],
        hoverBackgroundColor: [
          '#120136','#035AA6','#40BAD5','#FCBF1E','#120136','#035AA6','#40BAD5','#FCBF1E','#120136','#035AA6','#40BAD5','#FCBF1E',
        ]
      },
    ]
  });



  
  

  React.useEffect(() => {
    axios.get('http://localhost:7744/inventory')  
      .then(datum => {
        // =====================================================================
        // ============================ Donut Data =============================
        // =====================================================================
        // This is spelled different because of doughnutData above
        const donutData = datum.data
          .reduce((previousStateValue, currentLoopValue) => {
            return {
              ...previousStateValue,
              [currentLoopValue.StockCode]: (previousStateValue[currentLoopValue.StockCode] || 0) + parseInt(currentLoopValue.Quantity),
            }
          }, {})
          
        const topTen = Object.entries(donutData)
          .sort((a, b) => {
            return b[1] - a[1]
          })
          .slice(0, 10)
          .reduce((prev, cur) => {
            return {
              ...prev,
              [cur[0]]: cur[1],
            }
          }, {})

        setDoughnutData({
          ...doughnutData,
          labels: Object.keys(topTen),
          datasets: [
            {
              ...doughnutData.datasets[0],
              data: Object.values(topTen)
            }
          ]
        })

        // =====================================================================
        // ========================== Polar Data  ==============================
        // =====================================================================
        // EXPLANATION OF REDUCE METHOD BELOW
        // [{Country: 'United Kingdom'}, {Country: 'United States'}, {Country: 'United Kingdom'}]
        const tempPolarData = datum.data.reduce( (prev, curr)=>{
          // prev: {'United Kingdom': 1, 'United States': 1}
          // curr:  {Country: 'United Kingdom'}
          return {
            ...prev,
            [curr.Country]: (prev[curr.Country] || 0 ) + 1
          }
          // end: {'United Kingdom': 2, 'United States': 1}
        }, {})
        
        setPolarData({
          ...polarData,
          labels: Object.keys(tempPolarData),
          datasets: [
            {
              ...polarData.datasets[0],
            data: Object.values(tempPolarData),
            }
          ]
        })

        // =====================================================================
        // ========================= Other Data ================================
        // =====================================================================
      })
      .catch((err) => console.error('ERRORRR', err))
  }, [])

  return (
    <div className="App">
      <div>
        <Bar
          data={data}
          width={100}
          height={320}
          options={{ maintainAspectRatio: false }}
        />
      </div>

      <div>
        <Line
          data={data}
          width={100}
          height={320}
          options={{ maintainAspectRatio: false }}
        />
      </div>

      <form action='http://localhost:7744/blah' method='POST' style={{display: 'flex', flexDirection: 'column', padding: '3rem 25%'}}>
        <input name="field1" />
        <input name="field2" />
        <textarea name="field3" />
        <button onClick={onSubmit}>SUBMIT BUTTON</button>
      </form>

      <div>
        <Doughnut
          data={doughnutData}
          width={100}
          height={320}
          options={{ maintainAspectRatio: false }}
        />
      </div>

      <div>
        <Bar 
          data={polarData}
          width={100}
          height={320}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
}

export default App;
