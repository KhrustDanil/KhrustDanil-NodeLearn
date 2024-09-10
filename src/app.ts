import express from 'express';
import itemRoutes from './routes/itemRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/items', itemRoutes);

const startServer = async () => {
    try {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Failed to start the server:', error);
    }
  };
  
  startServer();