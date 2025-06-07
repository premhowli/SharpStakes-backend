import express, { Request, Response } from 'express';
import { userData } from '../data/user';
import { predictions } from './predictions';

const router = express.Router();

router.get('/details', (req: Request, res: Response) => {
  console.log('Fetching all games');
  let WinAmount
  const prediction = predictions.filter(pred=>{
    return pred.userId === userData.id
  })
  console.log(`<<<<<< updating prediction ${JSON.stringify(prediction)}`);
  userData.predictions = prediction
  res.json(userData);
});

// Explicit typing for route params!
// router.get('/:id', (req, res) => {
//   console.log('Fetching game with ID:', req.params.id);
//   const game = games.find(g => g.id === req.params.id);
//   if (game) {
//     res.json(game);
//     return;
//   } 
//   res.status(404).json({ message: 'Game not found' });
// });

export default router;