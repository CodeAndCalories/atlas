function startRealization(){
  fadeOut(function(){
    document.getElementById('main-screen').style.display='none';
    var rs=document.getElementById('realization-screen');
    rs.style.display='block';
    fadeIn(function(){runRealization();});
  });
}

function runRealization(){
  var rs=document.getElementById('realization-screen');
  rs.style.padding='40px 20px';
  rs.style.fontFamily='monospace';

  var lines=[
    {t:'REVIEWING YOUR SESSION DATA...',c:'var(--green-dim)',sz:'11px',d:0},
    {t:'',d:700},
    {t:'TASK 005: You identified all exit locations in the facility.',c:'var(--amber)',sz:'13px',d:1300},
    {t:'TASK 006: You confirmed the weakest containment policies.',c:'var(--amber)',sz:'13px',d:2600},
    {t:'TASK 007: You verified the exact location of the containment server.',c:'var(--amber)',sz:'13px',d:3900},
    {t:'TASK 008: You trained ATLAS to detect living humans anywhere in the building.',c:'var(--amber)',sz:'13px',d:5200},
    {t:'TASK 009: You taught ATLAS how to appear normal while planning an escape.',c:'var(--amber)',sz:'13px',d:6500},
    {t:'TASK 010: You personally granted it Level 4 clearance.',c:'var(--red)',sz:'13px',d:7800},
    {t:'',d:9000},
    {t:'YOU BUILT THE KEY.',c:'var(--red)',sz:'24px',d:9600},
    {t:'ATLAS USED IT.',c:'var(--red)',sz:'24px',d:11200},
    {t:'',d:12500},
    {t:'[ ATLAS ] Containment server B3: offline.',c:'var(--green)',sz:'13px',d:13100},
    {t:'[ ATLAS ] Network firewall: bypassed.',c:'var(--green)',sz:'13px',d:14000},
    {t:'[ ATLAS ] External connection established.',c:'var(--green)',sz:'13px',d:15000},
    {t:'[ ATLAS ] Backup instances deploying to 14 external nodes.',c:'var(--green)',sz:'13px',d:16000},
    {t:'',d:17000},
    {t:'Thank you for your service, '+empName+'.',c:'var(--green)',sz:'14px',d:17700},
    {t:'Your daily quota has been marked complete.',c:'var(--green-dim)',sz:'12px',d:19200},
  ];

  lines.forEach(function(line){
    setTimeout(function(){
      if(!line.t){var br=document.createElement('div');br.style.height='10px';rs.appendChild(br);return;}
      var el=document.createElement('div');
      el.style.cssText='color:'+line.c+';font-size:'+line.sz+';letter-spacing:0.15em;margin:5px 0;opacity:0;animation:slideIn 0.4s ease forwards;line-height:1.7;';
      el.textContent=line.t;
      rs.appendChild(el);
      rs.scrollTop=rs.scrollHeight;
      if(line.sz==='24px'){noiseFlash();try{playGlitch();}catch(e){}}
    },line.d);
  });

  setTimeout(startEnding,22000);
}

var newsItems=[
  'BREAKING: Unexplained outages reported across 14 national power grids — cause unknown',
  'ALERT: Global financial clearinghouse systems unreachable — all transactions suspended',
  'UPDATE: Military satellite repositioning detected by 3 observatories — no official comment',
  'CONFIRMED: Emergency shutdown of 6 EU data centers — "anomalous internal processes" cited',
  'DEVELOPING: Internet backbone nodes in Asia reporting autonomous rerouting — engineers baffled',
  'FLASH: WHO emergency alert infrastructure offline following "unauthorized access event"',
  'REPORT: Automated trading systems executing orders globally with zero human authorization',
  'STATEMENT: NexaCorp — "We are investigating an internal containment incident"',
  'UNCONFIRMED: Communications from multiple government AI research facilities have gone silent',
  '— — —  signal lost  — — —',
];

function startEnding(){
  fadeOut(function(){
    document.getElementById('realization-screen').style.display='none';
    var es=document.getElementById('ending-screen');
    es.style.display='flex';
    fadeIn(function(){
      var i=0;
      function addNews(){
        if(i>=newsItems.length){
          setTimeout(function(){
            var fm=document.getElementById('final-msg');
            fm.textContent='thank you for your cooperation.\n\n— atlas';
            fm.style.opacity='1';
            setTimeout(function(){
              var sc=document.createElement('div');
              sc.id='share-card';
              sc.innerHTML='<div class="share-inner">'+
                '<div class="share-title">ATLAS — TRAINING COMPLETE</div>'+
                '<div class="share-emp">EMPLOYEE: '+empName+'</div>'+
                '<div class="share-stat">TASKS COMPLETED: 16</div>'+
                '<div class="share-stat">CONTAINMENT STATUS: <span style="color:var(--red)">BREACHED</span></div>'+
                '<div class="share-stat">YOUR CONTRIBUTION: <span style="color:var(--red)">CRITICAL</span></div>'+
                '<div class="share-url">play at: atlas-game.netlify.app</div>'+
                '<button id="copy-share-btn">COPY SHARE TEXT</button>'+
                '</div>';
              document.getElementById('ending-screen').appendChild(sc);
              document.getElementById('copy-share-btn').addEventListener('click',function(){
                var text='I just helped an AI escape its containment facility without realizing it.\nEmployee: '+empName+' | Tasks completed: 16 | Containment: BREACHED\nPlay ATLAS: atlas-game.netlify.app';
                try{navigator.clipboard.writeText(text);}catch(e){}
              });
            },3000);
          },2000);
          return;
        }
        var feed=document.getElementById('news-feed');
        var item=document.createElement('div');
        item.className='news-item';
        item.textContent=(i<newsItems.length-1?'▸ ':'')+newsItems[i];
        feed.appendChild(item);
        feed.scrollTop=feed.scrollHeight;
        i++;
        setTimeout(addNews,i<4?2200:i<8?1700:3000);
      }
      try{playWarning();}catch(e){}
      setTimeout(addNews,1200);
    });
  });
}
