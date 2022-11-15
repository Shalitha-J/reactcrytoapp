import { useState } from 'react';
import React from 'react'
import ExchangeRate from "./ExchangeRate";
import axios from 'axios';

export default function CurrencyConverter() {
    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA']

    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('BTC')
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('USD')
    const [amount, setAmount] = useState(null)
    const [exchangeRate, setExchangeRate] = useState(0)
    const [result, setResult] = useState(0)
    console.log(chosenPrimaryCurrency)
    console.log(chosenSecondaryCurrency)

    const convert = () => {



        const options = {
          method: 'GET',
          url: 'https://alpha-vantage.p.rapidapi.com/query',
          params: {to_currency: chosenSecondaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', from_currency: chosenPrimaryCurrency},
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
          }
        };
        
        axios.request(options).then((response) => {
            console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
            setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <div className='currency-converter'>
            <h2>CurrencyConverter</h2>

            <div className='input-box'>
                <table>
                    <tbody>
                        <tr>
                            <td className='e-text'>Primary Currency</td>
                            <td>
                                <input
                                    type="number"
                                    name="currency-amount-1"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </td>
                            <td>
                                <select
                                    value={chosenPrimaryCurrency}
                                    name='currency-option-1'
                                    className='currency-options'
                                    onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                                >
                                    {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className='e-text'>Secondary Currency</td>
                            <td>
                                <input
                                  
                                    name="currency-amount-2"
                                    value= {result}
                                    disabled = {true}
                                />
                            </td>
                            <td>
                                <select
                                    value={chosenSecondaryCurrency}
                                    name='currency-option-2'
                                    className='currency-options'
                                    onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
                                >
                                    {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}

                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button id="convert-button" onClick={convert}>Convert</button>
            </div>


            <ExchangeRate 
               exchangeRate = {exchangeRate}
               chosenPrimaryCurrency = {chosenPrimaryCurrency}
               chosenSecondaryCurrency = {chosenSecondaryCurrency}
            />
        </div>
    )
}
