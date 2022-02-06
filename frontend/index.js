const menuElem = document.querySelector('#menu');
const orderButton = document.querySelector('#order-button');
const orderNumberElem = document.querySelector('#order-number');
const etaElem = document.querySelector('#eta');

async function order(order) {

    const response = await fetch('http://localhost:3050/api/event/buy', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data);

    if (data.success) {
        // Visar ordernummer och leveranstid (ETA);
        orderNumberElem.innerHTML = `Ordernummer: ${data.orderNr}`;
    }
}

function showMenu(menu) {
    // Loopa igenom menyn och för varje menyalternativ:
    // 1. Skapa en li-tagg
    // 2. I li-taggen lägg till namn och pris
    // 3. Lägg till li-taggen i menuElem (ul-taggen)
    menu.forEach((menuItem) => {
        const itemElem = document.createElement('li');
        itemElem.classList.add('menu-item'); // Sätter en css-klass på min li-tagg som är definerad i styles.css
        itemElem.innerHTML = `<span>${menuItem.id}</span> <span>"${menuItem.place}"</span> <span>"${menuItem.date}"</span> <span>"${menuItem.time}"</span> <span>${menuItem.price} kr</span>`;
        menuElem.append(itemElem);

        itemElem.addEventListener('click', () => { // Kopplar en eventlistener till varje li-tagg
            order(menuItem); // Gör ett fetch-anrop och skickar med vilken kaffe jag valt
        });
    });
}

async function getMenu() {
    const response = await fetch('http://localhost:3050/api/event/menu');
    const data = await response.json();
  console.log(data);

    if (data.success) {
      /*   console.log(data); */
        showMenu(data.menu.menu);
    } 
}
    

orderButton.addEventListener('click', () => {
    order();
});

getMenu();

