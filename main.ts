import { app } from './app.js';
import { initDatabase } from './src/infrastructure/database/initDatabase.js';



const PORT = 3000;

async function start() {
    await initDatabase();
    app.listen(PORT, () =>{
        console.log(`Server is runing on port ${PORT}`)
    });
}

start();
