import admin from 'firebase-admin'

import serviceAccount from './backendcoder-8133d-firebase-adminsdk-fmjb3-4a3f0cfda2.js'

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log("Firestore conectado");
} catch (error) {
    console.log(error);
}

const config = {
    mongoDb: {
        url: 'mongodb+srv://MarcosLabra:34851809a@coderback.pfiz1.mongodb.net/ecommerce?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    fileSystem: {
        dirProducts: './src/controllers/files/productos.json',
        dirCarts: './src/controllers/files/carts.json'
    },
    firebase: {
        db: admin.firestore(),
    }
}

export default config;