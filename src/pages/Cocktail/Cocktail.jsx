import React from "react";
import  DescriptionCocktail from "../../components/Cocktail/DescriptionCocktail";
import Header from "../../components/Header/header.jsx";
import Footer from "../../components/Footer/footer.jsx";
import RequestForOneCocktail from "../../components/Cocktail/RequestForOneCocktail.jsx";
import {useParams} from "react-router-dom";

function Cocktail (){

    const{nameCocktail} = useParams();
    return(
        <>
            <Header />
            <div className="bodyPage">
                <RequestForOneCocktail nameCocktail={nameCocktail}/>
                <DescriptionCocktail />
            </div>
            <Footer />
        </>);
}

export default Cocktail;