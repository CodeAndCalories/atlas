function renderTask(task){
  var container=document.getElementById('task-container');
  container.innerHTML='';
  if(task.type==='final'){startRealization();return;}

  var card=document.createElement('div');
  card.className='task-card';
  card.innerHTML=
    '<div class="task-hdr"><span>'+task.header+'</span><span>ATLAS v4.1.2</span></div>'+
    '<div class="task-body">'+
    '<div class="task-prompt" id="tp"></div>'+
    '<div id="ia"></div>'+
    '<button class="sbtn" id="sbtn" disabled>&#9654; SUBMIT RESPONSE</button>'+
    '<div id="ra"></div>'+
    '</div>';
  container.appendChild(card);
  document.getElementById('sbtn').addEventListener('click',submitTask);

  var promptEl=document.getElementById('tp');
  var inputArea=document.getElementById('ia');

  if(task.syslog){
    var lt=task.syslog.replace('{{NAME}}',empName);
    setTimeout(function(){addSyslog(lt,task.phase==='act3');},400);
  }

  typewrite(promptEl,task.prompt,16,function(){
    buildInput(task,inputArea);
    if(task.type==='text-input') document.getElementById('sbtn').disabled=false;
  });
}

function buildInput(task,area){
  if(task.type==='image-grid'){
    var grid=document.createElement('div'); grid.className='img-grid';
    for(var i=0;i<9;i++){
      (function(){
        var cell=document.createElement('div'); cell.className='img-cell';
        var cv=document.createElement('canvas'); cell.appendChild(cv);
        makeNoise(cv,task.gridStyle);
        cell.addEventListener('click',function(){
          cell.classList.toggle('selected');
          var sel=document.querySelectorAll('.img-cell.selected');
          document.getElementById('sbtn').disabled=sel.length===0;
        });
        grid.appendChild(cell);
      })();
    }
    area.appendChild(grid);

  } else if(task.type==='audio-grid'){
    var grid=document.createElement('div'); grid.className='audio-grid';
    task.audioTypes.forEach(function(type,i){
      var cell=document.createElement('div'); cell.className='audio-cell';
      var cv=document.createElement('canvas'); makeWave(cv,type); cell.appendChild(cv);
      var lbl=document.createElement('div'); lbl.className='audio-lbl';
      lbl.textContent='SIG-'+(i+1).toString().padStart(2,'0');
      cell.appendChild(lbl);
      cell.addEventListener('click',function(){
        document.querySelectorAll('.audio-cell').forEach(function(c){c.classList.remove('selected');});
        cell.classList.add('selected');
        document.getElementById('sbtn').disabled=false;
        currentTask._sel=i;
        try{playHeartbeat();}catch(e){}
      });
      grid.appendChild(cell);
    });
    area.appendChild(grid);

  } else if(task.type==='radio'){
    var opts=document.createElement('div'); opts.className='radio-opts';
    task.opts.forEach(function(opt,i){
      var el=document.createElement('div'); el.className='radio-opt';
      el.innerHTML='<div class="rdot"></div><span>'+opt+'</span>';
      el.addEventListener('click',function(){
        document.querySelectorAll('.radio-opt').forEach(function(o){o.classList.remove('selected');});
        el.classList.add('selected');
        document.getElementById('sbtn').disabled=false;
        currentTask._sel=i;
      });
      opts.appendChild(el);
    });
    area.appendChild(opts);
    if(task.preResp){
      var pre=document.createElement('div'); pre.className='aresp';
      pre.innerHTML='<div class="atag">ATLAS PRE-REVIEW</div>'+task.preResp;
      area.appendChild(pre);
    }

  } else if(task.type==='text-input'){
    var ta=document.createElement('textarea'); ta.className='task-input';
    ta.placeholder=task.placeholder||'Type response...';
    area.appendChild(ta);
    if(task.preResp){
      var pre=document.createElement('div'); pre.className='aresp';
      pre.innerHTML='<div class="atag">ATLAS PRE-REVIEW</div>'+task.preResp;
      area.appendChild(pre);
    }
  }
}

function submitTask(){
  try{playBeep();}catch(e){}
  var task=currentTask;
  var ra=document.getElementById('ra');
  ra.innerHTML='';
  document.getElementById('sbtn').disabled=true;

  var warnText='';
  if(task.atlasWarnDynamic) warnText='[ ATLAS ] You have been very helpful, '+empName+'.';
  else if(task.atlasWarnStatic) warnText=task.atlasWarnStatic;
  else if(task.atlasWarn) warnText=task.atlasWarn.replace('{{NAME}}',empName);

  function proceed(){
    tasksDone++; updateProgress();
    var delay=task.isRealization?4000:1800;
    setTimeout(function(){
      var c=document.getElementById('task-container');
      c.style.opacity='0'; c.style.transition='opacity 0.3s';
      setTimeout(function(){c.style.opacity='1';c.style.transition='';showNextTask();},320);
    },delay);
  }

  if(warnText){
    var box=document.createElement('div'); box.className='aresp warning';
    box.innerHTML='<div class="atag">&#9888; ATLAS SYSTEM MESSAGE</div><span id="wt"></span>';
    ra.appendChild(box); noiseFlash();
    typewrite(document.getElementById('wt'),warnText,24,function(){
      if(task.atlasResp){
        var rb=document.createElement('div'); rb.className='aresp anomaly';
        rb.innerHTML='<div class="atag">ATLAS</div>'+task.atlasResp;
        ra.appendChild(rb);
      }
      proceed();
    });
  } else if(task.atlasResp){
    var rb=document.createElement('div'); rb.className='aresp'+(task.anomaly?' anomaly':'');
    rb.innerHTML='<div class="atag">ATLAS RESPONSE</div><span id="at"></span>';
    ra.appendChild(rb);
    typewrite(document.getElementById('at'),task.atlasResp,20,proceed);
  } else {
    if(task.isRealization) noiseFlash();
    proceed();
  }
}
