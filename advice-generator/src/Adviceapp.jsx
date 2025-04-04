
import { useEffect, useState, useRef } from 'react';
import "./Advice.css";
import PropTypes from 'prop-types'; // Import PropTypes

const Adviceapp = () => {
    const [advice, setAdvice] = useState("Please click the button to get advice");
    const [adviceNumber, setAdviceNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const firstLoad = useRef(true); // Track first render

    async function getAdvice() {
        setLoading(true);
        try {
            const response = await fetch('https://api.adviceslip.com/advice');
            const data = await response.json();
            setAdvice(data.slip.advice);
            setAdviceNumber((c) => c + 1); // Increment counter
        } catch (error) {
            console.error("Error fetching advice", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (firstLoad.current) {
            firstLoad.current = false; // Prevent double execution
            getAdvice(); // Fetch advice on first render
        }
    }, []);

    return (
        <div>
            {loading && <p>Please wait...</p>} 
            <h3>{advice}</h3>
            <button onClick={getAdvice}>Get Advice</button>
            <Counter count={adviceNumber} /> {/* Pass count correctly */}
        </div>
    );
}

// Fixed Counter Component
function Counter(props) {
    return (    
        <p>You have read <b className="Bold">{props.count}</b> pieces of advice</p>
    );
}

// Define Prop Types for Counter Component
Counter.propTypes = {
    count: PropTypes.number.isRequired // Ensure count is a required number
};

export default Adviceapp;

