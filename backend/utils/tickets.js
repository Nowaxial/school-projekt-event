function generateOrderNr() {
    const letters = ['XAY', 'BZC' ];
    const randomLetter = letters[Math.floor(Math.random() * letters.length)]; // Slumpar en av bokstäverna X, Y eller Z
    const randomNumber = Math.floor(Math.random() * 5000/100); // Slumpar ett tal mellan 0 och 10 000
    return `${randomLetter}${randomNumber}`; // Sätter ihop det till ett ordernummer
}
console.log(generateOrderNr);



module.exports = { generateOrderNr }