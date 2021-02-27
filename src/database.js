import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost/apidb", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
})
.then(db => console.log("Base de datos conectada"))
.catch(error => console.log(error))