const L = require('../../scripts/lib.js');
const { C, F } = L;
const SZ = require('./figs/sizes.json');
const pres = L.newDeck('Automated systems');

// picture fitted inside a box, keeping its aspect ratio, centred, with a light frame
function pic(s, name, x, y, w, h, o = {}) {
  const [pw, ph] = SZ[name]; const r = Math.min(w / pw, h / ph);
  const iw = pw * r, ih = ph * r, ix = x + (w - iw) / 2, iy = y + (h - ih) / 2;
  if (o.frame !== false) s.addShape(pres.shapes.RECTANGLE, { x: ix - 0.04, y: iy - 0.04, w: iw + 0.08, h: ih + 0.08, fill: { color: 'FFFFFF' }, line: { color: 'D8D8E4', width: 0.75 }, shadow: { type: 'outer', color: '000000', opacity: 0.12, blur: 4, offset: 2, angle: 90 } });
  s.addImage({ path: 'figs/' + name + '.png', x: ix, y: iy, w: iw, h: ih });
  if (o.cap) s.addText(o.cap, { x, y: iy + ih + 0.08, w, h: 0.28, fontFace: F.body, fontSize: 10, italic: true, color: C.grey, align: 'center', margin: 0, isTextBox: true });
}
function box(s, x, y, w, h, t, o = {}) {
  s.addText(t, { shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.08, x, y, w, h, fill: { color: o.fill || C.soft }, line: { color: C.navy, width: 1.25 },
    fontFace: F.body, fontSize: o.fs || 15, bold: true, color: o.color || C.dark, align: 'center', valign: 'middle', margin: 0.05 });
}
const TB = 'Images: Hodder Cambridge IGCSE Computer Science, Chapter 6.';
// scenario slide: picture left, how it works + pros/cons right
function scenario(num, title, pill, img, how, pros, cons, notes) {
  const s = L.base(pres, title, pill, num, notes);
  pic(s, img, 0.77, 1.4, 6.0, 3.3);
  L.stepCard(pres, s, 1, 'How it works', how, { x: 0.77, y: 4.95, w: 6.0, h: 1.5, ds: 12.5 });
  L.table(s, [['Advantages'], ...pros.map(p => [p])], { x: 7.1, y: 1.4, w: 5.5, colW: [5.5], rowH: 0.4, fontSize: 12.5 });
  L.table(s, [['Disadvantages'], ...cons.map(p => [p])], { x: 7.1, y: 1.6 + 0.4 * (pros.length + 1), w: 5.5, colW: [5.5], rowH: 0.4, fontSize: 12.5 });
  return s;
}

// 1 title with photo in the yellow panel
let s = L.titleSlide(pres, 'Automated systems', 'IGCSE Computer Science 0478  |  6.1',
  'Covers 0478 syllabus 6.1: how sensors, microprocessors and actuators work together in automated systems, and their advantages and disadvantages in industry, transport, agriculture, weather, gaming, lighting and science. Worksheet questions come from the 0478 question pack supplied (2024-2026 papers), with official marking points in the answer key.');
pic(s, 'welder', 8.95, 2.2, 4.1, 3.1);

// 2 recall
s = L.base(pres, 'Recall test: sensors (topic 3.2)', 'Starter activity', 2,
  'Worksheet Task 1, closed book, 5 minutes. Sensors were taught in 3.2; every 6.1 question assumes students can pick the right one. Two parts are real exam questions: 0478/12 Feb/March 2026 (drone) and 0478/13 Oct/Nov 2025 (air conditioning).');
L.table(s, [
  ['Worksheet Task 1 covers...', 'Marks'],
  ['Match six sensors to what they measure', '6'],
  ['State what is meant by a microprocessor (Feb/March 2026)', '1'],
  ['Is a sensor input, output, process or storage? (Oct/Nov 2025)', '1']
], { x: 0.98, y: 1.45, w: 8.6, colW: [7.4, 1.2], rowH: 0.55 });
pic(s, 'drone', 9.9, 1.45, 2.75, 1.8);
L.stepCard(pres, s, 1, 'Closed book', 'No notes or slides - 5 minutes, then swap and mark.', { x: 0.98, y: 3.95, w: 8.6, h: 1.0 });

// 3 objectives
s = L.base(pres, 'In this lesson, you will', 'Objectives', 3);
L.bullets(s, [
  'Define an automated system',
  'Describe how sensors, a microprocessor and actuators work together to control a process',
  'Choose suitable sensors for a given scenario',
  'Give advantages and disadvantages of automated systems in industry, transport, agriculture, weather, gaming, lighting and science',
  'Use exam technique to write full-mark answers for every type of 6.1 question'
], { x: 0.92, y: 1.6, w: 11.2, h: 4.4, fontSize: 18, paraSpaceAfter: 14 });

// 4 what is an automated system
s = L.base(pres, 'What is an automated system?', 'Activity 1', 4,
  'Mark scheme definition (0478/13 Oct/Nov 2024 Q5(a)): a system that can perform actions without human intervention. Stress that humans often still MONITOR and can OVERRIDE (nuclear plant supervisor, irrigation supervisor), but they are not needed for it to work.');
L.callout(s, 'An automated system is a combination of hardware and software that performs actions without human intervention.', { x: 0.96, y: 1.35, w: 11.3, h: 0.6, fontSize: 17, color: C.dark });
box(s, 0.96, 2.5, 2.8, 1.1, 'Sensor\n(input)', { fill: 'E3F2E8' });
box(s, 4.85, 2.5, 3.4, 1.1, 'Microprocessor\n(process)', { fill: C.soft });
box(s, 9.3, 2.5, 2.9, 1.1, 'Actuator\n(output)', { fill: 'FFF4C7' });
L.arrow(pres, s, 3.85, 3.05, 4.75, 3.05, C.navy, 3); L.arrow(pres, s, 8.35, 3.05, 9.2, 3.05, C.navy, 3);
s.addText('data', { x: 3.85, y: 2.65, w: 0.9, h: 0.3, fontFace: F.body, fontSize: 11, italic: true, color: C.grey, align: 'center', margin: 0, isTextBox: true });
s.addText('signal', { x: 8.3, y: 2.65, w: 0.9, h: 0.3, fontFace: F.body, fontSize: 11, italic: true, color: C.grey, align: 'center', margin: 0, isTextBox: true });
L.stepCard(pres, s, 1, 'Sensor', 'Takes readings from the surroundings and sends the data to the microprocessor.', { x: 0.96, y: 4.0, w: 3.6, h: 1.4 });
L.stepCard(pres, s, 2, 'Microprocessor', 'Processes the data and decides what to do, based on its program and stored values.', { x: 4.82, y: 4.0, w: 3.6, h: 1.4 });
L.stepCard(pres, s, 3, 'Actuator', 'Receives a signal and causes a physical action - turns a motor, opens a valve, switches a heater.', { x: 8.68, y: 4.0, w: 3.6, h: 1.4 });
L.callout(s, 'Humans may still monitor the system and override it - but it does not need them to run.', { x: 0.96, y: 5.75, w: 11.3, h: 0.5 });

// 5 sensors
s = L.base(pres, 'Choosing a sensor', 'Activity 1', 5,
  'The 0478 sensor list from topic 3.2. Exam favourites: proximity / infrared (drone, ATM, robot vacuum - official answer "infra-red // proximity"), temperature (air conditioning, weather), level (rainfall, irrigation), humidity, light. Always choose the sensor that measures what the scenario needs.');
L.table(s, [
  ['Sensor', 'Measures', 'Example'],
  ['Temperature', 'how hot or cold', 'air conditioning, weather station'],
  ['Infrared / proximity', 'how close an object is, or movement', 'drone, ATM, robot vacuum, security lights'],
  ['Light', 'light level', 'street and garden lights, weather (hours of daylight)'],
  ['Humidity', 'water vapour in the air', 'greenhouse, weather station'],
  ['Moisture', 'water in a substance, e.g. soil', 'irrigation'],
  ['Level', 'height of a liquid', 'rainfall gauge, tank, burette'],
  ['Pressure', 'force or pressure', 'weather (air pressure), burglar alarm mat'],
  ['Flow', 'rate a liquid or gas moves', 'pipes, nuclear cooling water'],
  ['Gas / pH', 'gas level / acidity', 'gas leak alarm / chemical process'],
  ['Accelerometer / acoustic / magnetic field', 'movement and tilt / sound / magnetism', 'games controller / voice / phone compass']
], { x: 0.9, y: 1.35, w: 11.5, colW: [3.4, 3.8, 4.3], rowH: 0.45, fontSize: 12.5 });

// 6 actuators
s = L.base(pres, 'Actuators and the ADC', 'Activity 1', 6,
  'Two small points that pick up marks: sensors usually produce analogue data, so it passes through an ADC before the microprocessor can use it; and the microprocessor itself never "turns the motor" - it sends a signal to an actuator which does.');
L.stepCard(pres, s, 1, 'Analogue to digital', 'Most sensors produce analogue data. An analogue-to-digital converter (ADC) turns it into digital data the microprocessor can process.', { x: 0.96, y: 1.4, w: 5.6, h: 1.7 });
L.stepCard(pres, s, 2, 'What an actuator does', 'It receives a signal from the microprocessor and causes movement or an action.', { x: 6.72, y: 1.4, w: 5.6, h: 1.7 });
L.table(s, [
  ['The actuator operates...', '...to do this'],
  ['a motor', 'move wheels, a drone\'s propellers, a robot arm'],
  ['a pump', 'move water (irrigation) or coolant (nuclear plant)'],
  ['a valve', 'open or close a pipe or burette tap'],
  ['a heater or cooler', 'change the temperature'],
  ['brakes / throttle / steering', 'control a car']
], { x: 0.96, y: 3.4, w: 11.3, colW: [4.0, 7.3], rowH: 0.48, fontSize: 13.5 });

// 7 control loop
s = L.base(pres, 'The control loop', 'Activity 2', 7,
  'This sequence is what every "explain how the sensor and microprocessor work together" mark scheme rewards (drone [4], air conditioning [3], ATM [3], weather alert [3], plough [3]). Students should be able to rewrite it for ANY scenario by changing the sensor, the stored value and the action.');
const steps = ['Sensor takes readings continually', 'Data converted to digital (ADC) and sent to the microprocessor', 'Microprocessor compares the data with a stored / preset value', 'If outside the range: signal sent to the actuator to take action', 'If within the range: no action is taken', 'The process repeats continuously'];
steps.forEach((t, i) => {
  const col = i < 3 ? 0 : 1, row = i % 3;
  L.stepCard(pres, s, i + 1, t, '', { x: 0.96 + col * 5.75, y: 1.4 + row * 1.15, w: 5.5, h: 0.95, hs: 14.5 });
});
L.callout(s, 'Exam rule: name the sensor, say what is compared with what, say what signal is sent to which actuator, and say it repeats.', { x: 0.96, y: 5.0, w: 11.3, h: 0.8 });

// 8 worked example ACC
s = L.base(pres, 'Worked example: adaptive cruise control', 'Activity 2', 8,
  'Walk through the flowchart, then the model answer. Point out how each sentence maps onto a step of the control loop on slide 7.');
pic(s, 'acc_car', 0.77, 1.35, 5.4, 1.35);
pic(s, 'acc_flow', 0.77, 2.95, 5.4, 3.5, { cap: TB });
L.text(s, 'Explain how the car keeps a safe distance from the vehicle in front. [4]', { x: 6.5, y: 1.35, w: 6.1, h: 0.6, bold: true, fontSize: 15 });
L.table(s, [
  ['Model answer - one mark per point'],
  ['Lasers / sensors in the bumper send out signals continually, which reflect off the vehicle in front'],
  ['The microprocessor uses the time taken for the signal to return to calculate the distance'],
  ['It compares the distance with the stored safe distance'],
  ['If it is less than the safe distance, it sends signals to actuators to apply the brakes / reduce the throttle'],
  ['If not, it compares the speed with the set speed and adjusts the throttle; the process repeats']
], { x: 6.5, y: 2.05, w: 6.1, colW: [6.1], rowH: 0.62, fontSize: 12.5 });

// 9-14 scenarios
scenario(9, 'Industry: nuclear power station', 'Activity 3', 'dcs',
  'Temperature, pressure, flow, gas and radiation sensors send data to a distributed control system (DCS). It compares them with stored values and sends signals to actuators to operate pumps, valves or an automatic shutdown. A supervisor can override.',
  ['Faster than a human to take action', 'Safer - keeps people away from danger', 'Runs at optimum conditions', 'Cheaper in the long run (fewer staff 24/7)'],
  ['Expensive to set up and test', 'Unforeseen conditions may not be handled', 'Risk of cyberattack', 'Needs enhanced, costly maintenance'],
  'Same pattern for paracetamol manufacture and bottling plants (textbook Example 2, Activity 6.1).');
scenario(10, 'Transport: self-parking cars', 'Activity 3', 'parking',
  'Sensors in the bumpers send signals that reflect off objects; the on-board computer uses the time taken to work out where objects are, then sends signals to actuators that control the steering, brakes and throttle.',
  ['Cars fit into smaller spaces', 'Fewer dents and scratches', 'Safer - stops if a new object (e.g. a child) appears', 'Very consistent results'],
  ['Driver may lose parking skills', 'Faulty or dirty sensors give false data', 'May not detect low kerbs', 'Expensive and needs maintenance'],
  'Also mention train signal control (sensors by the track, actuators apply brakes) and aircraft autopilot (flaps, throttle, rudder).');
scenario(11, 'Agriculture: automatic irrigation', 'Activity 3', 'irrigation',
  'Water level sensors in the fields send data by wireless to a controller, which also gets weather data. It decides whether to start or stop the pumps and sends signals to actuators. A supervisor monitors remotely.',
  ['Lower labour costs - one supervisor for vast areas', 'Better control of precious water', 'Faster than checking channels by hand', 'Safer - no work in 40 °C heat'],
  ['Expensive to set up', 'High maintenance; needs specialist technicians', 'Cannot detect a blocked or collapsed channel'],
  'The exam pack plough question (0478/13 Oct/Nov 2024) is another agriculture scenario.');
scenario(12, 'Weather: automated weather station', 'Activity 3', 'weather',
  'Temperature, humidity, wind speed, level (rainfall), light and pressure sensors send data to a microprocessor, which processes it and stores it in a database. The only actuator tips the rain-gauge bucket.',
  ['Collects data 24/7, including overnight', 'Works in remote places and harsh weather', 'Staff avoid a repetitive task', 'Creates maintenance jobs'],
  ['May de-skill employees', 'May replace jobs', 'Expensive to set up and maintain'],
  'Advantages and disadvantages here use the wording of 0478/13 May/June 2025 Q6(d)-(e): "to the employees" - answers must be from the employees\' point of view.');
scenario(13, 'Lighting and gaming', 'Activity 3', 'lighting',
  'Lighting: when the light sensor value shows it is dark, or the infrared sensor detects movement, the microprocessor switches the lights or fountain display on. Gaming: accelerometers detect tilt and proximity sensors detect finger position.',
  ['Lights only on when needed - less energy', 'Longer bulb life', 'Gaming feels more immersive and realistic'],
  ['Expensive to set up', 'Wireless links may be less reliable', 'Needs maintenance'],
  'Gaming is short in the textbook: accelerometers and proximity sensors with a microcontroller. Ask students for one advantage and one disadvantage of immersive consoles (Activity 6.6).');
scenario(14, 'Science: laboratory experiment', 'Activity 3', 'lab',
  'Level sensors measure the liquid added from the burette and a colorimeter checks the colour of the mixture. The microprocessor sends signals to an actuator that opens and closes the burette tap.',
  ['More consistent, repeatable results', 'Safer with hazardous chemicals', 'Several experiments at once', 'Monitored anywhere in real time'],
  ['Less flexible than human technicians', 'Security risk if data is shared', 'Expensive equipment'],
  'Good example of a non-obvious sensor (colorimeter). Exams will always describe an unfamiliar process - students just need to spot sensor, microprocessor and actuator.');

// 15 generic pros/cons
s = L.base(pres, 'Advantages and disadvantages', 'Activity 3', 15,
  'These generic points work for almost every scenario, but in the exam they must be applied. "Cheaper" alone is weak; "the farmer saves money on labour costs" is credited (0478/13 Oct/Nov 2024 Q5(c)).');
L.table(s, [
  ['Advantages', 'Disadvantages'],
  ['Faster to react than a human', 'Expensive to set up and test'],
  ['Safer - people kept away from danger', 'Needs regular, specialist maintenance'],
  ['Works 24/7 without breaks', 'Cannot cope with situations it was not programmed for'],
  ['More accurate and consistent results', 'Risk of cyberattack or system failure'],
  ['Saves labour costs in the long run', 'Can replace jobs / de-skill workers'],
  ['Frees people from boring, repetitive tasks', 'Faulty sensors give wrong data']
], { x: 0.96, y: 1.4, w: 11.3, colW: [5.65, 5.65], rowH: 0.58, fontSize: 14 });
L.callout(s, 'Always make it fit the scenario: who benefits (the farmer, the employees, the driver) and how.', { x: 0.96, y: 5.65, w: 11.3, h: 0.5 });

// 16 exam question types
s = L.base(pres, 'Exam technique: the question types', 'Exam technique', 16,
  'Every 6.1 question in the pack fits one of these. The command word and the marks tell students how much to write. All examples are from the supplied pack.');
L.table(s, [
  ['Question type', 'Marks', 'What to write', 'Example from the pack'],
  ['State what is meant by an automated system', '1', 'A system that performs actions without human intervention', 'Plough, Oct/Nov 2024'],
  ['Identify a sensor / tick the sensor', '1', 'One sensor that fits the scenario - name only', 'Drone, ATM, robot vacuum'],
  ['Give another component', '1', 'Microprocessor, actuator or storage', 'Weather station, May/June 2025'],
  ['Describe the role of the microprocessor', '3', 'Receives data, compares with a stored value, sends a signal to act', 'ATM, plough, air conditioning'],
  ['Explain how the sensor and microprocessor work together', '3-4', 'The full control loop applied to the scenario', 'Drone [4], weather alert [3]'],
  ['Give two advantages / one disadvantage', '1-2', 'Short points, from the point of view named in the question', 'Weather station, plough']
], { x: 0.9, y: 1.35, w: 11.5, colW: [3.5, 0.9, 4.3, 2.8], rowH: 0.68, fontSize: 12.5 });

// 17 role of microprocessor technique
s = L.base(pres, 'Role of the microprocessor', 'Exam technique', 17,
  'Model answer is for a greenhouse (not in the worksheet) so students can transfer the structure. Mark schemes repeatedly credit: receives data from the sensor; compares it with a stored/preset value; sends a signal to an actuator if outside range; no action if within range; repeats continuously.');
L.text(s, 'A greenhouse uses a temperature sensor and a microprocessor to keep the temperature at 25 °C. Describe the role of the microprocessor. [3]', { x: 0.96, y: 1.35, w: 11.3, h: 0.7, bold: true, fontSize: 15 });
L.table(s, [
  ['Weak answer (0-1 marks)', 'Strong answer (3 marks)'],
  ['"The microprocessor controls the temperature."', 'It receives the temperature data from the sensor (after ADC conversion).'],
  ['"It turns the heater on when it is cold."', 'It compares the reading with the stored value of 25 °C.'],
  ['"It makes sure the plants are OK."', 'If it is below 25 °C, it sends a signal to the actuator to switch the heater on; if it matches, no action. This repeats continuously.']
], { x: 0.96, y: 2.2, w: 11.3, colW: [4.6, 6.7], rowH: 0.75, fontSize: 13.5 });
L.callout(s, 'Use the key verbs: receives - compares - sends a signal - repeats. Always include the stored value from the question.', { x: 0.96, y: 5.3, w: 11.3, h: 0.7 });

// 18 advantages technique + linked topics
s = L.base(pres, 'Advantages and linked questions', 'Exam technique', 18,
  'Scenario questions usually continue into other topics: embedded systems (3.1), robotics (6.2), AI and machine learning (6.3), data transmission (2). The weather station question in the pack goes 6.1 -> 2.1 (serial simplex) -> 6.3 (machine learning). Recognise which topic each part is testing.');
L.stepCard(pres, s, 1, 'Answer from the right point of view', '"Give two advantages to the employees" - working overnight / outdoors / repetitive tasks, not "the company saves money".', { x: 0.96, y: 1.4, w: 5.55, h: 1.5, ds: 12.5 });
L.stepCard(pres, s, 2, 'One idea per mark', 'Two advantages = two different ideas. "Faster" and "quicker" are the same idea.', { x: 6.72, y: 1.4, w: 5.55, h: 1.5, ds: 12.5 });
L.text(s, 'One scenario, many topics - the weather station question (0478/13 May/June 2025):', { x: 0.96, y: 3.2, w: 11.3, h: 0.4, bold: true });
L.table(s, [
  ['Part', 'Asks about', 'Topic'],
  ['(a)-(c)(i)', 'Components, sensors, how the alert is detected', '6.1 automated systems'],
  ['(c)(ii)', 'Serial simplex transmission', '2.1 data transmission'],
  ['(d)-(e)', 'Advantages and disadvantages to employees', '6.1 automated systems'],
  ['(f)', 'Machine learning to predict weather', '6.3 artificial intelligence']
], { x: 0.96, y: 3.65, w: 11.3, colW: [1.6, 6.2, 3.5], rowH: 0.48, fontSize: 13 });

// 19 guided practice
s = L.base(pres, 'Guided practice', 'Activity 4', 19, 'About 25 minutes for Tasks 2-4; Task 5 is extension or homework.');
L.bullets(s, [
  'Task 2: definitions and choosing sensors',
  'Task 3: the control loop - drone, air conditioning, ATM, weather alert, plough',
  'Task 4: advantages and disadvantages in a scenario',
  'Task 5 (extension): embedded systems and a 6-mark greenhouse design',
  'Check your work against the answer key when your teacher shares it'
], { x: 0.96, y: 1.42, w: 6.6, h: 4.8, fontSize: 17, paraSpaceAfter: 14 });
pic(s, 'drone', 7.9, 1.45, 4.7, 2.0);
pic(s, 'sweeper', 7.9, 3.75, 4.7, 2.3);

// 20 misconceptions
s = L.base(pres, 'Common misconceptions', 'Plenary', 20);
L.table(s, [
  ['Misconception', 'Why it is wrong'],
  ['"The sensor decides what to do."', 'The sensor only takes readings. The microprocessor compares and decides.'],
  ['"The microprocessor turns the motor."', 'It sends a signal to an actuator, which causes the movement.'],
  ['"Automated means no humans are involved at all."', 'Humans often monitor and can override - they are just not needed to run it.'],
  ['"Sensors only turn on when something happens."', 'Sensors take readings continually; the process repeats.'],
  ['"It is cheaper" is enough for a mark.', 'Say who saves and how: "the farmer saves on labour costs".']
], { x: 0.77, y: 1.4, w: 11.8, colW: [4.7, 7.1], rowH: 0.72, fontSize: 14 });

// 21 exit
s = L.base(pres, 'Exit question', 'Plenary', 21,
  'Answers: 1 light sensor (accept infrared/motion for detecting people). 2 Sensor sends data continually; microprocessor compares with a stored light value; if it is darker than the stored value it sends a signal to switch the lights on; otherwise no action; repeats. 3 e.g. lights only on when needed so less energy is used; no one has to switch the lights on and off.');
L.callout(s, 'A school installs automatic lighting in the car park.', { x: 0.96, y: 1.55, w: 11.3, h: 0.5, fontSize: 19, color: C.dark });
L.callout(s, '1. Identify a suitable sensor. [1]', { x: 0.96, y: 2.3, w: 11.3, h: 0.5, fontSize: 18, color: C.dark });
L.callout(s, '2. Describe the role of the microprocessor. [3]', { x: 0.96, y: 2.95, w: 11.3, h: 0.5, fontSize: 18, color: C.dark });
L.callout(s, '3. Give one advantage to the school of using an automated system. [1]', { x: 0.96, y: 3.6, w: 11.3, h: 0.5, fontSize: 18, color: C.dark });

// 22 summary
s = L.base(pres, 'In this lesson, you', 'Summary', 22);
L.bullets(s, [
  'Defined an automated system: actions without human intervention',
  'Explained how sensors, a microprocessor and actuators work together in a control loop',
  'Chose suitable sensors for different scenarios',
  'Compared advantages and disadvantages across industry, transport, agriculture, weather, gaming, lighting and science',
  'Practised every type of 6.1 exam question using official marking points'
], { x: 0.96, y: 1.55, w: 11.26, h: 3.8, fontSize: 18, paraSpaceAfter: 14 });
L.callout(s, 'Next lesson: 6.2 robotics.', { x: 0.96, y: 5.4, w: 11.26, h: 0.5 });

pres.writeFile({ fileName: '/mnt/user-data/outputs/IGCSE_0478_Lesson_-_Automated_Systems.pptx' }).then(f => console.log('wrote', f));
