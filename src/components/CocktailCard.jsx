import React from 'react';
import defaultCocktail from "../img/cocktail.jpg";
import './CocktailCard.css'

function CocktailCard({name, img}) {

	return (
		<div id="divCard">
			<a href={"/cocktail/" + name}>
				<img src={img ? img : defaultCocktail}
				     onError={(e) =>
					     (e.target.onerror = null)(
						     (e.target.src =
							     defaultCocktail)
					     )}/>
				<div><p>{name}</p></div>
			</a>
		</div>
	)

}


export default CocktailCard;