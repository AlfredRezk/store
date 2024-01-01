const {connect } = require('mongoose')

module.exports = async()=>{
    try{
        const con = await connect(process.env.MONGODB)
        console.log(`Connected to DB : ${con.connection.db.databaseName}`.green)
    }
    catch(error){
        console.log(`Not connect to DB! Error: ${error.message}`.red)
    }
}