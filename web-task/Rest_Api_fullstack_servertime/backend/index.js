import express from 'express';
import cors from 'cors';
import apiRoutes from './src/routes/api.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Bind Global Namespace Routes
app.use('/api', apiRoutes);

app.listen(PORT, () => console.log(`Modular Server ready on http://localhost:${PORT}`));