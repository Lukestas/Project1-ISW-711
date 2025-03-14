import express from 'express'
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js'
import cookieParser from 'cookie-parser';
import authChilRoutes from './routes/authChildRoutes.js'

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/parent', authChilRoutes);

export default app;