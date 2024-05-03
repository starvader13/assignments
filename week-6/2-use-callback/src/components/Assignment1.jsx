import {memo, useCallback, useState} from "react";

// Create a counter component with increment and decrement functions. Pass these functions to a child component which has buttons to perform the increment and decrement actions. Use useCallback to ensure that these functions are not recreated on every render.

export function Assignment1() {
    const [count, setCount] = useState(0);

    // Your code starts here
    function handleIncrement() {
        console.log("hello")
        setCount(count => count+1);
    }

    const callHandleIncrement = useCallback(handleIncrement, []);

    function handleDecrement() {
        console.log("hello2")
        setCount(count => count-1);
    }

    const callHandleDecrement = useCallback(handleDecrement, []);
    // Your code ends here

    return (
        <div>
            <p>Count: {count}</p>
            <CounterButtons onIncrement={callHandleIncrement} onDecrement={callHandleDecrement} />
        </div>
    );
}

const CounterButtons = memo(({ onIncrement, onDecrement }) => {
    return <div>
        <button onClick={onIncrement}>Increment</button>
        <button onClick={onDecrement}>Decrement</button>
    </div>
});
