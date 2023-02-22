import React from "react";

import Header from "../../components/Header/header.jsx";
import Footer from "../../components/Footer/footer.jsx";
import RequestExample from "../../components/RequestExample.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";

function Home() {
	return (<>
			<Header/>
			<div className="bodyPage">
              <div id="welcomeText">
                <h1>Santé !</h1>
                <h2>as we say in France</h2>
              </div>
				<SearchBar/>
				<RequestExample/>
			</div>
			<Footer/>
		</>);
}

export default Home;
