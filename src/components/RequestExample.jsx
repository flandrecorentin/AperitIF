import React, {useContext} from "react";
import CocktailCard from "./CocktailCard.jsx";
import './RequestExample.css'
import {CocktailContext} from "../context/CocktailContext.js";

function RequestExample() {

	const {cocktails} = useContext(CocktailContext);

	return (<div id="requestExample">
		<h2>May we propose a cocktail :</h2>
		<div id="cardsTableau">
			{cocktails.sort((c1, c2) => c1.name + c2.name)
				.map((card, index) =>
				<CocktailCard key={index} name={card.name} img={card.img} />
			)}
        </div>
	</div>)
}

export default RequestExample;