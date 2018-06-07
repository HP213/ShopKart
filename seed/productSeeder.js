var Product = require('../models/product');
var mongoose = require('mongoose')



var products = [
  {
    imagePath:"https://images.nowloading.co/image/upload/c_fill,h_470,q_auto:good,w_620/rzzmibvgthpxjr93cp04.jpg",
    title:"Call of Duty: Infinite Warfare",
    description:"Call of Duty: Infinite Warfare is a first-person shooter video game developed by Infinity Ward and published by Activision. It is the thirteenth primary installment in the Call of Duty series and was released worldwide for Microsoft Windows, PlayStation 4, and Xbox One on November 4, 2016.Development of Infinite Warfare began during 2014. It is the first title by Infinity Ward under the new three-year development cycle for the Call of Duty series. The game's campaign is centered around a battle for the Solar System, which the Settlement Defense Front (SDF), a hostile force who are the main antagonists, are attempting to take over. The player takes control of Captain Nick Reyes of the Special Combat Air Recon (SCAR). They have their own transforming fighter, named , that they can customize as well as a central hub world named Retribution.",
    price:2599,
  },
  {
    imagePath:"https://2arguh3ihec53g3h99121n8o-wpengine.netdna-ssl.com/wp-content/uploads/2017/02/GhostReconWIldlands.jpg",
    title:"Tom Clancy's Ghost Recon® Wildlands",
    description:"Tom Clancy's Ghost Recon Wildlands is a tactical shooter video game developed by Ubisoft Paris and published by Ubisoft. It was released worldwide on March 7, 2017, for Microsoft Windows, PlayStation 4 and Xbox One, as the tenth installment in the Tom Clancy's Ghost Recon franchise and is the first game in the Ghost Recon series to feature an open world environment.The game moves away from the futuristic setting introduced in Tom Clancy's Ghost Recon Advanced Warfighter and instead feature a setting similar to the original Tom Clancy's Ghost Recon. Ubisoft described it as one of the biggest open world games that they have published, with the game world including a wide variety of environments such as mountains, forests, deserts, and salt flats.",
    price:2999,
  },
  {
    imagePath:"https://i.ytimg.com/vi/CRYDs4Zsqx8/maxresdefault.jpg",
    title:"Watch Dogs",
    description:"Watch Dogs (stylised as WATCH_DOGS) is an action-adventure video game developed by Ubisoft Montreal and published by Ubisoft. It was released worldwide on 27 May 2014 for Microsoft Windows, PlayStation 3, PlayStation 4, Xbox 360, and Xbox One, and a Wii U version was released in November 2014. Set in a fictionalized, free-roam, open world version of Chicago, the single-player story follows hacker Aiden Pearce's search for revenge after the killing of his niece. The game is played from a third-person perspective, and the world is navigated on foot or by vehicle. An online multiplayer mode allows up to eight players to engage in cooperative and competitive gameplay.",
    price:1999,
  },
  {
    imagePath:"https://ubistatic19-a.akamaihd.net/ubicomstatic/en-us/global/game-info/wd2-ubicom-gameinfo-boxart-rated-tablet-v2_tablet_254078.jpg",
    title:"Watch Dogs 2",
    description:"Watch Dogs 2 (stylised as WATCH_DOGS 2) is an action-adventure video game developed by Ubisoft Montreal and published by Ubisoft. It is the sequel to 2014's Watch Dogs and was released worldwide for PlayStation 4, Xbox One and Microsoft Windows in November 2016.Set within a fictionalized version of the San Francisco Bay Area, the game is played from a third-person perspective and its open world is navigated on-foot or by vehicle. Players control Marcus Holloway, a hacker who works with the hacking group DedSec to take down the city's advanced surveillance system known as ctOS. There are multiple ways to complete missions, and each successful assignment increases the follower count of DedSec. Cooperative multiplayer allows for competitive one-on-one combat and connecting with other players in order to neutralize a player who is causing havoc.",
    price:2799,
  },
  {
    imagePath:"https://images-na.ssl-images-amazon.com/images/I/91O2cwfTxDL._SL1500_.jpg",
    title:"Grand Theft Auto V (PC): GTA V",
    description:"Grand Theft Auto V is an action-adventure video game developed by Rockstar North and published by Rockstar Games. It was released in September 2013 for PlayStation 3 and Xbox 360, in November 2014 for PlayStation 4 and Xbox One, and in April 2015 for Microsoft Windows. It is the first main entry in the Grand Theft Auto series since 2008's Grand Theft Auto IV. Set within the fictional state of San Andreas, based on Southern California, the single-player story follows three criminals and their efforts to commit heists while under pressure from a government agency. The open world design lets players freely roam San Andreas open countryside and the fictional city of Los Santos, based on Los Angeles.The game is played from either a third-person or first-person perspective and its world is navigated on foot or by vehicle. Players control the three lead protagonists throughout single-player and switch between them both during and outside missions.",
    price:2499,
  },
  {
    imagePath:"https://wccftech.com/wp-content/uploads/2017/11/Assassin%E2%80%99s-Creed-Origins.jpg",
    title:"Assassin's Creed Origins",
    description:"Assassin's Creed Origins is an action-adventure video game developed by Ubisoft Montreal and published by Ubisoft. It is the tenth major installment in the Assassin's Creed series and the successor to 2015's Assassin's Creed Syndicate. It was released worldwide for Microsoft Windows, PlayStation 4, and Xbox One on October 27, 2017.The game is set in Egypt near the end of the Ptolemaic period (49–47 BC) and recounts the secret fictional history of real-world events. The story explores the origins of the centuries-long conflict between the Brotherhood of Assassins, who fight for peace by promoting liberty, and The Order of the Ancients—forerunners to the Templar Order—who desire peace through the forced imposition of order.",
    price:3499,
  }
]


function seedDB(){
  Product.remove({},function(err){
    if(!err){
      for(product of products){
        Product.create(product,function (err,pro){
          if(err){
            console.log(err);
          }else{
            console.log(pro);
          }
        })
      }
    }
  })

}
module.exports = seedDB;
