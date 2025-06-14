import express, { Request, Response } from 'express';
import { userData } from '../data/user';

// Prediction interface
export interface Prediction {
    id?: string;
    userId?: string;
    gameId: string;
    pick?: string; // 'home' or 'away'
    timestamp?: string;
    amount?: number;
    result?: 'win' | 'loss' | 'pending' | undefined;
    payout?: number;
}

// export interface Prediction {
//     "gameId": string;
//     "pick": string,
//     "amount": number;
//     "result": 'win' | 'loss'
//     "payout": number
// }

// In-memory predictions array
export const predictions: Prediction[] = [];

const router = express.Router();

// POST /api/predictions
// Submit a new prediction
// Currently we are not checking if game is over or not. can be taken as future enhancement.
router.post('/', (req: Request, res: Response) => {
    const { gameId, pick } = req.body;

    if (!gameId || !pick) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
    }

    const userId = userData.id;

    // Prevent duplicate prediction by same user for same game
    const exists = predictions.find(
        p => p.userId === userId && p.gameId === gameId
    );
    if (exists) {
        res
            .status(400)
            .json({ message: 'Prediction already exists for this user and game.' });
        return;
    }

    const prediction: Prediction = {
        id: `${userId}-${gameId}`,
        userId,
        gameId,
        pick,
        amount: 100,
        result: 'pending',
        timestamp: new Date().toISOString(),
    };

    predictions.push(prediction);
    res.status(201).json(prediction);
});

// GET /api/predictions/user/:userId
// Get all predictions for a user
router.get('/user/:userId', (req: Request, res: Response) => {
    const userId = req.params.userId;
    const userPredictions = predictions.filter(p => p.userId === userId);
    res.json(userPredictions);
});

// GET /api/predictions/game/:gameId
// (Optional) Get all predictions for a specific game
router.get('/game/:gameId', (req: Request, res: Response) => {

    const gameId = req.params.gameId;
    console.log(`<<<<<<<< predictions request for  ${gameId}`)
    console.log(`<<<<<< predictions = ${JSON.stringify(predictions)}`);
    const userId = userData.id;
    const gamePredictions = predictions.filter(p => p.gameId === gameId && p.userId === userId);

    let filteredPredictions = gamePredictions;
    console.log(`<<<<<< filtered predictions = ${JSON.stringify(filteredPredictions)}`);

    if (userId) {
        filteredPredictions = gamePredictions.filter(p => p.userId === userId);
    }

    res.json({ gameId, predictions: filteredPredictions });
});

export default router;
