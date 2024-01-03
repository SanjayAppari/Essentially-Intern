import './App.css';
import React, { useEffect, useState } from 'react'

function App() {

  const [count,setCount] =useState(0);
  const [stocks,setStocks] = useState([]);


  const handleChange = (e)=>{
    setCount(Math.min(20,e.target.value));
  }

  const fetchData = async () =>{
    try {
      const response = await fetch('http://localhost:3001/api/stocks');
      const data = await response.json();
      setStocks(data.slice(0,count));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(()=>{
    const intervalId = setInterval(fetchData, 1000);
    console.log(stocks);
    return () => clearInterval(intervalId);
  });

 
  return (
    <div className="main">
        <h3>Full Stack Backend Intern</h3>
        <label>Enter Number Of Stocks</label>
        <div className="bgInput">
            <input type="text" placeholder="Enter Number Of Stocks" name='count' value={count} onChange={handleChange}/>
        </div>
        <div className="bgDiv">
          {count  }
            <table className='table'>
              <tbody>
                <tr>
                  <th>Symbol</th>
                  <th>OpenPrice</th>
                  <th>Price</th>
                </tr>
                {
                   stocks.map((stock)=>{
                      return (
                        <tr>
                          <td>{stock.symbol}</td>
                          <td>{stock.openPrice}</td>
                          <td>{stock.price}</td>
                        </tr>
                      )
                   })
                }
                
              </tbody>
            </table>
        </div>
    </div>
  );
}

export default App;
