const registerForm = document.querySelector('form');
const customerName = document.querySelector('#customer-name');
const salePrice = document.querySelector('#sale-price');
const saleDate = document.querySelector('#sale-date');
const salesContainer = document.querySelector('div.sales-container');
const tableBody = document.querySelector('tbody');

const validateUsername = name => name.trim() === '' ? false : name;

const validateValue = value => Number(value) > 0 ? value : false;

const formatTimeUnit = unit => String(unit).length === 1 ? `0${unit}` : unit;

const getDate = date => {
    const dateObj = new Date(date);
    const formatedDateTimezone = new Date
        (dateObj.getTime() + Math.abs(dateObj.getTimezoneOffset() * 60000));
        
    const day = formatTimeUnit(formatedDateTimezone.getDate());
    const month = formatTimeUnit(formatedDateTimezone.getMonth() + 1);

    return `${day}/${month}/${formatedDateTimezone.getFullYear()}`;
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
