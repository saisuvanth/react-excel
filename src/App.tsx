import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Table from './components/Table';
import HomeContextProvider from './contexts/HomeContext';
import { CSVLink } from 'react-csv';

function App() {
  const csvRef = useRef<any>();
  const [data, setData] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   console.log(csvData)
  //   if (csvData.length)
  //     csvRef.current.link.click();
  // }, [csvData])

  const handleClick = (event: any) => {
    setLoading(true);
    event.preventDefault();
    try {
      const csv = Object.values(data);
      setCsvData(csv);
      setTimeout(() => {
        setLoading(false);
        csvRef.current.link.click();
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      <div className="button-container">
        <button onClick={handleClick}>
          {loading ? ' ...Loading ' : 'Export as CSV'}
        </button>
        <CSVLink data={csvData} filename={'data.csv'} ref={csvRef}>
        </CSVLink>
      </div>
      <HomeContextProvider>
        <Table data={data} setData={setData} />
      </HomeContextProvider>
    </div>
  );
}

export default App;
