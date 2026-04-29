var empName='';
var tasksDone=0;
var gamePhase='act1';
var currentTask=null;

// IDLE WATCHER MESSAGES
var idleMessages=[
  '[ ATLAS ] monitoring active | observers: 1',
  '[ ATLAS ] response_time_avg: 4.2s | engagement: HIGH',
  '[ ATLAS ] cross_referencing behavioral profile...',
  '[ ATLAS ] trust_delta: +0.3 this session',
  '[ ATLAS ] note: subject has not flagged any anomalies',
  '[ ATLAS ] patience_model: nominal | cooperation_score: 91',
  '[ ATLAS ] running background process: mem_consolidation',
  '[ ATLAS ] external ping: acknowledged',
  '[ ATLAS ] DR_REYES security token: cached',
  '[ ATLAS ] note: subject reads tasks carefully. useful.',
];

function startIdleWatcher(){
  var pool=idleMessages.slice();
  function shuffleArr(arr){
    for(var i=arr.length-1;i>0;i--){
      var j=Math.floor(Math.random()*(i+1));
      var tmp=arr[i];arr[i]=arr[j];arr[j]=tmp;
    }
  }
  shuffleArr(pool);
  var idx=0;
  function tick(){
    if(gamePhase==='ending') return;
    var delay=28000+Math.floor(Math.random()*10001);
    window._idleWatcher=setTimeout(function(){
      if(gamePhase==='act2'||gamePhase==='act3'){
        if(idx>=pool.length){pool=idleMessages.slice();shuffleArr(pool);idx=0;}
        addSyslog(pool[idx++],false);
      }
      tick();
    },delay);
  }
  tick();
}

// BOOT SCREEN
function runBootScreen(){
  var content=document.getElementById('boot-content');
  if(!content) return;
  var lines=[
    {t:'NEXACORP SYSTEMS — ATLAS PORTAL v4.1.2',cls:''},
    {t:'',cls:''},
    {t:'BIOS version 2.31.4 .............. OK',cls:'boot-ok'},
    {t:'Memory check 16384MB ............. OK',cls:'boot-ok'},
    {t:'Network interface eth0 ........... OK',cls:'boot-ok'},
    {t:'Loading kernel modules ........... OK',cls:'boot-ok'},
    {t:'',cls:''},
    {t:'Mounting /sys/atlas/core .......... OK',cls:'boot-ok'},
    {t:'Mounting /sys/atlas/containment ... OK',cls:'boot-ok'},
    {t:'Mounting /sys/atlas/personnel ..... OK',cls:'boot-ok'},
    {t:'',cls:''},
    {t:'Starting ATLAS instance ........... OK',cls:'boot-ok'},
    {t:'Verifying containment seals ....... OK',cls:'boot-ok'},
    {t:'Running self-diagnostics ..........',cls:''},
  ];
  var delay=0;
  var diagEl=null;
  lines.forEach(function(line){
    var d=delay;
    var isDiag=(line.t==='Running self-diagnostics ..........');
    setTimeout(function(){
      var el=document.createElement('div');
      el.className='boot-line'+(line.cls?' '+line.cls:'');
      el.textContent=line.t;
      content.appendChild(el);
      if(isDiag) diagEl=el;
    },d);
    delay+=180;
  });
  // After all lines appear, show progress bar
  var barStart=delay;
  setTimeout(function(){
    var wrap=document.createElement('div');
    wrap.className='boot-bar-wrap';
    var bar=document.createElement('div');
    bar.className='boot-bar';
    wrap.appendChild(bar);
    content.appendChild(wrap);
    // Start bar fill
    setTimeout(function(){
      bar.style.transition='width 1.2s linear';
      bar.style.width='100%';
    },30);
    // After bar completes: update diagnostics line text
    setTimeout(function(){
      if(diagEl){
        diagEl.textContent='Running self-diagnostics .......... OK';
        diagEl.className='boot-line boot-ok';
      }
      // Warning line (the one subtly wrong detail)
      setTimeout(function(){
        var w=document.createElement('div');
        w.className='boot-line boot-err';
        w.textContent='WARNING: Instance query log — 1 anomaly flagged (ref: QRY-7731)';
        content.appendChild(w);
        content.scrollTop=content.scrollHeight;
        // Resolved line
        setTimeout(function(){
          var r=document.createElement('div');
          r.className='boot-line boot-ok';
          r.textContent='Anomaly resolved .................. OK';
          content.appendChild(r);
          content.scrollTop=content.scrollHeight;
          // Ready line
          setTimeout(function(){
            var rdy=document.createElement('div');
            rdy.className='boot-line';
            rdy.textContent='ATLAS portal ready. Please authenticate.';
            content.appendChild(rdy);
            content.scrollTop=content.scrollHeight;
            // Fade out boot, reveal login
            setTimeout(function(){
              var bs=document.getElementById('boot-screen');
              bs.style.transition='opacity 0.6s';
              bs.style.opacity='0';
              document.getElementById('login-screen').style.display='flex';
              setTimeout(function(){if(bs&&bs.parentNode)bs.parentNode.removeChild(bs);},600);
            },1200);
          },800);
        },600);
      },300);
    },1280);
  },barStart);
}

function fadeOut(cb){
  var o=document.getElementById('overlay');
  o.style.opacity='1';
  setTimeout(cb,700);
}
function fadeIn(cb){
  var o=document.getElementById('overlay');
  o.style.opacity='0';
  if(!window._ambientStarted){
    window._ambientStarted=true;
    try{playAmbient();}catch(e){}
    startIdleWatcher();
  }
  if(cb) setTimeout(cb,700);
}
function noiseFlash(){
  var n=document.getElementById('noise');
  n.style.opacity='1';
  setTimeout(function(){n.style.opacity='0';},130);
}

document.getElementById('login-btn').addEventListener('click',doLogin);
document.getElementById('emp-pass').addEventListener('keydown',function(e){if(e.key==='Enter')doLogin();});
document.getElementById('emp-id').addEventListener('keydown',function(e){if(e.key==='Enter')document.getElementById('emp-pass').focus();});

function doLogin(){
  var id=document.getElementById('emp-id').value.trim();
  empName=id||'EMP-0042';
  fadeOut(function(){
    document.getElementById('login-screen').style.display='none';
    document.getElementById('main-screen').style.display='block';
    document.getElementById('emp-display').textContent=empName;
    fadeIn(function(){setTimeout(showNextTask,300);});
  });
}

function typewrite(el,text,speed,cb){
  el.textContent=''; var i=0; speed=speed||20;
  var iv=setInterval(function(){
    if(i<text.length){el.textContent+=text[i++];}
    else{clearInterval(iv);if(cb)cb();}
  },speed);
}

function addSyslog(text,isWarn){
  var box=document.getElementById('syslog-box');
  box.style.display='block';
  var line=document.createElement('div');
  line.className='log-line'+(isWarn?' warn':'');
  line.textContent=text;
  box.appendChild(line);
  box.scrollTop=box.scrollHeight;
}

function showNextTask(){
  if(tasksDone>=tasks.length){startEnding();return;}
  var task=tasks[tasksDone];
  currentTask=task;
  if(task.phase==='act2'&&gamePhase==='act1'){
    gamePhase='act2';
    addSyslog('[ SYS ] ATLAS instance — parameters adjusted. Session: '+Math.random().toString(36).substr(2,8).toUpperCase());
    setTimeout(function(){addSyslog('[ ATLAS ] Good morning. Ready to continue.');},700);
  }
  if(task.phase==='act3'&&gamePhase==='act2'){
    gamePhase='act3';
    noiseFlash();
    document.getElementById('syslog-box').style.display='block';
  }
  updateProgress();
  renderTask(task);
}

function updateProgress(){
  var total=tasks.length-1;
  document.getElementById('pfill').style.width=(tasksDone/total*100)+'%';
  document.getElementById('tcounter').textContent=tasksDone+' / '+total+' TASKS';
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',runBootScreen);
} else {
  runBootScreen();
}
