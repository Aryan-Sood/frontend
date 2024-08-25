// src/Form.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './form.css'; // Include CSS for styling

const Form = () => {
  const [jsonData, setJsonData] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase', label: 'Highest lowercase alphabet' }
  ];

  useEffect(() => {
    document.title = '21BCE10395';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submitted');
    try {
      JSON.parse(jsonData);
      console.log(jsonData);
      const data = JSON.parse(jsonData);

    //   if (!Array.isArray(data.data)) {
    //     throw new Error('Invalid JSON format. "data" should be an array.');
    //   }

      // Call the API
      const res = await axios.post('https://bajaj-api-liart.vercel.app/bfhl', {
        selectedOptions
      });

      setResponse(res.data);
      setError(null);
    } catch (err) {
        console.log(err.toString());
      setError('Invalid JSON input or network error');
      setResponse(null);
    }
  };

  const filterResponse = () => {
    if (!response) return null;

    const { alphabets_array, numbers_array, highest_lowercase } = response;

    let filteredData = {};

    selectedOptions.forEach(option => {
      if (option.value === 'alphabets') {
        filteredData.alphabets = alphabets_array;
      }
      if (option.value === 'numbers') {
        filteredData.numbers = numbers_array;
      }
      if (option.value === 'highest_lowercase') {
        filteredData.highest_lowercase = highest_lowercase;
      }
    });

    return filteredData;
  };

  return (
    <div className="form-container">
      <h1>Submit JSON Data</h1>
      <form onSubmit={handleSubmit}>
        <label>API Input: </label>
        <textarea
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          placeholder='Enter JSON data here...'
          rows="10"
          cols="50"
          required
        />
        <br />
        <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={setSelectedOptions}
        placeholder="Select options"
      />
        <button type="submit">Submit</button>
      </form>

      {error && <p className="error">{error}</p>}
      {response && (
        <div>
          <h3>Response:</h3>
          {/* Display part of the response. Customize as needed */}
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {/* {response && (
        <>
          <Select
            isMulti
            options={options}
            onChange={setSelectedOptions}
            placeholder="Select options"
            styles={{ container: (provided) => ({ ...provided, marginBottom: '20px' }) }}
          />
          <div className="response-container">
            <h2>Filtered Response</h2>
            <pre>{JSON.stringify(filterResponse(), null, 2)}</pre>
          </div>
        </>
      )} */}
    </div>
  );
};

export default Form;
