import React, { Component } from 'react';
import { pulse } from 'react-animations';
import { bounceInDown } from 'react-animations';
import { rubberBand } from 'react-animations';
import { zoomIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import './App.css';
import './fonts.css';

//import {isMobile} from 'react-device-detect';

const Pulse = styled.div`animation: 1s ${keyframes`${pulse}`} infinite`;
const BounceInDown = styled.div`animation: 1s ${keyframes`${zoomIn}`}`;
const RubberBand = styled.div`animation: 1s ${keyframes`${rubberBand}`}`;

var date = new Date();
var idDate = date.getDay()
var tabOfDays = new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
var tabOfPlaces = new Array("MC Do", "boulangerie", "Bobbun", "Indien", "Burger King", "Monop", "Kebab", "jap", "restau");
var day = tabOfDays[idDate];
var myAbsoluteDiv = document.getElementById('myAbsoluteDiv');
var nombreDEssais = 10;
var tempsDAttente = 3000;

var tabOfProba = [
  {
    "jour": "dimanche",
    "id": 0,
    "probabilites": [0,0,0,0,0,0,0,0,0]
  },
  {
    "jour": "lundi",
    "id": 1,
    "probabilites": [0,0.4,0.3,0,0,0.3,0,0,0]
  },
  {
    "jour": "mardi",
    "id": 2,
    "probabilites": [0,0,0.2,0,0,0.4,0,0.4,0]
  },
  {
    "jour": "mercredi",
    "id": 3,
    "probabilites": [0,0.3,0,0,0.3,0,0,0.4,0]
  },
  {
    "jour": "jeudi",
    "id": 4,
    "probabilites": [0,0,0,0.4,0,0,0,0,0.6]
  },
  {
    "jour": "vendredi",
    "id": 5,
    "probabilites": [0.6,0,0,0,0.4,0,0,0,0]
  },
  {
    "jour": "samedi",
    "id": 6,
    "probabilites": [0,0,0,0,0,0,0,0,0]
  },
];

var probabilitesConstantefunction = function(){
  var tab = [];
  tab[0] = 1/tabOfProba[0].probabilites.length;
  for(var i=1;i<tabOfProba[0].probabilites.length;i++){
    tab[i] = 1/tabOfProba[0].probabilites.length + tab[i-1]
  }
  console.log(tab)
  return tab
}

var probabilitesConstante = probabilitesConstantefunction();


var calculProbaOf = function(tabdeProba){
  var newTabProbaCumulees = [];
  for(var i=0; i<tabdeProba.probabilites.length;i++){
    newTabProbaCumulees[i] = tabdeProba.probabilites[i]
  }
  for(var i=1;i<newTabProbaCumulees.length;i++){
      newTabProbaCumulees[i] = newTabProbaCumulees[i] + newTabProbaCumulees[i-1]
  }
  console.log(newTabProbaCumulees)
  return {
    "jour": tabdeProba.jour,
    "id": tabdeProba.id,
    "probabilites": newTabProbaCumulees
  }

}



var tabOfProbaCumule = tabOfProba.map(
  (jour)=>calculProbaOf(jour)
);



var allPlacesToEat = [
  {
    "name" : "MC Do",
    "image" : 'http://idata.over-blog.com/5/13/32/01/images-copie-40.jpg',
    "text" : "C'est pas bien...",
    "id" : 0,
  },
  {
    "name" : "Boulangerie",
    "image" : 'http://img.over-blog-kiwi.com/0/70/55/90/20150811/ob_525db3_sandwich-poulet-curry-oeuf-dur-1.JPG',
    "text" : "Ca fait toujours plaisir un ptit sandwich !",
    "id" : 1,
  },
  {
    "name" : "Bobbun",
    "image" : 'https://media.newyorker.com/photos/5aeb586479f6430aaa0f9d19/master/w_727,c_limit/Wright-Kim-Jong-Un-Profile.jpg',
    "text" : "Prends les nems crevettes pas les poulet !",
    "id" : 2,
  },
  {
    "name" : "Indien",
    "image" : 'http://www.mesinspirationsculinaires.com/wp-content/uploads/2016/08/recette-poulet-au-curry-indien-1.jpg',
    "text" : "Et tu prends le poulet curry, menu 12.50 !",
    "id" : 3,
  },
  {
    "name" : "Burger King",
    "image" : 'https://www.burgerking.be/assets/images/sharing/BurgerKing-sharing.jpg',
    "text" : "C'est pas propre",
    "id" : 4,
  },
  {
    "name" : "Monop",
    "image" : 'https://annuaire.lebondrive.fr/media/img/retailers-circle/logo_11.jpg',
    "text" : "le " + day + " c'est Monoprix",
    "id" : 5,
  },
  {
    "name" : "Kebab",
    "image" : 'https://i1.wp.com/www.lebonpote.net/wp-content/uploads/2018/12/menukebab.png?fit=300%2C261&ssl=1',
    "text" : "N'y va pas trop souvent quand même !",
    "id" : 6,
  },
  {
    "name" : "Restau",
    "image" : 'https://www.barazzi.fr/c/69-barazzi_menu/Tables-Restaurant.jpg',
    "text" : "On est " + day + ", c'est la tradition",
    "id" : 7,
  },
  {
    "name" : "Jap",
    "image" : 'https://www.kyosushi.com/wp-content/uploads/2018/05/IMG_4594.jpg',
    "text" : "Sushis or not sushis ?",
    "id" : 8,
  },
  {
    "name" : "Null part",
    "image" : 'https://specials-images.forbesimg.com/imageserve/5babef3da7ea4342a948c024/416x416.jpg?background=000000&cropX1=1318&cropX2=2825&cropY1=226&cropY2=1732',
    "text" : "On est " + day + " mange ou tu veux !",
    "id" : 9,
  }
]


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      onSearch : false,
      sizeFactorButton : 1,
      colorButtonSearch : "rgba(120,200,200,1)",
      colorButtonSearchRandom : "rgba(255,222,112,1)",
      displayButtonSearch : true,
      diplayTextExplaination : true,
      displayPlaceToEatContainer : false,
      placeToEatChoosen : {},
      numberOfChoiceMade : 0,
      displayButtonTryAgain : false,
      dayRandom : "",
      popupProbabilitees : false,
    };

  }


  runResearch = () => {
    console.log(tabOfProbaCumule)
    this.setState({
      onSearch : true,
      colorButtonSearch : "rgba(120,255,255)",
      diplayTextExplaination : false,
      displayPlaceToEatContainer : false,
      displayButtonSearch : true,
      placeToEatChoosen : this.choosePlaceToEat(tabOfProbaCumule[idDate].probabilites),
      numberOfChoiceMade : this.state.numberOfChoiceMade + 1,
      dayRandom : false,
      displayButtonTryAgain : false,
    })
    setTimeout(() => this.displayPlaceToEat(), tempsDAttente);
    console.log(day);
  }

  runResearchRandom = () => {
    console.log(probabilitesConstante);
    this.setState({
      onSearch : true,
      colorButtonSearchRandom : "rgba(255,245,112)",
      diplayTextExplaination : false,
      displayPlaceToEatContainer : false,
      displayButtonSearch : true,
      placeToEatChoosen : this.choosePlaceToEat(probabilitesConstante),
      numberOfChoiceMade : this.state.numberOfChoiceMade + 1,
      dayRandom : true,
      displayButtonTryAgain : false,
    })
    setTimeout(() => this.displayPlaceToEat(), tempsDAttente);
    console.log(day);
  }

  choosePlaceToEat = (tabOfProba) => {
    var randomChoice = Math.random();
    var finalChoice;
    if(randomChoice<tabOfProba[0]){
      finalChoice = allPlacesToEat[0]
    }else if(randomChoice<tabOfProba[1]){
      finalChoice = allPlacesToEat[1]
    }else if(randomChoice<tabOfProba[2]){
      finalChoice = allPlacesToEat[2]
    }else if(randomChoice<tabOfProba[3]){
      finalChoice = allPlacesToEat[3]
    }else if(randomChoice<tabOfProba[4]){
      finalChoice = allPlacesToEat[4]
    }else if(randomChoice<tabOfProba[5]){
      finalChoice = allPlacesToEat[5]
    }else if(randomChoice<tabOfProba[6]){
      finalChoice = allPlacesToEat[6]
    }else if(randomChoice<tabOfProba[7]){
      finalChoice = allPlacesToEat[7]
    }else if(randomChoice<tabOfProba[8]){
      finalChoice = allPlacesToEat[8]
    }else{
      finalChoice = allPlacesToEat[9]
    }
    console.log(finalChoice)
    return (finalChoice)
  }

  displayPlaceToEat = () => {
    this.setState({
      displayButtonSearch : false,
      displayPlaceToEatContainer : true,
      onSearch : false,
    })
    if(this.state.numberOfChoiceMade < nombreDEssais){
      this.setState({
        displayButtonTryAgain : true
      })
    }else{
      this.setState({
        displayButtonTryAgain : false
      })
    }
  }

  popupProbabilitees = () => {
    this.setState({
      popupProbabilitees : this.state.popupProbabilitees ? false : true,
    })
  }

  sendMessageToWhatsapp = () => {
    console.log("https://api.whatsapp.com/send?text=%20"+ this.state.placeToEatChoosen.image);
    return ("https://api.whatsapp.com/send?text=%20Aujourd'hui c'est "+ this.state.placeToEatChoosen.name + "  " + this.state.placeToEatChoosen.image)
  }


  render() {
    return (
      <div style={{width : "100%", height:"100%", display:'flex', justifyContent:"center", textAlign:"center"}}>
        <header className="App-header" style={{display:'flex', justifyContent:"center"}} >
            <div style={{ fontSize: 17, textDecoration:'none', color:'white', textAlign:'center'}}>
              What Will We Eat ?
            </div>
        </header>
        <div  style={{width :"100vw", maxWidth:500,  height:"100vh", overflow:"hidden", backgroundSize:"cover", backgroundImage:"url("+require("./assets/gateau.jpg")+")"}}>
        {this.state.displayButtonSearch ?
          <div>
            {/*
              {this.state.diplayTextExplaination ?
                <div>
                  <strong style={{position:'absolute', width : 200, height:30, textAlign :'center', fontSize:15, top:'calc(50% - 150px)', left:'calc(50% - 100px)'}}>
                    Push This Fucking Button
                  </strong>
                </div>:
                <div></div>
              }
            */}
            {this.state.dayRandom || this.state.numberOfChoiceMade === 0 ?
              <div style={{justifyContent:"center", display:"flex", flexDirection:'column', position:'absolute', width : 70, height:70, textAlign :'center', fontSize:20, top:'calc(50% - 10px)', left:'calc(50% - 35px)', borderRadius:"50%"}}>
              {this.state.onSearch ?
                <Pulse>
                  <div onClick={this.runResearchRandom} style={{justifyContent:"center", display:"flex", flexDirection:'column', position:'absolute', width : 70, height:70, textAlign :'center', fontSize:20, top:'calc(50% + 85px)', left:'calc(50% - 35px)', borderRadius:"50%", borderStyle:"solid", borderWidth:3, borderColor:"rgba(0,0,0,0.2)", cursor:"pointer", backgroundColor:this.state.colorButtonSearchRandom}}>
                    <div style={{fontSize:13, color:"white"}}>Fuck, do it random</div>
                  </div>
                </Pulse> :
                <div onClick={this.runResearchRandom} style={{justifyContent:"center", display:"flex", flexDirection:'column', position:'absolute', width : 70, height:70, textAlign :'center', fontSize:20, top:'calc(50% + 85px)', left:'calc(50% - 35px)', borderRadius:"50%", borderStyle:"solid", borderWidth:3, borderColor:"rgba(0,0,0,0.2)", cursor:"pointer", backgroundColor:this.state.colorButtonSearchRandom}}>
                  <div style={{fontSize:13, color:"white"}}>Fuck, do it random</div>
                </div>
              }
              </div>
              :
              <div></div>
            }
            {!this.state.dayRandom ?
              <div style={{justifyContent:"center", display:"flex", flexDirection:'column', position:'absolute', width : 120, height:120, textAlign :'center', fontSize:20, top:'calc(50% - 50px)', left:'calc(50% - 60px)'}}>
                {this.state.onSearch ?
                  <Pulse>
                    <div onClick={this.runResearch} style={{justifyContent:"center", display:"flex", flexDirection:'column', position:'absolute', width : 120, height:120, textAlign :'center', fontSize:20, top:'calc(50% - 50px)', left:'calc(50% - 60px)', borderRadius:"50%", borderStyle:"solid", borderWidth:3, borderColor:"rgba(0,0,0,0.2)", cursor:"pointer", backgroundColor:this.state.colorButtonSearch}}>
                      <strong style={{fontSize:17, color:"white"}}>Manger le {day}</strong>
                    </div>
                  </Pulse>
                :
                <div onClick={this.runResearch} style={{justifyContent:"center", display:"flex", flexDirection:'column', position:'absolute', width : 120, height:120, textAlign :'center', fontSize:20, top:'calc(50% - 50px)', left:'calc(50% - 60px)', borderRadius:"50%", borderStyle:"solid", borderWidth:3, borderColor:"rgba(0,0,0,0.2)", cursor:"pointer", backgroundColor:this.state.colorButtonSearch}}>
                  <strong style={{fontSize:17, color:"white"}}>Manger le {day}</strong>
                </div>
              }
              </div>
            :
            <div></div>
          }
          </div> :
          <div></div>
        }
        {this.state.displayPlaceToEatContainer ?
          <div style={{marginTop:30, display:'flex', justifyContent:'flex-start', flexDirection:'column', overflow:"hidden", height:'calc(100vh - 35px)', backgroundColor:'rgba(0,0,0,1)'}}>
            <div style={{height:60, fontSize:40, color:"white", backgroundColor:"black"}}>{this.state.placeToEatChoosen.name}</div>
              <div style={{ width : "100%", position:"absolute", height:'calc(100vh - 95px)', top:95, left:0}}>
                <BounceInDown>
                  <div  style={{ width : "100%", height:'calc(100vh - 95px)', display:"flex", flexDirection:"row", justifyContent:"center"}}>
                    <div style={{ width : "100%", maxWidth:500, height:'calc(100vh - 95px)', backgroundColor:"rgba(143, 211, 255,1)", backgroundImage:"url("+this.state.placeToEatChoosen.image+")", backgroundSize: "cover"}}>
                    </div>
                  </div>
                </BounceInDown>
              </div>
            <div style={{ top:150, width:200, position:"absolute", left:'calc(50% - 100px)', textAlign :'center', fontSize:20,  borderRadius:10, borderWidth:1, borderColor:"black", borderStyle:"solid", backgroundColor:"rgba(255,255,255,0.2)"}}>
              {this.state.placeToEatChoosen.text}
            </div>
            <strong onClick={this.popupProbabilitees}style={{ top:100, height:"8vw", width:"8vw", maxWidth:50,maxHeight:50, cursor:"pointer", position:"absolute", display:"flex", flexDirection:"column", justifyContent:'center', right:"4vw", textAlign :'center', fontSize:17,  borderRadius:"50%", borderWidth:1, borderColor:"black", borderStyle:"solid", backgroundColor:"rgba(200,200,200,0.4)"}}>i
            </strong>
            <a href={this.sendMessageToWhatsapp()} style={{cursor:"pointer", bottom:50, height:70, width:70, position:"absolute", left:'calc(50% - 100px)', textAlign :'center', fontSize:25,  borderRadius:"50%", borderWidth:1, borderColor:"black", borderStyle:"solid", backgroundColor:"rgba(50,200,50,0.3)", backgroundSize: "cover",
              backgroundImage:"url('data:image/png;base64,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')"}}>
            </a>
          </div> :
          <div></div>
        }
        {this.state.displayButtonTryAgain ?
          <div onClick={this.state.dayRandom ? this.runResearchRandom : this.runResearch} style={{cursor:"pointer", bottom:50, height:70, width:70, position:"absolute", right:'calc(50% - 100px)', textAlign :'center', fontSize:25,  borderRadius:"50%", borderWidth:1, borderColor:"black", borderStyle:"solid", backgroundColor:"rgba(200,50,50,0.75)", backgroundSize: "cover",
          backgroundImage:"url('http://download.seaicons.com/icons/graphicloads/100-flat-2/256/arrow-refresh-4-icon.png')"}}>
          </div> : <div></div>
        }
        {this.state.popupProbabilitees ?

            <div style={{width:"70vw", display:"flex", flexDirection:"column", position:"absolute", top:"25vh", left:"12.5vw"}}>
              <RubberBand>
                <div style={{width:"70vw", display:"flex", flexDirection:"column", backgroundColor:"rgba(200,200,200,0.85)", marginLeft:5, marginRight:5}}>
                  <div style={{width:"100%", height:30, display:"flex", flexDirection:"row", justifyContent:"space-between", marginBottom:20}}>
                    <div style={{width:30}}></div>
                    <div style={{fontSize:20}}>PROBABILITES</div>
                    <div onClick={this.popupProbabilitees} style={{cursor:"pointer", width:30, height:30, backgroundColor:"rgba(100,100,100,0)", backgroundImage:"url('https://www.soprasteria.com/images/librariesprovider29/refonte/if_cancel_1303884.png?sfvrsn=43dd245b_8')", backgroundSize:"cover"}}></div>
                  </div>
                  <div style={{width:"100%", height:30, display:'flex', flexDirection:"row", justifyContent:"space-between", fontSize:10}}>
                    <div style={{width:"15%"}}></div>
                    <div style={{width:"15%"}}>LUNDI</div>
                    <div style={{width:"15%"}}>MARDI</div>
                    <div style={{width:"15%"}}>MERCREDI</div>
                    <div style={{width:"15%"}}>JEUDI</div>
                    <div style={{width:"15%"}}>VENDREDI</div>
                  </div>
                  <div style={{fontSize:10}}>
                  {allPlacesToEat.map((i)=>
                    <div style={{width:"100%", height:30, display:'flex', flexDirection:"row", justifyContent:"space-between"}}>
                      <div style={{width:"15%"}}>{i.name}
                      </div>
                      <div style={{width:"15%"}}>{tabOfProba[1].probabilites[i.id]}</div>
                      <div style={{width:"15%"}}>{tabOfProba[2].probabilites[i.id]}</div>
                      <div style={{width:"15%"}}>{tabOfProba[3].probabilites[i.id]}</div>
                      <div style={{width:"15%"}}>{tabOfProba[4].probabilites[i.id]}</div>
                      <div style={{width:"15%"}}>{tabOfProba[5].probabilites[i.id]}</div>
                    </div>)
                  }
                  </div>
                </div>
              </RubberBand>
            </div>

          :
          <div></div>
        }
        </div>


      </div>

    );
  }
}

export default App;
