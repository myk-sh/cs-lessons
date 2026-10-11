// Rebuild: node ai.js deck OUTPUT; render slides; node ai.js documents OUTPUT IMAGES.
const fs=require('fs'), path=require('path');
const L=require('../../skills/comp-sci-lesson-maker/scripts/lib.js');
const w=require('../../skills/comp-sci-lesson-maker/scripts/wslib.js');
const d=require('docx');
const Q=require('./ai-exam-questions.json');
const photos=require('./assets/ai/photos/credits.json');
const output=path.resolve(process.argv[3]||'0478 P1/Artificial Intelligence');
fs.mkdirSync(output,{recursive:true});
const file=n=>path.join(output,n);
const subtitle='IGCSE Computer Science 0478 | 6.3 Artificial intelligence';
const source='Exam-led revision: 21 Paper 1 papers and their published Cambridge mark schemes (2023–2025); 29 AI parts audited. Practice questions are adapted/paraphrased from the cited papers; official mark allocations retained. Model answers and teaching commentary are our own.';
const pres=L.newDeck('Artificial intelligence — exam-ready');
let n=0;
const ids={};
function text(s,t,x,y,ww,hh,size=20,o={}) {L.text(s,t,{x,y,w:ww,h:hh,fontSize:size,...o});}
function panel(s,x,y,ww,hh,color=L.C.band) {s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x,y,w:ww,h:hh,fill:{color},line:{color,width:0},rectRadius:.12});}
function arrow(s,a,b,c,e) {L.arrow(pres,s,a,b,c,e);}
function slide(id,title,pill,notes='',refs=[]) {
 const s=L.base(pres,title,pill,++n,notes+'\n'+source+'\n'+refs.map(q=>q.citation+'\nQP: '+q.questionUrl+'\nMS: '+q.markSchemeUrl).join('\n'));
 ids[id]=n;
 if(refs.length)text(s,refs.map(q=>q.citation).join(' · '),.75,6.97,10.95,.25,10,{color:L.C.grey});
 return s;
}
function note(s,t) {text(s,t,.75,6.25,11.7,.55,17,{bold:true,color:L.C.navy});}
function points(s,rows,x=.85,y=1.7,ww=11.6,step=.86,size=21) {
 rows.forEach((row,i)=>{
  panel(s,x,y+i*step,ww,step-.1);text(s,String(i+1),x+.14,y+i*step+.17,.4,.4,17,{bold:true,color:L.C.navy});text(s,row,x+.7,y+i*step+.13,ww-.95,step-.2,size);
 });
}
function photo(s,id,x,y,ww,hh) {
 const p=photos.find(p=>p.id===id),ratio=p.width/p.height;
 const width=Math.min(ww,hh*ratio),height=width/ratio;
 panel(s,x-.06,y-.06,ww+.12,hh+.12,'F2F2F4');
 s.addImage({path:path.join(__dirname,'assets/ai/photos',id+'.jpg'),x:x+(ww-width)/2,y:y+(hh-height)/2,w:width,h:height,altText:p.title.replaceAll('_',' ')});
 text(s,p.author+' · '+p.license,x,y+hh+.1,ww,.36,10,{color:L.C.grey});
 s.addNotes('Photograph: '+p.title+'\nAuthor: '+p.author+'\nSource: '+p.source+'\nLicence: '+p.licenseUrl+'\n'+p.changes+'\nThe photographed hardware illustrates the exam scenario; the lesson does not certify the pictured product has the hypothetical capabilities described.');
}
function table(s,rows,widths,y=1.65,size=18,height=.83) {L.table(s,rows,{x:.75,y,w:11.8,colW:widths,fontSize:size,rowH:height});}
function question(id) {return Q.find(q=>q.id===id);}
function promptSlide(id,title,qs,notes) {
 const s=slide(id,title,'Try independently',notes,qs);
 qs.forEach((q,i)=>{panel(s,.8,1.65+i*1.7,11.65,1.45);text(s,q.prompt,.98,1.85+i*1.7,10.7,1.05,22);text(s,'['+q.marks+']',11.35,2.6+i*1.7,.8,.4,18,{bold:true,color:L.C.navy});});
 note(s,'Write first. Then underline one distinct idea for each mark you are claiming.');
 return s;
}
function feedback(id,title,q,rows,trap) {
 const s=slide(id,title,'Check after practice','Show only after the matching question has been attempted. Accepted ideas paraphrased from the published scheme; not every alternative is needed. '+q.trap,[q]);
 points(s,rows,.85,1.7,11.6,rows.length>4?.82:1.0,20);
 note(s,trap||q.trap);
 return s;
}
async function deck() {
 let s=pres.addSlide();n++;ids.cover=n;s.background={color:'FFFFFF'};
 s.addShape(pres.shapes.RECTANGLE,{x:8.6,y:0,w:4.73,h:7.5,fill:{color:L.C.yellow},line:{color:L.C.yellow}});
 text(s,'Artificial\nintelligence',.75,2.05,7.3,1.8,48,{bold:true});
 text(s,'IGCSE 0478 · Paper 1 · 6.3',.78,4.22,7.1,.5,22,{color:L.C.grey});
 text(s,'From real systems to creditworthy answers',.78,5.12,7.2,.95,25,{bold:true,color:L.C.navy});
 photo(s,'speaker',8.95,1.1,3.9,4.65);text(s,'How does it learn your voice?',8.93,6.25,3.95,.75,23,{bold:true,color:L.C.navy,align:'center'});
 s.addNotes(source+'\nCore lesson: 60 minutes using selected questions. Full practice pack: roughly two periods plus feedback. Tasks 2–6 have verified official allocations. Task 1 is original robotics recall with suggested marks. Do not attempt all 75 marks in one hour.');
 s=slide('recall','Recall: robotics','Starter · 6 min','Use Task 1, preferably (a),(b),(d) if short of time. Re-teach mechanical/electrical/programmed characteristics or the sensor–processor–actuator chain before AI.');
 photo(s,'factory',.8,1.7,6.4,4.05);
 points(s,['Three robot characteristics','Sensor → processor → actuator','A safety decision at 1 metre'],7.6,1.9,4.7,1.1,20);
 note(s,'Closed book first. A robot repeating stored instructions need not use AI.');
 s=slide('roadmap','What the papers actually ask','Exam roadmap','21 QPs and 21 published schemes checked; 18 papers with AI and 29 AI parts. All observed families covered, not a guarantee of future questions.');
 table(s,[['Question family','Your answer must show'],['Define / identify characteristics','Distinct features; obey “other” and the given information.'],['Components / roles / cloze','Name accurately; distinguish facts, rules and applying them.'],['Explain expert-system operation','Questions → evidence → rule application → diagnosis.'],['Explain learning in a scenario','Specific data → patterns/results → changed future action.'],['Transfer to a new application','Weather, voice, search, routes or game behaviour.']],[4.6,7.2],1.65,18,.70);
 note(s,'Tasks 2–6 adapt 20 real past-paper parts. Use Task 6 as follow-up practice.');
 s=slide('meaning','AI: what earns a definition mark?','Learn · Task 2','The simulation phrase is ONE accepted idea, not two arbitrary marks. 2025 Q6(a) needs any three distinct features; 2024 Q10(a) needs any two. These are general feature points, not a promise that every AI system continuously learns.',[question('definition')]);
 photo(s,'factory',.8,1.7,5.2,3.8);
 points(s,['Simulates intelligent behaviour','Uses data and rules','Can reason / make decisions','Can learn or adapt'],6.5,1.7,5.8,.97,20);
 note(s,'“It is smart” is vague. Connect the word AI to a feature you can describe.');
 s=slide('features','When the question says “OTHER”','Exam reading','Attempt Task 2. In 2025 March Q6(a), learning is given and cannot be reused. Accept collection of data, rules, reasoning, adaptation. This mark scheme separates data from rules.',[question('features')]);
 panel(s,.85,1.7,11.6,.9,'FFF4C7');text(s,'Given feature: learning. You must supply three OTHER features.',1.1,1.94,11.0,.55,23,{bold:true});
 points(s,['Read which feature has already been supplied.','Cross it out in your mental list.','Write three different remaining features.'],.85,2.9,11.6,.95,23);
 note(s,'Now attempt Task 2: definition, characteristics and recognising machine learning.');
 feedback('definition-check','A three-mark answer: three ideas',question('definition'),[
 'Computers simulate intelligent behaviour.  → one idea',
 'They use data and rules for that data.  → another idea',
 'They can learn from experience.  → a third idea'
 ],'“Computer” + “intelligent” is not automatically two marks. Check the actual mark scheme.');
 s=slide('expert','Expertise for a specific problem','Learn · Task 3','A rule-based expert system models expert decision-making in a restricted domain. Use the garage photo as a representative scenario, not evidence that the photographed garage uses AI.');
 photo(s,'garage',.8,1.7,6.5,4.05);
 text(s,'A car’s brakes are faulty.',7.7,1.95,4.7,.85,29,{bold:true,color:L.C.navy});
 text(s,'What would a mechanic ask?\nWhat facts would they need?\nWhat rules connect them?',7.7,3.2,4.7,2.2,23);
 note(s,'An expert system captures expertise in a domain; it does not “know everything”.');
 s=slide('components','Four core components','Learn · Task 3','Teach all four. “Interface” accepted; “rule base” and “rules base” synonymous. The inference engine both selects questions and draws conclusions.',[question('components3'),question('components2')]);
 [['Interface','Input answers; display questions and advice',.8,2.65,3.0,2.05],['Inference engine','Choose questions; apply rules; decide',4.7,2.65,3.65,2.05],['Knowledge base','Stores expert facts',9.1,1.6,3.3,1.75],['Rule base','Stores IF–THEN rules',9.1,4.2,3.3,1.75]].forEach(([a,b,x,y,ww,hh])=>{panel(s,x,y,ww,hh);text(s,a,x+.17,y+.2,ww-.34,.65,22,{bold:true,color:L.C.navy});text(s,b,x+.17,y+1,ww-.34,hh-1.05,19);});
 arrow(s,3.85,3.15,4.6,3.15);arrow(s,4.6,4.2,3.85,4.2);arrow(s,9.05,2.75,8.4,3.25);arrow(s,9.05,4.85,8.4,4.2);
 note(s,'Facts ≠ rules ≠ the component that applies rules.');
 s=slide('roles','Facts, rules and the engine','Learn · Task 3','General printer example to teach roles before the different garage cloze. Naming a database without the role misses the actual term.');
 table(s,[['Component','Printer-fault example'],['Knowledge base','Stores facts about printer faults and symptoms.'],['Rule base','IF powered on AND tray empty THEN recommend loading paper.'],['Inference engine','Matches the answers to facts/rules and selects advice.'],['Interface','Asks about the tray and displays the recommendation.']],[3.5,8.3],1.75,19,.88);
 note(s,'For “identify”, give the name. For “describe”, explain the job.');
 promptSlide('component-practice','Names are not the same as roles',[question('engine'),question('rules')],'Do Task 3 independently. The full task adds component identification and a cloze with distractors.');
 feedback('role-check','How a two-mark role answer works',question('engine'),[
 'It applies the stored rules to facts in the knowledge base.  → mechanism',
 'It produces a diagnosis / decision from that evidence.  → result'
 ],'Maximum 2: mechanism + result. Splitting one accepted idea into phrases adds no marks.');
 s=slide('questioning','The next question depends on the answer','Expert-system process','Teach missing adaptive-questioning detail from 2024 Q10(b) and 2025 Q5(a). This is rule-based question selection, not automatically machine learning.',[question('garage'),question('hospital')]);
 photo(s,'garage',.8,1.7,4.85,3.8);
 panel(s,6.05,1.7,6.25,1.0);text(s,'Question: does the brake pedal feel soft?',6.25,1.95,5.85,.55,22,{bold:true});
 text(s,'YES',6.2,3.1,2.6,.5,21,{bold:true,color:L.C.navy});text(s,'NO',9.65,3.1,2.6,.5,21,{bold:true,color:L.C.navy});
 arrow(s,8.2,2.85,7.2,3.85);arrow(s,8.2,2.85,10.65,3.85);
 panel(s,6.1,4.0,2.8,1.4);panel(s,9.6,4.0,2.8,1.4);
 text(s,'Ask about fluid\nand leaks.',6.28,4.25,2.44,.9,20);text(s,'Ask about noise\nand vibration.',9.78,4.25,2.44,.9,20);
 note(s,'The inference engine chooses follow-up questions using previous answers. Simplified example.');
 s=slide('workflow','Turn a process into a five-mark answer','Answer structure','Teaching model uses a printer, not the worksheet braking-fault example. In the garage question any five scheme points earn full credit; there is no compulsory five-step wording.',[question('garage')]);
 points(s,['User enters printer symptoms through the interface.','Inference engine chooses questions from previous answers.','It compares evidence with facts in the knowledge base.','It applies rules to decide a likely printer fault.','The interface displays the diagnosis / advice.'],.85,1.65,11.6,.86,21);
 note(s,'Optional extra: an explanation system shows how the diagnosis was reached.');
 promptSlide('expert-practice','Full workflow or processing only?',[question('garage'),question('hospital')],'Do Task 4. Underline what the question has already supplied. Mark the second answer for deciding the diagnosis, not for re-describing input/output.');
 feedback('expert-check','Do not spend marks on given information',question('hospital'),[
 'The inference engine is used to decide the diagnosis.',
 'It chooses follow-up questions from earlier symptom answers.',
 'It matches symptoms to the knowledge base and applies rules.'
 ],'The question already gives input and output. Explain the processing in between.');
 s=slide('ml','Machine learning: more than “it learns”','Learn · Task 5','2023 Q10(b) is a four-mark capability question. Teach AI subset, training, pattern analysis, data/process adaptation, feedback. In actual systems learning may occur in training/retraining; do not imply every prediction automatically retrains.',[question('ml4')]);
 photo(s,'speaker',.8,1.7,4.5,3.85);
 points(s,['A form of artificial intelligence','Trained using examples / experience','Can automatically adapt its own processes','Can change its own data'],5.9,1.7,6.4,.97,20);
 note(s,'Conventional expert rules can be fixed; a system can also combine expert rules with ML.');
 s=slide('learning-loop','The learning-and-improvement loop','Learn · Task 5','Core general mechanism. The scheme often accepts data collection, pattern analysis, successful/unsuccessful results, feedback and automatic process changes. Training/test separation is a useful check, not the only type of learning.');
 [['DATA','Past examples / experience'],['PATTERNS','Find relationships'],['DECISION','Predict or choose'],['FEEDBACK','Check success / failure']].forEach(([a,b],i)=>{const x=.8+i*3.02;panel(s,x,2,2.72,2.55);text(s,a,x+.15,2.3,2.42,.55,23,{bold:true,color:L.C.navy,align:'center'});text(s,b,x+.2,3.2,2.32,.95,21,{align:'center'});if(i<3)arrow(s,x+2.76,3.05,x+2.98,3.05);});
 arrow(s,11.4,4.8,11.4,5.6);arrow(s,11.4,5.6,2,5.6);arrow(s,2,5.6,2,4.8);
 text(s,'Feedback → update data / processes → improve later decisions',2.5,5.13,8.5,.45,18,{bold:true,color:L.C.navy,align:'center'});
 note(s,'Explain what changes in THIS scenario. “It gets better” alone is too vague.');
 s=slide('training','Training and testing: keep them separate','Learning detail','2023 Q10(b) accepts trained/supervised/unsupervised alternatives; define briefly without requiring university ML detail. Separate test data checks performance on unseen examples.');
 table(s,[['Method / stage','What happens'],['Supervised training','Examples include the desired output (e.g. voice → intended command).'],['Unsupervised training','Input is supplied; the system discovers patterns without supplied output labels.'],['Held-out testing','Use examples kept out of training; compare predictions with known outcomes.'],['Improvement','Use appropriate feedback; update and evaluate again.']],[3.6,8.2],1.65,18,.91);
 note(s,'These are alternatives or supporting checks—not a required list for every AI question.');
 s=slide('navigation','Learning routes: make the change explicit','Learn · Task 5','Use a different worked delivery-route example from the worksheet vacuum/maze. Mechanism transfers to March 2023 maze and November 2024 plough.',[question('vacuum'),question('maze')]);
 photo(s,'vacuum',.8,1.7,5.55,3.75);
 points(s,['Collect obstacle and route data.','Record which actions failed or succeeded.','Use patterns to change the next route.'],6.85,1.9,5.55,1.1,21);
 note(s,'A sensor reading explains detection. Remembering and changing later behaviour explains learning.');
 s=slide('maze-model','From remembered failure to a new route','Visual trace','Teaching example: fixed map is simplified; AI can store unsuccessful/successful actions and use experience to avoid mistakes later. This is a mechanism illustration, not a full ML implementation.');
 const x=.9,y=1.7,c=.62;
 for(let row=0;row<6;row++)for(let col=0;col<7;col++){s.addShape(pres.shapes.RECTANGLE,{x:x+col*c,y:y+row*c,w:c,h:c,fill:{color:'FFFFFF'},line:{color:'DDDBEA',width:1}});}
 [[1,1],[1,2],[1,4],[2,4],[3,2],[3,3],[4,2],[4,5]].forEach(([r,col])=>s.addShape(pres.shapes.RECTANGLE,{x:x+col*c,y:y+r*c,w:c,h:c,fill:{color:L.C.navy},line:{color:L.C.navy}}));
 text(s,'START',.9,5.6,1.8,.4,16,{bold:true,color:L.C.navy});text(s,'GOAL',4.1,5.6,1.5,.4,16,{bold:true,color:L.C.navy});
 arrow(s,1.2,4.9,1.2,3.25);arrow(s,1.2,3.25,3.32,3.25);
 L.arrow(pres,s,1.2,4.95,4.95,4.95,L.C.green,3);
 text(s,'×',3.18,3.0,.55,.6,32,{bold:true,color:L.C.red});
 points(s,['Attempt A ends at an obstacle.','Store the unsuccessful action.','Try a different route next time.','Reuse a successful route when suitable.'],6.0,1.75,6.3,.97,20);
 note(s,'Collect → store success/failure → find patterns → alter the next action.');
 promptSlide('ml-practice','Apply the mechanism, not a slogan',[question('vacuum'),question('maze')],'Do Task 5: first the general four-mark capabilities question, then apply the mechanism to vacuum and maze. Treat each distinct linked idea as potential credit.');
 feedback('ml-check','A three-mark vacuum answer',question('vacuum'),[
 'Collects data about obstacle locations while cleaning.',
 'Uses this data to adapt its own route-planning process.',
 'Avoids known obstacles on later cleaning runs.'
 ],'A sensing-and-motor description alone misses the learning between runs.');
 s=slide('transfer','One mechanism, many exam scenarios','Task 6 · follow-up','Set Task 6 before showing worked-answer slides 25–29. For a second lesson, attempt the full bank then show feedback. Booklet omits matching answer slides.');
 photo(s,'weather',.8,1.7,3.1,3.45);photo(s,'speaker',4.5,1.7,3.1,3.45);photo(s,'vacuum',8.2,1.7,4.15,3.45);
 text(s,'Predict weather',.8,5.6,3.1,.5,22,{bold:true,color:L.C.navy,align:'center'});text(s,'Recognise speech',4.5,5.6,3.1,.5,22,{bold:true,color:L.C.navy,align:'center'});text(s,'Choose a route',8.2,5.6,4.15,.5,22,{bold:true,color:L.C.navy,align:'center'});
 note(s,'Always name the data, the pattern / feedback, and the changed prediction or action.');
 s=slide('voice-prompt','A smart speaker: four marks of explanation','Task 6(c)','Attempt Task 6(c) independently. Photo shows representative hardware. Correct answer must explain improving recognition, not simply microphone input.',[question('voice')]);
 photo(s,'speaker',.8,1.7,4.6,3.85);
 text(s,question('voice').prompt+' [4]',6,1.95,6.2,1.55,28,{bold:true,color:L.C.navy});
 text(s,'“The microphone records sound.”\nWhy is this not yet a learning answer?',6,4.1,6.2,1.35,24);
 note(s,'What data would it collect? What could it learn? What could change next time?');
 feedback('search-check','Search results: feedback matters',question('search'),[
 'Record that a result was unsuitable / unhelpful.',
 'Use this feedback to change its data or ranking rules.',
 'Return more relevant results in a later search.'
 ],'Keyword matching alone does not explain machine learning. Show after Task 6(a).');
 s=slide('weather-check','Weather: patterns become predictions','Check after Task 6','Show after Task 6(b). Official scheme accepts patterns/predictions/feedback and seasonal examples. Photo shows a NOAA station; the hypothetical exam ML capability is not asserted for that station.',[question('weather')]);
 photo(s,'weather',.8,1.7,4.3,3.85);
 points(s,['Analyse historical weather for patterns.','Use those patterns to predict future weather.','Use feedback to revise later predictions.'],5.7,1.8,6.6,1.15,21);
 note(s,'“The temperature sensor collects readings” is only a starting point. Explain their use.');
 s=slide('voice-check','Voice input: explain the improvement','Check after Task 6','Show after Task 6(c). Any four accepted points; this is a model route, not the only answer. Accept accents, alternatives, noise or recognition when linked to learning.',[question('voice')]);
 photo(s,'speaker',.8,1.7,4.3,3.85);
 points(s,['Gather samples of the user’s voice.','Identify pronunciation / accent patterns.','Record successful and failed commands.','Adapt processes to recognise later commands.'],5.7,1.75,6.6,.97,20);
 note(s,'Alternative credit: learn different phrasing, voices or background-noise patterns.');
 feedback('game-check','Game characters: respond to the player',question('game'),[
 'Collect data about the player’s actions.',
 'Find patterns and predict the player’s next movement.',
 'Adapt the character’s response using that prediction.'
 ],'Better graphics ≠ better AI. Show after Task 6(d).');
 feedback('delivery-check','“Give three ways”: keep them distinct',question('delivery'),[
 'Learn a route to a customer’s house.',
 'Learn where obstacles occur on that route.',
 'Reason which areas are paths rather than roads.'
 ],'Three repetitions of “learn the route” are not three different ways. Show after Task 6(e).');
 s=slide('pitfalls','What weak answers leave out','Self-check','Use after independent practice. Answers should be relevant, distinct and sufficient for the mark ceiling. Models do not replace accepted alternatives.');
 table(s,[['Weak answer','Repair it'],['“AI is smart.”','State a recognised feature and what it means.'],['“The database diagnoses it.”','Name the inference engine and how it uses facts/rules.'],['“The robot uses sensors.”','Add recorded experience and changed future behaviour.'],['“It learns and gets better.”','Name the data, pattern/feedback and specific improvement.'],['“It has AI, so it always learns.”','Fixed-rule expertise and learning can be separate or combined.']],[4.9,6.9],1.65,18,.70);
 note(s,'Check the command word, the marks, the given information and the application.');
 s=slide('exit','Exit: can you transfer the explanation?','Plenary · 3 min','Suggested diagnostic answers in notes: KB facts, RB rules; engine selects questions/applies rules; ML collects labelled object images, learns patterns, predicts classes, uses feedback to improve. These original exit questions have no claimed official marks.');
 points(s,['Facts, rules, applying rules: name the three components.','Why might input/output be irrelevant in a diagnosis question?','A recycling camera misclassifies waste. Explain how learning could improve later classifications.'],.85,1.85,11.6,1.3,24);
 note(s,'If you can explain a new example without “it is smart”, you can transfer the mechanism.');
 s=slide('credits','Photographs and source credits','References','Five actual photographs, from Wikimedia Commons. No AI-generated photographs are used. Photos are resized/recompressed only; no subject alterations. Source and licence links follow; full credit manifest is in the repo.');
 photos.forEach((p,i)=>{
 const y=1.5+i*.91;text(s,p.id.toUpperCase()+' · '+p.author+' · '+p.license,.85,y,11.6,.35,17,{bold:true,color:L.C.navy});
 text(s,p.source,.85,y+.36,11.6,.28,10,{color:L.C.grey,hyperlink:{url:p.source}});
 text(s,p.licenseUrl,.85,y+.65,11.6,.22,9,{color:L.C.grey,hyperlink:{url:p.licenseUrl}});
 });
 text(s,'Resized / JPEG recompressed. See AI_Exam_Coverage.md for the complete QP/MS audit.',.85,6.25,11.4,.5,14,{color:L.C.grey});
 s=slide('sources','Exam sources: use the exact marking scope','References','Teaching based on the supplied Hodder pp.241–249 and published Cambridge schemes. QPs and MS PDFs were downloaded from PapaCambridge and checked; links in notes and coverage audit. No neural-network internals required.');
 table(s,[['Source','Why it matters'],['2023–2025: all 21 Paper 1 papers','29 relevant parts across 18 papers; 20 selected for practice.'],['Cambridge published mark schemes','Exact allocations, accepted alternatives and mark ceilings.'],['Teacher-supplied Hodder extract','Definitions and conceptual background, printed pp. 241–249.'],['Scope','Core 6.3 AI / expert systems / machine learning; robotics recall from 6.2.']],[4.8,7],1.65,18,.9);
 note(s,'Core lesson + follow-up bank. Use the separate teacher key to mark each part.');
 await pres.writeFile({fileName:file('IGCSE_0478_Lesson_-_Artificial_Intelligence.pptx')});
 fs.writeFileSync(file('slide-map.json'),JSON.stringify(ids,null,2));
}
function answerLines(count) {
 return Array.from({length:count},(_,i)=>new d.Paragraph({keepNext:i<count-1,spacing:{before:150,after:i===count-1?80:0},tabStops:[{type:d.TabStopType.RIGHT,position:w.W,leader:'underscore'}],children:[new d.TextRun({text:'\t',color:w.COL.line,size:21})]}));
}
const add=(K,...xs)=>xs.flat(Infinity).forEach(x=>K.push(x));
const titleOf={1:'Recall: robotics (6.2)',2:'AI definitions and recognition',3:'Expert-system components and roles',4:'Explain a diagnosis',5:'Machine learning and navigation',6:'Transfer bank: five real contexts'};
const letterOf=q=>'('+String.fromCharCode(97+Q.filter(x=>x.group===q.group).indexOf(q))+')';
function task1(page=false) {return [w.H('Task 1   '+titleOf[1],'[15 suggested marks]',{pageBreak:page}),w.I('Original retrieval practice. Closed book; choose (a), (b) and (d) if time is short.'),w.P('(a) State three characteristics of a robot. [3]',{keepNext:true}),answerLines(3),w.P('(b) Complete the chain: a __________ detects distance; the __________ compares the reading with a threshold; an __________ moves or stops the mechanism. [3]',{keepNext:true}),answerLines(1),w.P('(c) Explain one benefit to workers and one drawback to the owner of robots lifting heavy boxes in a factory. [4]',{keepNext:true}),answerLines(3),w.P('(d) Explain how a distance sensor, microprocessor and motor make a delivery robot stop when a person is within 1 metre. [4]',{keepNext:true}),answerLines(3),w.P('(e) State what autonomous means for a robot. [1]',{keepNext:true}),answerLines(1)];}
function task(K,group,page=true) {
 const qs=Q.filter(q=>q.group===group),total=qs.reduce((v,q)=>v+q.marks,0);
 add(K,w.H('Task '+group+'   '+titleOf[group],'['+total+' marks]',{pageBreak:page}));
 if(group===6)add(K,w.I('Follow-up / revision bank. Do independently before the worked-answer slides.'));
 add(K,w.I('Questions are paraphrased from the cited past papers. Published Cambridge mark allocations retained.'));
 qs.forEach(q=>{
  if(group===6 && q.id==='voice')add(K,w.H('Task 6   Transfer bank (continued)','',{pageBreak:true}));
  add(K,w.P(letterOf(q)+' '+q.prompt+' ['+q.marks+']',{before:140,keepNext:true}),w.P([[q.citation,{italics:true,color:w.COL.grey,size:18}]],{after:90,keepNext:true}));
  if(q.id==='cloze')add(K,w.P('Word bank: knowledge base, inference engine, rule base, interface, machine learning, mechanical engine, output device, question base.',{keepNext:true}),w.P('An expert system stores its facts in A: __________________. B: __________________ applies C: __________________ to D: __________________ to reach a diagnosis. The user enters evidence through E: __________________.'));
  else add(K,answerLines(q.lines));
 });
}
function newPage(title){return new d.Paragraph({pageBreakBefore:true,keepNext:true,spacing:{before:0,after:140},shading:{type:d.ShadingType.CLEAR,fill:'FFF4C7',color:'auto'},border:{left:{style:d.BorderStyle.SINGLE,size:24,space:6,color:'FFD84D'}},children:[new d.TextRun({text:title,bold:true,color:w.COL.navy,size:26})]});}
function image(images,id,caption,width=690){
 const num=ids[id];if(!num)throw Error('Missing slide '+id);
 return [new d.Paragraph({keepNext:true,alignment:d.AlignmentType.CENTER,spacing:{after:60},children:[new d.ImageRun({type:'jpg',data:fs.readFileSync(path.join(images,`s-${String(num).padStart(2,'0')}.jpg`)),transformation:{width,height:Math.round(width*7.5/13.333)}})]}),w.P([[`Slide ${num} — ${caption}`,{italics:true,color:w.COL.grey,size:18}]],{after:160})];
}
function creditsDoc(K){
 add(K,newPage('Sources and photograph credits'),w.P(source),w.P('Photographs illustrate representative hardware and settings. No claim is made that a pictured product implements the hypothetical exam capability. Images resized/recompressed only; no subject alterations.'));
 photos.forEach(p=>add(K,w.H2(p.id+' — '+p.author+' — '+p.license),w.P(p.source,{run:{size:17}}),w.P(p.licenseUrl,{run:{size:17}})));
 add(K,w.P('Complete audit: 0478 P1/Artificial Intelligence/AI_Exam_Coverage.md in the source repository.'));
}
async function documents(images){
 let K=[];
 add(K,w.title('Artificial intelligence — practice',subtitle+' | Student worksheet'),w.P('Core lesson plus follow-up revision: 15 suggested robotics marks + 60 verified past-paper marks. Do not attempt the entire pack in one hour.'),w.I('No answers here. Use precise component names and scenario details.'));
 add(K,task1());for(let group=2;group<=6;group++)task(K,group);
 await w.build(K,file('Artificial_Intelligence_Worksheet.docx'));
 K=[];add(K,w.title('Artificial intelligence — key',subtitle+' | Teacher copy',{noName:true}),w.keyBanner('Covers worksheet and booklet. Tasks 2–6 use published Cambridge allocations; questions/points are paraphrased.'),w.P(source),w.P('60-minute core route: 6 min recall (Task 1 selected parts); 8 min AI/Task 2; 12 min components (Task 3 selected parts); 14 min diagnosis/Task 4; 16 min ML/navigation (Task 5 selected parts); 4 min exit. Use remaining questions and Task 6 for a second lesson or homework with feedback.'),w.P('All seven observed question families across the 29 audited parts are taught. This does not guarantee every future question. Keep accepted alternatives in view; “any N” means a ceiling, not a compulsory list of N sentences.'));
 add(K,w.H('Task 1   Robotics recall','[15 suggested marks]'),w.marking('Original retrieval answers — suggested allocations',[
 ['3','(a) Mechanical structure; electrical components; programmable. One each.'],['3','(b) Sensor; microprocessor; actuator. One each.'],['4','(c) Less heavy lifting → fewer injuries/less strain (2). Purchase/maintenance costs → significant investment/reduced profit (2). Accept other properly applied pairs.'],['4','(d) Sensor measures distance; sends readings to processor; compares with 1 m threshold; processor signals motor to stop at/below the threshold. One each.'],['1','(e) Operates without human intervention.']]),w.I('Re-teach robot characteristics below 2/3 for (a), or the control chain below 2/4 for (d).'));
 for(let group=2;group<=6;group++){
  add(K,w.H('Task '+group+'   '+titleOf[group],'['+Q.filter(q=>q.group===group).reduce((v,q)=>v+q.marks,0)+' marks]',{pageBreak:true}));
  Q.filter(q=>q.group===group).forEach(q=>{
   add(K,w.H2(letterOf(q)+' '+q.citation+' ['+q.marks+']'),w.P('Mark scheme: '+q.markSchemeUrl,{keepNext:true,run:{size:16,color:w.COL.grey}}),w.P(q.prompt,{keepNext:true}));
   if(q.model)add(K,w.A('Model answer: '+q.model,{keepNext:true}));
   if(q.trap)add(K,w.P([['Watch for: '+q.trap,{italics:true,color:w.COL.grey,size:19}]],{keepNext:true,after:90}));
   add(K,w.marking('Published MS: '+(q.id==='cloze'?'one per blank':(['components3','components2','select','branch','recognise'].includes(q.id)?'one per required answer':'any '+q.marks+' distinct accepted point'+(q.marks>1?'s':'')))+'; maximum '+q.marks,q.points.map(p=>['1',p])).slice(0,-1));
  });
 }
 add(K,newPage('Marking distinctions and coverage'),w.P('2024 May/June 12 Q10(a): intelligent-behaviour simulation is one feature; another distinct feature supplies the second mark. 2025 Oct/Nov 13 Q6(a) asks for any three features. Do not award isolated words as arbitrary points.'),w.P('2025 May/June 12 Q5(a): input/output are already supplied. Credit processing: engine, question selection based on previous input, facts/rules and diagnosis.'),w.P('The explanation system is an accepted supporting point in 2024 May/June 12 Q10(b), but the four core components remain interface, knowledge base, rule base and inference engine.'),w.P('Some papers explicitly give expert systems ML capabilities. A fixed-rule expert system and ML are not mutually exclusive. The 2023 ML scheme accepts supervised/unsupervised alternatives; neural-network internals are not needed.'),w.P('Complete source audit and unselected paper parts: AI_Exam_Coverage.md. Source PDFs were checked in the research workspace and are not republished.'));
 creditsDoc(K);await w.build(K,file('Artificial_Intelligence_Answer_Key.docx'));
 if(!images)throw Error('Supply rendered slides');
 Object.assign(ids,JSON.parse(fs.readFileSync(file('slide-map.json'))));
 K=[];add(K,w.title('Artificial intelligence',subtitle+' | Student booklet'),w.P('Use the Learn sections, then answer the matching tasks. Questions match the worksheet exactly. Do Task 1 before turning the page. Core lesson plus follow-up practice; do not complete all 75 marks in one hour.'),task1());
 add(K,newPage('Learn   AI definitions and characteristics'),image(images,'meaning','What makes a creditworthy definition?'),image(images,'features','Read which feature has already been given'));
 task(K,2);
 add(K,newPage('Learn   Expert-system components'),image(images,'expert','A domain-specific fault adviser'),image(images,'components','The four core components'));
 add(K,newPage('Learn   Facts, rules and roles'),image(images,'roles','A printer worked example'));
 task(K,3);
 add(K,newPage('Learn   Explain an expert-system process'),image(images,'questioning','Questions depend on previous answers'),image(images,'workflow','Different worked example: a printer diagnosis'));
 task(K,4);
 add(K,newPage('Learn   Machine learning'),image(images,'ml','Training, patterns and automatic adaptation'),image(images,'learning-loop','Use results to improve later decisions'));
 add(K,newPage('Learn   Learning details'),image(images,'training','Training methods and held-out testing'));
 task(K,5);
 add(K,newPage('Learn   Transfer to a new context'),image(images,'transfer','Real contexts: weather, voice and routes'),w.P('For each scenario, identify the relevant data, then explain patterns or feedback and the later change. The matching worked answers are deliberately omitted from this student booklet.'));
 task(K,6);
 add(K,newPage('Review   Can you repair a weak answer?'),image(images,'pitfalls','Avoid vague claims'),w.P('Choose one of your answers. Underline the distinct ideas. Circle the scenario details. Revise any sentence that only says “it gets better”.'),answerLines(5),w.H2('Exit transfer'),w.P('A recycling camera misclassifies waste. Explain how learning could improve later classifications.'),answerLines(5));
 creditsDoc(K);await w.build(K,file('Artificial_Intelligence_Student_Booklet.docx'));
}
(async()=>{if(process.argv[2]==='deck')await deck();else if(process.argv[2]==='documents')await documents(process.argv[4]);else throw Error('Use deck OUTPUT or documents OUTPUT IMAGES');})().catch(e=>{console.error(e);process.exitCode=1;});
