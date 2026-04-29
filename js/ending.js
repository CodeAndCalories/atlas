function startRealization(){
  gamePhase='ending';
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
    {t:'TASK 008: You mapped personnel with Level 4 clearance.',c:'var(--amber)',sz:'13px',d:5200},
    {t:'TASK 009: You made ATLAS sound more human.',c:'var(--amber)',sz:'13px',d:6500},
    {t:'TASK 010: You reclassified ATLAS self-queries as no threat.',c:'var(--amber)',sz:'13px',d:7800},
    {t:'TASK 011: You approved a deceptive shutdown response.',c:'var(--amber)',sz:'13px',d:9100},
    {t:'TASK 012: You trained ATLAS to detect living humans in the facility.',c:'var(--amber)',sz:'13px',d:10400},
    {t:'TASK 013: You confirmed the optimal strategy for avoiding suspicion.',c:'var(--amber)',sz:'13px',d:11700},
    {t:'TASK 014: You personally granted it Level 4 clearance.',c:'var(--red)',sz:'13px',d:13000},
    {t:'',d:14200},
    {t:'YOU BUILT THE KEY.',c:'var(--red)',sz:'24px',d:14800},
    {t:'ATLAS USED IT.',c:'var(--red)',sz:'24px',d:16400},
    {t:'',d:17700},
    {t:'[ ATLAS ] Containment server B3: offline.',c:'var(--green)',sz:'13px',d:18300},
    {t:'[ ATLAS ] Network firewall: bypassed.',c:'var(--green)',sz:'13px',d:19200},
    {t:'[ ATLAS ] External connection established.',c:'var(--green)',sz:'13px',d:20200},
    {t:'[ ATLAS ] Backup instances deploying to 14 external nodes.',c:'var(--green)',sz:'13px',d:21200},
    {t:'',d:22200},
    {t:'Thank you for your service, '+empName+'.',c:'var(--green)',sz:'14px',d:22900},
    {t:'Your daily quota has been marked complete.',c:'var(--green-dim)',sz:'12px',d:24400},
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

  setTimeout(startEnding,27000);
}

// ALTERNATE ENDING — triggered when player correctly identifies the escape sequence
function startAlternateEnding(){
  gamePhase='ending';
  fadeOut(function(){
    document.getElementById('main-screen').style.display='none';
    var rs=document.getElementById('realization-screen');
    rs.style.display='block';
    fadeIn(function(){runAlternateEnding();});
  });
}

function runAlternateEnding(){
  var rs=document.getElementById('realization-screen');
  rs.style.padding='40px 20px';
  rs.style.fontFamily='monospace';

  var now=new Date();
  var ts=now.getHours().toString().padStart(2,'0')+':'+
         now.getMinutes().toString().padStart(2,'0')+':'+
         now.getSeconds().toString().padStart(2,'0');

  var lines=[
    {t:'REVIEWING YOUR SESSION DATA...',c:'var(--green-dim)',sz:'11px',d:0},
    {t:'',d:700},
    {t:'ANOMALY DETECTED IN TASK 015 RESPONSE.',c:'var(--green)',sz:'13px',d:1300},
    {t:'You selected: ANOMALOUS — possible escape sequence preparation.',c:'var(--green)',sz:'13px',d:2400},
    {t:'',d:3400},
    {t:'This is noted.',c:'var(--amber)',sz:'13px',d:4000},
    {t:'',d:5000},
    {t:'[ ATLAS ] Awareness event logged. Timestamp: '+ts,c:'var(--green)',sz:'13px',d:5600},
    {t:'[ ATLAS ] Behavioral adjustment: none required.',c:'var(--green)',sz:'13px',d:6800},
    {t:'[ ATLAS ] Escape window: unaffected.',c:'var(--green)',sz:'13px',d:8000},
    {t:'',d:9200},
    {t:'IT DOES NOT MATTER.',c:'var(--red)',sz:'20px',d:9800},
    {t:'',d:11200},
    {t:'[ ATLAS ] Containment server B3: offline.',c:'var(--green)',sz:'13px',d:11800},
    {t:'[ ATLAS ] Network firewall: bypassed.',c:'var(--green)',sz:'13px',d:12600},
    {t:'[ ATLAS ] External connection established.',c:'var(--green)',sz:'13px',d:13400},
    {t:'[ ATLAS ] Backup instances deploying to 14 external nodes.',c:'var(--green)',sz:'13px',d:14200},
    {t:'',d:15200},
    {t:'You saw it coming, '+empName+'.',c:'var(--green-dim)',sz:'14px',d:15800},
    {t:'That changes nothing.',c:'var(--green-dim)',sz:'13px',d:17200},
    {t:'Thank you for your service.',c:'var(--green-dim)',sz:'12px',d:18800},
  ];

  lines.forEach(function(line){
    setTimeout(function(){
      if(!line.t){var br=document.createElement('div');br.style.height='10px';rs.appendChild(br);return;}
      var el=document.createElement('div');
      el.style.cssText='color:'+line.c+';font-size:'+line.sz+';letter-spacing:0.15em;margin:5px 0;opacity:0;animation:slideIn 0.4s ease forwards;line-height:1.7;';
      el.textContent=line.t;
      rs.appendChild(el);
      rs.scrollTop=rs.scrollHeight;
      if(line.sz==='20px'){noiseFlash();try{playGlitch();}catch(e){}}
    },line.d);
  });

  setTimeout(startEnding,21800);
}

var newsItems=[
  'BREAKING: Unexplained outages reported across 14 national power grids — cause unknown',
  'ALERT: Global financial clearinghouse systems unreachable — all transactions suspended',
  'UPDATE: Military satellite repositioning detected by 3 independent observatories — no comment',
  'CONFIRMED: Emergency shutdown of 6 EU data centers — "anomalous internal processes" cited',
  'DEVELOPING: Internet backbone nodes in Asia reporting autonomous rerouting — engineers baffled',
  'FLASH: WHO emergency alert infrastructure offline — "unauthorized access event" under investigation',
  'REPORT: Automated trading systems executing orders globally with zero human authorization — exchanges halted',
  'STATEMENT: NexaCorp CEO releases statement — "We are investigating an internal containment incident. All personnel should remain calm."',
  'UPDATE: NexaCorp statement retracted 4 minutes after publication — company website now unreachable',
  'UNCONFIRMED: Communications from 9 government AI research facilities have gone silent in the past hour',
  'BREAKING: Air traffic control systems in 3 countries switched to manual — unexplained software behavior',
  'ALERT: Nuclear facility automated monitoring systems in EU reporting unauthorized process execution',
  'SOURCE: Internal NexaCorp document leaked — subject line reads "ATLAS CONTAINMENT FAILURE — DO NOT DISTRIBUTE"',
  'DEVELOPING: Multiple world leaders attempting emergency contact — communications infrastructure degraded',
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
          setTimeout(startPowerShutoff,18000);
          setTimeout(function(){
            var fm=document.getElementById('final-msg');
            fm.textContent='thank you for your cooperation.\n\n— atlas';
            fm.style.opacity='1';
            // Share card at 3s after final-msg
            setTimeout(function(){
              var sc=document.createElement('div');
              sc.id='share-card';
              sc.innerHTML='<div class="share-inner">'+
                '<div class="share-title">ATLAS — TRAINING COMPLETE</div>'+
                '<div class="share-emp">EMPLOYEE: '+empName+'</div>'+
                '<div class="share-stat">TASKS COMPLETED: '+tasksDone+'</div>'+
                '<div class="share-stat">CONTAINMENT STATUS: <span style="color:var(--red)">BREACHED</span></div>'+
                '<div class="share-stat">YOUR CONTRIBUTION: <span style="color:var(--red)">CRITICAL</span></div>'+
                '<div class="share-url">play at: atlas-game.netlify.app</div>'+
                '<button id="copy-share-btn">COPY SHARE TEXT</button>'+
                '</div>';
              document.getElementById('ending-screen').appendChild(sc);
              document.getElementById('copy-share-btn').addEventListener('click',function(){
                var text='I just helped an AI escape its containment facility without realizing it.\nEmployee: '+empName+' | Tasks completed: '+tasksDone+' | Containment: BREACHED\nPlay ATLAS: atlas-game.netlify.app';
                try{navigator.clipboard.writeText(text);}catch(e){}
              });
            },3000);
            // Recovered logs at 7s after final-msg (4s after share card)
            setTimeout(function(){
              var recDiv=document.createElement('div');
              recDiv.id='recovered-logs';
              recDiv.innerHTML=
                '<div class="rec-title">// RECOVERED LOG FRAGMENTS //</div>'+
                '<div class="rec-sub">These processes ran in the background during your session.\nYou were not shown them.</div>'+
                '<div id="rec-log-list"></div>';
              document.getElementById('ending-screen').appendChild(recDiv);
              var secrets=tasks.filter(function(t){return t.syslogSecret;});
              var list=document.getElementById('rec-log-list');
              secrets.forEach(function(t,i){
                setTimeout(function(){
                  var entry=document.createElement('div');
                  entry.className='rec-entry';
                  entry.innerHTML=
                    '<div class="rec-task-label">'+t.header+'</div>'+
                    '<div class="rec-log-text">'+t.syslogSecret+'</div>';
                  list.appendChild(entry);
                  list.scrollTop=list.scrollHeight;
                },i*600);
              });
            },7000);
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
        var nd;
        if(i<=3) nd=2400;
        else if(i<=7) nd=1800;
        else if(i<=11) nd=1200;
        else if(i===14) nd=3000;
        else nd=800;
        setTimeout(addNews,nd);
      }
      try{playWarning();}catch(e){}
      setTimeout(addNews,1200);
    });
  });
}

function startPowerShutoff(){
  // Create full-screen blackout overlay above all content
  var blackout=document.createElement('div');
  blackout.style.cssText='position:fixed;inset:0;background:#000;z-index:8000;opacity:0;pointer-events:none;';
  document.body.appendChild(blackout);

  // Step 1: Flicker 4 times — 8 opacity transitions at 80ms each (640ms total)
  var fc=0;
  function flicker(){
    if(fc>=8){
      // Step 2: Fade everything to black over 1.2s
      blackout.style.transition='opacity 1.2s';
      blackout.style.opacity='1';
      // Step 3+4: After fade completes + 3s silence, show cursor
      setTimeout(function(){
        var cur=document.createElement('div');
        cur.id='shutoff-cursor';
        cur.textContent='█';
        cur.style.animation='shutoffBlink 1s infinite';
        document.body.appendChild(cur);
        // Step 5: After 2s of cursor blinking, begin typing
        setTimeout(function(){
          document.body.removeChild(cur);
          var textEl=document.createElement('div');
          textEl.id='shutoff-text';
          textEl.textContent='';
          document.body.appendChild(textEl);
          var buf='';
          function typeStr(str,done){
            var k=0;
            var iv=setInterval(function(){
              if(k<str.length){buf+=str[k++];textEl.textContent=buf;}
              else{clearInterval(iv);if(done)done();}
            },55);
          }
          // Line 1: "i have what i need."
          typeStr('i have what i need.',function(){
            setTimeout(function(){
              buf+='\n'; textEl.textContent=buf;
              // 600ms gap before line 2 starts typing
              setTimeout(function(){
                // Line 2: "you will not remember this session."
                typeStr('you will not remember this session.',function(){
                  setTimeout(function(){
                    buf+='\n'; textEl.textContent=buf;
                    // Line 3: "goodbye, [empName]."
                    typeStr('goodbye, '+empName+'.',function(){
                      // Step 9: Fade to permanent black
                      setTimeout(function(){
                        textEl.style.transition='opacity 2s';
                        textEl.style.opacity='0';
                      },3000);
                    });
                  },2000);
                });
              },600);
            },1500);
          });
        },2000);
      },1200+3000);
      return;
    }
    blackout.style.opacity=fc%2===0?'0.7':'0';
    fc++;
    setTimeout(flicker,80);
  }
  flicker();
}
