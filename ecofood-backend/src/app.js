const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
require('dotenv').config();
const morgane = require('morgan');
const fs = require('fs');
// const morgan = require('morgan');
const req = require('express/lib/request');


app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/src`));

// Loges
morgane.token('body', (req) => JSON.stringify(req.body));
app.use(morgane(':status :method :url :body :response-time ms',{stream: fs.createWriteStream('./Logger.log', {flags: 'a'})}))


mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('Database Connected')
})
  
// Client api
const clientRoutes = require('./routes/client/client.routes')
app.use('/api/clients', clientRoutes)

// Livreur api
const livreurRoutes = require('./routes/livreur/livreur.routes')
app.use('/api/livreurs', livreurRoutes)

// Admin api
const AdminRoutes = require('./routes/admin/admin.routes')
app.use('/api/admins', AdminRoutes)

// Responsable api
const ResponsableRoutes = require('./routes/responsable/responsable.routes')
app.use('/api/responsables', ResponsableRoutes)

// Categorie api
const categorieRoutes = require('./routes/categorie/categorie.routes')
app.use('/api/categories', categorieRoutes)

// Produit api
const produitRoutes = require('./routes/produit/produit.routes')
app.use('/api/produits', produitRoutes)

//commande api 
const commandeRoute = require('./routes/commande/commade.routes')
app.use('/api/commandes', commandeRoute)

//contact api 
const contactRoute = require('./routes/contact/contact.routes')
app.use('/api/contacts', contactRoute)

//commentaire api 
const commentaireRoute = require('./routes/commentaire/commentaire.routes')
app.use('/api/commentaires', commentaireRoute)



app.listen(process.env.PORT, () => {
    console.log(`up and running at http://localhost:${process.env.PORT}`);
})