// Rebuild: node ai.js deck OUTPUT; render slides; node ai.js documents OUTPUT IMAGES.
const fs=require('fs'), path=require('path');
const L=require('../../skills/comp-sci-lesson-maker/scripts/lib.js');
const w=require('../../skills/comp-sci-lesson-maker/scripts/wslib.js');
const d=require('docx');
const Q=require('./encryption-exam-questions.json');
const photos=require('./assets/encryption/photos/credits.json');
const output=path.resolve(process.argv[3]||'0478 P1/Symmetric and Asymmetric Encryption');
fs.mkdirSync(output,{recursive:true});
const file=n=>path.join(output,n);
const subtitle='IGCSE Computer Science 0478 | 2.3 Encryption';
const source='Core source: teacher-supplied Hodder extract, printed pp.63–66, and Cambridge 0478 section 2.3. Eight practice parts are adapted from published 2024–2025 questions; 17 official marks retained. Original activities use suggested marks. The textbook quantum extension is outside this core lesson.';
const pres=L.newDeck('Symmetric and asymmetric encryption');
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
 text(s,'IGCSE 0478  /  ENCRYPTION',.65,7.08,6,.18,8,{color:dark?'CECBDC':C.muted});
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
 const opts={path:path.join(__dirname,'assets/encryption/photos',id+'.jpg'),x,y,w:ww,h:ww*p.height/p.width,altText:p.title.replaceAll('_',' ')};
 if(crop)opts.sizing={type:'crop',w:ww,h:hh};
 else {opts.w=Math.min(ww,hh*p.width/p.height);opts.h=opts.w*p.height/p.width;opts.x+= (ww-opts.w)/2;opts.y+=(hh-opts.h)/2;}
 s.addImage(opts);
 const bounds=crop?{x,y,w:ww,h:hh}:opts;
 const author={'medical':'Jason T. Poplin / US Navy','phone':'Maurizio Pesce','atm':'Rfc1394'}[id]||p.author;
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
function token(s,label,x,y,ww=2.8,color=C.purple) {panel(s,x,y,ww,.65,color);text(s,label,x+.1,y+.14,ww-.2,.4,18,{bold:true,color:'FFFFFF',align:'center'});}
function block(s,title,body,x,y,ww,hh=1.6) {panel(s,x,y,ww,hh);text(s,title,x+.2,y+.15,ww-.4,.45,22,{bold:true,color:C.purple});text(s,body,x+.2,y+.77,ww-.4,hh-.9,21);}
function caesar(t,key){return t.replace(/[A-Z]/g,c=>String.fromCharCode(65+(c.charCodeAt(0)-65+key+26)%26));}
async function deck(){
 let s=slide('cover','Symmetric and asymmetric encryption','Explore · understand · apply','Opening scenario: data passes through networks operated by others. Ask what happens if somebody copies the message. Teach concepts before exam questions. 60-minute selected route; full pack with follow-up practice.',[],true);
 photo(s,'cafe',6.6,1.95,6.05,4.55,{dark:true});
 text(s,'Your message crosses\nother people’s networks.',.65,2.25,5.4,1.6,33,{bold:true,color:'FFFFFF'});
 text(s,'Who should be able\nto understand it?',.65,4.6,5.3,1.1,27,{color:'DCD9E9'});
 text(s,'2.3  /  PLAINTEXT · CIPHERTEXT · KEYS',.65,6.24,5.4,.4,11,{bold:true,color:C.yellow});
 s=slide('recall','Recall: how does a message travel?','Starter · data transmission','Task 1: original retrieval from the existing packet-switching lesson. Choose (a), (b), (c) in five minutes. Header fields: originator/destination/packet number. Routers decide next hop. Checksums detect errors, not confidentiality.');
 [['A','Name packet part 1.'],['B','Name packet part 2.'],['C','Name packet part 3.']].forEach(([a,b],i)=>block(s,a,b,.65+4.15*i,2,3.7,1.8));
 text(s,'What routes the packet?',.8,4.4,5.8,.7,27,{bold:true});text(s,'What helps reassemble it?',6.95,4.4,5.7,.7,27,{bold:true});
 note(s,'A correctly delivered packet can still contain data that somebody else can read.');
 s=slide('purpose','Some information should stay confidential','Understand · purpose','Encryption protects confidentiality when data is copied/intercepted. Sensitive examples: medical, bank, legal details. Photograph depicts historical paper medical records, not a particular encryption implementation.');
 photo(s,'medical',.65,1.95,6.1,3.9);
 text(s,'A medical summary\nis being transmitted.',7.35,2.05,5.3,1.15,29,{bold:true});
 text(s,'Encryption makes the data\nunintelligible to someone\nwithout the appropriate key.',7.35,3.8,5.3,1.55,24);
 note(s,'It protects the meaning of intercepted data. It does not prevent the interception itself.');
 s=slide('plaintext','Before and after encryption','Understand · vocabulary','Plaintext is the original intelligible data. Ciphertext is the encrypted data. Both plain text/plaintext and cipher text/ciphertext used in papers. The phone photograph represents a device sending a message, not the example’s actual sender.');
 photo(s,'phone',.65,1.95,5.0,3.1);
 block(s,'PLAINTEXT','MEET AT NINE',6.25,1.95,6.4,1.4);block(s,'CIPHERTEXT',caesar('MEET AT NINE',3),6.25,3.9,6.4,1.4);
 text(s,'A message sent from a phone',.65,5.45,5,.4,20,{bold:true,color:C.purple,align:'center'});
 note(s,'The example uses a simple letter shift so we can see the transformation. It is not a secure cipher.');
 s=slide('algorithm','An algorithm and a key do different jobs','Understand · mechanism','Algorithm = method/procedure. Key = value supplied to the algorithm. Avoid the inaccurate 2025 Q6(a) phrasing calling the encryption key a type of algorithm. Key examples are illustrative; real cryptographic keys are not passwords by definition.');
 photo(s,'laptop',.65,1.95,4.7,3.85,{crop:false});
 block(s,'ALGORITHM','Shift each letter through the alphabet.',5.95,1.95,6.7,1.55);block(s,'KEY','How far to shift: 3 places.',5.95,3.95,6.7,1.55);
 note(s,'Same method + a different key → a different ciphertext.');
 s=slide('toy','Try a transformation you can follow','Explore · toy cipher','Worked example key3; worksheet uses different plaintext and key4. Wrap after Z. Caesar cipher is a visual demonstration only, not recommended security. Spaces preserved.');
 table(s,[['Plain letter','M','E','E','T'],['Shift forward','+3','+3','+3','+3'],['Cipher letter','P','H','H','W']],[3.6,2.1,2.1,2.1,2.1],2.1,25,1.0);
 text(s,'MEET  →  PHHW',.8,5.5,11.7,.5,30,{bold:true,color:C.purple,align:'center'});
 note(s,'Now reverse the operation. What should happen to P, H, H and W?');
 s=slide('reverse','Decryption reverses the transformation','Understand · recover the plaintext','Use same key value3; encrypt shift forward3, decrypt shift backward3. The reversed operation does not mean that this toy cipher uses a second secret key. Real algorithms are more complex.');
 block(s,'ENCRYPT','MEET → PHHW',.65,2.15,5.7,1.6);block(s,'DECRYPT','PHHW → MEET',6.95,2.15,5.7,1.6);
 token(s,'Key value: 3',2.0,4.25,3);token(s,'Key value: 3',8.3,4.25,3);
 note(s,'Same key value. The decryption algorithm reverses what encryption did.');
 s=slide('symmetric','Symmetric: both ends use the same key','Understand · symmetric encryption','An encryption algorithm uses a shared secret key. Sender and receiver both know it. Same key encrypts/decrypts. Do not introduce exam allocations here.');
 block(s,'SENDER','Plaintext → ciphertext',.65,2.15,4.4,1.6);block(s,'RECEIVER','Ciphertext → plaintext',8.25,2.15,4.4,1.6);
 arrow(s,5.25,2.95,8.05,2.95);text(s,'Ciphertext travels',5.15,3.35,3.0,.45,17,{align:'center'});
 token(s,'Shared secret key K',.85,4.35,4.0);token(s,'The SAME key K',8.45,4.35,4.0);
 note(s,'The ciphertext may be copied. Keep the shared secret key protected.');
 s=slide('key-sharing','The difficult part: sharing the secret','Understand · key distribution','Symmetric key distribution is a problem if a secret is sent over an insecure channel. Teach protected transfer/established secure methods, not sending a secret beside the ciphertext in plaintext. Photo is representative routing hardware.');
 photo(s,'router',.65,1.95,5.5,3.9,{crop:false});
 text(s,'Both people need K.',6.8,2.05,5.85,.75,29,{bold:true});
 text(s,'If an eavesdropper gets\nboth the ciphertext and K,\nwhat can they recover?',6.8,3.35,5.85,1.5,25);
 note(s,'The key needs a protected way to reach the receiver; transmitting the secret openly defeats the protection.');
 s=slide('interception','Receiving a copy is not understanding it','Apply · confidentiality','Check: encryption does not stop packets being captured. Distinguish confidentiality from checksum error detection. Show simplified network flow, not actual cryptographic protocol.');
 block(s,'SENDER','Encrypts the data',.65,2.1,3.4,1.55);block(s,'NETWORK','Carries ciphertext',4.95,2.1,3.4,1.55);block(s,'RECEIVER','Decrypts with the key',9.25,2.1,3.4,1.55);
 arrow(s,4.15,2.8,4.85,2.8);arrow(s,8.45,2.8,9.15,2.8);arrow(s,6.65,3.9,6.65,4.5);
 block(s,'EAVESDROPPER','May obtain a copy of ciphertext.',3.6,4.65,6.1,1.35);
 note(s,'A checksum checks whether data changed. Encryption protects the original meaning.');
 s=slide('asymmetric','Asymmetric: a matching pair of keys','Understand · asymmetric encryption','Public key can be shared; private key kept by owner. Keys mathematically linked; deriving private from public should be computationally infeasible with suitable cryptography. Do not repeat textbook’s absolute claim that neither key can be derived from the other. Photograph is representative remote working.');
 photo(s,'remote',.65,1.95,4.15,3.9,{crop:false});
 block(s,'PUBLIC KEY','Made available to others.',5.4,1.95,7.25,1.4);block(s,'PRIVATE KEY','Kept secret by its owner.',5.4,3.85,7.25,1.4);
 note(s,'Publishing the public key does not mean publishing the private key.');
 s=slide('recipient','To Ben: use Ben’s key pair','Understand · key ownership','Worked confidentiality example Aisha→Ben. Ben creates matching public/private keys. Aisha obtains Ben’s public key. She encrypts with it; Ben decrypts with his private. For real applications, authenticate whose public key it is; authenticity mechanisms outside core.');
 block(s,'AISHA','Wants to send a file to Ben.',.65,2.1,4.4,1.4);block(s,'BEN','Owns the matching key pair.',8.25,2.1,4.4,1.4);
 token(s,'Ben’s PUBLIC key',8.45,3.85,4.0);arrow(s,8.1,4.18,5.25,4.18);text(s,'May be shared',5.15,4.65,3,.45,18,{align:'center'});
 token(s,'Ben’s PRIVATE key',8.45,5.0,4.0,'2E7D5B');
 note(s,'Aisha needs Ben’s public key. She does not need Ben’s private key.');
 s=slide('asym-flow','Send ciphertext; keep the private key','Understand · worked process','Use the receiver’s public key to encrypt and receiver’s matching private key to decrypt. This is confidentiality, not digital signatures. Names differ from worksheet Maya/Leo.');
 points(s,['Ben creates a matching public/private key pair.','Ben shares his public key with Aisha.','Aisha encrypts the file using Ben’s public key.','She sends the ciphertext to Ben.','Ben decrypts it using his private key.'],.8,1.95,11.7,.76,22);
 note(s,'The private key stays with Ben throughout the exchange.');
 s=slide('reply','A reply needs the other person’s keys','Apply · two-way messages','Before revealing prompt answer in notes, ask who owns keys when Ben replies to Aisha: Aisha publishes her public key; Ben uses Aisha public to encrypt; Aisha decrypts with her own private. Both need own pairs for two-way confidentiality.');
 block(s,'AISHA → BEN','Ben’s public key encrypts.\nBen’s private key decrypts.',.65,2.05,5.7,2.0);
 block(s,'BEN → AISHA','Whose public key encrypts?\nWhose private key decrypts?',6.95,2.05,5.7,2.0);
 text(s,'Follow the recipient, not the original sender.',.8,5.15,11.7,.7,29,{bold:true,color:C.purple,align:'center'});
 note(s,'Explain the reply without using “the key” when its owner or type matters.');
 s=slide('compare','Same goal; different key arrangements','Consolidate · before practice','Contrast actual methods, not universal security ranking. Symmetric shared secret; asymmetric public/private pair. Real systems often combine methods; this is contextual note, not required 0478 mechanism.');
 table(s,[['Feature','Symmetric','Asymmetric'],['Keys','One shared secret key','A public/private pair'],['Encrypt','Shared secret key','Recipient’s public key'],['Decrypt','The same shared key','Recipient’s private key'],['Share / protect','Both ends need the secret securely','Share public; keep private secret']],[2.5,4.75,4.75],1.95,20,.79);
 note(s,'Both transform plaintext into ciphertext using an algorithm and key(s).');
 s=slide('check','Explain a new situation before practising','Check understanding','Photo of ATM represents sensitive financial data, not a claimed particular cryptographic implementation. Ask original unmarked checks before exam framing; answer notes: encryption protects confidentiality, not interception; chosen recipient public key; recipient private to decrypt.');
 photo(s,'atm',.65,1.95,3.7,3.9,{crop:false});
 points(s,['Someone captures transmitted account data. Does encryption prevent that copy?','A bank is the recipient. Whose public key is needed?','Who should keep the matching private key?'],5.0,2.05,7.65,1.1,23);
 note(s,'Explain the mechanism. Then use its terms precisely.');
 s=slide('practice','Now turn the ideas into clear answers','Exam practice · transition','Concepts and original understanding checks completed. Tasks2–5 selected exam/original practice; Task6 follows as original repair bank. 17 published marks +34 suggested marks overall. Full pack not required in one hour.',[],true);
 text(s,'Name what changes.\nExplain which key is used.\nIdentify who owns it.',.8,2.1,11.7,2.25,36,{bold:true,color:'FFFFFF'});
 text(s,'Read the question’s scope.\nGive distinct ideas rather than repeating “secure”.',.8,5.1,11.7,.9,24,{color:'DCD9E9'});
 promptSlide('purpose-practice','Explain the purpose',[question('purpose')],'Task2: define terms, answer cited purpose question and explain why interception is not prevented. Attempt before feedback.');
 s=feedback('purpose-feedback','Meaning can be protected after interception',question('purpose'),['The intercepted data cannot be understood without the appropriate key.'],'“It cannot be intercepted” confuses delivery with confidentiality.');
 block(s,'INTERCEPTED','Ciphertext can still be copied.',.8,3.5,5.65,1.5);block(s,'MEANING PROTECTED','Original meaning stays protected.',6.65,3.5,5.65,1.5);
 promptSlide('sym-practice','Explain symmetric encryption',[question('symmetric')],'Attempt Task3(a) before feedback. Task3(b) toy cipher uses different values from teaching example.');
 feedback('sym-feedback','The same-key point is essential',question('symmetric'),['Plaintext is transformed into ciphertext.','An encryption algorithm performs the transformation.','The algorithm uses a shared secret key.','The receiver uses the SAME key to decrypt.'],'The scheme requires the same-key idea, plus up to three other accepted points.');
 promptSlide('asym-practice','Choose the correct terms',[question('cloze')],'Task4(a) four-gap paragraph is printed on worksheet/booklet. Then annotate the different Maya/Leo direction scenario independently. Do not show matching answer until attempted.');
 feedback('asym-feedback','Check the four terms and their roles',question('cloze'),['Plaintext: original understandable data.','Ciphertext: encrypted data.','Public key: used to encrypt for its owner.','Private key: used by the recipient to decrypt.'],'For a confidential message to Leo: Leo’s public key → Leo’s private key.');
 promptSlide('compare-practice','Make a comparison, not two vague claims',[question('compare'),question('similarity')],'Task5 has comparison, similarity, reason for asymmetric, a one-selection MC item and naming the other method. Use remaining parts as follow-up if time short.');
 feedback('compare-feedback','State both the arrangement and its use',question('compare'),['Symmetric uses one shared key.','That same key is used to encrypt and decrypt.','Asymmetric uses a different public/private pair.','Public encrypts; private decrypts in this confidentiality context.'],'The four-mark scheme accepts four distinct points, including key sharing/ownership alternatives.');
 s=slide('repair','Find the mistake; repair the mechanism','Apply · follow-up','Task6 original claim repairs with suggested marks. Answers: encryption does not prevent interception; symmetric same key; encrypt for recipient with their public; public alone cannot decrypt ciphertext encrypted for owner. Do before sharing teacher key.');
 table(s,[['Claim','Your job'],['“Encryption stops interception.”','Separate copying data from understanding it.'],['“Symmetric needs a different decryption key.”','Explain same key vs reversed operation.'],['“Encrypt for Leo with Maya’s public key.”','Identify the recipient and correct owner.'],['“Everyone who has Leo’s public key can decrypt.”','Identify which matching key must remain secret.']],[7.5,4.5],1.95,21,.83);
 note(s,'Use precise terms and ownership. Do not replace an error with another vague claim.');
 s=slide('exit','One file; one recipient; the right keys','Plenary','Original exit answers in notes: senderSam needsPriya publickey; Priyaprivate decrypt; symmetricshareonekeybothends; encryptioncannotstopinterception.');
 points(s,['Sam sends a confidential file to Priya. Which key encrypts it?','Which key decrypts it, and who keeps it?','Would encrypting the file stop someone copying the transmitted data?'],.8,2.1,11.7,1.12,25);
 note(s,'If you can name the owner, type and job of each key, you can transfer the explanation.');
 for(let start=0;start<photos.length;start+=5){
  s=slide('credits-'+start,'Photographs: sources and licences','References','Actual Commons photographs. Resized/recompressed; some aspect-preserving crops. No subject alterations. Full photographer names/URLs included here and in notes.');
  photos.slice(start,start+5).forEach((p,i)=>{let y=1.85+i*.91;text(s,p.id.toUpperCase()+' · '+p.author+' · '+p.license,.65,y,12,.38,12,{bold:true,color:C.purple});text(s,'Photograph source · Wikimedia Commons',.65,y+.43,12,.23,10,{color:C.muted,hyperlink:{url:p.source}});text(s,'Licence terms · '+p.license,.65,y+.68,12,.23,10,{color:C.muted,hyperlink:{url:p.licenseUrl}});});
 }
 s=slide('sources','The scope and sources behind the lesson','References','PDFcorepp63–66;2026–28official0478 2.3 purpose andsym/asym. Eightselectedparts17marks. SeeEncryption_Exam_Coverage.md forofficiallinks, allocations and wording issues.');
 table(s,[['Source','Use'],['Teacher-supplied Hodder extract, pp.63–66','Purpose, terminology, shared key, public/private pair.'],['0478 syllabus, section 2.3','Encryption purpose and symmetric/asymmetric operation.'],['2024–2025 published QPs and schemes','Eight adapted parts retaining 17 official marks.'],['Scope','No quantum physics, RSA mathematics or digital-signature algorithms.']],[4.5,7.5],1.95,19,.86);
 note(s,'Original activities are marked as suggested; official questions retain their cited allocations.');
 await pres.writeFile({fileName:file('IGCSE_0478_Lesson_-_Symmetric_and_Asymmetric_Encryption.pptx')});
 fs.writeFileSync(file('slide-map.json'),JSON.stringify(ids,null,2));fs.writeFileSync(file('photo-usage.json'),JSON.stringify(usedPhotos,null,2));
 console.log(n+' slides; '+usedPhotos.length+' distinct photos; concepts before slide '+ids.practice);
}
function answerLines(count){return Array.from({length:count},(_,i)=>new d.Paragraph({keepNext:i<count-1,spacing:{before:150,after:i===count-1?80:0},tabStops:[{type:d.TabStopType.RIGHT,position:w.W,leader:'underscore'}],children:[new d.TextRun({text:'\t',color:w.COL.line,size:21})]}));}
const add=(K,...xs)=>xs.flat(Infinity).forEach(x=>K.push(x));
const titles={1:'Recall: data transmission',2:'Meaning and purpose',3:'Symmetric encryption',4:'Public and private keys',5:'Compare and choose',6:'Repair the explanation'};
const totals={1:12,2:5,3:8,4:10,5:8,6:8};
function heading(K,num,page=false){add(K,w.H('Task '+num+'   '+titles[num],'['+totals[num]+' marks]',{pageBreak:page}));}
function prompt(K,t,count=3){add(K,w.P(t,{before:120,keepNext:true}),answerLines(count));}
function exam(K,id,label,lines=3){const q=question(id);add(K,w.P(label+' '+q.prompt+' ['+q.marks+']',{before:120,keepNext:true}),w.P(q.citation+' — adapted',{keepNext:true,run:{size:18,color:w.COL.grey,italics:true}}));if(id==='cloze')add(K,w.P('Word bank: plaintext, ciphertext, public key, private key, certificate, symmetric, protected.',{keepNext:true}),w.P('A: __________________ becomes B: __________________ using C: __________________. The receiver recovers the original data using D: __________________.'));else add(K,answerLines(lines));}
function task(K,num,page=false){
 heading(K,num,page);
 if(num===1){add(K,w.I('Original closed-book retrieval from 2.1 Packet switching. Suggested marks. Use (a)–(c) if time is short.'));prompt(K,'(a) Name the three parts of a packet. [3]',2);prompt(K,'(b) Name three items found in a packet header. [3]',2);prompt(K,'(c) Describe how a router decides where to send a packet next. [2]',2);prompt(K,'(d) Explain how packets arriving out of order can be reassembled. [2]',2);prompt(K,'(e) What does a checksum help detect? Does it prevent other people reading the data? [2]',2);}
 if(num===2){add(K,w.I('Parts (a) and (c) are original with suggested marks; (b) retains its published allocation.'));prompt(K,'(a) Define plaintext and ciphertext. [2]',2);exam(K,'purpose','(b)',2);prompt(K,'(c) Explain why an encrypted message may still be intercepted without revealing the original information. [2]',3);}
 if(num===3){add(K,w.I('Part (a) retains its published allocation. Part (b) is an original illustration, not a secure cipher.'));exam(K,'symmetric','(a)',6);add(K,w.P('(b) Use a letter-shift algorithm with key value 4. Preserve spaces and wrap after Z. The decryption operation reverses the shift. [4]',{keepNext:true}));prompt(K,'(i) Encrypt BRING MAP. One mark for each correctly encrypted word. [2]',2);prompt(K,'(ii) Decrypt XLMW. [1]',1);prompt(K,'(iii) State the key value used for decryption, and explain why it is still symmetric. [1]',2);}
 if(num===4){add(K,w.I('Part (a) is adapted from a real four-mark question. Part (b) is original, with six suggested marks.'));exam(K,'cloze','(a)');add(K,w.P('(b) Maya sends a confidential file to Leo using asymmetric encryption. Leo generates a matching key pair. Complete the table. One mark for each correct owner/type cell. [4]',{keepNext:true}),w.table([['Operation','Key owner','Key type'],['Maya encrypts the file','________________','________________'],['Leo decrypts the file','________________','________________']],[4400,2900,2900],{rowH:420}));prompt(K,'Which one of Leo’s keys may he make available to Maya and other senders? [1]',1);prompt(K,'Does Maya need Leo’s private key to send him the encrypted file? Explain your answer. [1]',2);}
 if(num===5){add(K,w.I('All parts retain published Cambridge allocations. Attempt independently before model answers.'));exam(K,'compare','(a)',6);exam(K,'similarity','(b)',2);exam(K,'reason','(c)',2);exam(K,'tick','(d)',1);exam(K,'other','(e)',1);}
 if(num===6){add(K,w.I('Original follow-up practice. For each claim, identify the error and correct it. Two suggested marks per claim.'));['Encryption stops someone intercepting the transmitted data.','Symmetric encryption needs a different secret key for decryption.','Maya should encrypt a confidential message for Leo using Maya’s public key.','Anyone with Leo’s public key can decrypt the confidential message encrypted for him.'].forEach((t,i)=>prompt(K,'('+String.fromCharCode(97+i)+') '+t+' [2]',3));}
}
function newPage(title){return new d.Paragraph({pageBreakBefore:true,keepNext:true,spacing:{before:0,after:140},shading:{type:d.ShadingType.CLEAR,fill:'FFF4C7',color:'auto'},border:{left:{style:d.BorderStyle.SINGLE,size:24,space:6,color:'FFD84D'}},children:[new d.TextRun({text:title,bold:true,color:w.COL.navy,size:26})]});}
function image(images,id,caption,width=690){let num=ids[id];if(!num)throw Error('Missing slide '+id);return [new d.Paragraph({keepNext:true,alignment:d.AlignmentType.CENTER,spacing:{after:60},children:[new d.ImageRun({type:'jpg',data:fs.readFileSync(path.join(images,`s-${String(num).padStart(2,'0')}.jpg`)),transformation:{width,height:Math.round(width*7.5/13.333)}})]}),w.P([[`Slide ${num} — ${caption}`,{italics:true,color:w.COL.grey,size:18}]],{after:160})];}
function creditsDoc(K){
 add(K,newPage('Sources and photograph credits'),w.P(source),w.P('Photographs show representative devices/settings. No claim is made about the pictured devices’ specific cryptography. Photos resized/recompressed with aspect-preserving crops in some slide placements; no subject alterations.'));
 photos.forEach(p=>add(K,w.P(p.id.toUpperCase()+' — '+p.author+' — '+p.license,{keepNext:true,after:20,run:{size:18,bold:true}}),new d.Paragraph({spacing:{after:95},children:[new d.ExternalHyperlink({link:p.source,children:[new d.TextRun({text:'Photograph source',style:'Hyperlink',size:16})]}),new d.TextRun({text:' · ',size:16}),new d.ExternalHyperlink({link:p.licenseUrl,children:[new d.TextRun({text:'Licence terms',style:'Hyperlink',size:16})]})]})));
 add(K,w.P('Question-by-question sources and marking notes: Encryption_Exam_Coverage.md in this lesson’s repository folder.'));
}
function originalKey(K,num){
 if(num===1)add(K,w.marking('Original retrieval — suggested marks',[
 ['3','(a) Header, payload, trailer. One each.'],['3','(b) Destination address, originator/sender address, packet number. One each.'],['2','(c) Reads the destination address; chooses an appropriate next hop/route. One each.'],['2','(d) Uses packet numbers; reorders/reassembles the packets in the correct sequence. One each.'],['2','(e) Detects changes/errors in data (1). Does not provide confidentiality or prevent reading (1).']]),w.I('Below 2/3 on packet parts or header fields: recap the existing packet-switching diagram before continuing.'));
 if(num===2)add(K,w.marking('Original parts — suggested marks',[
 ['2','(a) Plaintext: original/intelligible data (1). Ciphertext: encrypted data (1).'],['2','(c) Interception/copying is still possible (1). Ciphertext conceals the original meaning without the appropriate key (1).']]));
 if(num===3)add(K,w.marking('Original toy cipher — suggested marks',[
 ['2','(b)(i) FVMRK QET. One mark per word.'],['1','(b)(ii) THIS.'],['1','(b)(iii) Key value 4 for both encryption/decryption; the operation is reversed, not the secret key value. Both facts support the one-mark response.']]),w.I('Shift simulation was checked automatically. This is a demonstration, not a suitable real-world encryption algorithm.'));
 if(num===4)add(K,w.marking('Original key-ownership scenario — suggested marks',[
 ['4','(b) Maya encrypts: Leo / public. Leo decrypts: Leo / private. One per owner/type cell.'],['1','Leo’s public key.'],['1','No: Maya only needs Leo’s public key; Leo’s private key remains with Leo.']]),w.I('For a reply from Leo to Maya: use Maya’s public key to encrypt, Maya’s private key to decrypt.'));
 if(num===6)add(K,w.marking('Original repairs — two suggested marks each',[
 ['2','(a) Interception is still possible (1); encryption conceals the meaning from someone without the decryption key (1).'],['2','(b) The different-key claim is wrong (1); the same symmetric key decrypts, with the decryption operation reversing encryption (1).'],['2','(c) Wrong owner (1); Maya encrypts for Leo with Leo’s public key (1).'],['2','(d) Public key alone is not enough to recover the confidential message (1); the matching private key held by Leo is needed (1).']]));
}
async function documents(images){
 let K=[];add(K,w.title('Encryption — practice',subtitle+' | Student worksheet'),w.P('Recall data transmission, learn the concepts, then attempt the questions. There are 17 published marks and 34 suggested marks across the full pack. Use remaining questions and Task 6 for follow-up.'),w.I('No answers here. Explain the method, key type and key owner precisely.'));
 for(let num=1;num<=6;num++)task(K,num,num>1);
 await w.build(K,file('Encryption_Worksheet.docx'));
 K=[];add(K,w.title('Encryption — answer key',subtitle+' | Teacher copy',{noName:true}),w.keyBanner('Covers the identical numbered tasks in the worksheet and booklet. Official allocations are cited; original activity marks are suggested.'),w.P(source),w.P('60-minute route: 5 min selected Task 1; 10 min purpose/terminology/algorithm; 12 min symmetric encryption; 12 min asymmetric key ownership; 6 min understanding checks; 10 min selected practice; 5 min exit. Teach slides 1–16 before exam framing starts on slide 17. Use the remaining practice and Task 6 in follow-up.'));
 for(let num=1;num<=6;num++){
  heading(K,num,num>1);originalKey(K,num);
  Q.filter(q=>q.group===num).forEach(q=>{
   add(K,w.H2(q.citation+' ['+q.marks+']'),w.P('Mark scheme: '+q.markSchemeUrl,{keepNext:true,run:{size:16,color:w.COL.grey}}),w.P(q.prompt,{keepNext:true}),w.A('Model: '+q.model,{keepNext:true}),w.P('Watch for: '+q.trap,{keepNext:true,run:{size:19,italics:true,color:w.COL.grey}}));
   const scope=q.id==='symmetric'?'Required same-key point, plus any three other points':(['cloze','tick','other'].includes(q.id)?'One per required term/selection':'Any '+q.marks+' accepted point'+(q.marks>1?'s':''));
   add(K,w.marking('Published MS: '+scope+'; maximum '+q.marks,q.points.map(p=>['1',p])).slice(0,-1));
  });
 }
 add(K,newPage('Concept checks and teaching precision'),w.P('Original ATM checks: encryption does not prevent interception; the bank is the recipient, so its public key encrypts and its own private key decrypts. No secret key should be supplied to an eavesdropper.'),w.P('Algorithm and key: method versus value/parameter. The textbook’s key-shift example is a demonstration; use strong established cryptography for real systems. Decryption’s reverse operation does not imply a second symmetric key.'),w.P('The 2024 Nov/13 comparison scheme loosely says one/public key for symmetric and includes a general less-secure contrast. Teach shared SECRET key, not public key, and explain the concrete secret-key distribution issue. Modern systems can combine asymmetric establishment with symmetric bulk encryption.'),w.P('The 2025 Jun/11 Q6(a) cloze is not used here: it imprecisely calls an encryption key a type of algorithm and permits the reversed public/private pair. This lesson uses the unambiguous 2024 Jun/11 Q7 for confidential transmission: recipient’s public to encrypt, recipient’s private to decrypt. Digital signatures are outside scope.'),w.P('The supplied extract also includes quantum cryptography (from printed p.67). That extension is outside 0478 section 2.3 and is not assigned.'));
 creditsDoc(K);await w.build(K,file('Encryption_Answer_Key.docx'));
 if(!images)throw Error('Supply rendered images');Object.assign(ids,JSON.parse(fs.readFileSync(file('slide-map.json'))));
 K=[];add(K,w.title('Symmetric and asymmetric encryption',subtitle+' | Student booklet'),w.P('Do Task 1 from memory. Learn from the examples and discuss the checks before exam practice. Numbered task wording matches the worksheet exactly; the teacher has a separate key.'));
 task(K,1);
 add(K,newPage('Learn   Why encrypt?'),image(images,'purpose','Confidential information'),image(images,'plaintext','Plaintext and ciphertext'));
 add(K,newPage('Learn   A method and a value'),image(images,'algorithm','Algorithm versus key'),image(images,'toy','Worked letter-shift illustration'));
 add(K,newPage('Learn   Symmetric encryption'),image(images,'reverse','Reverse the operation using the same key value'),image(images,'symmetric','Both ends use the same secret key'));
 add(K,newPage('Learn   Interception and shared secrets'),image(images,'key-sharing','The key needs protected distribution'),image(images,'interception','A copy of ciphertext is not the original meaning'));
 add(K,newPage('Learn   Public and private keys'),image(images,'asymmetric','A matching pair'),image(images,'recipient','Keys belong to the recipient'));
 add(K,newPage('Learn   Send and reply'),image(images,'asym-flow','Aisha sends to Ben'),image(images,'reply','Use the other recipient’s pair for a reply'));
 add(K,newPage('Check understanding   Before practice'),image(images,'compare','Different key arrangements'),image(images,'check','Explain a new confidential transmission'));
 add(K,newPage('Practice   Use the mechanism precisely'),w.P('Read the question, name the correct key type and owner, and explain the relevant transformation. Attempt independently before feedback. Matching model-answer slides are omitted here.'));
 for(let num=2;num<=5;num++)task(K,num,num>2);
 task(K,6,true);
 add(K,newPage('Review   Explain the reply'),w.P('Sam sends a confidential file to Priya. Which key encrypts it? Which key decrypts it, and who keeps that key? Would encryption stop somebody copying the transmitted data?'),answerLines(6),w.P('Priya now replies to Sam. Explain which key pair is used, and who keeps the private key.'),answerLines(5));
 creditsDoc(K);await w.build(K,file('Encryption_Student_Booklet.docx'));
}
(async()=>{if(process.argv[2]==='deck')await deck();else if(process.argv[2]==='documents')await documents(process.argv[4]);else throw Error('Use deck OUTPUT or documents OUTPUT IMAGES');})().catch(e=>{console.error(e);process.exitCode=1;});
