import mongoose from 'mongoose'

mongoose.connect(process.env.MONGOOSE_CONFIG, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection
connection.on('error', console.error.bind(console, 'Connection error'))
connection.once('open', ()=>{
    console.log('DB connected');
})

