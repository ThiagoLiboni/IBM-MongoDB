import express from 'express'
import connect from './config/database.js'
import routes from './routes.js'

const app=  express();
const PORT= process.env.PORT;

app.use(express.json())
app.use('/',routes)

connect().then(() => {

    app.listen(PORT, ()=>{
        console.log('Server started on port 4000')
    })
    
}).catch((err) => {
    console.error('Error to connect with database', err)
});
