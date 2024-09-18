import React, { useEffect, useState } from "react"
import CurrencyRow from './CurrencyRow'
import "./App.css"

const BASE_URL = 'https://open.er-api.com/v6/latest/USD'


const App = () => {
	const [currencyOptions, setCurrencyOptions] = useState([])
	const [fromCurrency, setFromCurrency] = useState()
	const [toCurrency, setToCurrency] = useState()
	const [exchangeRate, setExchangeRate] = useState()
	const [amount, setAmount] = useState(1)
	const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

	const [fromTemperature, setFromTemperature] = useState()
	const [toTemperature, setToTemperature] = useState()

	const [typedCountry, settypedCountry] = useState("")
	const [showCountry, setShowCountry] = useState(false);	

	let toAmount, fromAmount
	if (amountInFromCurrency) {
		fromAmount = amount
		toAmount = amount * exchangeRate
	} else {
		toAmount = amount
		fromAmount = amount / exchangeRate
	}

	useEffect(() => {

		fetch(BASE_URL)
			.then(res => res.json())
			.then(data => {
				const firstCurrency = Object.keys(data.rates)[1]
				setCurrencyOptions([data.base_code, ...Object.keys(data.rates)])
				setFromCurrency(data.base_code)
				setToCurrency(firstCurrency)
				setExchangeRate(data.rates[firstCurrency])
			})
	}, [])

	useEffect(() => {
		if (fromCurrency != null && toCurrency != null) {
			fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
				.then(res => res.json())
				.then(data => setExchangeRate(data.rates[toCurrency]))
		}
	}, [fromCurrency, toCurrency])

	function handleFromAmountChange(e) {
		setAmount(e.target.value)
		setAmountInFromCurrency(true)
	}

	function handleToAmountChange(e) {
		setAmount(e.target.value)
		setAmountInFromCurrency(false)
	}

	function convertToFahrenheit() {
		const fahrenheit = (parseFloat(fromTemperature) * 9) / 5 + 32
    setToTemperature(fahrenheit.toFixed(2))
	}

	function convertToCelcius() {
		const celsius = ((parseFloat(fromTemperature) - 32) * 5) / 9
    setToTemperature(celsius.toFixed(2))
	}

	function handleSearch() {
		setShowCountry(true)
	}

	return (
		<div className="Application">
			<div className="DestinationBox">
				<h1>Destination</h1>
				<input type="text" placeholder="The destination is..."
				value={typedCountry || ""} onChange={(e) => settypedCountry(e.target.value)} />
				<button onClick={handleSearch}>Search</button>
        {showCountry && <div>Destination: {typedCountry}</div>}
			</div>
			<div className="CurrencyExchanger">
				<h1>Currency exchanger</h1>
				<CurrencyRow currencyOptions={currencyOptions}
					selectedCurrency={fromCurrency}
					onChangeCurrency={e => setFromCurrency(e.target.value)}
					onChangeAmount={handleFromAmountChange}
					amount={fromAmount}
				/>
			<div className="equals">=</div>
			<CurrencyRow currencyOptions={currencyOptions}
				selectedCurrency={toCurrency}
				onChangeCurrency={e => setToCurrency(e.target.value)}
				onChangeAmount={handleToAmountChange}
				amount={toAmount} />
			</div>
			<div className="WeatherBox">
				<h1>Weather</h1>
				<input type="number" placeholder="The weather is..." 
					value={fromTemperature || ""} onChange={(e) => setFromTemperature(e.target.value)} />
				<div>Convert to temperature: {toTemperature}</div>
				<button onClick={convertToCelcius}>To Celcius</button>
				<button onClick={convertToFahrenheit}>To Fahrenheit</button>
			</div>
		</div>
	)
}


export default App;
