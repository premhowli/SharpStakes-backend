import { RUN_TIME, START_TIME } from './constants';
import { games } from './data/games';
import { userData } from './data/user';
import { predictions, Prediction } from './routes/predictions';

export const startGame = () => {
    games.forEach(game => {
        if (game.status === 'inProgress') {
            game.startTime = new Date().toISOString();
            game.status = 'inProgress';
        }
        else if (game.status === 'scheduled') {
            const start = new Date(Date.now() + START_TIME);
            game.startTime = start.toISOString();
        }
    });
}

export const msToClock = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const min = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const sec = (totalSeconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
}

export const updateUsersPrediction = (gameId: string, winner: string) => {
    predictions.forEach(pred => {
        if (pred.gameId === gameId && pred.userId === userData.id) {
            console.log(`Found object, updating meta`)
            pred.amount = 100;
            // Update result and payout
            if (pred.pick === winner) {
                pred.result = 'win';
                //Consideration: currently in case of win, doubling the amount. possible enhancement can be made
                pred.payout = pred.amount * 2;

                if (userData.balance || userData.balance === 0) {
                    userData.balance = userData.balance + pred.amount * 2;
                }

                if (userData.stats.wins || userData.stats.wins === 0) {
                    userData.stats.wins = userData.stats.wins + 1
                }
            } else {
                pred.result = 'loss';
                pred.payout = 0;
                if (userData.stats.losses || userData.stats.losses === 0) {
                    userData.stats.losses = userData.stats.losses + 1
                }
            }
        }
    });
    console.log(`updated predictions = ${JSON.stringify(predictions)}`)
}

export const updateGameClocks = () => {
    console.log(`Updating game clocks`);
    const now = Date.now();
    games.forEach(game => {


        if (game.status === 'scheduled' && game.startTime) {
            const elapsed = now - new Date(game.startTime).getTime();
            if (elapsed > 0) {
                game.status = 'inProgress'
                game.clock = '0.00'
                game.period = '1st'
                game.homeTeam.score = 0
                game.awayTeam.score = 0
            }
        }
        else if (game.status === 'inProgress' && game.startTime) {
            console.log(`<<<<<< processing game ${game.id}`)
            const elapsed = now - new Date(game.startTime).getTime();
            game.clock = msToClock(elapsed);

            if (elapsed < RUN_TIME) {
                // Still in progress: update clock
                game.clock = msToClock(elapsed);
                const random = Math.random();
                if (random < 0.5) {
                    game.homeTeam.score = game.homeTeam.score || game.homeTeam.score === 0 ? game.homeTeam.score + 3 : 0;
                    game.awayTeam.score = game.awayTeam.score || game.awayTeam.score === 0 ? game.awayTeam.score + 5 : 0;
                }
                else {
                    game.homeTeam.score = game.homeTeam.score || game.homeTeam.score === 0 ? game.homeTeam.score + 5 : 0;
                    game.awayTeam.score = game.awayTeam.score || game.awayTeam.score === 0 ? game.awayTeam.score + 3 : 0;
                }
                console.log(`<<<<< scores ${game.id} ${game.homeTeam.score} ${game.awayTeam.score}`)
            }
            else {
                // currently we are not handling draw. in that case home wins. possible enhancement for later.
                let winner = ''
                if (
                    game.homeTeam.score && game.awayTeam.score
                ) {
                    winner = game.homeTeam.score >= game.awayTeam.score ? game.homeTeam.abbreviation : game.awayTeam.abbreviation
                }
                else {
                    winner = game.homeTeam.abbreviation;
                }
                game.status = 'final'
                game.winner = winner
                game.odds = undefined
                updateUsersPrediction(game.id, winner);
            }
        }
    });
}

setInterval(updateGameClocks, 5000);