var empName='';
var tasksDone=0;
var gamePhase='act1';
var currentTask=null;

function fadeOut(cb){
  var o=document.getElementById('overlay');
  o.style.opacity='1';
  setTimeout(cb,700);
}
function fadeIn(cb){
  var o=document.getElementById('overlay');
  o.style.opacity='0';
  if(!window._ambientStarted){window._ambientStarted=true;try{playAmbient();}catch(e){}}
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
  var pct=(tasksDone/12)*100;
  document.getElementById('pfill').style.width=pct+'%';
  document.getElementById('tcounter').textContent=tasksDone+' / 12 TASKS';
}
