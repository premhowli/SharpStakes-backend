import express from 'express';
import gamesRouter from './routes/games';
import usersRouter from './routes/users';
import predictionsRouter from './routes/predictions'

const app = express();
const PORT = 4000;

app.use(express.json());
app.use('/api/games', gamesRouter);
app.use('/api/user', usersRouter);
app.use('/api/predictions', predictionsRouter);


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));