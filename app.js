const registerForm = document.querySelector('form');
const customerName = document.querySelector('#customer-name');
const salePrice = document.querySelector('#sale-price');
const saleDate = document.querySelector('#sale-date');
const salesContainer = document.querySelector('div.sales-container');
const tableBody = document.querySelector('tbody');

const insertNewSale = (customer, value, date) => {
    tableBody.innerHTML += `
    <tr>
        <td>${customer}</td>
        <td>${value}</td>
        <td>${date}</td>
    </tr>
    `
}

const formatDate = date => new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })

registerForm.addEventListener('submit', e => {
    e.preventDefault();

    const isAValidCustomer = customerName.value.trim() !== '';
    const isAValidSalePrice = salePrice.value.trim() !== '';
    const isAValidSaleDate = saleDate.value !== '' ? formatDate(saleDate.value) : false;

    console.log(isAValidSaleDate);

    const moneyInBRL = Number(salePrice.value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });

    console.log(moneyInBRL);

    if (isAValidCustomer && isAValidSalePrice && isAValidSaleDate){
        insertNewSale(customerName.value, moneyInBRL, saleDate.value);
    }

    salesContainer.classList.remove('hidden');
    registerForm.reset()
})

// salePrice.addEventListener('input', (e) => {
//     let formatedNumber = null;
//     let format = parseInt(e.target.value.replace(/\D/g, ''), 10);

//     formatedNumber = format.toLocaleString();

//     console.log(formatedNumber);
// })

// saleDate.addEventListener('input', e => {
//     const formatedDate = new Date(e.target.value).toLocaleDateString('pt-BR', {
//         timeZone: 'UTC'
//     });

//     console.log(formatedDate);
// })
