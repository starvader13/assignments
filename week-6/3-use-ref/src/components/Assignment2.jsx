import {useState, useRef} from 'react';

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
    const [, forceRender] = useState(0);

    // Bad Solution
    // const ref = useRef();

    // const handleReRender = () => {
    //     // Update state to force re-render
    //     forceRender(Math.random());
    //     const html = ref.current.innerText;
    //     const element = parseInt(html.split(' ')[4]);
    //     console.log(element);
    //     ref.current.innerText = `This component has rendered ${element + 1} times.`
    // };

    // return (
    //     <div>
    //         <p ref={ref}>This component has rendered {0} times.</p>
    //         <button onClick={handleReRender}>Force Re-render</button>
    //     </div>
    // );

    // Good Solution
    const numberOfTimesRendered = useRef(0);
    const handleReRender = () => {
        // Update state to force re-render
        forceRender(Math.random());
    };

    numberOfTimesRendered.current = numberOfTimesRendered.current + 1;

    return (
        <div>
            <p>This component has rendered {numberOfTimesRendered.current} times.</p>
            <button onClick={handleReRender}>Force Re-render</button>
        </div>
    );
};