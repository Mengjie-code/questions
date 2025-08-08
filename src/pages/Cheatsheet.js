import * as React from 'react';
import { useState } from 'react';
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';


export default function Cheatsheet({ }) {

    const [currentAnswer, setCurrentAnswer] = useState('debounce');

    const renderList = ['apply','arrayFilter', 'arrayMap', 'call', 'curry', 'debounce', 'promiseMyall']

    const nameComponentMap = {
        debounce: <Denounce />,
        arrayMap: <ArrayMap />,
        arrayFilter: <ArrayFilter />,
        apply:<Apply />,
        call:<Apply />,
        curry:<Apply />,
        promiseMyall:<Apply />

    }


    return (
        <div>
            <div className='item-list'>
                {renderList.map(item => {
                    return <div className='item' onClick={() => { setCurrentAnswer(item) }}>{item}</div>

                })}
            </div>
            <div className='answer-container'>
                {nameComponentMap[currentAnswer]}
            </div>


        </div>
    );
}

function Denounce({ }) {

    return (
        <div>
            <SyntaxHighlighter
                language="javascript"
                style={dracula}>
                {`
//Debounce delays the execution of a function 
//until after a certain period of inactivity.                
function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
// 用法：
const handleInput = debounce((e) => {
    console.log("用户停止输入：", e.target.value);
}, 500);
document.querySelector("#search").addEventListener("input", handleInput);
            `}
            </SyntaxHighlighter>

        </div>
    );
}


function ArrayMap({ }) {

    return (
        <div>
            ArrayMap component

        </div>
    );
}

function ArrayFilter({ }) {

    return (
        <div>
            ArrayForEach component

        </div>
    );
}

function Apply({ }) {

    return (
        <div>
            <SyntaxHighlighter
                language="javascript"
                style={dracula}>
                {`
//apply() is a method available on every function in JavaScript
//Explicitly set the this value when calling a function.
//Pass arguments to the function as an array (or array-like object).
Function.prototype.myApply = function (thisArg, argsArray) {
  // Fallback to globalThis if thisArg is null or undefined
  thisArg = thisArg || globalThis;

  // Create a unique property to avoid overwriting existing ones
  const fnSymbol = Symbol();

  // Temporarily assign this function to the object
  thisArg[fnSymbol] = this;

  // Call the function with spread args
  const result = thisArg[fnSymbol](...argsArray);

  // Clean up
  delete thisArg[fnSymbol];

  return result;
};
            `}
            </SyntaxHighlighter>

        </div>
    );
}