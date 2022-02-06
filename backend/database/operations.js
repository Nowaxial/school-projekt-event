const nedb = require('nedb-promise');
const database = new nedb({ filename: 'accounts.db', autoload: true });

const menu = {
    "type": "event-menu",
    "menu":[
      {
        "id":1,
        "title":"Lasse-Stefanz",
        "place":"Kjell Härnqvist-salen",
        "price":350,
        "date": "21 mars",
        "time": "19.00 - 21.00"
      },
      {
        "id":2,
        "title":"Pelle Trubadur",
        "place":"Pubelipuben",
        "price":110,
        "date": "29 mars",
        "time": "22.00 - 00.00"
      },
      {
        "id":3,
        "title":"Kajsas kör",
        "place":"Götaplatsen",
        "price":99,
        "date": "10 april",
        "time": "15.00 - 16.00"
      },
      {
        "id":4,
        "title":"Klubb Untz",
        "place":"Din favoritkällare",
        "price":150,
        "date": "17 april",
        "time": "22.00 - du tröttnar"
      }
    ]
  }

async function getEventById(id) {
    const eventId = await database.find({ id: id });
    return eventId;
}

function saveAccount(account) {
    database.insert(account);
}

function saveMenu() {
    database.insert(menu);
}

async function getMenu() {
    const menu = await database.find({ type: 'event-menu' });
    return menu;
    //console.log(menu);
}

function createOrderContainer() {
  database.insert({ type: 'event-orders', orders: [] });
}

function saveOrder(order) {
  // Letar först upp vårt objekt som heter coffee-orders och sedan i arrayen orders pushar in beställningen (order)
  database.update({ type: 'event-orders' }, { $push: { orders: order } }, {});
}

//module.exports = { getAccountByUsername, saveAccount, saveMenu, getMenu, 
 // createOrderContainer, saveOrder }

module.exports = { saveMenu, getMenu, saveOrder, createOrderContainer, getEventById}