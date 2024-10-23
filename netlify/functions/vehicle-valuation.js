const { useCarData } = require('../../src/context/CarDataContext');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { registration } = JSON.parse(event.body);
    const { cars } = useCarData();

    const car = cars.find(car => car.id.toUpperCase() === registration);

    if (car && car.retailValuation) {
      return {
        statusCode: 200,
        body: JSON.stringify({ retailValuation: car.retailValuation }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Vehicle not found or valuation not available.' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while processing the request.' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  }
};