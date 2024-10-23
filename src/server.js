import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { useCarData } from './context/CarDataContext';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist')));

// Existing endpoints...

app.post('/api/vehicle-valuation', (req, res) => {
  const { registration } = req.body;
  const { cars } = useCarData();

  const car = cars.find(car => car.id.toUpperCase() === registration);

  if (car && car.retailValuation) {
    res.json({ retailValuation: car.retailValuation });
  } else {
    res.status(404).json({ error: 'Vehicle not found or valuation not available.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});