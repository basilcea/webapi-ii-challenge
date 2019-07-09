const express  = require('express');
const router = require('./data/route')

const server = express()

server.use(express.json());
server.use(express.urlencoded({ extended:true }))
server.use('/api/posts', router);
server.listen(5000, ()=>{
    console.log('Server running on 5000...')
})