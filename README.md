# SharpStakes-backend

## Features

- RESTful API for games, users, and predictions
- Simple in-memory or file-based storage
- Modular, type-safe controllers


## Prerequisites

- **Node.js** (v23+ recommended)
- **npm** or **yarn**
- (Optional) [Postman](https://www.postman.com/) or [curl](https://curl.se/) for API testing


## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/premhowli/SharpStakes-backend
cd SharpStakes-backend
```
### 2. Install dependencies
```sh
npm install
# or
yarn install
```

### 3. Run the backend server
```sh
npm run dev
# or
yarn dev
```

## Congratulations! :tada:

You've successfully run the backend server running at port 4000. :partying_face:

## Details & disclaimers

### Ai Usage at coding
Took help of copilot using chat gpt 4.1 

### Simulation Logic:
Currently Every game runs for 1 minute. 
Whenever a user wins it simply return 2 * buy in amount(100) as payout.
utility.ts has all the simulation logic

### Technical Gotcha!

 - if you see all game has ended. Just restart the server. 
 - If you have predicted games, and want to try a fresh. change gameIds in src/data/games.ts. Since old id's will be fetched from storage, it will already show predicted.
Alternatively install a fresh app. and all things work again.


