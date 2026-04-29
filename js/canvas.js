function makeNoise(canvas,style){
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
