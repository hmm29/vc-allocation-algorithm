import { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [allocation, setAllocation] = useState('');
  const [investors, setInvestors] = useState([{ name: '', requestedAmount: '', averageAmount: '' }]);
  const [results, setResults] = useState({});

  const handleInputChange = (index, field, value) => {
    const updatedInvestors = [...investors];
    updatedInvestors[index][field] = value;
    setInvestors(updatedInvestors);
  };

  const addInvestor = () => {
    setInvestors([...investors, { name: '', requestedAmount: '', averageAmount: '' }]);
  };

  const removeInvestor = (index) => {
    const updatedInvestors = investors.filter((_, i) => i !== index);
    setInvestors(updatedInvestors);
  };

  const handleProrate = async () => {
    // Validation checks
    if (allocation.trim() === '' || Number(allocation) < 0) {
      alert('Total Available Allocation must be a non-negative value.');
      return;
    }

    const missingNames = investors.some((investor) => !investor.name.trim());
    if (missingNames) {
      alert('All investors must have names before prorating.');
      return;
    }

    const invalidAmounts = investors.some(
      (investor) =>
        Number(investor.requestedAmount) < 0 || Number(investor.averageAmount) < 0
    );
    if (invalidAmounts) {
      alert('Requested amount and Average amount must be non-negative values for all investors.');
      return;
    }

    // Prepare input data for the API call
    const inputData = {
      allocation_amount: parseFloat(allocation),
      investor_amounts: investors.map((investor) => ({
        name: investor.name,
        requested_amount: parseFloat(investor.requestedAmount),
        average_amount: parseFloat(investor.averageAmount),
      })),
    };

    try {
      // API call to backend to get allocation results
      const response = await axios.post('http://localhost:5001/api/calculateAllocations', inputData);
      setResults(response.data);
    } catch (error) {
      console.error('Error calculating allocations:', error);
      alert('There was an error calculating the allocations. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="inputs-section">
        <h2 className="section-title">Inputs</h2>
        <div className="input-section">
          <label className="input-title">Total Available Allocation</label>
          <div className="input-field-wrapper">
            <span className="input-icon">$</span>
            <input
              type="number"
              value={allocation}
              onChange={(e) => setAllocation(e.target.value)}
              placeholder="Allocation"
              className="input-field"
            />
          </div>
        </div>
        <div className="input-section">
          <h3 className="input-title">Investor Breakdown</h3>
          {investors.map((investor, index) => (
            <div key={index} className="investor-row">
              <div className="input-field-wrapper">
                <span className="input-icon"><i className="fa fa-user"></i></span>
                <input
                  type="text"
                  value={investor.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  placeholder="Name"
                  className="input-field"
                />
              </div>
              <div className="input-field-wrapper">
                <span className="input-icon">$</span>
                <input
                  type="number"
                  value={investor.requestedAmount}
                  onChange={(e) => handleInputChange(index, 'requestedAmount', e.target.value)}
                  placeholder="Requested Amount"
                  className="input-field"
                />
              </div>
              <div className="input-field-wrapper">
                <span className="input-icon">$</span>
                <input
                  type="number"
                  value={investor.averageAmount}
                  onChange={(e) => handleInputChange(index, 'averageAmount', e.target.value)}
                  placeholder="Average Amount"
                  className="input-field"
                />
              </div>
              {investors.length > 1 && (
                <button className="delete-investor" onClick={() => removeInvestor(index)}>
                  <span className="delete-icon">✕</span>
                </button>
              )}
            </div>
          ))}
          <button className="add-investor" onClick={addInvestor}>+ Add Investor</button>
        </div>
        <button className="prorate-button" onClick={handleProrate}>PRORATE</button>
      </div>
      <div className="results-section">
        <h2 className="section-title">Results</h2>
        <div className="results-list">
          {Object.entries(results).map(([name, amount]) => (
            <p key={name} className="result-item">{name} - ${amount.toFixed(2)}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;