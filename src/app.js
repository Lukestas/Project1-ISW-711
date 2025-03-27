import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import authRoutes from './routes/authRoutes.js'
import childRoutes from './routes/childRoutes.js'
import videoRoutes from './routes/videoRoutes.js'
import playlistRoutes from './routes/playlistRoutes.js'


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))


app.use('/api', authRoutes);
app.use('/api', childRoutes);
app.use('/api', videoRoutes);
app.use('/api', playlistRoutes);

export default app;