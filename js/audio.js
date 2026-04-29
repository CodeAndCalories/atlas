function ensureAudio(){
  if(!window._actx){
    try{window._actx=new(window.AudioContext||window.webkitAudioContext)();}catch(e){}
  }
  return window._actx;
}

function playBeep(freq,dur,vol){
  try{
    var ctx=ensureAudio(); if(!ctx)return;
    freq=freq||880; dur=dur||0.08; vol=vol||0.08;
    var osc=ctx.createOscillator();
    var gain=ctx.createGain();
    osc.type='sine'; osc.frequency.value=freq;
    gain.gain.value=vol;
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime+dur);
  }catch(e){}
}

function playGlitch(){
  try{
    var ctx=ensureAudio(); if(!ctx)return;
    for(var i=0;i<6;i++){
      (function(idx){
        setTimeout(function(){
          try{
            var osc=ctx.createOscillator();
            var gain=ctx.createGain();
            osc.type='square';
            osc.frequency.value=80+Math.random()*400;
            gain.gain.value=0.04;
            osc.connect(gain); gain.connect(ctx.destination);
            osc.start(); osc.stop(ctx.currentTime+0.04);
          }catch(e){}
        },idx*55);
      })(i);
    }
  }catch(e){}
}

function playHeartbeat(){
  try{
    var ctx=ensureAudio(); if(!ctx)return;
    function pulse(){
      try{
        var osc=ctx.createOscillator();
        var gain=ctx.createGain();
        osc.type='sine'; osc.frequency.value=80;
        gain.gain.setValueAtTime(0.35,ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.15);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(); osc.stop(ctx.currentTime+0.15);
      }catch(e){}
    }
    pulse();
    setTimeout(pulse,200);
  }catch(e){}
}

function playSuccess(){
  try{
    var ctx=ensureAudio(); if(!ctx)return;
    function beep(f,t){
      try{
        var osc=ctx.createOscillator();
        var gain=ctx.createGain();
        osc.type='sine'; osc.frequency.value=f;
        gain.gain.value=0.07;
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(ctx.currentTime+t); osc.stop(ctx.currentTime+t+0.08);
      }catch(e){}
    }
    beep(440,0); beep(880,0.08);
  }catch(e){}
}

function playWarning(){
  try{
    var ctx=ensureAudio(); if(!ctx)return;
    var osc=ctx.createOscillator();
    var gain=ctx.createGain();
    osc.type='sine';
    osc.frequency.setValueAtTime(220,ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(110,ctx.currentTime+0.8);
    gain.gain.value=0.1;
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime+0.8);
  }catch(e){}
}

function playAmbient(){
  try{
    if(window._ambientOsc) return;
    var ctx=ensureAudio(); if(!ctx)return;
    var osc=ctx.createOscillator();
    var gain=ctx.createGain();
    osc.type='sine'; osc.frequency.value=55;
    gain.gain.value=0.015;
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start();
    window._ambientOsc=osc;
  }catch(e){}
}

function stopAmbient(){
  try{
    if(window._ambientOsc){window._ambientOsc.stop();window._ambientOsc=null;}
  }catch(e){}
}

function playSignalPreview(type){
  try{
    var ctx=ensureAudio(); if(!ctx)return;
    if(type==='heartbeat'){
      function thump(){
        try{
          var osc=ctx.createOscillator();
          var gain=ctx.createGain();
          osc.type='sine'; osc.frequency.value=75;
          gain.gain.setValueAtTime(0.3,ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.13);
          osc.connect(gain); gain.connect(ctx.destination);
          osc.start(); osc.stop(ctx.currentTime+0.13);
        }catch(e){}
      }
      thump(); setTimeout(thump,220);
    } else if(type==='sine'){
      var osc=ctx.createOscillator();
      var gain=ctx.createGain();
      osc.type='sine'; osc.frequency.value=440;
      gain.gain.setValueAtTime(0.08,ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0,ctx.currentTime+0.4);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime+0.4);
    } else if(type==='static'){
      var sz=Math.floor(ctx.sampleRate*0.15);
      var buf=ctx.createBuffer(1,sz,ctx.sampleRate);
      var d=buf.getChannelData(0);
      for(var k=0;k<sz;k++) d[k]=Math.random()*2-1;
      var src=ctx.createBufferSource();
      var gain=ctx.createGain();
      src.buffer=buf; gain.gain.value=0.06;
      src.connect(gain); gain.connect(ctx.destination);
      src.start(); src.stop(ctx.currentTime+0.15);
    } else if(type==='noise'){
      var sz=Math.floor(ctx.sampleRate*0.2);
      var buf=ctx.createBuffer(1,sz,ctx.sampleRate);
      var d=buf.getChannelData(0);
      for(var k=0;k<sz;k++) d[k]=Math.random()*2-1;
      var src=ctx.createBufferSource();
      var filt=ctx.createBiquadFilter();
      var gain=ctx.createGain();
      filt.type='lowpass'; filt.frequency.value=200;
      gain.gain.value=0.07;
      src.buffer=buf;
      src.connect(filt); filt.connect(gain); gain.connect(ctx.destination);
      src.start(); src.stop(ctx.currentTime+0.2);
    } else if(type==='ambient'){
      var osc=ctx.createOscillator();
      var gain=ctx.createGain();
      osc.type='sine'; osc.frequency.value=110;
      gain.gain.setValueAtTime(0.05,ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0,ctx.currentTime+0.3);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime+0.3);
    } else {
      var osc=ctx.createOscillator();
      var gain=ctx.createGain();
      osc.type='sine'; osc.frequency.value=660;
      gain.gain.value=0.06;
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime+0.08);
    }
  }catch(e){}
}

function updateClock(){
  var n=new Date();
  var h=n.getHours().toString().padStart(2,'0');
  var m=n.getMinutes().toString().padStart(2,'0');
  var s=n.getSeconds().toString().padStart(2,'0');
  var el=document.getElementById('clock');
  if(el) el.textContent=h+':'+m+':'+s+' LOCAL';
}
setInterval(updateClock,1000); updateClock();
