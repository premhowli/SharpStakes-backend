export interface Prediction {
    id: string;        // prediction id (optional)
    userId: string;
    gameId: string;
    predictedWinner: string; // e.g., 'home' or 'away'
    timestamp: string;
}

export const predictions: Prediction[] = [];