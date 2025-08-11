import * as React from 'react';
import { useState } from 'react';
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';


export default function Cheatsheet({ }) {

    const [currentAnswer, setCurrentAnswer] = useState('apply');

    const renderList = ['apply','arrayFilter','arrayMap', 'arrayReduce','bubbleSort', 'call', 'curry', 'debounce', 'PromiseMyAll', 'PromiseMyAny', 'PromiseMyAllSettled', 'PromiseMyRace', 'throttle']

    const nameComponentMap = {
        arrayMap: <ArrayMap />,
        arrayFilter: <ArrayFilter />,
        arrayReduce: <ArrayReduce />,
        apply:<Apply />,
        call:<Call />,
        curry:<Curry />,
        debounce: <Denounce />,
        PromiseMyAll:<PromiseMyAll />,
        PromiseMyRace:<PromiseMyRace />,
        PromiseMyAny:<PromiseMyAny />,
        PromiseMyAllSettled:<PromiseMyAllSettled />,
        throttle:<Throttle />,
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

function Throttle({ }) {

    return (
        <div>
            <SyntaxHighlighter
                language="javascript"
                style={dracula}>
                {`
/*run at most once per interval.   
Throttling in JavaScript is a technique used to limit the rate at which a function can be executed. 
This is particularly useful for events that fire frequently, 
such as scroll, resize, or mousemove, to prevent excessive function calls and improve performance
*/

function throttle(func, delay) {
  let timeoutId = null;
  let lastArgs = null;
  let lastThis = null;

  return function(...args) {
    lastArgs = args;
    lastThis = this;

    if (!timeoutId) {
      // Execute the function immediately on the first call
      func.apply(lastThis, lastArgs);

      timeoutId = setTimeout(() => {
        timeoutId = null; // Clear the timeout after the delay
        if (lastArgs) { // If there were calls during the delay, execute the last one
          func.apply(lastThis, lastArgs);
          lastArgs = null;
          lastThis = null;
        }
      }, delay);
    }
  };
}
            `}
            </SyntaxHighlighter>

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
            <SyntaxHighlighter
                language="javascript"
                style={dracula}>
                {`
// array map
            `}
            </SyntaxHighlighter>

        </div>
    );
}

function ArrayFilter({ }) {

    return (
        <div>
            <SyntaxHighlighter
                language="javascript"
                style={dracula}>
                {`
// array filter
            `}
            </SyntaxHighlighter>

        </div>
    );
}

function ArrayReduce({ }) {

    return (
        <div>
            <SyntaxHighlighter
                language="javascript"
                style={dracula}>
                {`
// array reduce
            `}
            </SyntaxHighlighter>

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

function Curry({ }) {

    return (
        <div>
            <SyntaxHighlighter
                language="javascript"
                style={dracula}>
                {`
export default function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    }
    return (arg) =>
      arg === undefined
        ? curried.apply(this, args)
        : curried.apply(this, [...args, arg]);
  };
            `}
            </SyntaxHighlighter>

        </div>
    );
}

function Call({ }) {

    return (
        <div>
            <SyntaxHighlighter
                language="javascript"
                style={dracula}>
                {`
Function.prototype.myCall = function (thisArg, ...args) {
    const key = Symbol('key');
    thisArg[key] = this //func, who call this fucniton
    const res = thisArg[key](...args)
    delete thisArg[key]
    return res;
}
            `}
            </SyntaxHighlighter>

        </div>
    );
}

function PromiseMyRace({ }) {

    return (
        <div>
            <SyntaxHighlighter
                language="javascript"
                style={dracula}>
                {`
/*
Input: An iterable (usually an array) of promises (or values).
Output: A new promise.
Behavior:
Whichever promise resolves or rejects first determines the outcome.
All other results are ignored once the first one settles.
*/
Promise.myRace = function (promises) {
  // Write your code here.
  return new Promise((resolve, reject)=>{
    if(promises.length===0){
      return 
    }
    promises.forEach(async promise=>{
      // Promise.resolve(promise).then(resolve).catch(reject)
      try{
        const result = await promise
        resolve(result)
      }
      catch(err){
        reject(err)
        
      }
    })
  })
};
            `}
            </SyntaxHighlighter>

        </div>
    );
}

function PromiseMyAll({ }) {

    return (
        <div>
            <SyntaxHighlighter
                language="javascript"
                style={dracula}>
                {`
/*
Input: An iterable (usually an array) containing multiple promises (or values).
Output: A new promise.
Behavior:
All succeed → Resolves with an array of results, in the same order as the input.
Any fails → Immediately rejects with the first rejection reason.
*/
Promise.myAll = function (promises) {
  // Write your code here.
    return new Promise((resolve, reject)=>{
    if(promises.length===0){
      return 
    }
    let result = []
    let count = 0
    promises.forEach((promise,i)=>{
      Promise.resolve(promise).then(value=>{
        count++
        result[i] = value
        if(count===promises.length){
          resolve(result)
        }
        
      }).catch(reject)
    })
  })
};
            `}
            </SyntaxHighlighter>

        </div>
    );
}

function PromiseMyAny({ }) {

    return (
        <div>
            <SyntaxHighlighter
                language="javascript"
                style={dracula}>
                {`
/*
Input: An iterable (usually an array) of promises (or values).
Output: A new promise.
Behavior:
Resolves with the value of the first fulfilled promise.
Ignores rejections until one promise fulfills.
If all promises reject, it rejects with an AggregateError containing all rejection reasons.
*/
Promise.myAny = function (promises) {
  // Write your code here.
    return new Promise((resolve, reject)=>{
    if(promises.length===0){
      reject(new AggregateError([])) 
      return
    }
    const errorArray = []
    let count = 0;
    promises.forEach(promise=>{
      Promise.resolve(promise).then(resolve).catch(err=>{
        errorArray.push(err)
        count++
        if(count===promises.length){
          //reject(new AggregateError(errorArray))
           reject("all promises rejected")
        }
      })
    })
  })
};
            `}
            </SyntaxHighlighter>

        </div>
    );
}


function PromiseMyAllSettled({ }) {

    return (
        <div>
            <SyntaxHighlighter
                language="javascript"
                style={dracula}>
                {`
/*
Input: An iterable (usually an array) of promises (or values).
Output: A new promise.
Behavior:
Waits for all promises to finish, no matter if they succeed or fail.
Always resolves (never rejects) with an array of result objects.
Each result object has:
status: "fulfilled" or "rejected"
value: the resolved value (if fulfilled)
reason: the error (if rejected)
*/
Promise.myAllSettled = function (promises) {
  // Write your code here.
    return new Promise((resolve, reject)=>{
      if(promises.length===0){
        resolve([]) 
        return
      }
      const result = []
      let count = 0
      promises.forEach((promise,i)=>{
        Promise.resolve(promise)
          .then(value=>{
            result[i] ={"status":"fulfilled", value}
          })
          .catch(error=>{
             result[i] ={"status":"rejected", error}
          })
          .finally(()=>{
            count++;
            if(count===promises.length){
              resolve(result)
            }
          })
        
      })
    })
  
};
            `}
            </SyntaxHighlighter>

        </div>
    );
}


