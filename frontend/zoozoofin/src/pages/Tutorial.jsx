import { useState } from 'react';
import example from '../scripts/example.json';

const Tutorial = () => {
    const [currentId, setCurrentId] = useState(1);
    const currentScript = example[0].scripts.find((script) => script.id === currentId);

    const handleResponseClick = (responseKey) => {
        const nextId = currentScript.responses[responseKey];
        setCurrentId(nextId);
    };

    return (
        <>
            <h1>Tutorial</h1>
            <p>{currentScript.content}</p>
            {Object.keys(currentScript.responses).map((responseKey, index) => (
                <button key={index} onClick={() => handleResponseClick(responseKey)}>
                    {responseKey}
                </button>
            ))}
        </>
    );
};

export default Tutorial;
