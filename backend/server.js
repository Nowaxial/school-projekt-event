const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

const { hashPassword, comparePassword } = require('./utils/bcrypt'); 
const { saveMenu, getMenu, saveOrder, createOrderContainer, getEventById} = require ('./database/operations');
const { generateOrderNr } = require ('./utils/tickets');

saveMenu();
createOrderContainer();

 

app.use(express.static('../frontend'));
app.use(express.json());


app.get('/api/event/menu', async (request, response) => {
    const resObj = {
        success: true,
        menu: ''
    }
        const eventMenu = await getMenu();
        
        

        resObj.menu = eventMenu[0];

    response.json(resObj);
    console.log(resObj);
});

app.post('/api/event/buy', (request, response) => {
    const order = request.body;
    // Hämta ut beställningen från body
    console.log(order); //Kolla i terminalen för att se hur beställningen ser ut

    const resObj = {
        success: true,
        orderNr: ''
    }

        //order.id = data.id; // Kopplar samman beställningen med användarnamnet från JWT som skickades med i anropet
        
        saveOrder(order); // Spara beställningen till databasen

        resObj.success = true;
        resObj.orderNr = generateOrderNr();
        
    

    response.json(resObj);
    console.log(resObj);
    database.push
})




app.listen(3050, () => {
    console.log('Server started on port 3050');
});