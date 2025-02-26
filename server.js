import express from 'express'
import connect from './config/database.js'

const app=  express();
const PORT= process.env.PORT || 4040;

app.use(express.json())

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

import routes from './src/routes.js'
connect().then(() => {
    
    app.use('/', routes)
    app.listen(PORT , ()=>{
        console.log('Server started')
    })
    
}).catch((err) => {
    console.error('Error to connect with database', err)
});
