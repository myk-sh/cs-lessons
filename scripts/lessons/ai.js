// Rebuild: node scripts/lessons/ai.js deck OUTPUT
// Then render_slides.sh OUTPUT/IGCSE_0478_Lesson_-_Artificial_Intelligence.pptx IMAGES
// Finally: node scripts/lessons/ai.js documents OUTPUT IMAGES
const fs = require('fs');
const path = require('path');
const L = require('../../skills/comp-sci-lesson-maker/scripts/lib.js');
const w = require('../../skills/comp-sci-lesson-maker/scripts/wslib.js');
const {P,I,H2,table,lines,box,bullets} = w;
let taskPage = false;
const H = (title, marks) => w.H(title, marks, {pageBreak:taskPage});
const output = path.resolve(process.argv[3] || '0478 P1/Artificial Intelligence');
fs.mkdirSync(output, {recursive:true});
const file = name => path.join(output,name);
const subtitle = 'IGCSE Computer Science 0478 | 6.3 Artificial intelligence';
const source = 'Source: teacher-supplied Hodder Cambridge IGCSE Computer Science extract, section 6.3, printed pp. 241–249. Original diagrams and activities. Questions and marking points are suggested, not verified official Cambridge questions.';
const pres = L.newDeck('Artificial intelligence');
let number=0;
function slide(title,pill,notes) { return L.base(pres,title,pill,++number,notes+'\n'+source); }
function text(s,t,x,y,ww,hh,size=18,extra={}) {L.text(s,t,{x,y,w:ww,h:hh,fontSize:size,...extra});}
function card(s,title,body,x,y,ww=3.65,hh=2.1) {
 s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x,y,w:ww,h:hh,rectRadius:.12,fill:{color:L.C.band},line:{color:'E1E0EF',width:1}});
 if(hh<1.5) {
  text(s,title,x+.2,y+.15,Math.min(3,ww*.3),hh-.25,17,{bold:true,color:L.C.navy});
  text(s,body,x+ww*.32,y+.15,ww*.66-.2,hh-.25,15);
 } else {
  text(s,title,x+.2,y+.18,ww-.4,.6,20,{bold:true,color:L.C.navy});
  text(s,body,x+.2,y+.85,ww-.4,hh-.95,16);
 }
}
function note(s,t) {L.callout(s,t,{x:.75,y:6.15,w:11.7,h:.48,fontSize:15});}
function tbl(s,rows,colW,y=1.7,fs=16,rowH=.7) {L.table(s,rows,{x:.75,y,w:11.8,colW,fontSize:fs,rowH});}
function arrow(s,x1,y1,x2,y2) {L.arrow(pres,s,x1,y1,x2,y2);}
function deck() {
 let s=pres.addSlide(); number++;
 s.background={color:L.C.white};
 s.addShape(pres.shapes.RECTANGLE,{x:8.64,y:0,w:4.69,h:7.5,fill:{color:L.C.yellow},line:{color:L.C.yellow}});
 text(s,'Artificial\nintelligence',.73,2.35,7.5,1.8,46,{bold:true});
 text(s,'IGCSE 0478 · Paper 1 · 6.3',.75,4.42,7.2,.5,20,{color:L.C.grey});
 text(s,'Rules. Reasoning. Learning.',.75,5.1,7.2,.5,20,{color:L.C.navy});
 text(s,'AI',9.3,2.4,3.2,1.2,80,{bold:true,color:L.C.navy,align:'center'});
 s.addNotes('60-minute theory lesson after Robotics (6.2). Suggested timings: recall 6 min; AI 7 min; expert systems 18 min; ML 16 min; compare/exit 8 min; discussion buffer 5 min. Task 6 may be homework. Pause slides before practice; do not reveal answers from notes. '+source);
 s=slide('Recall: robotics','Starter · 6 min','Do Task 1 closed book before teaching AI. Use the separate key to review. If fewer than 2/3 on robot characteristics or 2/4 on the safety chain, recap those ideas. Total 15 suggested marks.');
 tbl(s,[['Recall focus','Marks'],['Three characteristics of a robot','3'],['Sensor → microprocessor → actuator','3'],['A factory benefit and a drawback','4'],['Stopping safely + autonomous meaning','5']],[9.9,1.9],1.65,18,.7);
 note(s,'Closed book first. AI is the next step—not a requirement for every robot.');
 s=slide('In this lesson, you will','Objectives','Show the 5 outcomes and how the tasks fit them.');
 [['Define AI','Rules/data, reasoning, learning and adapting'],['Map an expert system','Explain four core components'],['Apply IF–THEN rules','Trace how evidence leads to a conclusion'],['Explain machine learning','Training examples → patterns → predictions'],['Evaluate an AI decision','Benefits, limitations and human checking']].forEach((r,i)=>L.stepCard(pres,s,i+1,r[0],r[1],{x:.75,y:1.45+i*1.0,w:11.8,h:.95,hs:17,ds:14}));
 s=slide('What makes a system AI?','Activity 1','Definition: simulation of intelligent human behaviour by a computer. Core characteristics: rules and data; ability to reason, learn and adapt to external stimuli. Not every AI system learns during use. Do not teach the textbook claim that every cognitive function can be replicated as established fact.');
 card(s,'Rules & data','Knowledge, examples and instructions provide the basis.',.75,1.65,5.65,1.85);
 card(s,'Reasoning','Use evidence to reach a conclusion or make a decision.',6.75,1.65,5.65,1.85);
 card(s,'Learning','Identify patterns from examples or past experience.',.75,3.78,5.65,1.85);
 card(s,'Adapting','Change responses or processes as circumstances change.',6.75,3.78,5.65,1.85);
 note(s,'AI simulates intelligent human behaviour; it does not prove human understanding.');
 s=slide('Automation is not always AI','Think · pair · share','Use three examples. A fixed repeating robot program is automated but need not learn or adapt. Expert systems are AI even when their rules do not change. ML is one way to implement AI. Ask students to explain the basis of the decision rather than just say “smart”.');
 card(s,'Fixed robot arm','Repeats the same stored movement sequence.',.75,1.9);
 card(s,'Fault adviser','Applies expert IF–THEN rules to answers.',4.85,1.9);
 card(s,'Image classifier','Learns patterns from labelled images.',8.95,1.9);
 text(s,'Which system repeats instructions? Which uses expert rules? Which learns from examples?',.85,4.7,11.6,1,23);
 note(s,'Now do Task 2. Explain the behaviour, not just the device name.');
 s=slide('AI: a family of approaches','Activity 1','Draw a containment diagram: expert systems and machine learning are approaches within AI, not synonyms for all AI. They can be combined; do not claim mutually exclusive technologies. Not all robots use AI, and AI can be software without a physical robot.');
 s.addShape(pres.shapes.ROUNDED_RECTANGLE,{x:.9,y:1.6,w:11.5,h:4.3,fill:{color:L.C.soft},line:{color:L.C.navy,width:2}});
 text(s,'ARTIFICIAL INTELLIGENCE',1.15,1.85,10.6,.6,25,{bold:true,color:L.C.navy,align:'center'});
 card(s,'Expert systems','Human expertise → stored facts and rules',1.6,2.8,4.6,2.1);
 card(s,'Machine learning','Examples → learned patterns and a model',7,2.8,4.6,2.1);
 note(s,'AI is the broad field. Machine learning is a subset of AI.');
 s=slide('Expert systems: expertise on tap','Activity 2','An expert system mimics the knowledge and decision-making of a human expert in a particular domain. It has a restricted domain and is only as good as its knowledge, rules and input. Examples: equipment fault diagnosis, mineral prospecting, financial advice.');
 card(s,'Expert knowledge','Technicians explain common printer faults.',.75,1.8);
 arrow(s,4.5,2.8,4.83,2.8);
 card(s,'Computer system','Stores the knowledge and applies rules.',4.85,1.8);
 arrow(s,8.6,2.8,8.92,2.8);
 card(s,'Advice for a user','Suggests a cause and an action to take.',8.95,1.8);
 tbl(s,[['Other applications','Expertise needed'],['Oil / mineral prospecting','Geological evidence'],['Medical decision support','Clinical knowledge (human oversight)']],[5.4,6.4],4.35,16,.6);
 s=slide('Inside an expert system','Activity 2','Four core components: user interface, knowledge base, rules base, inference engine. Explanation facility is useful supporting enrichment, not required as a fifth core item in Task 3(a). Diagram arrows show information flows, not a mandatory execution order.');
 card(s,'User interface','Accepts user answers; displays questions and advice.',.75,2.65,3.1,2);
 card(s,'Inference engine','Matches facts and applies rules to draw a conclusion.',4.8,2.65,3.7,2);
 card(s,'Knowledge base','Stores expert facts about the domain.',9.1,1.55,3.4,1.7);
 card(s,'Rules base','Stores IF–THEN rules for drawing conclusions.',9.1,4.1,3.4,1.7);
 arrow(s,3.9,3.55,4.75,3.55);arrow(s,9.05,2.8,8.55,3.2);arrow(s,9.05,4.55,8.55,4);
 note(s,'Facts are not rules. The inference engine uses both.');
 s=slide('Facts and rules do different jobs','Activity 2','Worked demonstration uses a printer, separate from worksheet laptop cases. Facts: no paper, power light on. Rules: IF power off THEN check supply; IF power on AND no paper THEN load paper. No match should not be treated as proof of “no fault”.');
 tbl(s,[['Part','Printer example'],['Knowledge base / facts','Power light: ON. Paper tray: EMPTY.'],['Rules base','IF power is on AND tray is empty THEN advise “load paper”.'],['Inference engine','Matches the evidence to the rule and selects advice.'],['User interface','Asks about the tray and displays the advice.']],[3.8,8],1.75,17,.85);
 note(s,'A fact describes what is known. A rule says what to infer if conditions match.');
 s=slide('Trace a rule before you trust it','Activity 2','Worked example rules: R1 power light off → check power cable; R2 power light on AND paper empty → load paper; R3 power light on AND paper present AND jam → clear jam. Given light on, paper empty, jam no: R2 matches. Do not substitute worksheet inputs.');
 tbl(s,[['Rule','Condition','Advice'],['R1','Light OFF','Check power cable'],['R2','Light ON and paper EMPTY','Load paper'],['R3','Light ON, paper PRESENT and jam YES','Clear paper jam']],[1.2,6.3,4.3],1.7,17,.8);
 card(s,'Evidence','Light ON · paper EMPTY · jam NO',.9,5.2,7.5,.8);
 text(s,'Which rule matches?',9,5.3,3.2,.5,19,{bold:true,color:L.C.navy});
 s=slide('Explain the advice','Activity 2','Show after the worked trace. R2 matches because the light is on and tray empty. Explanation facility exposes those reasons. This does not guarantee correctness. Inputs might be wrong or rules missing. Pause for Task 3; then Task 4(a).');
 card(s,'Evidence','The printer is powered on. There is no paper in the tray.',.75,1.9);
 card(s,'Rule matched','R2: powered on + empty tray → load paper.',4.85,1.9);
 card(s,'Explain','“Load paper because the printer is on but its tray is empty.”',8.95,1.9);
 note(s,'A conclusion should follow evidence and rules—not guesswork. Do Tasks 3 and 4(a).');
 s=slide('Build and test an expert system','Activity 2','Gather expertise from humans/written sources; create facts in knowledge base and inference rules in rules base; develop engine and UI; test known cases and compare with expected conclusions. Test unmatched/conflicting rules too.');
 [['Collect expertise','Interview experts; use reliable written sources.'],['Store facts and rules','Create the knowledge base and rules base.'],['Connect the engine and interface','Ask useful questions and display advice.'],['Test known cases','Compare outputs with agreed expert conclusions.']].forEach((r,i)=>L.stepCard(pres,s,i+1,r[0],r[1],{x:.8,y:1.65+i*1.05,w:11.6,h:.9,hs:18,ds:15}));
 note(s,'If known cases give incorrect advice, correct the facts or rules and retest.');
 s=slide('Benefits need a matching limit','Activity 2','Pair each benefit with its limitation. Decision support not replacement of all expert responsibility. Expert systems usually do not learn by themselves. Do Task 4(b).');
 tbl(s,[['Potential benefit','Why checking still matters'],['Consistent use of stored rules','A consistently wrong rule gives consistently wrong advice.'],['Available when an expert is not','Unusual cases may not be covered by the knowledge.'],['Fast access to specialist knowledge','Incorrect input can lead to the wrong conclusion.'],['Knowledge shared across locations','Experts must maintain and update facts and rules.']],[5.9,5.9],1.65,17,.85);
 s=slide('Machine learning: learn a pattern','Activity 3','ML is a subset of AI. Algorithms are trained using examples to learn patterns and make predictions/decisions on new data, rather than explicitly programming every new case. Training does not imply continuous learning during every prediction. Labelled examples are one method (this lesson uses supervised learning), not a requirement of all ML.');
 card(s,'Training examples','Past emails labelled spam or legitimate.',.75,1.9);
 arrow(s,4.5,2.8,4.83,2.8);
 card(s,'Learned model','Finds useful patterns across the examples.',4.85,1.9);
 arrow(s,8.6,2.8,8.92,2.8);
 card(s,'Unseen email','Predicts a class for a message it has not seen.',8.95,1.9);
 note(s,'It learns from examples. It does not need a separate hand-written rule for every email.');
 s=slide('Training is not the final test','Activity 3','Keep held-out test examples separate from training. Using the same examples can hide memorisation and overstate performance. Example training emails are made up. Worksheet uses image classification rather than exact email data.');
 tbl(s,[['Stage','Email-filter example'],['Collect and prepare','Examples from many senders; correct labels; useful email features.'],['Train','Learn patterns linking email content to spam / legitimate labels.'],['Evaluate separately','Predict labels of held-out emails and compare with known labels.'],['Improve and deploy','Correct data/model problems, then evaluate again before use.']],[3.6,8.2],1.7,17,.85);
 note(s,'A good score on remembered examples does not prove good predictions on new data.');
 s=slide('Errors have real consequences','Activity 3','A spam label is a prediction, not certainty. False positives: real email moved to spam. False negatives: spam reaches inbox. No statistical vocabulary required; focus impact and improvement.');
 tbl(s,[['Actual email','Prediction','What happens?'],['Legitimate homework email','Spam','Student misses an important message.'],['Spam message','Legitimate','Unwanted or harmful message reaches the inbox.']],[3.8,2.9,5.1],1.85,18,1.1);
 card(s,'Improve the evidence','Use accurate labels and varied, representative examples.',1.0,4.9,11.2,1.1);
 s=slide('Data quality changes predictions','Activity 3','Reason about unrepresentative examples, incorrect labels and unfamiliar input; do not promise that more data always fixes performance. Worksheet plant examples A/B/C test correct labels independently.');
 card(s,'Too narrow','All training photos have bright, plain backgrounds.',.75,1.9);
 card(s,'Wrong labels','Some examples are labelled as the wrong class.',4.85,1.9);
 card(s,'Changed conditions','New photos are dark or partly obstructed.',8.95,1.9);
 text(s,'Predict the effect. Then suggest a specific improvement to the training or testing.',.85,4.8,11.5,1.1,22);
 note(s,'Now do Task 5. Explain how a model can be useful without being infallible.');
 s=slide('Rules or learned patterns?','Compare','This is a comparison of a conventional rule-based expert system with ML, not a claim that every expert system/ML implementation is identical. The approaches can be combined. Show after Tasks 3–5, not before classification practice.');
 tbl(s,[['Question','Rule-based expert system','Machine learning'],['Where does its knowledge come from?','Experts supply facts and rules.','Algorithms learn patterns from examples.'],['How is a decision reached?','Engine applies stored rules to facts.','Model predicts using learned patterns.'],['How can it improve?','Experts update facts/rules and test.','Improve data/training; evaluate again.'],['What can go wrong?','Missing rules or incorrect input.','Poor data or unfamiliar examples.']],[3.5,4.15,4.15],1.7,15.5,.86);
 s=slide('Exam technique: explain the link','Exam-style practice','All marks are suggested, not verified official Cambridge allocations. Point + applied explanation. Example: available outside office hours → technicians can get advice on a night shift. Do not reveal Task 6 conclusions; model different printer scenario.');
 card(s,'Name the mechanism','Stored expert rules are applied consistently.',.75,1.9);
 card(s,'Apply to the scenario','Different technicians receive the same advice for the same printer evidence.',4.85,1.9);
 card(s,'Recognise a limit','A missing rule may prevent the system handling a new printer fault.',8.95,1.9);
 note(s,'“It is better” or “it is smarter” is not an explanation.');
 s=slide('Choose, justify, challenge','Task 6 · extension','Do Task 6 independently before discussion. One scenario benefits from auditable fixed policy rules; the other requires learning visual patterns from many labelled images. Accept a justified hybrid. Do not require neural-network implementation.');
 tbl(s,[['Scenario','Questions to ask'],['Library fines under a fixed published policy','Can the knowledge be written as clear rules?'],['Sorting mixed waste from camera images','Do examples reveal patterns too complex to list?']],[5.5,6.3],1.8,18,1.1);
 text(s,'Choose an approach. Explain why. Identify a failure. Suggest a safeguard.',.9,5.65,11.4,.85,24,{bold:true,color:L.C.navy});
 s=slide('Spot the misconception','Plenary','Ask for corrections orally. Expected: not all robots AI; expert facts/rules need updates; prediction not proof; learning subset AI; more data only helps when suitable and correctly prepared. Notes hold answers, student booklet uses a question-only review slide.');
 tbl(s,[['Claim','Your correction'],['Every robot uses AI.','Explain the difference between repeating and learning.'],['An expert system knows everything.','Think about its domain and missing rules.'],['A machine-learning prediction is always correct.','Think about the input and training examples.'],['AI and machine learning mean the same thing.','Use the family diagram.']],[6.4,5.4],1.65,17,.9);
 s=slide('Exit ticket: rules and learning','Exit · 3 min','Suggested answers: KB expert facts; RB IF–THEN rules; inference engine applies rules to facts; ML model trained from examples to predict labels; wrong input/rules or unrepresentative data can cause error. Use as diagnostic, not claimed Cambridge mark scheme.');
 L.stepCard(pres,s,1,'Rule-based adviser','Name the component that applies stored rules to the user’s facts.',{x:.85,y:1.8,w:11.4,h:1.2,hs:21,ds:18});
 L.stepCard(pres,s,2,'Learning image classifier','Explain how it can classify a photo it has never seen before.',{x:.85,y:3.35,w:11.4,h:1.2,hs:21,ds:18});
 L.stepCard(pres,s,3,'Check before trusting','Give one reason why either system may make a wrong decision.',{x:.85,y:4.9,w:11.4,h:1.2,hs:21,ds:18});
 return pres.writeFile({fileName:file('IGCSE_0478_Lesson_-_Artificial_Intelligence.pptx')});
}

// The SAME task functions are used for worksheet and booklet.
const tasks = [
 () => [H('Task 1   Recall: robotics (6.2)','[15 marks]'),I('Closed book. Spend about 6 minutes. Review with your teacher before moving on.'),
 P('(a) State three characteristics of a robot. [3]'),lines(3),
 P('(b) Complete the control chain: a __________ detects distance; the __________ compares the reading with a threshold; an __________ moves or stops the mechanism. [3]'),w.spacer(60),
 P('(c) A factory uses robots to lift heavy boxes. Explain one benefit to workers and one drawback to the factory owner. [4]'),lines(4),
 P('(d) A delivery robot must stop when a person is within 1 metre. Explain how a distance sensor, microprocessor and motor work together to make it stop. [4]'),lines(3),
 P('(e) State what it means for a robot to be autonomous. [1]'),lines(1)],
 () => [H('Task 2   AI: reasoning, learning and adapting','[6 marks]'),
 P('(a) State what is meant by artificial intelligence. [2]'),lines(2),
 P('(b) Write the best term for each description: rules and data, reasoning, learning, adapting. Use each once. [4]'),
 table([['Description','Term'],['A system changes its response when its surroundings change.',''],['A system finds patterns from past examples.',''],['Stored facts and instructions form the basis of a system.',''],['A system uses evidence to draw a conclusion.','']],[7200,3000],{rowH:470})],
 () => [H('Task 3   Expert-system components and rules','[9 marks]'),
 P('(a) Complete the component map using: knowledge base, rules base, inference engine, user interface. [4]'),
 table([['User answers / displayed advice','Processing','Information used'],['Component A: ______________','Component B: ______________','Component C: stores expert facts\n________________________'],['','applies stored rules to facts','Component D: stores IF–THEN rules\n________________________']],[3400,3400,3400],{rowH:650}),
 P('(b) A laptop fault adviser has these three rules. Read all conditions before choosing a rule.'),
 table([['Rule','IF','THEN advice'],['R1','Power light is OFF','Check the power supply'],['R2','Power light is ON AND screen is BLANK','Check the display connection'],['R3','Power light is ON AND screen is VISIBLE AND sound is OFF','Check sound settings']],[800,5200,4200],{rowH:560}),
 P('Case A: power light ON; screen VISIBLE; sound OFF. State the matching rule and its advice. [2]'),lines(2),
 P('Case B: power light ON; screen BLANK; sound OFF. Explain why R3 must not be used. [1]'),lines(2),
 P('(c) Case C: power light ON; screen VISIBLE; sound ON, but the keyboard fails. No rule covers it. Explain why the system should not conclude that there is no fault. [2]'),lines(3)],
 () => [H('Task 4   Explain and evaluate an expert system','[8 marks]'),I('Original exam-style questions; suggested marks.'),
 P('(a) A garage uses an expert system to advise on engine faults. Describe how user answers become a conclusion. Refer to the user interface, knowledge base, rules base and inference engine. [4]'),lines(6),
 P('(b) Explain one benefit of using this system when a senior mechanic is not available, and one limitation that means a mechanic should still check the advice. [4]'),lines(4)],
 () => [H('Task 5   Machine learning on new data','[10 marks]'),I('Original exam-style questions; suggested marks.'),
 P('A nursery trains a model with labelled photos of healthy and diseased leaves. Most training photos show one plant species in bright light.'),
 P('(a) State what is meant by machine learning. [2]'),lines(2),
 P('(b) Explain why the nursery should test the trained model using labelled photos that were not used during training. [2]'),lines(3),
 P('(c) Complete the results. Write correct or incorrect for each prediction. [3]'),
 table([['Photo','Known condition','Model prediction','Correct / incorrect'],['A','Healthy','Diseased',''],['B','Diseased','Diseased',''],['C','Diseased','Healthy','']],[900,2900,3000,3400],{rowH:450}),
 P('(d) Explain why the model may be less accurate on another plant species photographed in dim light. [2]'),lines(3),
 P('(e) Suggest one specific improvement to the training data. [1]'),lines(2)],
 () => [H('Task 6   Choose an approach and justify it','[6 marks]'),I('Extension / homework. Original exam-style questions; suggested marks.'),
 P('For each organisation, choose a conventional rule-based expert system or machine learning. Give a reason linked to the scenario, and one limitation or safeguard. [3 per row]'),
 table([['Organisation','Approach and reason','Limitation / safeguard'],['A repair centre follows a fixed manufacturer fault-finding guide with clear IF–THEN conditions.','',''],['A recycling centre classifies waste from camera images using thousands of labelled examples.','','']],[3800,3500,2900],{rowH:1600}),
 P('Discuss: could the two approaches be combined? Explain your idea (unmarked stretch).'),lines(2)]
];
const add = (arr,...items) => items.flat(Infinity).forEach(x=>arr.push(x));
async function documents(imageDir) {
 let K=[];
 add(K,w.title('Artificial intelligence',subtitle+' | Student worksheet'),P('Core activities: Tasks 1–5. Task 6 is extension or homework. Total: 54 suggested marks.'),I('Write in your own words and apply each explanation to its scenario.'));
 tasks.forEach((task,i)=>{taskPage=i>0;add(K,task());});
 taskPage=false;
 await w.build(K,file('Artificial_Intelligence_Worksheet.docx'));
 K=[];
 add(K,w.title('Artificial intelligence — key',subtitle+' | Teacher copy',{noName:true}),w.keyBanner('Covers the worksheet and booklet. Keep this file separate from student materials.'),I(source),
 P('Suggested 60-minute plan: Task 1 (6 min); AI concepts/Task 2 (7 min); expert systems/Tasks 3–4 (18 min); machine learning/Task 5 (16 min); comparison/exit (8 min); discussion buffer (5 min). Set Task 6 as extension/homework.'),
 P('Do not teach the book’s narrow/general/strong AI taxonomy or deep-learning appendix as required 0478 content. Avoid implying all AI learns continuously, that predictions prove a fact, or that human cognition has been fully replicated.'),
 H2('Task 1 — robotics recall [15]'),
 w.marking('Suggested answers',[['3','(a) Mechanical structure/framework; electrical components (e.g. sensors/motors); programmable. 1 each. “Can move” alone is not enough.'],['3','(b) Sensor; microprocessor; actuator. 1 each.'],['2','(c) Workers avoid heavy lifting (1), so fewer lifting injuries/less physical strain (1). Accept another applied worker benefit.'],['2','(c) High purchase/maintenance cost (1), reducing owner profit or requiring significant investment (1). Accept a different applied owner drawback.'],['4','(d) Distance sensor takes readings (1); readings sent to microprocessor (1); compares to 1 m threshold (1); sends signal to motor/actuator to stop when distance is at or below threshold (1). Accept digitisation where the chosen sensor is analogue.'],['1','(e) Can operate without human intervention.']]),
 I('Re-teaching threshold: fewer than 2/3 for (a) or 2/4 for (d) → recap robot characteristics / sensor–processor–actuator chain. These are original questions; no official mark allocation is claimed.'),
 H2('Task 2 — AI [6]'),
 w.marking('Suggested answers',[['2','(a) A computer/system (1) simulates intelligent human behaviour (1). Accept equivalent reference to performing tasks requiring human intelligence.'],['4','(b) In order: adapting; learning; rules and data; reasoning. 1 each.']]),
 H2('Task 3 — expert-system components and trace [9]'),
 w.marking('Suggested answers',[['4','(a) A user interface; B inference engine; C knowledge base; D rules base. 1 each.'],['2','(b) Case A: R3 (1); check sound settings (1).'],['1','Case B: R3 requires the screen to be visible, but it is blank. R2 matches instead. Credit the failed condition; do not credit “because sound is off”.'],['2','(c) No match only means the rules do not cover the evidence (1); the keyboard fault may be outside the system’s knowledge, so seek expert advice/add a tested rule (1).']]),
 P('Check by evaluating every conjunction: Case A → R3; Case B → R2; Case C → no match. The rules are simplified classroom examples, not technical repair instructions.'),
 H2('Task 4 — expert-system operation/evaluation [8]'),
 w.marking('Suggested answers',[['4','(a) UI presents questions/accepts answers (1); knowledge base stores expert facts about engine faults (1); rules base stores IF–THEN rules (1); inference engine matches evidence and applies those rules to derive advice (1). Naming components without their roles is not sufficient.'],['2','(b) Advice remains available without the senior mechanic (1), so work can continue outside their working hours / fewer waits (1). Accept consistent advice + applied consequence.'],['2','Missing/outdated facts/rules or incorrect answers (1) can cause a wrong recommendation for an unfamiliar engine fault (1). Accept another valid limitation with an applied explanation.']]),
 H2('Task 5 — machine learning [10]'),
 w.marking('Suggested answers',[['2','(a) A subset/approach within AI trained using examples/past data (1) to learn patterns and make predictions/decisions about new data (1). Do not require labelled data as a definition of all machine learning.'],['2','(b) Unseen test images check how well it generalises beyond training examples (1); using the same photos could reward memorisation/overstate performance (1).'],['3','(c) A incorrect; B correct; C incorrect. 1 each. Only 1/3 correct in this small test; do not infer a reliable overall accuracy from three photos.'],['2','(d) Training data does not represent the new species/lighting (1); learned patterns may not transfer, causing misclassification (1).'],['1','(e) Add correctly labelled, varied examples from multiple species and lighting conditions. A specific change is required; “more data” alone is insufficient.']]),
 H2('Task 6 — choose and justify [6]'),
 w.marking('Suggested answers',[['3','Repair centre: expert system (1); clear manufacturer conditions can be encoded as facts and IF–THEN rules (1); maintain rules / refer unfamiliar faults to a technician / test known cases (1).'],['3','Recycling centre: machine learning (1); learns visual patterns from labelled waste images to classify new ones (1); use varied representative training and separate tests / human review of uncertain results (1).']]),
 P('Accept an alternative or hybrid only if its reasoning meets the scenario. Stretch example: ML classifies an image, then expert rules determine handling precautions; uncertain cases go to a human.'),
 H2('Exit ticket — suggested responses'),
 P('1. Inference engine. 2. It learns patterns from training examples and uses the trained model to predict a class for an unseen photo. 3. Wrong or missing rules/input; unrepresentative/incorrectly labelled training data; unfamiliar conditions.'),
 H2('Verification and source notes'),
 P('Checked against the supplied extract: AI characteristics (pp. 241–242), expert systems and setup (pp. 243–246), ML and examples (pp. 246–249). Official Cambridge question papers/mark schemes were not accessible during preparation; all questions and mark allocations above are original and suggested. No textbook artwork or uploaded source PDF is redistributed.'),
 P('Optional textbook extension: deep learning, printed pp. 250–251. This lesson does not require neural-network layers, narrow/general/strong AI categories, or calculation of model-training parameters.'));
 await w.build(K,file('Artificial_Intelligence_Answer_Key.docx'));
 if(!imageDir)throw new Error('Provide rendered slide image directory to build booklet');
 K=[];
 add(K,w.title('Artificial intelligence',subtitle+' | Student booklet'),P('Read the Learn sections, then attempt the tasks. Do Task 1 from memory before turning the page. Task 6 is extension/homework.'),tasks[0]());
 const learnPage = title => {
  const d=require('docx');
  return new d.Paragraph({pageBreakBefore:true,keepNext:true,spacing:{before:0,after:140},shading:{type:d.ShadingType.CLEAR,fill:'FFF4C7',color:'auto'},border:{left:{style:d.BorderStyle.SINGLE,size:24,space:6,color:'FFD84D'}},children:[new d.TextRun({text:'Learn   ',bold:true,color:w.COL.navy,size:26}),new d.TextRun({text:title,bold:true,size:26})]});
 };
 const image=(n,caption,width=690)=> {
  const filename=path.join(imageDir,`s-${String(n).padStart(2,'0')}.jpg`);
  if(width===690)return w.slideImage(filename,`Slide ${n} — ${caption}`);
  const d=require('docx');
  return [new d.Paragraph({keepNext:true,alignment:d.AlignmentType.CENTER,spacing:{after:60},children:[new d.ImageRun({type:'jpg',data:fs.readFileSync(filename),transformation:{width,height:Math.round(width*7.5/13.333)}})]}),P([[`Slide ${n} — ${caption}`,{italics:true,color:w.COL.grey,size:18}]],{after:160})];
 };
 add(K,learnPage('What AI means'),image(4,'What makes a system AI?'),image(6,'AI: a family of approaches'),tasks[1]());
 add(K,learnPage('Expert systems'),image(7,'Expert systems: expertise on tap'),image(8,'Inside an expert system'),tasks[2]());
 add(K,learnPage('Using and checking expert advice'),image(12,'Build and test an expert system',580),tasks[3]());
 add(K,learnPage('Machine learning'),image(14,'Machine learning: learn a pattern'),image(15,'Training is not the final test'),tasks[4]());
 add(K,learnPage('Compare the approaches'),image(18,'Rules or learned patterns?'),tasks[5]());
 add(K,learnPage('Review'),image(21,'Spot the misconception'),P('Look back at your answers. Correct one misconception in your own words.'),lines(3),H2('Exit ticket'),P('1. Name the component that applies stored rules to the user’s facts.'),lines(1),P('2. Explain how a trained image classifier can classify a photo it has never seen.'),lines(3),P('3. Give one reason why either system could make a wrong decision.'),lines(1));
 await w.build(K,file('Artificial_Intelligence_Student_Booklet.docx'));
}
(async()=>{if(process.argv[2]==='deck')await deck();else if(process.argv[2]==='documents')await documents(process.argv[4]);else throw new Error('Use deck OUTPUT or documents OUTPUT IMAGES');})().catch(err=>{console.error(err);process.exitCode=1;});
