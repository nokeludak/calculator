import React, { useState } from 'react';

const Calculator = () => {

    const [input, setInput] = useState("");
    const [popup, setPopup] = useState();
    let [ope] = useState([]);
    let [numbers] = useState([]);

    const onClick = () => {
        if (/^[0-9+*/,-.]*$/.test(input)) {

            if (input.includes(',')) {
                numbers = input.split(',');

                const forOpe = ["-", "+", "*", "/"];
                ope = numbers.filter(item => forOpe.includes(item));
                numbers = numbers.filter(item => !forOpe.includes(item));

                numbers = numbers.map(Number);
                for (let i = 0; i <= ope.length; i++) {
                    if (ope[i] === "-") {
                        numbers.push(numbers.pop() - numbers.pop());
                        setPopup();
                        setInput(input + " = " + numbers)
                    }
                    if (ope[i] === "+") {
                        numbers.push(numbers.pop() + numbers.pop());
                        setPopup();
                        setInput(input + " = " + numbers)
                    }
                    if (ope[i] === "/") {
                        numbers.push(numbers.pop() / numbers.pop());
                        setPopup();
                        setInput(input + " = " + numbers)
                    }
                    if (ope[i] === "*") {
                        numbers.push(numbers.pop() * numbers.pop());
                        setPopup();
                        setInput(input + " = " + numbers)
                    }

                    if (isNaN(numbers) === true) {
                        setPopup(<div className="popup">Something went wrong! Check the number of OPERANDS!</div>);
                        setInput(input);
                    }
                    if (numbers.length > 1) {
                        setPopup(<div className="popup">Something went wrong! Check the number of OPERATORS!</div>);
                        setInput(input);
                    }
                }
            }
        } else { setPopup(<div className="popup">Only numbers and arithmetic operators are valid!</div>); }

        if (input === "") {
            setPopup(<div className="popup">You did not enter anything!</div>);
        }
    }
    const clear = () => {
        setInput("")
    }

    return (
        <div className="container">
            <div>
                <div className="title">Reverse Polish Calculator</div>
                <input className="input"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    type="text"
                    placeholder="Enter the operands and operators" />
                <button className="clear" type="reset" onClick={clear}>Clear</button>
                <button className="compute" type="submit" onClick={onClick}>Compute</button>
                <div className="popupdiv" >{popup}</div>
            </div>
        </div>
    )
}

export default Calculator;