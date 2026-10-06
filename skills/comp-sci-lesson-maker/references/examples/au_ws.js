const w = require('../../scripts/wslib.js');
const { P, I, H, H2, table, code, lines, box, bullets, spacer } = w;
const K = [];
const add = (...x) => x.flat().forEach(e => K.push(e));
const part = (lab, txt, mk) => P([[lab + '  ', { bold: true }], txt, [mk ? '   ' + mk : '', { italics: true, color: w.COL.grey }]]);
const src = (t) => I(t);

add(w.title('Automated systems', 'IGCSE Computer Science 0478  |  6.1  |  Lesson worksheet'));

// ---------- Task 1
add(H('Task 1   Recall test - sensors', '[8 marks]'));
add(P([['Closed book. 5 minutes.', { bold: true }]]));
add(part('1', 'Identify the most suitable sensor for each use.', '[6]'));
add(table([
  ['Use', 'Sensor'],
  ['Keep the temperature of a room constant', ''],
  ['Detect a person standing within 1 metre of a machine', ''],
  ['Measure the amount of rain collected in a rain gauge', ''],
  ['Switch garden lights on when it gets dark', ''],
  ['Check whether the soil in a greenhouse is too dry', ''],
  ['Detect when a games controller is tilted', '']
], [7000, 3200], { rowH: 420 }));
add(spacer(100));
add(part('2', 'State what is meant by a microprocessor.', '[1]'));
add(src('0478/12 February/March 2026'));
add(lines(2));
add(part('3', 'An air-conditioning system uses a temperature sensor. Tick (✓) one box to show whether the sensor is an example of an input, output, process or storage device.', '[1]'));
add(src('0478/13 October/November 2025'));
add(table([['', 'Device', 'Tick (✓)'], ['A', 'input', ''], ['B', 'output', ''], ['C', 'process', ''], ['D', 'storage', '']], [800, 4000, 1600], { rowH: 360 }));

// ---------- Task 2
add(H('Task 2   Definitions and choosing sensors', '[6 marks]'));
add(part('(a)', 'A farmer has a plough that is an automated system. State what is meant by an automated system.', '[1]'));
add(src('0478/13 October/November 2024'));
add(lines(2));
add(part('(b)', 'A drone has a built-in system to stop it from crashing into objects, for example a tree. The system uses sensors and a microprocessor. Identify one sensor that could be built into the drone to detect if it is near an object.', '[1]'));
add(src('0478/12 February/March 2026'));
add(lines(1));
add(part('(c)', 'A robot vacuum cleaner uses sensors to navigate around obstacles in a room. Tick (✓) one box to show which sensor would be the most suitable for this purpose.', '[1]'));
add(src('0478/12 October/November 2024'));
add(table([['', 'Sensor', 'Tick (✓)'], ['A', 'proximity', ''], ['B', 'flow', ''], ['C', 'pressure', ''], ['D', 'level', '']], [800, 4000, 1600], { rowH: 360 }));
add(spacer(100));
add(part('(d)', 'A sensor is used to detect when a person stands within 1 metre of an automated teller machine (ATM). Identify an appropriate sensor for the ATM to use to detect a person.', '[1]'));
add(src('0478/12 February/March 2025'));
add(lines(1));
add(P('A weather station uses automated systems to collect and analyse data about the weather. The automated system uses sensors.', { before: 120 }));
add(part('(e)', 'Give one other component that would be part of the automated system.', '[1]'));
add(lines(1));
add(part('(f)', 'One sensor that is part of the automated system is a temperature sensor. Give one other sensor that could be part of the automated system.', '[1]'));
add(src('Parts (e) and (f): 0478/13 May/June 2025'));
add(lines(1));

// ---------- Task 3
add(H('Task 3   The control loop', '[16 marks]'));
add(I('Use the control loop: the sensor sends data - the microprocessor compares it with a stored value - it sends a signal to act (or takes no action) - it repeats.'));
add(part('(a)', 'Explain how the sensor and microprocessor work together to stop the drone crashing into an object.', '[4]'));
add(src('0478/12 February/March 2026'));
add(lines(5));
add(part('(b)', 'The air-conditioning system uses a temperature sensor and a microprocessor to keep the temperature of the room at a constant level. The temperature sensor continuously sends analogue data to the microprocessor. This data is then converted to digital. Explain how the microprocessor keeps the temperature of the room at a constant level.', '[3]'));
add(src('0478/13 October/November 2025'));
add(lines(4));
add(part('(c)', 'When a person is detected within 1 metre of the ATM, a welcome message is displayed on the screen. Describe the role of the microprocessor in detecting the person.', '[3]'));
add(src('0478/12 February/March 2025'));
add(lines(4));
add(part('(d)', 'An alert is sent to an employee in the weather office if a temperature above 40 °C is detected. Explain how a temperature above 40 °C is detected for the alert.', '[3]'));
add(src('0478/13 May/June 2025'));
add(lines(4));
add(part('(e)', 'The plough uses sensors and a microprocessor to maintain a straight line when digging the ground. Describe the role of the microprocessor in this process.', '[3]'));
add(src('0478/13 October/November 2024'));
add(lines(4));

// ---------- Task 4
add(H('Task 4   Advantages and disadvantages', '[9 marks]'));
add(part('(a)', 'Give two advantages to the weather station employees of using an automated weather system.', '[2]'));
add(lines(2));
add(part('(b)', 'Give one disadvantage to the weather station employees of using an automated weather system.', '[1]'));
add(src('Parts (a) and (b): 0478/13 May/June 2025'));
add(lines(1));
add(part('(c)', 'Give two benefits to the farmer of using an automated system to plough the field.', '[2]'));
add(src('0478/13 October/November 2024'));
add(lines(2));
add(part('(d)', 'A car has an automatic self-parking system. Give two advantages and two disadvantages of using this automated system.', '[4]'));
add(I('Exam-style question written for this lesson.'));
add(table([['Advantages', 'Disadvantages'], ['', ''], ['', '']], [5100, 5100], { rowH: 640 }));

// ---------- Task 5
add(H('Task 5   Extension - linked questions', '[10 marks]'));
add(I('Scenario questions often continue into embedded systems (topic 3.1).'));
add(part('(a)', 'The air-conditioning system is an example of an embedded system. Explain why the air-conditioning system is an embedded system.', '[2]'));
add(src('0478/13 October/November 2025'));
add(lines(3));
add(part('(b)', 'Describe the features of the ATM that identify it as an embedded system.', '[2]'));
add(src('0478/12 February/March 2025'));
add(lines(3));
add(part('(c)', 'A large greenhouse is used to grow tomatoes. For the best growth, the tomatoes need the right light level, the correct temperature and regular watering. Describe how an automated system could keep the correct growing conditions. The only human involvement is a remote supervisor.', '[6]'));
add(I('Based on textbook Activity 6.5, question 2.'));
add(lines(8));

w.build(K.splice(0), '/mnt/user-data/outputs/Automated_Systems_Worksheet.docx');

// ================= ANSWER KEY
add(w.title('Automated systems - Answer key', 'IGCSE Computer Science 0478  |  6.1  |  Teacher copy - not for students', { noName: true }));
add(w.keyBanner('Answers and marking points for every task on the worksheet and student booklet (same task numbers).'));
add(I('Marking points labelled "official" come from the published mark schemes in the supplied 0478 question pack, cited by paper. Answers labelled "suggested" are written for this lesson from the textbook (Hodder, Chapter 6.1) in mark-scheme style.'));

add(H2('Task 1 - answers [8]'));
add(P('1. [6] Suggested, 1 mark each: temperature; infrared / proximity; level; light; moisture; accelerometer.'));
add(P('2. [1] Official (0478/12 Feb/March 2026 Q3(b)(ii)), any one: an integrated circuit that performs all the functions of a CPU; an integrated circuit on a single chip; a single-chip processor / CPU.'));
add(P('3. [1] Official (0478/13 Oct/Nov 2025 Q1(e)(i)): A (input).'));

add(H2('Task 2 - answers [6]'));
add(P('(a) [1] Official (0478/13 Oct/Nov 2024 Q5(a)): a system that can perform actions without human intervention.'));
add(P('(b) [1] Official (0478/12 Feb/March 2026 Q3(b)(i)): proximity // infrared.'));
add(P('(c) [1] Official (0478/12 Oct/Nov 2024 Q8(a)): A (proximity).'));
add(P('(d) [1] Official (0478/12 Feb/March 2025 Q4(a)(i)): infrared / proximity.'));
add(P('(e) [1] Official (0478/13 May/June 2025 Q6(a)), any one: microprocessor; actuator; storage / memory.'));
add(P('(f) [1] Official (Q6(b)), any one, for example: humidity; light; level; infrared. Do not accept temperature (given in the question).'));

add(H2('Task 3 - answers [16]'));
add(P('(a) [4] Official (0478/12 Feb/March 2026 Q3(b)(iii)), any four:'));
add(bullets([
  'The sensor continually transmits digitised data to the microprocessor',
  'The microprocessor compares the received data to the stored data of an object / distance',
  'If the data is less than / greater than / matches the stored distance, the microprocessor transmits a signal to stop the drone in that direction',
  'If not, the drone continues / no action is taken',
  'An actuator is used to stop / change / control the drone',
  'The process repeats until the drone lands / is turned off'
]));
add(P('(b) [3] Official (0478/13 Oct/Nov 2025 Q1(e)(ii)), any three: the microprocessor compares the value from the sensor to a stored value; if the values do not match, the microprocessor sends a signal to increase or decrease the temperature; if the values match, no action is taken. (Accept: the process repeats continuously.)'));
add(P('(c) [3] Official (0478/12 Feb/March 2025 Q4(a)(ii)), any three: receives digital data continually from the sensor; uses the sensor data to calculate the distance to the person; compares the calculated / sensor data to the stored data / 1 m; if the comparison shows the person is within 1 m, it sends a signal to display the welcome message on the screen.'));
add(P('(d) [3] Official (0478/13 May/June 2025 Q6(c)(i)), any three: a microprocessor is used; the microprocessor receives data from the sensor; the microprocessor compares the data against the preset value of 40; if the data is greater than 40, the microprocessor sends a signal to trigger the alert.'));
add(P('(e) [3] Official (0478/13 Oct/Nov 2024 Q5(b)): it receives data from the sensor; it analyses the data // checks if the data is within / out of a range; it sends signals to trigger actions based on the data.'));
add(I('Common reasons for lost marks: saying the sensor "decides"; leaving out the comparison with a stored value; saying the microprocessor "moves" the drone instead of sending a signal to an actuator.'));

add(H2('Task 4 - answers [9]'));
add(P('(a) [2] Official (0478/13 May/June 2025 Q6(d)), any two, for example: employees do not need to carry out a mundane / repetitive task; employees do not need to work overnight; employees do not need to work outside in adverse weather conditions; it creates maintenance jobs for the system.'));
add(P('(b) [1] Official (Q6(e)), any one, for example: it may de-skill the employees; it may replace employees and take their jobs.'));
add(P('(c) [2] Official (0478/13 Oct/Nov 2024 Q5(c)), any two, for example: it stops the farmer having to handle heavy equipment; it frees the farmer up to do other jobs; it does not need to take breaks // can work 24/7; it can perform boring repetitive tasks; it can save money on labour costs; it may be more accurate at ploughing / planting; it may be more efficient than the farmer at ploughing.'));
add(P('(d) [4] Suggested (textbook Example 3), 2 advantages + 2 disadvantages. Advantages: cars fit into smaller spaces // more cars per car park; fewer dents and scratches / insurance claims; safer - sensors detect all objects and stop if a new object appears; consistent results; avoids traffic disruption. Disadvantages: the driver may lose parking skills / over-rely on the system; faulty or dirty sensors may send false data; may not detect low kerbs; expensive option; needs extra maintenance.'));

add(H2('Task 5 - answers [10]'));
add(P('(a) [2] Official (0478/13 Oct/Nov 2025 Q1(f)), any two: it has a single / limited function; it is difficult to change its function // cannot be reprogrammed; it has dedicated hardware; it has a microprocessor.'));
add(P('(b) [2] Official (0478/12 Feb/March 2025 Q4(b)), any two: dedicated function // special purpose device // not a general purpose device; dedicated hardware, e.g. hardware only used for ATM functions; cannot be (easily) reprogrammed; uses firmware; contains a microprocessor // does not have a CPU.'));
add(P('(c) [6] Suggested, 1 mark per point, max 6:'));
add(bullets([
  'Sensors named for each condition: light sensor, temperature sensor, moisture (or humidity) sensor',
  'Sensors send readings continually to the microprocessor (via an ADC)',
  'The microprocessor compares each reading with stored / preset values',
  'If the temperature is too low / high, it sends a signal to an actuator to switch a heater on / open a window or switch on a fan',
  'If the soil is too dry, it sends a signal to an actuator to open a valve / switch on a water pump',
  'If the light level is too low, it sends a signal to switch on the lights (or close blinds if too bright)',
  'If readings are within range, no action is taken; the process repeats continuously',
  'The supervisor can monitor the readings remotely and override the system'
]));

add(H2('Exit question (slide 21) - suggested answers'));
add(P('1. Light sensor (accept infrared / motion if used to detect people). 2. The sensor sends data continually; the microprocessor compares it with a stored light value; if it is darker than the stored value it sends a signal to switch the lights on, otherwise no action; this repeats. 3. For example: lights are only on when needed, so less energy is used; nobody needs to switch the lights on and off.'));

add(H2('Not used from the question pack'));
add(I('The pack also contains parts on other topics: USB (2.1), hexadecimal and two\'s complement (1.1), serial simplex transmission (2.1), the CPU and operating system (3.1, 4.1), cloud storage and error detection (2.2, 3.3), expert systems and machine learning (6.3), assembly language and IDEs (4.2), cookies (5.3) and a trace table (7). Keep these for those topics.'));

w.build(K, '/mnt/user-data/outputs/Automated_Systems_Answer_Key.docx');
