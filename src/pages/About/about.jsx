import React from "react";
import Header from "../../components/Header/header.jsx";
import Footer from "../../components/Footer/footer.jsx";
import Member from "../../components/Member/member.jsx";
import "./about.scss";

function about() {
  return (
    <>
      <Header />
      <h1>About</h1>
        {/*<h2>Projet réalisé par 7 étudiants de 4ème année du département informatique de l'INSA de Lyon dans le cadre d'un mini-projet de cours.</h2>*/}
        {/*<h2>Membres de l'équipe :</h2>*/}
        <h2>Project created by 7 students in their last to final year of engineering studies in Computer Science at
            <a className="linkTo" href={"https://www.insa-lyon.fr/"}> INSA Lyon</a>.
            This was a mini-project due for syllabus using open data from
            <a className="linkTo" href={"https://www.wikidata.org/wiki/Wikidata:Main_Page"}> Wikidata</a>.
            Information used is made available under Creative Commons CC0 License and/or Creative Commons Attribution-ShareAlike License. </h2>
        <h2>Team members :</h2>

        <div className="row">
            <div className="column">
                <Member name="Mael"/>
            </div>
            <div className="column">
                <Member name="Corentin"/>
            </div>
        </div>

        <div className="row">
            <div className="column">
                <Member name="Mohamed"/>
            </div>
            <div className="column">
                <Member name="Simon"/>
            </div>
            <div className="column">
                <Member name="Alexis"/>
            </div>
        </div>

        <div className="row">
            <div className="column">
                <Member name="Colin"/>
            </div>
            <div className="column">
                <Member name="Eva"/>
            </div>
        </div>

      <Footer/>
    </>
  );
}

export default about;
