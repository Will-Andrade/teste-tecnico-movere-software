const registerForm = document.querySelector('form');
const customerName = document.querySelector('#customer-name');
const salePrice = document.querySelector('#sale-price');
const saleDate = document.querySelector('#sale-date');
const salesContainer = document.querySelector('div.sales-container');
const biggestSaleBtn = document.querySelector('a.biggest-sale');
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

const showSales = shouldGetAll => {
    const sales = JSON.parse(localStorage.getItem('sales'));
    const lastSale = sales[sales.length - 1];

    if (shouldGetAll) {
        sales.forEach(({ customer, value, date }) => {
            tableBody.innerHTML += `
            <tr>
                <td>${customer}</td>
                <td>R$${value}</td>
                <td>${date}</td>
            </tr>
            `
        })
        return
    }

    return tableBody.innerHTML += `
    <tr>
        <td>${lastSale.customer}</td>
        <td>R$${lastSale.value}</td>
        <td>${lastSale.date}</td>
    </tr>
    `
}

const insertNewSale = (customer, value, date) => {
    const newSale = { customer, value, date };
    const savedSales = localStorage.getItem('sales')

    if (!savedSales) {
        localStorage.setItem('sales', JSON.stringify([newSale]));
        showSales(true);
        return
    }
    
    const sales = JSON.parse(localStorage.getItem('sales'));
    sales.push(newSale);
    localStorage.setItem('sales', JSON.stringify(sales));    
    showSales(false);
}

const checkSalesVisibility = () => {
    const isHidden = salesContainer.classList.contains('hidden');
    return isHidden ? salesContainer.classList.remove('hidden') : null
}

registerForm.addEventListener('submit', e => {
    e.preventDefault();

    const validUsername = validateUsername(customerName.value);
    const validSaleValue = validateValue(salePrice.value);
    const formatedDate = getDate(saleDate.value);

    if([validUsername, validSaleValue, formatedDate].includes(false)) {
        alert('Por favor preencha o formulário com dados válidos!');
        return
    }

    checkSalesVisibility();

    insertNewSale(validUsername, validSaleValue, formatedDate);

    registerForm.reset()
})

biggestSaleBtn.addEventListener('click', () => {
    const registeredSales = JSON.parse(localStorage.getItem('sales'));
    const allSaleValues = registeredSales.map(({ value }) => Number(value));

    const biggestSale = allSaleValues.reduce((acc, value) => 
        value > acc ? acc = value : acc , 0)

    console.log('Wants the biggest sale!', biggestSale);
})

if (localStorage.getItem('sales')) {
    checkSalesVisibility();
    showSales(true);
}
