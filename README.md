# bestsongs-backend
## About 🔎
:musical_note: API to get recommendations and recommend songs to music lovers
### Implemented features :heavy_check_mark:
- [x] Get recommendations
- [x] Upvote recommendation
- [x] Downvote recommendation
- [x] Get random recommendation based on music votes
### Future improvements 🔮
- [ ] Personal recommendation
- [ ] Top musics by gender
## Tech tools 🔧
The following tools and frameworks were used in the construction of the project:<br>
<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
</p>

## How to run ⚙️

1. Clone this repository
2. Install dependencies
```bash
npm i
```
3. Create database using the dump file located in src/database/dump.sql
```bash
psql YOUR_DATABASE_NAME < dump.sql
```
4. You can run the app by
```bash
npm start
```
