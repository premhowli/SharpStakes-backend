// import { Prediction } from "./predictions";

import { Prediction } from "../routes/predictions";

interface State {
    wins: number;
    losses: number;
    pending: number;
}
interface UserData {
    id: string;
    username: string;
    balance: number;
    predictions?: Prediction[];
    stats: State
}

export const userData: UserData = {

    'id': 'usr123',
    'username': 'sportsfan42',
    'balance': 1000,
    'predictions': [
    ],
    'stats': {
        'wins': 7,
        'losses': 4,
        'pending': 1,
    },
}