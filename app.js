const registerForm = document.querySelector('form');
const customerName = document.querySelector('#customer-name');
const salePrice = document.querySelector('#sale-price');
const saleDate = document.querySelector('#sale-date');
const salesContainer = document.querySelector('div.sales-container');
const tableBody = document.querySelector('tbody');

const validateUsername = name => name.trim() === '' ? false : name;

const validateValue = value => Number(value) > 0 ? value : false;

const getDate = date => {
    const dateObj = new Date(date);

    return `${dateObj.getDate() + 1}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
}

const insertNewSale = (customer, value, date) => {
    tableBody.innerHTML += `
    <tr>
        <td>${customer}</td>
        <td>R$${value}</td>
        <td>${date}</td>
    </tr>
    `
}

registerForm.addEventListener('submit', e => {
    e.preventDefault();

    const validUsername = validateUsername(customerName.value);
    const validSaleValue = validateValue(salePrice.value);
    const formatedDate = getDate(saleDate.value);

    if([validUsername, validSaleValue, formatedDate].includes(false)) {
        return 'Error'
    }

    salesContainer.classList.remove('hidden');

    insertNewSale(validUsername, validSaleValue, formatedDate);

    registerForm.reset()
})
