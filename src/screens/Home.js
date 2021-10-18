import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import PredictionForm from '../components/Form';
import './Home.scss';

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const Home = () => {
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <div className="container">
      <header className="header">
        <h1>Sydney House Price Prediction</h1>
      </header>
      <main className="content">
        <div className="form-wrapper">
          <PredictionForm setResults={setResults} setLoading={setLoading} />
        </div>
        <div className="result">
          {loading ? (
            <Spin />
          ) : (
            results && (
              <div>
                <h4>Estimated price for selected options</h4>
                {results.map((result) => (
                  <div className="detail">
                    {result.data.suburb} {' : '}
                    <span>{formatter.format(result.estimated_price)}</span>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
