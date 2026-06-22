const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");
const rateInfo = document.getElementById("rateInfo");
const swapBtn = document.getElementById("swapBtn");

const currencies = [
"USD","INR","EUR","GBP","JPY","AUD","CAD","CHF",
"CNY","SGD","HKD","NZD","SEK","KRW","NOK","MXN",
"BRL","RUB","ZAR","TRY","AED","SAR","THB","IDR",
"MYR","PHP","PKR","BDT","LKR","NPR"
];

function loadCurrencies(){

    currencies.forEach(currency=>{

        let option1=document.createElement("option");
        option1.value=currency;
        option1.textContent=currency;

        let option2=document.createElement("option");
        option2.value=currency;
        option2.textContent=currency;

        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);

    });

    fromCurrency.value="USD";
    toCurrency.value="INR";
}

loadCurrencies();

swapBtn.addEventListener("click",()=>{

    let temp=fromCurrency.value;
    fromCurrency.value=toCurrency.value;
    toCurrency.value=temp;

});

convertBtn.addEventListener("click",convertCurrency);

async function convertCurrency(){

    const value=parseFloat(amount.value);

    if(isNaN(value) || value<=0){

        result.textContent=
        "Please enter a valid amount";

        return;
    }

    result.textContent="Converting...";

    const from=fromCurrency.value;
    const to=toCurrency.value;

    try{

        const response=await fetch(
        `https://api.exchangerate-api.com/v4/latest/${from}`
        );

        const data=await response.json();

        const rate=data.rates[to];

        const converted=value*rate;

        rateInfo.textContent=
        `1 ${from} = ${rate.toFixed(4)} ${to}`;

        result.textContent=
        `${value} ${from} = ${converted.toFixed(2)} ${to}`;

    }

    catch(error){

        result.textContent=
        "Unable to fetch exchange rates.";

        console.error(error);
    }
}