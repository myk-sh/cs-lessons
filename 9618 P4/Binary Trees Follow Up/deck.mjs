import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const runtime='C:/Users/mykhailo_sh/.cache/codex-runtimes/codex-primary-runtime/dependencies';
const skill='C:/Users/mykhailo_sh/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations';
const {Presentation,PresentationFile}=await import(pathToFileURL(runtime+'/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs').href);
const data=JSON.parse(await fs.readFile(path.join(here,'.build/slides.json'),'utf8'));
const pres=Presentation.create({slideSize:{width:1280,height:720}});
function text(s,str,x,y,w,h,size=28,font='Calibri',color='#25253C',bold=false){
 const q=s.shapes.add({geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
 q.text=str; q.text.style={typeface:font,fontSize:size,color,bold}; return q;
}
for(const [i,d] of data.entries()){
 const s=pres.slides.add(); s.background.fill='#FFFFFF';
 text(s,d.title,65,38,1150,78,42,'Calibri','#494985',true);
 s.shapes.add({geometry:'rect',position:{left:66,top:119,width:130,height:5},fill:'#FFD84D',line:{fill:'none',width:0}});
 const hasRight=d.tree||d.code;
 text(s,d.body,65,155,hasRight?560:1140,d.table?170:450,hasRight?27:28);
 if(d.tree){
  const nodes=d.tree.map(([v,x,y])=>{
   const n=s.shapes.add({geometry:'ellipse',position:{left:670+x*470-60,top:220+y*140,width:120,height:67},fill:'#F0F0F8',line:{fill:'#494985',width:2}});
   n.text=v;n.text.style={typeface:'Calibri',fontSize:26,bold:true,color:'#25253C',alignment:'center',verticalAlignment:'middle'};return n;
  });
  d.tree.forEach((n,j)=>{if(n[3]>=0)s.shapes.connect(nodes[n[3]],nodes[j],{kind:'straight',fromSide:'bottom',toSide:'top',line:{fill:'#77778D',width:2}});});
  text(s,'Node labels: index : data',705,590,500,38,22,'Calibri','#626272');
 }
 if(d.code)text(s,d.code,650,176,575,430,23,'Consolas');
 if(d.table){
  const vals=d.table.map(r=>r.map(String)); const cols=vals[0].length;
  const t=s.tables.add({rows:vals.length,columns:cols,left:65,top:345,width:1150,height:Math.min(265,vals.length*55),values:vals});
  t.borders.assign({fill:'#D9D9E3',width:1,style:'solid'});
  for(let r=0;r<vals.length;r++)for(let c=0;c<cols;c++){
   const cell=t.getCell(r,c);cell.fill=r===0?'#494985':r%2?'#F2F2F8':'#FFFFFF';
   cell.text.style={typeface:'Calibri',fontSize:22,bold:r===0,color:r===0?'#FFFFFF':'#25253C'};
  }
 }
 text(s,d.footer||'Binary trees follow up • 2D array practice',65,660,1100,30,18,'Calibri','#626272');
 text(s,String(i+1),1190,660,40,30,18);
 s.speakerNotes.text=d.notes;
 const png=await pres.export({slide:s,format:'png',scale:1});
 await fs.writeFile(path.join(here,'.build',`slide-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await png.arrayBuffer()));
}
await fs.mkdir(path.join(here,'.build/final'),{recursive:true});
const candidate=path.join(here,'.build/candidate.pptx');
await (await PresentationFile.exportPptx(pres)).save(candidate);
const {finalizePresentation}=await import(pathToFileURL(skill+'/container_tools/artifact_tool_utils.mjs').href);
await finalizePresentation({workspaceDir:here,candidatePath:candidate,finalPath:path.join(here,'.build/final/Y13_9618_Lesson_-_Binary_Trees_Follow_Up.pptx'),pythonExecutable:runtime+'/python/python.exe',integrityValidatorPath:skill+'/container_tools/inspect_presentation_package_integrity.py',layoutValidatorPath:skill+'/container_tools/inspect_presentation_layout_geometry.py',layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit'],fontPolicy:{basis:'design',families:['Calibri','Consolas']},verifyArtifactToolImport:true,receiptPath:path.join(here,'.build/validation.json')});
await fs.copyFile(path.join(here,'.build/final/Y13_9618_Lesson_-_Binary_Trees_Follow_Up.pptx'),path.join(here,'Y13_9618_Lesson_-_Binary_Trees_Follow_Up.pptx'));
console.log('Rendered and exported 20 slides.');


