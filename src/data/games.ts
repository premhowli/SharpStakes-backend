interface Team {
    name: string;
    abbreviation: string;
    record: string;
    score?: number;
}

interface Odds {
    favorite: string;
    spread: string;
}
interface Game {
    id: string;
    status: 'inProgress' | 'scheduled' | 'final';
    startTime?: string | number | Date;
    clock?: string;
    winner?: string;
    period?: string;
    homeTeam: Team;
    awayTeam: Team;
    odds?: Odds;

}
export let games: Game[] = [
    {
        'id': 'gm1001',
        'status': 'scheduled',
        'startTime': '2025-05-25T18:00:00Z',
        'homeTeam': {
            'name': 'Los Angeles Lakers',
            'abbreviation': 'LAL',
            'record': '42-28',
        },
        'awayTeam': {
            'name': 'Boston Celtics',
            'abbreviation': 'BOS',
            'record': '45-25',
        },
        'odds': {
            'spread': '+3.5',
            'favorite': 'BOS',
        },
    },
    {
        'id': 'gm1002',
        'status': 'inProgress',
        'period': '3rd',
        'clock': '0:00',
        'homeTeam': {
            'name': 'Golden State Warriors',
            'abbreviation': 'GSW',
            'record': '38-32',
            'score': 0,
        },
        'awayTeam': {
            'name': 'Dallas Mavericks',
            'abbreviation': 'DAL',
            'record': '40-30',
            'score': 0,
        },
        'odds': {
            'spread': '-2.5',
            'favorite': 'GSW',
        },
    },
    {
        'id': 'gm1003',
        'status': 'final',
        'homeTeam': {
            'name': 'Miami Heat',
            'abbreviation': 'MIA',
            'record': '36-34',
            'score': 112,
        },
        'awayTeam': {
            'name': 'New York Knicks',
            'abbreviation': 'NYK',
            'record': '35-35',
            'score': 103,
        },
        'winner': 'MIA',
    },
    {
        'id': 'gm1004',
        'status': 'scheduled',
        'startTime': '2025-05-25T18:00:00Z',
        'awayTeam': {
            'name': 'Los Angeles Lakers',
            'abbreviation': 'LAL',
            'record': '42-28',
        },
        'homeTeam': {
            'name': 'Boston Celtics',
            'abbreviation': 'BOS',
            'record': '45-25',
        },
        'odds': {
            'spread': '+3.5',
            'favorite': 'BOS',
        },
    },
    {
        'id': 'gm1005',
        'status': 'scheduled',
        'startTime': '2025-05-25T18:00:00Z',
        'awayTeam': {
            'name': 'Golden State Warriors',
            'abbreviation': 'GSW',
            'record': '38-32',
        },
        'homeTeam': {
            'name': 'Dallas Mavericks',
            'abbreviation': 'DAL',
            'record': '40-30',
        },
        'odds': {
            'spread': '+3.5',
            'favorite': 'GSW',
        },
    },
]