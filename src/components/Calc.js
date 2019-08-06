import React from "react";
import './Calc.css';

function CalcButton({value, onClick}) {

    const {content} = value;

    return <div onClick={onClick} className="calc__button">{content}</div>
}

function CalcButtons({onClick}) {
    const symbols = [
        1, 2, 3, '-',
        4, 5, 6, '+',
        7, 8, 9, '=',
        null, null, 0, 'C'
    ];


    const items = symbols.map((value, key) =>
        value !== null
            ? <CalcButton onClick={onClick} key={key} value={{content: value}}/>
            : <span key={key}>&nbsp;</span>)
    return (
        <div className="calc__buttons">{items}</div>
    )
}

const isNumber = arg => /\d/.test(arg);
const isPlus = arg => /[+]/.test(arg);
const isMinus = arg => /[-]/.test(arg);
const isOperation = arg => isPlus(arg) || isMinus(arg);
const isClear = arg => /C/.test(arg);
const isEqual = arg => /[=]/.test(arg);

export default class Calc extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            args: ['0'],
            operation: null
        }
    }

    calculate() {
        const [a, b] = this.state.args;
        const operation = this.state.operation;

        if (!b) {
            return;
        }

        if (isPlus(operation)) {
            const result = String((+a) + (+b));
            this.setState(() => ({
                args: [result],
                operation: null,
            }));
        } else if (isMinus(operation)) {
            const result = String((+a) - (+b));
            this.setState(() => ({
                args: [result],
                operation: null,
            }));
        }


    }

    get screen() {
        return this.state.args.slice(-1)[0];
    }

    onButtonClick = function ({target}) {
        const char = target.innerText;
        const screen = this.screen;
        const [a, b] = this.state.args;
        const operation = this.state.operation;

        console.log('screen', screen)

        if (isClear(char)) {
            this.setState(() => ({
                args: ['0'],
                operation: null
            }));
            return;
        }


        if (isEqual(char)) {
            if (b) {
                this.calculate();
            }
            return
        }


        if (isOperation(char)) {
            if (b) {
                this.calculate();
            } else {
                this.setState(state => ({
                    operation: char,
                    args: state.args
                }));
                return;
            }
        }

        if (screen.length > 8) {
            return;
        }


        if (b) {
            if (isNumber(char)) {
                if (b === '0') {
                    this.setState(state => ({
                        args: [state.args[0], char],
                        operation: state.operation
                    }));
                } else {
                    this.setState(state => ({
                        args: [state.args[0], state.args[1] + char],
                        operation: state.operation
                    }));
                }
            }
        } else {
            if (isNumber(char)) {
                if (operation) {
                    this.setState(state => ({
                        args: [state.args[0], char],
                        operation: state.operation
                    }));
                } else {
                    if (a === '0') {
                        this.setState(state => ({
                            args: [char],
                            operation: state.operation
                        }));
                    } else {
                        this.setState(state => ({
                            args: [state.args[0] + char],
                            operation: state.operation
                        }));
                    }
                }
            } else if (isOperation(char)) {
                this.setState(state => ({
                    args: [state.args[0]],
                    operation: char
                }));
            }
        }
    };

    render() {
        return (
            <div className="Calc">
                <div className="calc__container">
                    <div className="calc__screen">{this.screen}</div>
                    <CalcButtons onClick={this.onButtonClick.bind(this)}/>
                </div>
            </div>
        );
    }
}
