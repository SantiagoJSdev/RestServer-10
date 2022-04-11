const mogoose = require('mongoose')


const dbConnection = async () => {

    try {
        
     await mogoose.connect(process.env.MONGODB_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModyfy: false
     });

        console.log('base de dato online')

    } catch (error) {
        console.log(error)
        throw new Error('error a la hora de iniciar la bd')
    }
}

module.exports = {
    dbConnection
}