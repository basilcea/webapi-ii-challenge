const express  = require('express');
const router = require('./data/route')

const server = express()

server.use(express.json());
server.use('/api/posts', router);
server.use(express.urlencoded({ extended:true }))


server.listen(5000, ()=>{
    console.log('Server running on 5000...')
})