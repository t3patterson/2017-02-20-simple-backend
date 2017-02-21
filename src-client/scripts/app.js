import Backbone from 'backbone'
import $ from 'jquery'

const BandModel = Backbone.Model.extend({
	
	urlRoot: '/api/bands',
	idAttribute: '_id'
})

const BandCollection = Backbone.Collection.extend({
	model: BandModel,
	url: '/api/bands'
})


let bandCollInstance = new BandCollection()
bandCollInstance.fetch().then(function(){
	console.log(bandCollInstance);
})

// FETCHING ONE RECORD
let bandModelInstance = new BandModel()
bandModelInstance.set({_id: '58ab1cca4d453d6016bc21bb'})
bandModelInstance.fetch().then(function(){
	console.log(bandModelInstance)
})


// SAVING DATA
let newBandModelRecord = new BandModel()
newBandModelRecord.set({
	agentName: 'Nicole Streetman',
	albumArt : 330,
	artist : 'beso beso beso',
	bandMembers : 6,
	bookingCost : 8888,
	country : 'US',
	onTour : true
})

console.log(newBandModelRecord)

newBandModelRecord.save().then(function(serverRes){
	console.log('new band record!!')
	console.log(serverRes)
	console.log(newBandModelRecord)
}).fail(function(err){
	console.log(err)
})