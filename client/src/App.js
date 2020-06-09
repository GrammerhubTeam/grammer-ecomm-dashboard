import React from 'react';
// import logo from './logo.svg';
import { Bar, Line, Polar } from 'react-chartjs-2'
import axios from 'axios'
import './App.css';

const App = () => {

  const [data, setData] = React.useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      },
    ]
  })

  React.useEffect(() => {
    axios.get('http://localhost:7744/inventory')  
      .then(datum => {
        console.log(datum.data)
        // const values = Object.values(datum.data).reduce((prev, arr) => {
        //   let sum = 0
        //   for (let i = 0; i < arr.length; i++) {
        //     sum += (Number(arr[i]) || 0)
        //   }
        //   console.log(sum / arr.length)
        //   return [ ...prev, sum / arr.length ]
        // }, [])

        // setData({
        //   ...data,
        //   labels: Object.keys(datum.data),
        //   datasets: [
        //     {
        //       ...data.datasets[0],
        //       data: values
        //     }
        //   ]
        // })
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

      {/* ========== NAME ==================== */}
      
      {/* ======================================= */}

      {/* ========== Daniel F. Chart============= */}
      
      
      
      {/* ======================================= */}
      
      
      {/* ============ Gabe E. Chart============== */}
      <div>
        <Polar 
          data={data}
          width={100}
          height={320}
          options={{ maintainAspectRatio: false }}
        />
      </div>
      {/* ======================================= */}
      

      {/* ========== Meg Y. Chart================= */}
      
      {/* ======================================= */}


      {/* ======================================= */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
