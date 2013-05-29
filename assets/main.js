var BEpercentage = 50;
var DKpercentage = 50;
putPlumber();
window.onload = init;

key('left', function(){ 
	if (BEpercentage>0) {
		BEpercentage--;
		DKpercentage++;
		putPlumber();
		crossfade(BEpercentage);
	} else {
		return;
	}
	console.log('BEpercentage = ' + BEpercentage);
	console.log('DKpercentage = ' + DKpercentage); 
});


key('right', function(){ 
	if (BEpercentage<100) {
		BEpercentage++;
		DKpercentage--;
		putPlumber();
		crossfade(BEpercentage);
	} else {
		return;
	}
	console.log('BEpercentage = ' + BEpercentage);
	console.log('DKpercentage = ' + DKpercentage);
});



function putPlumber() {
	$("#fagget_plumber").css('left' ,document.width/100*BEpercentage + "px");
}



// copypaste from http://www.html5rocks.com/en/tutorials/webaudio/intro/js/crossfade-sample.js

var CrossfadeSample = {playing:false};
var context;
var bufferLoader;
var source1, source2;
var gainNode1, gainNode2;
function init() {
  $("#pipe").css('left' ,document.width/100*33 + "px");
  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
  bufferLoader = new BufferLoader(
    context,
    [
      'assets/chokolade-R.wav',
      'assets/chokolade-L.wav',
    ],
    finishedLoading
    );
  bufferLoader.load();

	}



function finishedLoading(bufferList) {
  // Create two sources and play them both together.
  source1 = context.createBufferSource();
  source2 = context.createBufferSource();
  source1.buffer = bufferList[0];
  source2.buffer = bufferList[1];

  gainNode1 = context.createGain();
  source1.connect(gainNode1);
  gainNode1.connect(context.destination);

  gainNode2 = context.createGain();
  source2.connect(gainNode2);
  gainNode2.connect(context.destination);

  gainNode1.gain.value = 0.5;
  gainNode2.gain.value = 0.5;
  source1.loop = true;
  source2.loop = true;
  source1.start(0);
  source2.start(0);
}



// Fades between 0 (all source 1) and 1 (all source 2)
function crossfade(percentage) {
  var x = percentage/100
  // Use an equal-power crossfading curve:
  var gain1 = Math.cos(x * 0.5*Math.PI);
  var gain2 = Math.cos((1.0 - x) * 0.5*Math.PI);
  gainNode1.gain.value = gain1;
  gainNode2.gain.value = gain2;
};


function BufferLoader(context,urlList,callback){
	this.context=context;this.urlList=urlList;
	this.onload=callback;this.bufferList=new Array();this.loadCount=0;}

BufferLoader.prototype.loadBuffer=function(url,index){
	var request=new XMLHttpRequest();
	request.open("GET",url,true);request.responseType="arraybuffer";
	var loader=this;request.onload=function(){
	loader.context.decodeAudioData(request.response,function(buffer){
	if(!buffer){alert('error decoding file data: '+url);return;}
	loader.bufferList[index]=buffer;if(++loader.loadCount==loader.urlList.length)
	loader.onload(loader.bufferList);},function(error){console.error('decodeAudioData error',error);});}
	request.onerror=function(){alert('BufferLoader: XHR error');}
	request.send();}

BufferLoader.prototype.load=function(){for(var i=0;i<this.urlList.length;++i)
this.loadBuffer(this.urlList[i],i);}
