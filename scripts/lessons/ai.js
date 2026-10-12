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
const source='Teacher research: 21 Paper 1 papers and their published Cambridge mark schemes (2023–2025); 29 AI parts audited. Practice questions are adapted/paraphrased from the cited papers; official mark allocations retained. Model answers and teaching commentary are our own.';
const pres=L.newDeck('Artificial intelligence — understand, apply, answer');
const C={ink:'252341',purple:L.C.navy,muted:'777584',paper:'FAF9F6',line:'DDDBE5',yellow:L.C.yellow};
let n=0;const ids={},usedPhotos=[];
function text(s,t,x,y,ww,hh,size=22,o={}) {L.text(s,t,{x,y,w:ww,h:hh,fontSize:size,color:C.ink,paraSpaceAfter:0,...o});}
function panel(s,x,y,ww,hh,color='EFEEF5') {s.addShape(pres.shapes.RECTANGLE,{x,y,w:ww,h:hh,fill:{color},line:{color,width:0}});}
function rule(s,x,y,ww,color=C.line){s.addShape(pres.shapes.LINE,{x,y,w:ww,h:0,line:{color,width:.7}});}
function arrow(s,a,b,c,e,color=C.purple) {L.arrow(pres,s,a,b,c,e,color,2);}
function slide(id,title,section,notes='',refs=[],dark=false) {
 const s=pres.addSlide();n++;ids[id]=n;s.background={color:dark?C.ink:C.paper};
 text(s,section.toUpperCase(),.65,.33,11.4,.3,11,{bold:true,charSpacing:2,color:dark?'CECBDC':C.purple});
 text(s,title,.65,.9,12.0,.7,32,{bold:true,color:dark?'FFFFFF':C.ink});
 rule(s,.65,6.95,12.0,dark?'66627B':C.line);
 text(s,'IGCSE 0478  /  ARTIFICIAL INTELLIGENCE',.65,7.08,6,.18,8,{color:dark?'CECBDC':C.muted});
 text(s,String(n).padStart(2,'0'),12.05,7.02,.58,.25,11,{color:dark?'FFFFFF':C.muted,align:'right'});
 if(refs.length)text(s,refs.map(q=>q.citation).join(' · '),.65,6.72,11.6,.18,9,{color:C.muted});
 s.addNotes(notes+'\n'+source+'\n'+refs.map(q=>q.citation+'\nQP: '+q.questionUrl+'\nMS: '+q.markSchemeUrl).join('\n'));
 return s;
}
function note(s,t) {text(s,t,.65,6.18,12.0,.42,17,{bold:true,color:C.purple});}
function points(s,rows,x=.8,y=1.95,ww=11.7,step=.9,size=22) {
 rows.forEach((row,i)=>{
  text(s,String(i+1).padStart(2,'0'),x,y+i*step,.5,.4,16,{bold:true,color:C.purple});
  text(s,row,x+.7,y+i*step-.015,ww-.75,step-.12,size);
  if(i<rows.length-1)rule(s,x+.7,y+(i+1)*step-.17,ww-.75);
 });
}
function photo(s,id,x,y,ww,hh,{crop=true,dark=false}={}) {
 if(usedPhotos.includes(id))throw Error('Photograph repeated: '+id);usedPhotos.push(id);
 const p=photos.find(p=>p.id===id);if(!p)throw Error('Missing photograph '+id);
 const opts={path:path.join(__dirname,'assets/ai/photos',id+'.jpg'),x,y,w:ww,h:ww*p.height/p.width,altText:p.title.replaceAll('_',' ')};
 if(crop)opts.sizing={type:'crop',w:ww,h:hh};
 else {opts.w=Math.min(ww,hh*p.width/p.height);opts.h=opts.w*p.height/p.width;opts.x+= (ww-opts.w)/2;opts.y+=(hh-opts.h)/2;}
 s.addImage(opts);
 const bounds=crop?{x,y,w:ww,h:hh}:opts;
 const author={'doctor':'University of Michigan Medical School','assistant':'Maurizio Pesce','weather':'NOAA / US government'}[id]||p.author;
 text(s,author+' · '+p.license,bounds.x,bounds.y+bounds.h+.07,bounds.w,.27,9,{color:dark?'CECBDC':C.muted});
 s.addNotes('Photo: '+p.title+'\nAuthor: '+p.author+'\nSource: '+p.source+'\nLicence: '+p.licenseUrl+'\nResized/recompressed; '+(crop?'aspect-preserving crop in slide placement.':'uncropped aspect-preserving placement.')+' No subject alterations. Representative hardware/settings; hypothetical lesson capabilities are not certified for the pictured products.');
}
function table(s,rows,widths,y=1.9,size=19,height=.8) {L.table(s,rows,{x:.65,y,w:12,colW:widths,fontSize:size,rowH:height});}
function question(id) {return Q.find(q=>q.id===id);}
function promptSlide(id,title,qs,notes) {
 const s=slide(id,title,'Exam practice',notes,qs);
 qs.forEach((q,i)=>{text(s,'QUESTION '+(i+1)+'  /  '+q.marks+' MARK'+(q.marks>1?'S':''),.8,2.0+i*1.78,11.7,.32,12,{bold:true,color:C.purple});text(s,q.prompt,.8,2.48+i*1.78,11.7,1.0,24);if(i<qs.length-1)rule(s,.8,3.5+i*1.78,11.7);});
 note(s,'Attempt independently. Discuss the reasoning before checking the model answer.');return s;
}
function feedback(id,title,q,rows,trap) {
 const s=slide(id,title,'Feedback · after practice','Show only after the matching question has been attempted. These are model routes; retain accepted alternatives in the teacher key. '+q.trap,[q]);
 points(s,rows,.8,2,11.7,rows.length>4?.77:.99,22);note(s,trap||q.trap);return s;
}
async function deck() {
 let s=slide('cover','Artificial intelligence','Explore · understand · apply','Start with the delivery scene. Ask what the robot would need to detect, decide and do. Do not introduce exam command words or mark allocations yet. Core concept lesson 45–50 minutes, selected exam practice 10–15 minutes; full bank is follow-up.',[],true);
 photo(s,'delivery',6.6,1.95,6.05,4.55,{dark:true});
 text(s,'How could a robot\nfind its way here?',.65,2.3,5.45,1.6,35,{bold:true,color:'FFFFFF'});
 text(s,'A changing world.\nA decision to make.',.65,4.42,5.1,1.05,25,{color:'DCD9E9'});
 text(s,'6.3  /  AI · EXPERT SYSTEMS · MACHINE LEARNING',.65,6.24,5.4,.4,11,{color:C.yellow,bold:true});
 s=slide('recall','Start with what you already know','Recall · robotics','Task 1 selected parts (a), (b), (d), 5–6 minutes. A programmed industrial robot need not learn. Recap mechanical/electrical/programmed characteristics and sensor–processor–actuator before new teaching.');
 photo(s,'factory',.65,1.95,7.05,3.95);
 text(s,'What makes it a robot?',8.2,2.05,4.4,.85,28,{bold:true});
 points(s,['What detects the distance?','What makes the decision?','What stops the movement?'],8.2,3.2,4.4,.82,21);
 note(s,'Task 1: closed book first. Then explain the sensor → processor → actuator chain.');
 s=slide('automation','Automatic does not always mean intelligent','Explore · compare','Contrast a hypothetical stored wash cycle with self-driving perception and decision-making. Do not assert the pictured appliance cannot use AI. Ask which situation demands reasoning about changing surroundings.');
 photo(s,'washing',.65,1.9,4.1,3.25,{crop:false});photo(s,'car',5.05,1.9,7.6,3.25,{crop:false});
 text(s,'Repeat a stored wash cycle',.65,5.55,4.1,.45,22,{bold:true,align:'center'});text(s,'Respond to unfamiliar traffic',5.05,5.55,7.6,.45,22,{bold:true,align:'center'});
 note(s,'Both are automated. Which situation needs decisions about changing conditions?');
 s=slide('meaning','What do we mean by AI?','Understand · artificial intelligence','AI simulates intelligent behaviour. Reasoning, learning and adaptation are possible features; not every AI system learns continuously. Chess photograph illustrates human reasoning, not a claim that this photograph contains AI. Ask pupils how a computer opponent could make a choice.');
 photo(s,'chess',.65,1.95,6.15,3.9);
 text(s,'Computers simulate\nintelligent behaviour.',7.35,2.1,5.25,1.3,29,{bold:true});
 text(s,'Use data and rules.\nReason about a decision.\nLearn or adapt where designed to.',7.35,3.8,5.25,1.65,23);
 note(s,'Think: a chess computer has several legal moves. How could it choose between them?');
 s=slide('expert','A specialist, not a know-it-all','Understand · expert systems','Explore expertise before components. A domain-specific expert system uses stored expert facts and rules to offer advice or a diagnosis. Ask pairs to suggest two mechanic questions. No diagnosis claimed from the photograph.');
 photo(s,'garage',.65,1.95,6.85,3.95);
 text(s,'“My brakes feel wrong.”',8.0,2.05,4.55,.85,29,{bold:true});
 text(s,'What would a mechanic ask?\nWhat facts would they use?\nHow would they reach advice?',8.0,3.2,4.55,2.05,23);
 note(s,'An expert system models expert decision-making within a particular domain.');
 const componentSources=[question('engine'),question('rules'),question('cloze'),{citation:'0478/11 Oct/Nov 2024 Q9(a)',questionUrl:'https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0478_w24_qp_11.pdf',markSchemeUrl:'https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/0478_w24_ms_11.pdf'}];
 s=slide('components','Inside an expert system','Understand · four components','Definitions paraphrased from actual questions and published Cambridge schemes. 2023 Nov13 Q10(a): KB contains a list of facts; engine applies rule base to knowledge base to reach diagnosis; user supplies data via interface. 2023 Jun13 Q7(b): rule base stores rules for engine use, links facts in KB. 2023 Jun12 Q9(b): engine makes decisions by applying rules/logic to facts/knowledge to produce result/diagnosis. 2024 Nov11 Q9(a): engine chooses questions linking facts in KB to RB, engine decides diagnosis, interface outputs it. 2024 Jun12 Q10(b) specifies choosing questions using previous answers. See source audit for links. Arrows show functional relationships, not physical networking.',componentSources);
 [['Interface','User enters data here.\nDisplays questions and the diagnosis.',.65,2.65,3.05,2.65],['Inference engine','Applies rules to facts to reach a diagnosis.\nChooses questions using previous answers.',4.35,2.05,4.0,3.85],['Knowledge base','Stores a list of facts.',9.05,1.95,3.6,1.8],['Rule base','Stores rules that link facts in the knowledge base.',9.05,3.95,3.6,2.05]].forEach(([a,b,x,y,ww,hh])=>{panel(s,x,y,ww,hh);text(s,a,x+.2,y+.15,ww-.4,.65,22,{bold:true,color:C.purple});text(s,b,x+.2,y+.86,ww-.4,hh-.96,20);});
 arrow(s,3.8,3.4,4.25,3.4);arrow(s,4.25,4.6,3.8,4.6);arrow(s,8.95,2.8,8.45,3.1);arrow(s,8.95,5.05,8.45,4.7);
 note(s,'Facts are stored; rules link the facts; the engine applies the rules to make a decision.');
 s=slide('roles','One problem, four different jobs','Understand · worked example','Use a different printer example from the garage practice. Teacher explains which component stores which knowledge; students trace the engine from input to advice. This is conceptual teaching without mark language.');
 photo(s,'printer',.65,1.95,4.6,3.9,{crop:false});
 text(s,'The printer is on, but no page comes out.',5.85,1.95,6.75,.65,25,{bold:true});
 points(s,['Fact: an empty paper tray prevents printing.','Rule: IF tray empty THEN recommend loading paper.','Engine: matches answers and applies the rule.','Interface: asks about the tray and shows advice.'],5.85,2.95,6.75,.75,20);
 note(s,'Explain it to a partner without swapping the jobs of the facts, rules and engine.');
 s=slide('questioning','Why ask a different next question?','Understand · reasoning','In a hypothetical symptom-advice system, questions depend on earlier answers. This rule-based selection is not automatically ML. Medical photograph depicts a training examination, not an automated diagnosis. Examples simplified, not medical advice.');
 photo(s,'doctor',.65,1.95,4.35,3.65,{crop:false});
 text(s,'Question: is the pain linked to a meal?',5.65,1.98,6.9,.7,25,{bold:true});
 text(s,'YES',5.65,3.05,2.7,.3,13,{bold:true,color:C.purple});text(s,'NO',9.5,3.05,2.7,.3,13,{bold:true,color:C.purple});
 arrow(s,8.25,2.85,7.0,3.8);arrow(s,8.25,2.85,10.75,3.8);
 panel(s,5.65,4.0,3.15,1.35);panel(s,9.5,4.0,3.15,1.35);
 text(s,'Ask about timing\nand food.',5.85,4.2,2.75,.95,21);text(s,'Ask about other\nsymptoms.',9.7,4.2,2.75,.95,21);
 note(s,'The inference engine chooses follow-up questions using previous answers.');
 s=slide('workflow','Trace a diagnosis from start to finish','Apply · expert systems','Pairs narrate a printer diagnosis. This is a different context from the worksheet. Explanation facility is an optional additional supporting function, not one of the four core components.');
 points(s,['User enters symptoms through the interface.','Engine chooses questions from previous answers.','Evidence is compared with expert facts.','Engine applies rules to decide a likely fault.','Interface displays advice or a diagnosis.'],.8,1.95,11.7,.76,22);
 note(s,'Check: why must the engine use facts as well as rules?');
 s=slide('ml-concept','Can a system learn from examples?','Understand · machine learning','Machine learning is a form of AI: systems use data/examples to learn patterns and can change data/processes. Labelled images illustrate supervised training. Two images here are examples, not a sufficient dataset. Use varied examples and held-out data.');
 photo(s,'cat',.65,1.95,5.82,2.7,{crop:false});photo(s,'dog',6.82,1.95,5.82,2.7,{crop:false});
 text(s,'Label: CAT',.65,5.05,5.82,.43,24,{bold:true,color:C.purple,align:'center'});text(s,'Label: DOG',6.82,5.05,5.82,.43,24,{bold:true,color:C.purple,align:'center'});
 text(s,'Machine learning is a form of AI that learns patterns from data.',.65,5.65,12,.38,20,{bold:true,color:C.purple});
 note(s,'Many varied examples → learned patterns → a prediction for an unfamiliar photograph.');
 s=slide('learning-loop','Experience changes later decisions','Understand · learning mechanism','Training/retraining may be separate from use: not every prediction retrains automatically. Data, patterns, decisions and feedback illustrate general mechanism.');
 [['DATA','Past examples\nor experience'],['PATTERNS','Find useful\nrelationships'],['DECISION','Predict or\nchoose an action'],['FEEDBACK','Check success\nand failure']].forEach(([a,b],i)=>{const x=.65+i*3.12;panel(s,x,2.25,2.65,2.65);text(s,a,x+.18,2.5,2.29,.45,18,{bold:true,color:C.purple});text(s,b,x+.18,3.3,2.29,1.1,22);if(i<3)arrow(s,x+2.72,3.4,x+3.02,3.4);});
 arrow(s,11.5,5.1,11.5,5.65);arrow(s,11.5,5.65,1.9,5.65);arrow(s,1.9,5.65,1.9,5.1);
 note(s,'Feedback can update data or processes, changing a later prediction or action.');
 s=slide('training','Teach with examples; test on new ones','Understand · training and testing','Supervised desired outputs, unsupervised discovers patterns without supplied labels, held-out testing. These are supporting learning ideas; core IGCSE does not require neural-network internals. Photograph is Google Assistant representative voice hardware, not a performance claim.');
 photo(s,'assistant',.65,1.95,3.65,3.9,{crop:false});
 text(s,'Voice sample → intended command',4.95,1.95,7.65,.65,25,{bold:true});
 points(s,['Supervised: training examples have output labels.','Unsupervised: discover patterns without given labels.','Testing: use examples kept out of training.'],4.95,3.0,7.65,.88,21);
 note(s,'Why would testing only on memorised training examples give misleading confidence?');
 s=slide('navigation','Remember the obstacle; change the route','Apply · learning','A hypothetical learning cleaner can store actions/outcomes and adapt future navigation. Distinguish sensing a current obstacle from learning to avoid it on a later run; not a claim of this specific model’s ML internals.');
 photo(s,'vacuum',.65,1.95,6.1,3.9);
 points(s,['Collect obstacle and route data.','Record which actions fail or succeed.','Use that experience to change a later route.'],7.35,2.12,5.3,1.04,23);
 note(s,'Explain the learning between runs, rather than only the sensor and motor.');
 s=slide('maze-model','A failed attempt can teach a better route','Apply · visual trace','Concept illustration, not a full ML algorithm. Blue route reaches obstacle; green avoids it. Ask pupil to narrate collect/store/pattern/change without looking at prior slide.');
 const x=.65,y=2.05,c=.59;
 for(let r=0;r<6;r++)for(let col=0;col<7;col++)panel(s,x+col*c,y+r*c,c-.025,c-.025,'ECEAF0');
 [[1,1],[1,2],[1,4],[2,4],[3,2],[3,3],[4,2],[4,5]].forEach(([r,col])=>panel(s,x+col*c,y+r*c,c-.025,c-.025,C.purple));
 arrow(s,.94,5.28,.94,4.115);arrow(s,.94,4.115,2.1,4.115);text(s,'×',1.98,3.865,.5,.55,32,{bold:true,color:L.C.red});
 arrow(s,.94,5.28,4.47,5.28,L.C.green);text(s,'START',.65,5.8,1.6,.3,12,{bold:true});text(s,'GOAL',3.76,5.8,1.05,.3,12,{bold:true});
 points(s,['What evidence should it keep?','What should change next time?','What would count as a successful action?'],5.55,2.15,7.05,1.13,25);
 note(s,'Record the outcome → use experience → choose a different future action.');
 s=slide('classify','Explain the behaviour, not the gadget','Check understanding · pairs','Photo hardware does not reveal its algorithm. A is hypothetical fixed timing; B is hypothetical historical-data predictor. AI/ML depends on method, not appearance. Ask each pair to justify before reveal in notes: A automation not evidence of AI; B learned patterns predict weather, ML.');
 photo(s,'traffic',.65,1.95,3.1,3.15,{crop:false});photo(s,'weather',4.3,1.95,3.1,3.15,{crop:false});
 text(s,'A  Repeats a fixed\nred–amber–green cycle.',.65,5.5,3.1,.85,19,{bold:true,align:'center'});text(s,'B  Learns seasonal patterns\nto predict tomorrow’s weather.',4.3,5.5,3.1,.85,19,{bold:true,align:'center'});
 text(s,'Automation?\nAI?\nMachine learning?',8.25,2.3,4.1,1.9,29,{bold:true});text(s,'Explain what in the\ndescription supports\nyour choice.',8.25,4.5,4.1,1.2,23);
 s=slide('compare','Two approaches that can work together','Consolidate · connect the ideas','Expert systems use explicit expert facts and rules, often fixed; ML learns from data. Some actual papers combine expert systems and ML; avoid mutually exclusive claim. AI broader than either.');
 table(s,[['Expert system','Machine learning'],['Expert facts and explicit IF–THEN rules','Patterns learned from examples / experience'],['Engine applies rules to reach advice','Uses learned patterns to predict or decide'],['Can operate with fixed expert knowledge','Can adapt data or processes through learning'],['A combined system can use BOTH approaches','A system need not learn during every use']],[6,6],1.95,21,.83);
 note(s,'Explain one difference, then give an example of how the approaches could be combined.');
 s=slide('concept-check','Ready to explain a new situation?','Check understanding · individual','Before any exam framing, check foundations. Answers in notes: KB facts; RB rules; engine applies rules to facts; ML can collect labelled recycling images, learn patterns, use feedback and improve later classification. These are original unmarked checks.');
 points(s,['Explain facts, rules and applying rules in your own words.','Why can a fixed-rule expert system work without learning?','A recycling camera misclassifies waste. What experience could help it improve?'],.8,2.1,11.7,1.12,25);
 note(s,'Discuss the mechanism first. If it is unclear, return to the worked examples.');
 // Exam framing starts only after all three concepts and understanding checks.
 s=slide('roadmap','Now turn understanding into an answer','Exam practice · transition','Concepts and understanding checks are complete. Introduce precise terminology, question scope and mark allocations now. Existing audit and all seven observed families are retained.',[],true);
 text(s,'Understand the system.\nRead what is being asked.\nExplain the relevant mechanism.',.8,2.1,11.7,2.2,35,{bold:true,color:'FFFFFF'});
 text(s,'Tasks 2–5: selected practice today.\nTask 6 and remaining questions: follow-up.',.8,5.1,11.7,.85,23,{color:'DCD9E9'});
 s=slide('features','Read what has already been given','Exam practice · Task 2','2025 March Q6(a) supplies learning. Must supply three OTHER characteristics. Teach exam reading only after all conceptual content. Data collection/rules separate in this scheme.',[question('features')]);
 panel(s,.8,2,11.7,.85,'FFF0AD');text(s,'Given feature: learning. Supply three OTHER characteristics.',1.0,2.23,11.3,.45,23,{bold:true});
 points(s,['Read the supplied feature.','Choose different features you understand.','State each clearly without repeating the same idea.'],.8,3.25,11.7,.79,23);
 note(s,'Attempt Task 2 before the definition model on the next slide.');
 feedback('definition-check','A definition with three distinct ideas',question('definition'),['Computers simulate intelligent behaviour.','They use data and rules for that data.','They can learn from experience.'],'The simulation phrase is one idea. “Computer” and “intelligent” are not two separate marks.');
 promptSlide('component-practice','Name the component; explain its job',[question('engine'),question('rules')],'Task 3 includes component names, role descriptions, selection with distractors and a cloze. Attempt independently before feedback.');
 feedback('role-check','Connect the mechanism to its result',question('engine'),['Applies stored rules to facts in the knowledge base.','Produces a diagnosis / decision from that evidence.'],'Explain what the engine does, then the decision it produces.');
 promptSlide('expert-practice','Whole process or deciding the diagnosis?',[question('garage'),question('hospital')],'Attempt Task 4. Identify where input and output are already supplied.');
 feedback('expert-check','Explain the processing in between',question('hospital'),['The inference engine is used to decide the diagnosis.','It chooses follow-up questions from earlier answers.','It matches symptoms to expert facts and applies rules.'],'Input and output are already given. Spend the answer on how the diagnosis is decided.');
 promptSlide('ml','Describe what machine learning can do',[question('ml4')],'Attempt Task 5(a) independently before the capabilities feedback. These ideas have been taught conceptually; now explain them precisely.');
 feedback('ml-capabilities-check','Four distinct learning capabilities',question('ml4'),['A form of artificial intelligence.','Can be trained using examples / experience.','Can automatically adapt its own processes.','Can change its own data.'],'These are distinct capabilities; explain each clearly rather than repeating learning.');
 promptSlide('ml-practice','Apply learning to a particular route',[question('vacuum'),question('maze')],'Attempt Task 5 navigation. A sensor-and-motor description alone does not explain learning.');
 feedback('ml-check','A specific explanation of improvement',question('vacuum'),['Collect obstacle-location data while cleaning.','Use the data to adapt its route-planning process.','Avoid known obstacles on later cleaning runs.'],'Name the relevant data and the changed future behaviour.');
 s=slide('transfer','Try the same ideas in unfamiliar contexts','Exam practice · Task 6','Follow-up bank. Attempt all five tasks independently before feedback. Photos introduce three distinct contexts with no reuse. Full pack needs a second period or homework feedback.');
 photo(s,'clouds',.65,1.95,4.3,2.6);photo(s,'speaker',5.25,1.95,2.8,2.6,{crop:false});photo(s,'games',8.35,1.95,4.3,2.6);
 text(s,'Weather prediction',.65,5.03,4.3,.45,22,{bold:true,align:'center'});text(s,'Voice recognition',5.25,5.03,2.8,.7,20,{bold:true,align:'center'});text(s,'Game behaviour',8.35,5.03,4.3,.45,22,{bold:true,align:'center'});
 note(s,'Use the scenario: data → patterns or feedback → changed prediction or action.');
 promptSlide('voice-prompt','Explain an improvement in voice input',[question('voice')],'Attempt Task 6(c). No matching answer here. Discuss why simply naming a microphone is insufficient.');
 feedback('search-check','Search: feedback changes later results',question('search'),['Record that a result was unsuitable / unhelpful.','Use feedback to change data or ranking rules.','Return more relevant results in a later search.'],'Keyword matching alone does not explain machine learning.');
 feedback('weather-check','Weather: use the patterns to predict',question('weather'),['Analyse historical weather data for patterns.','Use those patterns to predict future weather.','Use feedback to revise later predictions.'],'Collecting readings is only the starting point; explain their use.');
 feedback('voice-check','Voice: explain four useful learning ideas',question('voice'),['Gather samples of the user’s voice.','Identify pronunciation / accent patterns.','Record successful and failed commands.','Adapt processes to recognise later commands.'],'Accents, alternative phrasing and background noise can also be learned from.');
 feedback('game-check','Games: respond to what the player does',question('game'),['Collect data about the player’s actions.','Find patterns and predict the next movement.','Adapt the character’s response using that prediction.'],'Graphics quality is separate from intelligent behaviour.');
 feedback('delivery-check','Three ways means three different ideas',question('delivery'),['Learn a route to a customer’s house.','Learn where obstacles occur on that route.','Reason which areas are paths rather than roads.'],'Repeating “learn the route” does not supply three different ways.');
 s=slide('pitfalls','Make the explanation precise','Review · after practice','Repair weak answers after practice. Keep the actual mark ceiling and accepted alternatives in mind.');
 table(s,[['Weak answer','What to add'],['“AI is smart.”','A recognised feature with a clear meaning.'],['“The database diagnoses it.”','Engine + applying rules to expert facts.'],['“The robot uses sensors.”','Recorded experience + changed future actions.'],['“It learns and gets better.”','Relevant data + patterns/feedback + improvement.'],['“Every expert system must learn.”','Fixed rules can work; learning can be added.']],[4.5,7.5],1.95,19,.66);
 note(s,'Underline distinct ideas. Circle the details that belong to this particular scenario.');
 s=slide('exit','Finish with an explanation of your own','Plenary','Original exit task, suggested answers only. Explain component roles and learned image patterns. This is a new context, not a memorised past-paper answer.');
 points(s,['Explain one difference between facts and rules.','What does an inference engine do with them?','Explain how a recycling camera could improve later classifications.'],.8,2.1,11.7,1.12,25);
 note(s,'Use a relevant mechanism, rather than the phrase “it is intelligent”.');
 const creditRows=usedPhotos.map(id=>photos.find(p=>p.id===id));
 for(let start=0;start<creditRows.length;start+=6){
  s=slide('credits-'+start,'Photographs: sources and licences','References','Actual photographs from Wikimedia Commons. No generated photographs. Resized/recompressed; some aspect-preserving slide crops. Full metadata in assets/ai/photos/credits.json.');
  creditRows.slice(start,start+6).forEach((p,i)=>{const y=1.85+i*.78;text(s,p.id.toUpperCase()+' · '+p.author+' · '+p.license,.65,y,12,.28,13,{bold:true,color:C.purple});text(s,p.source,.65,y+.3,12,.21,8,{color:C.muted,hyperlink:{url:p.source}});text(s,p.licenseUrl,.65,y+.52,12,.19,8,{color:C.muted,hyperlink:{url:p.licenseUrl}});});
 }
 s=slide('sources','Teaching sources and exam coverage','References','Original teacher-supplied Hodder extract pp241–249. All21 QPs/MS2023–25 checked;29AIparts;20selected60officialmarks. See full source audit with links.');
 table(s,[['Source','Role in this lesson'],['Teacher-supplied Hodder extract','Core AI, expert-system and machine-learning concepts.'],['2023–2025: all 21 Paper 1 papers','Coverage audit: 29 AI parts, with 20 adapted for practice.'],['Cambridge published mark schemes','Verified allocations, alternatives and mark ceilings.'],['Delivery','Teach concepts first; selected practice; follow-up bank.']],[4.3,7.7],1.95,20,.85);
 note(s,'Complete question-by-question sources: AI_Exam_Coverage.md.');
 await pres.writeFile({fileName:file('IGCSE_0478_Lesson_-_Artificial_Intelligence.pptx')});
 fs.writeFileSync(file('slide-map.json'),JSON.stringify(ids,null,2));
 fs.writeFileSync(file('photo-usage.json'),JSON.stringify(usedPhotos,null,2));
 console.log(n+' slides; '+usedPhotos.length+' different photographs; exam transition at slide '+ids.roadmap);
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
 add(K,newPage('Sources and photograph credits'),w.P(source),w.P('Actual photographs from Wikimedia Commons. Images resized/recompressed with aspect-preserving crops in some slide placements; no subject alterations. Photographs illustrate representative hardware and settings.'));
 photos.forEach(p=>{
  add(K,w.P(p.id.toUpperCase()+' — '+p.author+' — '+p.license,{keepNext:true,after:20,run:{size:18,bold:true}}),new d.Paragraph({spacing:{after:95},children:[new d.ExternalHyperlink({link:p.source,children:[new d.TextRun({text:'Photograph source',style:'Hyperlink',size:16})]}),new d.TextRun({text:'  ·  ',size:16}),new d.ExternalHyperlink({link:p.licenseUrl,children:[new d.TextRun({text:'Licence terms',style:'Hyperlink',size:16})]})]}));
 });
 add(K,w.P('Complete exam audit: 0478 P1/Artificial Intelligence/AI_Exam_Coverage.md in the source repository.'));
}
async function documents(images){
 let K=[];
 add(K,w.title('Artificial intelligence — practice',subtitle+' | Student worksheet'),w.P('Start with Task 1 recall. Learn and discuss the concepts before attempting Tasks 2–5. Task 6 and remaining questions are follow-up practice.'),w.I('No answers here. Use precise component names and scenario details.'));
 add(K,task1());for(let group=2;group<=6;group++)task(K,group);
 await w.build(K,file('Artificial_Intelligence_Worksheet.docx'));
 K=[];add(K,w.title('Artificial intelligence — key',subtitle+' | Teacher copy',{noName:true}),w.keyBanner('Covers worksheet and booklet. Tasks 2–6 use published Cambridge allocations; questions/points are paraphrased.'),w.P(source),w.P('Concept-first route: 5 min recall (Task 1 selected parts); 5 min automation vs AI; 12 min expert-system examples and process; 12 min machine-learning examples and mechanism; 8 min classification and explanation checks; 15 min selected exam practice; 3 min exit. Teach slides 1–17 before exam framing begins on slide 18. Use the full practice bank in a second period or homework with feedback.'),w.P('All seven observed question families across the 29 audited parts are taught. This does not guarantee every future question. Keep accepted alternatives in view; “any N” means a ceiling, not a compulsory list of N sentences.'));
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
 add(K,w.H2('Concept checks before exam practice'),w.P('Automation comparison / classification: a stored wash cycle or fixed signal timing does not by itself establish AI. A system learning seasonal patterns from past weather data is machine learning. The behaviour and method matter more than the pictured hardware.'),w.P('Expert-system explanation: knowledge base stores expert facts; rule base stores IF–THEN rules; inference engine applies rules to facts and reaches a decision. Fixed expert knowledge can work without learning; a system can combine expert rules with ML.'),w.P('Recycling transfer: collect varied labelled images, learn classification patterns, test on held-out images and use appropriate feedback to update processes or data. Credit a relevant explanation of changed later classification. These are original checks, with suggested answers rather than official marks.'));
 creditsDoc(K);await w.build(K,file('Artificial_Intelligence_Answer_Key.docx'));
 if(!images)throw Error('Supply rendered slides');
 Object.assign(ids,JSON.parse(fs.readFileSync(file('slide-map.json'))));
 K=[];add(K,w.title('Artificial intelligence',subtitle+' | Student booklet'),w.P('Start with robotics recall. Then explore the examples and explain how the systems work. Complete the understanding checks before turning to the exam practice. The worksheet and booklet have identical numbered tasks; use remaining questions as follow-up.'),task1());
 add(K,newPage('Explore   From automation to intelligence'),image(images,'automation','Compare stored instructions with decisions in changing surroundings'),image(images,'meaning','Artificial intelligence: simulating intelligent behaviour'));
 add(K,newPage('Understand   An expert in a particular domain'),image(images,'expert','A specialist adviser'),image(images,'components','The four components and how they connect'));
 add(K,newPage('Understand   Facts, rules and reasoning'),image(images,'roles','Trace a different worked example: a printer fault'),image(images,'questioning','Follow-up questions depend on previous answers'));
 add(K,newPage('Apply   Explain a diagnosis'),image(images,'workflow','From evidence to advice'),w.P('In your own words: how do facts, rules and the engine work together? Why could a fixed-rule system work without learning?'),answerLines(4));
 add(K,newPage('Understand   Learning from experience'),image(images,'ml-concept','Learned patterns from labelled examples'),image(images,'learning-loop','Data, patterns, decisions and feedback'));
 add(K,newPage('Understand   Training and new situations'),image(images,'training','Train on examples; test on new ones'),image(images,'navigation','Remember experience and change a later action'));
 add(K,newPage('Check understanding   Explain your choice'),image(images,'classify','The description matters more than the gadget'),image(images,'compare','Expert rules and machine learning can work together'));
 add(K,newPage('Check understanding   Before exam practice'),image(images,'concept-check','Explain the mechanism in a new situation'),w.P('A recycling camera misclassifies waste. What examples and feedback could improve its later classifications? Explain the change, rather than simply saying it gets better.'),answerLines(5));
 add(K,newPage('Practice   Turn understanding into clear answers'),w.P('Read the question carefully. Use the relevant component names, explain what happens and apply the mechanism to the given context. Feedback comes after an independent attempt. The model-answer slides are omitted from this student booklet.'));
 for(let group=2;group<=5;group++)task(K,group,group!==2);
 add(K,newPage('Follow-up   Transfer the mechanism'),image(images,'transfer','New contexts: weather, voice and games'),w.P('Attempt the five contexts independently. For each, identify relevant data, patterns or feedback, and a later change.'));
 task(K,6);
 add(K,newPage('Review   Improve an explanation'),image(images,'pitfalls','Repair vague claims'),w.P('Choose one of your answers. Underline distinct ideas. Circle the scenario details. Revise any sentence that only says it gets better.'),answerLines(5),w.H2('Exit transfer'),w.P('A recycling camera misclassifies waste. Explain how learning could improve later classifications.'),answerLines(5));
 creditsDoc(K);await w.build(K,file('Artificial_Intelligence_Student_Booklet.docx'));
}
(async()=>{if(process.argv[2]==='deck')await deck();else if(process.argv[2]==='documents')await documents(process.argv[4]);else throw Error('Use deck OUTPUT or documents OUTPUT IMAGES');})().catch(e=>{console.error(e);process.exitCode=1;});
