import {useEffect} from "react";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CocktailCard from "./CocktailCard.jsx";
import { createRoot } from 'react-dom/client';
import { createElement } from "react";
import {useState} from "react";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Slider from "react-slick";
import './CocktailCarousel.css'
function CocktailCarousel(listeCocktails) {
    const [cards, setCards] = useState([]);

    useEffect(() => {
            setCards(listeCocktails.cocktails);
    	}, [])

    /* const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 8,
      slidesToScroll: 3,
      lazyLoad: true,
    }; */

	return (<div className="carouselDiv">

		<Carousel centerMode showStatus={false} showIndicators={false} showThumbs={true} infiniteLoop={false} centerSlidePercentage={20}>

            {cards.map((card, index) =>
                            <CocktailCard key={index} name={card.get("name")} img={card.get("thumbnail")} />
            )}
        </Carousel>

        {/* <Slider {...settings}>

                    {cards.map((card, index) =>
                            <div>
                                    <CocktailCard key={index} name={card.get("name")} img={card.get("thumbnail")} />
                            </div>
                    )}
        </Slider> */}


	</div>)
}

export default CocktailCarousel;