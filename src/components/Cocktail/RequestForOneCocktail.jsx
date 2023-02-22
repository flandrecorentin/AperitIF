import React, {useState, useEffect} from "react";
import CocktailCarousel from "../CocktailCarousel.jsx";
import './RequestForOneCocktail.css'
function RequestForOneCocktail(nameCocktail) {

    const [cocktailsIngredients, setCocktailsIngredients] = useState([]);

    console.log("PARAMMMEETTERR");
    console.log(nameCocktail.nameCocktail);
    var cocktail = nameCocktail.nameCocktail;
    var recherche = `PREFIX yago: <http://dbpedia.org/class/yago/>
                     SELECT ?cocktail ?name ?thumbnail ?comments ?served ?ingredients ?prep ?nameSP ?nameSPSP ?thumbnailSP STRAFTER(?nameSP, "Cocktails with") AS ?nameIngredients WHERE {
                     ?cocktail dbp:type ?type;
                     dbp:name ?name;
                     dbp:ingredients ?ingredients.
                     OPTIONAL{
                     ?cocktail
                     rdfs:comment ?comments.

                     Filter (langMatches(lang(?comments), "en"))
                     }
                     OPTIONAL{
                     ?cocktail
                     dbp:prep ?prep.
                     }

                     OPTIONAL{
                     ?cocktail
                     dbp:served ?served.
                     }

                     OPTIONAL{
                     ?cocktail
                     dbo:thumbnail ?thumbnail.
                     }

                     OPTIONAL{
                     ?cocktail
                     dbo:wikiPageWikiLink ?liens.
                     ?liens rdfs:label ?nameSP.
                     FILTER regex(?nameSP, "Cocktails with", "i")
                     Filter (langMatches(lang(?nameSP), "en"))
                     }

                     OPTIONAL{
                     ?cocktail
                     dbo:wikiPageWikiLink ?liens.
                     ?liensSP
                     dbo:wikiPageWikiLink  ?liens.
                     ?liensSP dbp:name ?nameSPSP;
                     dbo:thumbnail ?thumbnailSP.
                     Filter(?nameSPSP != ?name)
                     }
                     Filter regex(?name, "`+cocktail+`")
                     }`;
    const rechercher = () => {
        var contenu_requete = recherche;

        // Encodage de l'URL à transmettre à DBPedia
        var url_base = "http://dbpedia.org/sparql";
        var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";

        // Requête HTTP et affichage des résultats
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var results = JSON.parse(this.responseText);
                console.log(results)
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
        var varTest =1;
        var Ctitle; // ok
        var Cimg; // ok
        var Cingredients; // ok
        var Ccomment; // ok
        var Cserved;
        var TabIngredients = [];
        var Quantity = [];
        console.log("DATA");
        console.log(data.results.bindings[0]);
        // title
        Ctitle = data.results.bindings[0].name.value;
        console.log("Title: ");
        console.log(data.results.bindings[0].name.value);

        // ingredients
        Cingredients = data.results.bindings[0].ingredients.value;
        console.log("Ingredients: ");
        console.log(Cingredients);

        // console.log(Cingredients.contains('*'));
        var myIndex = Cingredients.toString().indexOf('*', 0);
        var i= 0;
        console.log("************************************************")
        while (myIndex != -1){
            const pastIndex = myIndex;
            myIndex = Cingredients.toString().indexOf('*', myIndex+1);
            console.log(pastIndex, myIndex, Cingredients.toString().length-1);
            let jj = 0;
            if(myIndex != -1){
                const ingreTemp = Cingredients.toString().substring(pastIndex+1, myIndex);
                for(jj; jj<ingreTemp.length; jj++){
                    var caraTemp = ingreTemp.charAt(jj);
                    console.log("caraTemp"+caraTemp);
                    if ((caraTemp >= '0' && caraTemp <= '9')|| caraTemp== ' ' || caraTemp == ',' || caraTemp =='.') {
                        console.log("number: "+ caraTemp);
                    }
                    else{
                        if(jj!=0){
                            Quantity[i] = ingreTemp.substring(0,jj);
                        }
                        else{
                            Quantity[i] = " ";
                        }
                        break;
                    }
                }
                TabIngredients[i] = Cingredients.toString().substring(pastIndex+1+jj, myIndex);
            }
            else{
                const ingreTemp2 = Cingredients.toString().substring(pastIndex+1, Cingredients.toString().length);
                for(jj; jj<ingreTemp2.length; jj++){
                    var caraTemp2 = ingreTemp2.charAt(jj);
                    console.log("caraTemp"+caraTemp2);
                    if ((caraTemp2 >= '0' && caraTemp2 <= '9')|| caraTemp2== ' ' || caraTemp2 == ',' || caraTemp2 =='.' || caraTemp2 =='*') {
                        console.log("number: "+ caraTemp2);
                    }
                    else{
                        if(jj!=0){
                            Quantity[i] = ingreTemp2.substring(0,jj);
                        }
                        else{
                            Quantity[i] = " ";
                        }
                        break;
                    }
                }
                // refaire pareil pour la quantity pour le dernier ingrédient
                TabIngredients[i] = Cingredients.toString().substring(pastIndex+1+jj,Cingredients.toString().length);
            }
            i= i+1;
        }
        console.log("Quantityyyy");
        console.log(Quantity)
        console.log("TabIngredientssss");
        console.log(TabIngredients);
        // comment
        Ccomment = data.results.bindings[0].comments.value;
        console.log("Comment: ");
        console.log(data.results.bindings[0].comments.value);

        // image
        Cimg = data.results.bindings[0].thumbnail.value;
        console.log("Image: ");
        console.log(data.results.bindings[0].thumbnail.value);

        // served
        Cserved = data.results.bindings[0].served.value;
        console.log("Served: ");
        console.log(data.results.bindings[0].served.value);

        var contenuCocktail = "<h1 id='h1cocktail'>";
        contenuCocktail += "<script>";
        contenuCocktail += "function augmenter(){";
        contenuCocktail += "console.log('testtt');";
        contenuCocktail += "}";
        contenuCocktail += "</script>";
        contenuCocktail += Ctitle;
        contenuCocktail += "</h1>";
        contenuCocktail += "<div class='align'>";
        contenuCocktail += "<div>"
        contenuCocktail += "<p id='comments'>";
        contenuCocktail += Ccomment;
        contenuCocktail += "</p>";
        contenuCocktail += "<div id='ingredients'>";
        contenuCocktail += "<div class='align'>"; //parseFloat(document.getElementById('numberPersons').textContent)
        contenuCocktail += "<button onClick={" +
            "if(parseFloat(document.getElementById('numberPersons').textContent)!=1&&0<document.getElementsByClassName('ab').length)document.getElementsByClassName('ab')[0].textContent=(parseFloat(document.getElementsByClassName('ab')[0].textContent))*(parseFloat(document.getElementById('numberPersons').textContent)-1)/(parseFloat(document.getElementById('numberPersons').textContent));" +
            "if(parseFloat(document.getElementById('numberPersons').textContent)!=1&&1<document.getElementsByClassName('ab').length)document.getElementsByClassName('ab')[1].textContent=(parseFloat(document.getElementsByClassName('ab')[1].textContent))*(parseFloat(document.getElementById('numberPersons').textContent)-1)/(parseFloat(document.getElementById('numberPersons').textContent));" +
            "if(parseFloat(document.getElementById('numberPersons').textContent)!=1&&2<document.getElementsByClassName('ab').length)document.getElementsByClassName('ab')[2].textContent=(parseFloat(document.getElementsByClassName('ab')[2].textContent))*(parseFloat(document.getElementById('numberPersons').textContent)-1)/(parseFloat(document.getElementById('numberPersons').textContent));" +
            "if(parseFloat(document.getElementById('numberPersons').textContent)!=1&&3<document.getElementsByClassName('ab').length)document.getElementsByClassName('ab')[3].textContent=(parseFloat(document.getElementsByClassName('ab')[3].textContent))*(parseFloat(document.getElementById('numberPersons').textContent)-1)/(parseFloat(document.getElementById('numberPersons').textContent));" +
            "if(parseFloat(document.getElementById('numberPersons').textContent)!=1&&4<document.getElementsByClassName('ab').length)document.getElementsByClassName('ab')[4].textContent=(parseFloat(document.getElementsByClassName('ab')[4].textContent))*(parseFloat(document.getElementById('numberPersons').textContent)-1)/(parseFloat(document.getElementById('numberPersons').textContent));" +
            "if(parseFloat(document.getElementById('numberPersons').textContent)!=1&&5<document.getElementsByClassName('ab').length)document.getElementsByClassName('ab')[5].textContent=(parseFloat(document.getElementsByClassName('ab')[5].textContent))*(parseFloat(document.getElementById('numberPersons').textContent)-1)/(parseFloat(document.getElementById('numberPersons').textContent));" +
            "if(parseFloat(document.getElementById('numberPersons').textContent)!=1&&6<document.getElementsByClassName('ab').length)document.getElementsByClassName('ab')[6].textContent=(parseFloat(document.getElementsByClassName('ab')[6].textContent))*(parseFloat(document.getElementById('numberPersons').textContent)-1)/(parseFloat(document.getElementById('numberPersons').textContent));" +
            "if(parseFloat(document.getElementById('numberPersons').textContent)!=1&&7<document.getElementsByClassName('ab').length)document.getElementsByClassName('ab')[7].textContent=(parseFloat(document.getElementsByClassName('ab')[7].textContent))*(parseFloat(document.getElementById('numberPersons').textContent)-1)/(parseFloat(document.getElementById('numberPersons').textContent));" +
            "if(parseFloat(document.getElementById('numberPersons').textContent)!=1&&8<document.getElementsByClassName('ab').length)document.getElementsByClassName('ab')[8].textContent=(parseFloat(document.getElementsByClassName('ab')[8].textContent))*(parseFloat(document.getElementById('numberPersons').textContent)-1)/(parseFloat(document.getElementById('numberPersons').textContent));" +
            "if(parseFloat(document.getElementById('numberPersons').textContent)!=1&&9<document.getElementsByClassName('ab').length)document.getElementsByClassName('ab')[9].textContent=(parseFloat(document.getElementsByClassName('ab')[9].textContent))*(parseFloat(document.getElementById('numberPersons').textContent)-1)/(parseFloat(document.getElementById('numberPersons').textContent));" +
            "if(parseFloat(document.getElementById('numberPersons').textContent)!=1)document.getElementById('numberPersons').textContent=parseFloat(document.getElementById('numberPersons').textContent)-1;" +
            "if(Number.isNaN(parseFloat(document.getElementsByClassName('ab')[0].textContent)))document.getElementsByClassName('ab')[0].textContent='';"+
            "if(Number.isNaN(parseFloat(document.getElementsByClassName('ab')[1].textContent)))document.getElementsByClassName('ab')[1].textContent='';"+
            "if(Number.isNaN(parseFloat(document.getElementsByClassName('ab')[2].textContent)))document.getElementsByClassName('ab')[2].textContent='';"+
            "if(Number.isNaN(parseFloat(document.getElementsByClassName('ab')[3].textContent)))document.getElementsByClassName('ab')[3].textContent='';"+
            "if(Number.isNaN(parseFloat(document.getElementsByClassName('ab')[4].textContent)))document.getElementsByClassName('ab')[4].textContent='';"+
            "if(Number.isNaN(parseFloat(document.getElementsByClassName('ab')[5].textContent)))document.getElementsByClassName('ab')[5].textContent='';"+
            "if(Number.isNaN(parseFloat(document.getElementsByClassName('ab')[6].textContent)))document.getElementsByClassName('ab')[6].textContent='';"+
            "if(Number.isNaN(parseFloat(document.getElementsByClassName('ab')[7].textContent)))document.getElementsByClassName('ab')[7].textContent='';"+
            "if(Number.isNaN(parseFloat(document.getElementsByClassName('ab')[8].textContent)))document.getElementsByClassName('ab')[8].textContent='';"+
            "if(Number.isNaN(parseFloat(document.getElementsByClassName('ab')[9].textContent)))document.getElementsByClassName('ab')[9].textContent='';"+
            "} " +
            "class='numberPersonsPlusMoins'>-</button>"
        contenuCocktail += "<p class='textNumberPersons'>For</p>";
        contenuCocktail += "<p id='numberPersons'>1</p>";
        contenuCocktail += "<p class='textNumberPersons'>person(s)</p>"; // document.getElementById('numberPersons').textContent=parseFloat(document.getElementById('numberPersons').textContent)+1;
        contenuCocktail += "<button class='numberPersonsPlusMoins' onClick={document.getElementById('numberPersons').textContent=parseFloat(document.getElementById('numberPersons').textContent)+1;console.log(document.getElementsByClassName('ab').length);" +
            "if(0<document.getElementsByClassName('ab').length)document.getElementsByClassName('ab')[0].textContent=(parseFloat(document.getElementsByClassName('ab')[0].textContent))*parseFloat(document.getElementById('numberPersons').textContent)/(parseFloat(document.getElementById('numberPersons').textContent)-1);" +
            "if(1<document.getElementsByClassName('ab').length)document.getElementsByClassName('ab')[1].textContent=(parseFloat(document.getElementsByClassName('ab')[1].textContent))*parseFloat(document.getElementById('numberPersons').textContent)/(parseFloat(document.getElementById('numberPersons').textContent)-1);" +
            "if(2<document.getElementsByClassName('ab').length)document.getElementsByClassName('ab')[2].textContent=(parseFloat(document.getElementsByClassName('ab')[2].textContent))*parseFloat(document.getElementById('numberPersons').textContent)/(parseFloat(document.getElementById('numberPersons').textContent)-1);" +
            "if(3<document.getElementsByClassName('ab').length)document.getElementsByClassName('ab')[3].textContent=(parseFloat(document.getElementsByClassName('ab')[3].textContent))*parseFloat(document.getElementById('numberPersons').textContent)/(parseFloat(document.getElementById('numberPersons').textContent)-1);" +
            "if(4<document.getElementsByClassName('ab').length)document.getElementsByClassName('ab')[4].textContent=(parseFloat(document.getElementsByClassName('ab')[4].textContent))*parseFloat(document.getElementById('numberPersons').textContent)/(parseFloat(document.getElementById('numberPersons').textContent)-1);" +
            "if(5<document.getElementsByClassName('ab').length)document.getElementsByClassName('ab')[5].textContent=(parseFloat(document.getElementsByClassName('ab')[5].textContent))*parseFloat(document.getElementById('numberPersons').textContent)/(parseFloat(document.getElementById('numberPersons').textContent)-1);" +
            "if(6<document.getElementsByClassName('ab').length)document.getElementsByClassName('ab')[6].textContent=(parseFloat(document.getElementsByClassName('ab')[6].textContent))*parseFloat(document.getElementById('numberPersons').textContent)/(parseFloat(document.getElementById('numberPersons').textContent)-1);" +
            "if(7<document.getElementsByClassName('ab').length)document.getElementsByClassName('ab')[7].textContent=(parseFloat(document.getElementsByClassName('ab')[7].textContent))*parseFloat(document.getElementById('numberPersons').textContent)/(parseFloat(document.getElementById('numberPersons').textContent)-1);" +
            "if(8<document.getElementsByClassName('ab').length)document.getElementsByClassName('ab')[8].textContent=(parseFloat(document.getElementsByClassName('ab')[8].textContent))*parseFloat(document.getElementById('numberPersons').textContent)/(parseFloat(document.getElementById('numberPersons').textContent)-1);" +
            "if(9<document.getElementsByClassName('ab').length)document.getElementsByClassName('ab')[9].textContent=(parseFloat(document.getElementsByClassName('ab')[9].textContent))*parseFloat(document.getElementById('numberPersons').textContent)/(parseFloat(document.getElementById('numberPersons').textContent)-1);"+
            "if(Number.isNaN(parseFloat(document.getElementsByClassName('ab')[0].textContent)))document.getElementsByClassName('ab')[0].textContent='';"+
            "if(Number.isNaN(parseFloat(document.getElementsByClassName('ab')[1].textContent)))document.getElementsByClassName('ab')[1].textContent='';"+
            "if(Number.isNaN(parseFloat(document.getElementsByClassName('ab')[2].textContent)))document.getElementsByClassName('ab')[2].textContent='';"+
            "if(Number.isNaN(parseFloat(document.getElementsByClassName('ab')[3].textContent)))document.getElementsByClassName('ab')[3].textContent='';"+
            "if(Number.isNaN(parseFloat(document.getElementsByClassName('ab')[4].textContent)))document.getElementsByClassName('ab')[4].textContent='';"+
            "if(Number.isNaN(parseFloat(document.getElementsByClassName('ab')[5].textContent)))document.getElementsByClassName('ab')[5].textContent='';"+
            "if(Number.isNaN(parseFloat(document.getElementsByClassName('ab')[6].textContent)))document.getElementsByClassName('ab')[6].textContent='';"+
            "if(Number.isNaN(parseFloat(document.getElementsByClassName('ab')[7].textContent)))document.getElementsByClassName('ab')[7].textContent='';"+
            "if(Number.isNaN(parseFloat(document.getElementsByClassName('ab')[8].textContent)))document.getElementsByClassName('ab')[8].textContent='';"+
            "if(Number.isNaN(parseFloat(document.getElementsByClassName('ab')[9].textContent)))document.getElementsByClassName('ab')[9].textContent='';"+
            "}" +
            ">+</button>"
        contenuCocktail += "</div>";
        contenuCocktail += "<IngreUnique />";
        // contenuCocktail += Cingredients;
        for(var ingre in  TabIngredients) {
            contenuCocktail += "<IngreUnique />";
            contenuCocktail += "<div class='eachIngredient'>";
            contenuCocktail += "➡️  ";
            contenuCocktail += "<label class='ab'>";
            if(Quantity[ingre]!=" "){
                contenuCocktail += parseFloat(Quantity[ingre]);
            }
            contenuCocktail += "</label>";
            // console.log(document.getElementById('numberPersons').textContent);
            // contenuCocktail += document.getElementById('numberPersons').textContent.toString();
            // contenuCocktail += (parseFloat(Quantity[ingre])* parseFloat(document.getElementById('numberPersons').textContent)).toString();
            contenuCocktail += TabIngredients[ingre];
            contenuCocktail += "</div>";
        }
        contenuCocktail += "</div>";
        contenuCocktail += "</div>";
        contenuCocktail += "<div>";
        contenuCocktail += "<img id ='imgCocktail' src='";
        contenuCocktail += Cimg;
        contenuCocktail += "'/>'";
        contenuCocktail += "<div id='served'>";
        contenuCocktail += "Served on: ";
        contenuCocktail += Cserved;
        contenuCocktail += "</div>";
        contenuCocktail += "</div>";
        contenuCocktail += "</div>";
        contenuCocktail += "</div>";


        // <img src={this.props.img}/>


        var contenuTableau = "<tr>";

        data.head.vars.forEach((v, i) => {
            contenuTableau += "<th>" + v + "</th>";
            index.push(v);
        });

        data.results.bindings.forEach(r => {
            contenuTableau += "<tr>";

            index.forEach(v => {

                if (r[v]) {
                    if (r[v].type === "uri") {
                        contenuTableau += "<td><a href='" + r[v].value + "' target='_blank'>" + r[v].value + "</a></td>";
                    } else {
                        contenuTableau += "<td>" + r[v].value + "</td>";
                    }
                } else {
                    contenuTableau += "<td></td>";
                }

            });


            contenuTableau += "</tr>";
        });

        contenuTableau += "</tr>";

        // document.getElementById("resultatsOneCocktailTable").innerHTML = contenuTableau;
        document.getElementById("resultatOneCocktail").innerHTML = contenuCocktail;
        var mapIngredients = new Map();
        var arrayIngredients = new Array();

        data.results.bindings.forEach(r => {
            if(!mapIngredients.has(r.nameIngredients.value)){
                mapIngredients.set(r.nameIngredients.value,new Array());
                var temp = new Map();
                temp.set("ingredient", r.nameIngredients.value);
                arrayIngredients.push(temp);
            }
            arrayIngredients.forEach(t => {
                if(t.get("ingredient")===r.nameIngredients.value){
                    if(!t.has("cocktails")){
                        t.set("cocktails", new Array());

                    }
                    var temp = new Map();
                    temp.set("name",r.nameSPSP.value);
                    temp.set("thumbnail",r.thumbnailSP.value);


                    if(t.get("cocktails").filter(u => u.get("name")==r.nameSPSP.value).length==0 && temp.get("name")!=nameCocktail.nameCocktail){
                        t.get("cocktails").push(temp);
                    }
                }
            })
            mapIngredients.get(r.nameIngredients.value).push(r.nameSPSP.value);
        })
        setCocktailsIngredients(arrayIngredients);



    }

    useEffect(() => {
   		rechercher();
   	}, [])
    return (<>
        {/*<table id="resultatsOneCocktailTable"></table>*/}
        <div id="resultatOneCocktail"></div>

            {cocktailsIngredients.map((ingredient, index) =>
                <>
                <h3> Cocktails also containing : {ingredient.get("ingredient")} </h3>
				<CocktailCarousel key={index} cocktails={ingredient.get("cocktails")}  />
				</>
			)}
{/*         <CocktailCarousel listeCocktails={liste}/> */}
    </>)
}

export default RequestForOneCocktail;