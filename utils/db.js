import mongoose from 'mongoose';

const connection = {}


async function connect(){
    if (connection.isConnected) {
        console.log('already connected');
        return;
    }
    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            console.log('Use previous connection');
            return
        }
        await mongoose.disconnect()
    }

    const db = await mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('new connection');
    connection.isConnected = db.connections[0].readyState;
}

async function disconnect(){
    if (connection.isConnected) {
        if (process.env.NODE_ENV === 'production') {
            mongoose.disconnect();
            connection.isConnected = false;
        }else{
            console.log('not disconneting its in dev mode');
        }
    }
}

const convertDocToObj = (doc)=>{
    doc._id = doc._id.toString();
    doc.createdAt = doc.createdAt.toString();
    doc.updatedAt = doc.updatedAt.toString();
    doc.slug = doc.slug.toString();
    return doc;
}



const onError = async (err, req, res, next) => {
    await db.disconnect();
    res.status(500).send({ message: err.toString()});
  };

const db = {connect,disconnect,convertDocToObj,onError}

export default db;