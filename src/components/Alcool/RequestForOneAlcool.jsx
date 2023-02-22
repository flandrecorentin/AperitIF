import {useEffect} from "react";
import React from "react";
import './RequestForOneAlcool.css'

function RequestForOneAlcool(nameAlcool) {
    console.log("********");
    console.log(nameAlcool.nameAlcool);
    var alcool = nameAlcool.nameAlcool;
    var requete = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX : <http://dbpedia.org/resource/>
PREFIX dbpedia2: <http://dbpedia.org/property/>
PREFIX dbpedia: <http://dbpedia.org/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
\n
SELECT distinct ?name ?comments ?thumbnail ?nameSP ?thumbnail2  WHERE {
?cocktail dbp:type ?typeSP; 
dbo:thumbnail ?thumbnail;
rdfs:comment ?comments;
dbp:name ?name.
OPTIONAL
{
?cocktail1 dbp:type "cocktail"@en;
rdfs:comment ?comm;
dbo:thumbnail ?thumbnail2;
dbp:name ?nameSP;
dbp:ingredients ?ingredients.
Filter(regex(?ingredients,"`+alcool.toLowerCase()+`","i"))
}
Filter (langMatches(lang(?comm), "en"))
Filter (langMatches(lang(?comments), "en"))
FILTER(?name="`+alcool+`"@en)
}`;
    const rechercher = () => {
        var contenu_requete = requete;

        // Encodage de l'URL à transmettre à DBPedia
        var url_base = "http://dbpedia.org/sparql";
        var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";
        // Requête HTTP et affichage des résultats
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var results = JSON.parse(this.responseText);
                afficherResultats(results);

            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    // Affichage des résultats dans un tableau
    const afficherResultats = (data) => {
        // Tableau pour mémoriser l'ordre des variables ; sans doute pas nécessaire
        // pour vos applications, c'est juste pour la démo sous forme de tableau
        var index = [];
        var Ctitle; // ok
        var Cimg; // ok
        var Ccomment; // ok
        console.log("DATA");
        console.log("***"+data.results.bindings[0]);
        // title
        Ctitle = data.results.bindings[0].name.value;
        console.log("Title: ");
        console.log(data.results.bindings[0].name.value);

        // comment
        Ccomment = data.results.bindings[0].comments.value;
        console.log("Comment: ");
        console.log(data.results.bindings[0].comments.value);

        // image
        Cimg = data.results.bindings[0].thumbnail.value;
        console.log("Image: ");
        console.log(data.results.bindings[0].thumbnail.value);




        var contenuAlcool = "<h1>";
        contenuAlcool += Ctitle;
        contenuAlcool += "</h1>";

        contenuAlcool += "<div class='align'>";
        contenuAlcool += "<div>"
        contenuAlcool += "<p id='comments'>";
        contenuAlcool += Ccomment;
        contenuAlcool += "</p>";
        contenuAlcool += "</div>";
        contenuAlcool += "<div>";
        contenuAlcool += "<img id ='imgCocktail' src='";
        contenuAlcool += Cimg;
        contenuAlcool += "'/>'";
        contenuAlcool += "</div>";
        contenuAlcool+= "</div>";
        contenuAlcool+= "</div>";
        contenuAlcool +="<h2>Cocktails made with this ingredient:</h2>"
        contenuAlcool += "<div id='suggestion'>"
        contenuAlcool += "<ul class='no-bullets'>";
        for(var i=0;i<data.results.bindings.length;i++){
            if (data.results.bindings[i].thumbnail2 != undefined && data.results.bindings[i].nameSP != undefined) {
                contenuAlcool += "<li>";
                contenuAlcool += "<a href='/cocktail/" + data.results.bindings[i].nameSP.value + "'>";
                contenuAlcool += "<img id='image' src='";
                contenuAlcool += data.results.bindings[i].thumbnail2.value;
                contenuAlcool += "'/>'";
                contenuAlcool += "<span style='margin-left: 10px'>"
                contenuAlcool += data.results.bindings[i].nameSP.value;
                contenuAlcool += "</span>"
                contenuAlcool += "</a>";
                contenuAlcool += "</li>";
            }
        }
        contenuAlcool += "</ul>";
        contenuAlcool += "</div>";
        document.getElementById("resultatOneAlcool").innerHTML = contenuAlcool;


    }
    rechercher();
    return (<>
        {/*<table id="resultatsOneCocktailTable"></table>*/}
        <div id="resultatOneAlcool"></div>
    </>)
}

export default RequestForOneAlcool;