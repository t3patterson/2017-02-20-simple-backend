const mongoose = require( 'backbone');
const Band = require('./models/bandModel');
const connectToDB = require('./db-connect.js')
const PROJECT_NAME = require('../config/projectName.js')
const axios = require('axios')

if(typeof PROJECT_NAME !== 'string' ){ 
	require('./src-server/cli/setProjectName.js')
	throw new Error(`\n${chalk.bgRed.bold('There must be a project name exported from :')} ${chalk.grey.bold('./src-server/config/projectName.js')} \n ${chalk.bgWhite.black(' you must execute: ')} ${chalk.cyan.bold('npm run set-project-name')}` ) 
}

let dataSet = [{"country":"US","artist":"Johnson-White","bandMembers":8,"bookingCost":5232,"agentName":"Lawrence Rogers","albumArt":271},
{"country":"US","artist":"Roberts-Fadel","bandMembers":8,"bookingCost":8314,"agentName":"Charles James","albumArt":504},
{"country":"GB","artist":"Stoltenberg","bandMembers":8,"bookingCost":7210,"agentName":"Judy Walker","albumArt":739},
{"country":"US","artist":"Gorczany","bandMembers":6,"bookingCost":8576,"agentName":"Wanda Hamilton","albumArt":994},
{"country":"CA","artist":"Hansen-Nicolas","bandMembers":6,"bookingCost":8630,"agentName":"Teresa Coleman","albumArt":535},
{"country":"US","artist":"Nikolaus-Ernser","bandMembers":1,"bookingCost":727,"agentName":"Douglas Frazier","albumArt":969},
{"country":"US","artist":"Emmerich","bandMembers":3,"bookingCost":8677,"agentName":"Rachel Bennett","albumArt":951},
{"country":"CA","artist":"Little and Sons","bandMembers":2,"bookingCost":1218,"agentName":"Eric Henderson","albumArt":893},
{"country":"US","artist":"Witting","bandMembers":3,"bookingCost":697,"agentName":"Melissa Mccoy","albumArt":595},
{"country":"CA","artist":"Kautzer, Hane and Sporer","bandMembers":5,"bookingCost":2275,"agentName":"Shirley Porter","albumArt":224},
{"country":"US","artist":"Tremblay","bandMembers":4,"bookingCost":6062,"agentName":"Nicole Fuller","albumArt":620},
{"country":"IE","artist":"Hand, Daniel and Trantow","bandMembers":2,"bookingCost":2836,"agentName":"Ralph Ray","albumArt":816},
{"country":"CA","artist":"Schmeler, Leffler and Ruecker","bandMembers":1,"bookingCost":1734,"agentName":"Benjamin Reid","albumArt":342},
{"country":"US","artist":"Cormier Group","bandMembers":5,"bookingCost":1229,"agentName":"Diana Long","albumArt":236},
{"country":"US","artist":"Kihn-Harvey","bandMembers":6,"bookingCost":8007,"agentName":"Jose Ray","albumArt":660},
{"country":"US","artist":"Beahan","bandMembers":2,"bookingCost":4089,"agentName":"Tina Moore","albumArt":493},
{"country":"US","artist":"Spinka-Lubowitz","bandMembers":4,"bookingCost":1640,"agentName":"Jane Allen","albumArt":410},
{"country":"CA","artist":"Ernser, Kiehn and Stamm","bandMembers":3,"bookingCost":6392,"agentName":"Earl Nichols","albumArt":194},
{"country":"IE","artist":"Nikolaus-Fay","bandMembers":3,"bookingCost":1850,"agentName":"Marilyn Mendoza","albumArt":479},
{"country":"IE","artist":"Bednar, Lind and Langworth","bandMembers":8,"bookingCost":7230,"agentName":"Jose Thompson","albumArt":184},
{"country":"US","artist":"Stroman Group","bandMembers":5,"bookingCost":7131,"agentName":"Tammy Martin","albumArt":518},
{"country":"US","artist":"Schumm, Lemke and Nitzsche","bandMembers":5,"bookingCost":8535,"agentName":"Diane Burns","albumArt":659},
{"country":"CA","artist":"Bernhard-Cartwright","bandMembers":7,"bookingCost":3716,"agentName":"Anne Austin","albumArt":896},
{"country":"US","artist":"VonRueden Group","bandMembers":4,"bookingCost":4137,"agentName":"Julie Smith","albumArt":27},
{"country":"IE","artist":"Nikolaus, Doyle and Boyle","bandMembers":6,"bookingCost":6490,"agentName":"Wayne Parker","albumArt":466},
{"country":"IE","artist":"Pfeffer","bandMembers":7,"bookingCost":7097,"agentName":"Irene Wilson","albumArt":893},
{"country":"US","artist":"Okuneva-Luettgen","bandMembers":3,"bookingCost":3267,"agentName":"Margaret Gordon","albumArt":495},
{"country":"US","artist":"Weimann","bandMembers":3,"bookingCost":6675,"agentName":"Shirley Lee","albumArt":106},
{"country":"US","artist":"Hickle Group","bandMembers":8,"bookingCost":2472,"agentName":"Sharon Peters","albumArt":444},
{"country":"CA","artist":"Von-Heaney","bandMembers":4,"bookingCost":2451,"agentName":"Sean Johnston","albumArt":406},
{"country":"US","artist":"Herman, Steuber and Grimes","bandMembers":2,"bookingCost":3410,"agentName":"Elizabeth Moreno","albumArt":297},
{"country":"US","artist":"Padberg, Kautzer and Bernier","bandMembers":2,"bookingCost":936,"agentName":"Rachel Young","albumArt":209},
{"country":"IE","artist":"Ward, Eichmann and Skiles","bandMembers":2,"bookingCost":5451,"agentName":"Carolyn Fields","albumArt":580},
{"country":"CA","artist":"Welch, Harvey and Steuber","bandMembers":5,"bookingCost":985,"agentName":"Barbara Clark","albumArt":5},
{"country":"CA","artist":"Schamberger, Boyle and Swaniawski","bandMembers":8,"bookingCost":8466,"agentName":"Debra Parker","albumArt":73},
{"country":"CA","artist":"Mraz","bandMembers":8,"bookingCost":3734,"agentName":"Joshua Anderson","albumArt":200},
{"country":"US","artist":"Bechtelar, Farrell and Reynolds","bandMembers":4,"bookingCost":8809,"agentName":"Lori Jordan","albumArt":888},
{"country":"IE","artist":"Larkin-Larkin","bandMembers":7,"bookingCost":9201,"agentName":"Carlos Gomez","albumArt":572},
{"country":"US","artist":"Eichmann","bandMembers":2,"bookingCost":9560,"agentName":"Lois Bryant","albumArt":969},
{"country":"US","artist":"Farrell, Wisozk and Medhurst","bandMembers":3,"bookingCost":7584,"agentName":"Beverly Dixon","albumArt":10},
{"country":"IE","artist":"Grant-Rutherford","bandMembers":3,"bookingCost":6812,"agentName":"Scott Franklin","albumArt":313},
{"country":"US","artist":"Boyer-Howe","bandMembers":6,"bookingCost":1285,"agentName":"Andrea Gordon","albumArt":405},
{"country":"CA","artist":"Waelchi-Cummerata","bandMembers":7,"bookingCost":8754,"agentName":"Dennis Jackson","albumArt":437},
{"country":"US","artist":"Halvorson-Ebert","bandMembers":1,"bookingCost":2228,"agentName":"Katherine Price","albumArt":876},
{"country":"US","artist":"Will","bandMembers":1,"bookingCost":3974,"agentName":"George Kelly","albumArt":153},
{"country":"US","artist":"Renner Group","bandMembers":4,"bookingCost":5444,"agentName":"Marilyn Ruiz","albumArt":427},
{"country":"US","artist":"Pfannerstill and Sons","bandMembers":2,"bookingCost":5569,"agentName":"Gary Woods","albumArt":980},
{"country":"US","artist":"Dibbert","bandMembers":8,"bookingCost":4470,"agentName":"Kenneth Watson","albumArt":556},
{"country":"CA","artist":"Murphy and Sons","bandMembers":3,"bookingCost":7840,"agentName":"Barbara Harrison","albumArt":545},
{"country":"IE","artist":"Kuhlman, Romaguera and Ortiz","bandMembers":3,"bookingCost":7763,"agentName":"Juan Murray","albumArt":918},
{"country":"US","artist":"Heaney","bandMembers":6,"bookingCost":7346,"agentName":"George Porter","albumArt":863},
{"country":"US","artist":"Koelpin, Nader and O'Kon","bandMembers":7,"bookingCost":6837,"agentName":"Shirley Snyder","albumArt":238},
{"country":"US","artist":"Feeney","bandMembers":4,"bookingCost":761,"agentName":"Jose Hansen","albumArt":323},
{"country":"CA","artist":"Boyer, Williamson and Littel","bandMembers":6,"bookingCost":6864,"agentName":"Kathryn Moreno","albumArt":462},
{"country":"CA","artist":"Kessler-Koelpin","bandMembers":3,"bookingCost":3390,"agentName":"Jerry Jordan","albumArt":830},
{"country":"US","artist":"Schuppe, Weimann and Kohler","bandMembers":5,"bookingCost":6926,"agentName":"Angela Larson","albumArt":824},
{"country":"US","artist":"Rowe-Parker","bandMembers":7,"bookingCost":1819,"agentName":"Jason Ortiz","albumArt":372},
{"country":"CA","artist":"Robel-Predovic","bandMembers":8,"bookingCost":9496,"agentName":"Donna Lynch","albumArt":45},
{"country":"US","artist":"Rippin, Funk and Kuhic","bandMembers":1,"bookingCost":9988,"agentName":"Billy Lawrence","albumArt":375},
{"country":"US","artist":"Padberg and Sons","bandMembers":3,"bookingCost":2264,"agentName":"Walter Wright","albumArt":730},
{"country":"US","artist":"Windler and Sons","bandMembers":6,"bookingCost":2821,"agentName":"Ann Dean","albumArt":438},
{"country":"US","artist":"Klein and Sons","bandMembers":2,"bookingCost":9045,"agentName":"Mary Simpson","albumArt":204},
{"country":"CA","artist":"Morar, Marvin and Boyer","bandMembers":7,"bookingCost":6212,"agentName":"Janice Ray","albumArt":702},
{"country":"US","artist":"Kunze","bandMembers":5,"bookingCost":9889,"agentName":"Nicholas Peters","albumArt":485},
{"country":"US","artist":"Rice, Farrell and Sipes","bandMembers":2,"bookingCost":2113,"agentName":"Kevin Hill","albumArt":210},
{"country":"US","artist":"Abshire, Kautzer and Hudson","bandMembers":1,"bookingCost":6031,"agentName":"Louise Garza","albumArt":306},
{"country":"US","artist":"Rice","bandMembers":4,"bookingCost":6164,"agentName":"Catherine Kelly","albumArt":595},
{"country":"US","artist":"Nitzsche, Conroy and Treutel","bandMembers":8,"bookingCost":8146,"agentName":"Fred Riley","albumArt":992},
{"country":"CA","artist":"Schmeler","bandMembers":4,"bookingCost":4636,"agentName":"Lori Black","albumArt":17},
{"country":"CA","artist":"Murazik, Pollich and Bode","bandMembers":3,"bookingCost":9002,"agentName":"Emily Owens","albumArt":85},
{"country":"IE","artist":"Kutch-Gulgowski","bandMembers":7,"bookingCost":904,"agentName":"Alan Holmes","albumArt":55},
{"country":"US","artist":"Weimann, Senger and Kub","bandMembers":1,"bookingCost":4360,"agentName":"Diane Howard","albumArt":843},
{"country":"CA","artist":"McLaughlin","bandMembers":3,"bookingCost":1965,"agentName":"Denise Garrett","albumArt":579},
{"country":"US","artist":"Mraz-Kautzer","bandMembers":3,"bookingCost":5961,"agentName":"Michael Miller","albumArt":114},
{"country":"US","artist":"Kautzer-Will","bandMembers":7,"bookingCost":3788,"agentName":"Lillian Green","albumArt":12},
{"country":"IE","artist":"Sanford and Sons","bandMembers":8,"bookingCost":8954,"agentName":"Jeffrey Mills","albumArt":82},
{"country":"US","artist":"Koss, Rempel and Kessler","bandMembers":5,"bookingCost":6465,"agentName":"Harry Willis","albumArt":461},
{"country":"US","artist":"Boyer","bandMembers":2,"bookingCost":4463,"agentName":"Cynthia Harper","albumArt":310},
{"country":"US","artist":"Emard and Sons","bandMembers":5,"bookingCost":7974,"agentName":"Deborah Ellis","albumArt":738},
{"country":"CA","artist":"Wintheiser, Deckow and Rau","bandMembers":3,"bookingCost":7977,"agentName":"Deborah Ellis","albumArt":430},
{"country":"CA","artist":"Goyette, Monahan and Dare","bandMembers":3,"bookingCost":8467,"agentName":"James Reed","albumArt":830},
{"country":"US","artist":"Lockman-Price","bandMembers":5,"bookingCost":9718,"agentName":"Heather Edwards","albumArt":82},
{"country":"US","artist":"Bergstrom, Moen and Swaniawski","bandMembers":8,"bookingCost":7783,"agentName":"Howard Walker","albumArt":578},
{"country":"IE","artist":"Altenwerth","bandMembers":1,"bookingCost":2148,"agentName":"Jeffrey Ellis","albumArt":899},
{"country":"CA","artist":"Feest, Schimmel and Gutmann","bandMembers":8,"bookingCost":5823,"agentName":"Robert Williams","albumArt":373},
{"country":"US","artist":"Borer","bandMembers":1,"bookingCost":8975,"agentName":"Elizabeth Roberts","albumArt":820},
{"country":"US","artist":"Konopelski-Wehner","bandMembers":1,"bookingCost":1044,"agentName":"Jesse Schmidt","albumArt":580},
{"country":"US","artist":"Keeling, D'Amore and Dare","bandMembers":2,"bookingCost":7046,"agentName":"Frances Hansen","albumArt":929},
{"country":"CA","artist":"Cronin, Gislason and Smitham","bandMembers":7,"bookingCost":8840,"agentName":"Donald Reyes","albumArt":200},
{"country":"GB","artist":"Leuschke-Dooley","bandMembers":3,"bookingCost":1491,"agentName":"Gary Hicks","albumArt":135},
{"country":"US","artist":"Beahan-DuBuque","bandMembers":6,"bookingCost":3408,"agentName":"Samuel Black","albumArt":861},
{"country":"CA","artist":"Beer-Stehr","bandMembers":7,"bookingCost":6479,"agentName":"Kenneth Nelson","albumArt":419},
{"country":"US","artist":"Towne-Keeling","bandMembers":8,"bookingCost":4794,"agentName":"Andrew Mcdonald","albumArt":861},
{"country":"US","artist":"Gutkowski, Okuneva and Cummings","bandMembers":6,"bookingCost":2786,"agentName":"Jesse Shaw","albumArt":812},
{"country":"CA","artist":"Bogisich Group","bandMembers":4,"bookingCost":9318,"agentName":"Nicholas Hicks","albumArt":542},
{"country":"CA","artist":"Hane-Rau","bandMembers":6,"bookingCost":6138,"agentName":"Bobby Hamilton","albumArt":588},
{"country":"CA","artist":"Dicki","bandMembers":3,"bookingCost":6117,"agentName":"Michael Diaz","albumArt":165},
{"country":"US","artist":"Bartell, Brekke and Effertz","bandMembers":4,"bookingCost":9120,"agentName":"Larry Graham","albumArt":106},
{"country":"CA","artist":"Yost, Fisher and Little","bandMembers":2,"bookingCost":5911,"agentName":"Lawrence Woods","albumArt":128},
{"country":"IE","artist":"Nolan","bandMembers":6,"bookingCost":4418,"agentName":"Christina Olson","albumArt":717}]

console.log('connecting to db.....', PROJECT_NAME)
connectToDB(PROJECT_NAME, (err, result)=>{
	dataSet.forEach((dataRecord)=>{
	 	dataRecord.onTour = Math.random() > .5 ? true : false 

      let bandRecord = new Band(dataRecord)
		bandRecord.save((err, savedRecord)=>{
			if (err) console.log(err)
			console.log('saved: ' + savedRecord._id )
		 }) 
	})
})