import express, { Request, Response } from 'express';
import { games } from '../data/games';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  
  console.log('Fetching all games');
  res.json(games);
});

// Explicit typing for route params!
router.get('/:id', (req, res) => {
  console.log('Fetching game with ID:', req.params.id);
  const game = games.find(g => g.id === req.params.id);
  if (game) {
    res.json(game);
    return;
  } 
  res.status(404).json({ message: 'Game not found' });
});

export default router;