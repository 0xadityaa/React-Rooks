import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("connected to db")
        })

        connection.on('error', console.error.bind(console, 'connection error:'));
    } catch (error) {
        console.log("error connecting to db", error)
    }
}
