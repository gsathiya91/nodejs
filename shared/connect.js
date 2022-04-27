const {MongoClient} = require('mongodb');
const mongoose = require("mongoose");

module.exports = {
    selectedDB: {},
    async connect(){
        try{
            const client = await MongoClient.connect('mongodb+srv://Gsathiya:FmAWfKqmHPKxHznc@cluster0.ktemn.mongodb.net/test?retryWrites=true&w=majority');
            this.selectedDB = client.db('test');
            console.log(this.selectedDB);
        }catch(err) {
            console.log(err)
        }
    },
    async connectMongoose() {
        try{
            mongoose.connect('mongodb+srv://Gsathiya:FmAWfKqmHPKxHznc@cluster0.ktemn.mongodb.net/test?retryWrites=true&w=majority');
            console.log('connected successfully')
        }catch(err) {
            console.log(err);
        }
    }
}

// module.exports ={
   
// }