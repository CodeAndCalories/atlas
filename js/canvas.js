function makeNoise(canvas,style,cellIndex,isCorrect){
  var w=100,h=100; canvas.width=w; canvas.height=h;
  var ctx=canvas.getContext('2d');
  var id=ctx.createImageData(w,h);
  for(var i=0;i<id.data.length;i+=4){
    var v;
    if(style==='thermal'){
      v=Math.floor(Math.random()*80+20);
      id.data[i]=v; id.data[i+1]=Math.floor(Math.random()*25); id.data[i+2]=0; id.data[i+3]=255;
    } else {
      v=Math.random()>0.5?20+Math.floor(Math.random()*50):Math.floor(Math.random()*8);
      id.data[i]=id.data[i+1]=id.data[i+2]=v; id.data[i+3]=255;
    }
  }
  ctx.putImageData(id,0,0);
  ctx.fillStyle='rgba(0,255,65,0.035)';
  for(var y=0;y<h;y+=3){ctx.fillRect(0,y,w,1);}
  ctx.fillStyle='rgba(0,255,65,0.55)';
  ctx.font='8px monospace';
  ctx.fillText('CAM-0'+(Math.floor(Math.random()*8)+1),3,11);

  // Unique shape per cell — subtle, slightly brighter on correct cells
  var ci=cellIndex||0;
  var op=isCorrect?0.28:0.12;
  ctx.strokeStyle='rgba(0,255,65,'+op+')';
  ctx.lineWidth=1.5;
  ctx.beginPath();
  switch(ci){
    case 0: ctx.moveTo(10,50); ctx.lineTo(90,50); break;
    case 1: ctx.moveTo(50,10); ctx.lineTo(50,90); break;
    case 2: ctx.moveTo(20,20); ctx.lineTo(80,80); ctx.moveTo(80,20); ctx.lineTo(20,80); break;
    case 3: ctx.arc(50,50,25,0,Math.PI*2); break;
    case 4: ctx.moveTo(50,20); ctx.lineTo(80,80); ctx.lineTo(20,80); ctx.closePath(); break;
    case 5: ctx.rect(35,35,30,30); break;
    case 6: ctx.moveTo(15,15); ctx.lineTo(85,85); break;
    case 7: ctx.moveTo(10,35); ctx.lineTo(90,35); ctx.moveTo(10,65); ctx.lineTo(90,65); break;
    case 8: ctx.moveTo(50,15); ctx.lineTo(85,50); ctx.lineTo(50,85); ctx.lineTo(15,50); ctx.closePath(); break;
    default: ctx.moveTo(10,50); ctx.lineTo(90,50);
  }
  ctx.stroke();

  // Timestamp bottom-right
  var rnd=Math.floor(Math.random()*100).toString().padStart(2,'0');
  ctx.fillStyle='rgba(0,255,65,0.35)';
  ctx.font='7px monospace';
  ctx.fillText('09:'+String(ci).padStart(2,'0')+':'+rnd,w-43,h-4);
}

function makeWave(canvas,type){
  canvas.width=80; canvas.height=40;
  var ctx=canvas.getContext('2d');
  ctx.fillStyle='#010a03'; ctx.fillRect(0,0,80,40);
  ctx.strokeStyle='#00aa2a'; ctx.lineWidth=1.5;
  ctx.beginPath();
  if(type==='heartbeat'){
    var pts=[[0,20],[8,20],[12,3],[16,36],[20,20],[30,20],[34,3],[38,36],[42,20],[55,20],[59,3],[63,36],[67,20],[80,20]];
    ctx.moveTo(pts[0][0],pts[0][1]);
    for(var p=1;p<pts.length;p++) ctx.lineTo(pts[p][0],pts[p][1]);
    ctx.strokeStyle='#00ff41';
  } else if(type==='sine'){
    ctx.moveTo(0,20);
    for(var x=0;x<80;x++) ctx.lineTo(x,20+Math.sin(x*0.2)*13);
  } else {
    ctx.moveTo(0,20);
    for(var x=0;x<80;x++) ctx.lineTo(x,20+(Math.random()*18-9));
  }
  ctx.stroke();
  var labels={heartbeat:'CARDIAC',sine:'AMBIENT',noise:'UNKNOWN',static:'STATIC'};
  ctx.fillStyle='#00aa2a'; ctx.font='6px monospace';
  ctx.fillText(labels[type]||'SIG',3,38);
}
