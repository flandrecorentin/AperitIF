import {useState} from "react";

function CountButton (){
	const [count, setCount] = useState(0);

	return(<>
		<button onClick={() => setCount((count) => count + 1)}>
			Shots bus : {count}
		</button>
	</>)
}

export default CountButton;