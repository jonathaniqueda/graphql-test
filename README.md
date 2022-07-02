## How to start?

1. Make sure you have the mysql database installed.
2. After that run `npm install`
3. Run `cp .env.example .env`
4. Then go to the src/server.ts and uncomment the line `29`.
5. Now every time that your server reboot you'll have the database been setup (drop and run the migrations). If you want to have the fixed migration setup, after the first time turn the line 29 on server.ts to be `false` again.
6. Run `npm run dev` to start your local server.
7. Open your browser on `http://localhost:3000/graphql` and play on playground.