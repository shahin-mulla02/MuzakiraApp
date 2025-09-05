// Get user location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPrayer, showError);
} else {
    alert("Geolocation not supported by your browser.");
}

function showPrayer(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Show location
    document.getElementById('location').innerText = `Location: ${lat.toFixed(2)}, ${lon.toFixed(2)}`;

    // Fetch prayer timings from Aladhan API
    fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2&timezonestring=Asia/Kolkata`)

    .then(response => response.json())
    .then(data => {
        const timings = data.data.timings;
        document.getElementById('timings').innerHTML = `
            <li>Fajr: ${timings.Fajr}</li>
            <li>Zuhr: ${timings.Dhuhr}</li>
            <li>Asr: ${timings.Asr}</li>
            <li>Maghrib: ${timings.Maghrib}</li>
            <li>Isha: ${timings.Isha}</li>
        `;
    });

    // Calculate Qibla direction
    const kaabaLat = 21.4225;
    const kaabaLon = 39.8262;
    const phiK = kaabaLat * Math.PI / 180;
    const phiU = lat * Math.PI / 180;
    const deltaLambda = (kaabaLon - lon) * Math.PI / 180;
    const x = Math.sin(deltaLambda);
    const y = Math.cos(phiU)*Math.tan(phiK) - Math.sin(phiU)*Math.cos(deltaLambda);
    const qibla = Math.atan2(x, y) * 180 / Math.PI;
    const qiblaDeg = (qibla + 360) % 360;

    document.getElementById('qibla-angle').innerText = qiblaDeg.toFixed(0);
    document.getElementById('compass-needle').style.transform = `rotate(${qiblaDeg}deg)`;
}

function showError(error) {
    alert("Unable to fetch location. Please allow location access.");
}


const points = [
  {title: "Īmān", audio: "audio/iman.mp3"},
  {title: "Namaz", audio: "audio/namaz.mp3"},
  {title: "Ilm & Zikr", audio: "audio/ilm_zikr.mp3"},
  {title: "Ikram-e-Muslim", audio: "audio/ikram.mp3"},
  {title: "Ikhlas-e-Niyat", audio: "audio/ikhlas.mp3"},
  {title: "Dawat-e-Tabligh", audio: "audio/dawat.mp3"}
];

const quizzes = {
  "Īmān": [
    {q:"How many pillars of Iman? (Iman ke kitne rukun hain?)",
     options:["5", "6", "7", "8"], answer:1},
    {q:"Which is part of Iman? (Kaunsa Iman ka hissa hai?)",
     options:["Belief in Allah", "Belief in Money", "Belief in Power", "Belief in Friends"], answer:0},
    {q:"Belief in angels? (Malaika par iman?)",
     options:["Iman-e-Malaika", "Iman-e-Quran", "Iman-e-Nabi", "Iman-e-Taqdeer"], answer:0},
    {q:"Which is NOT a pillar? (Kaunsa rukun nahi?)",
     options:["Belief in Prophets", "Belief in Holy Books", "Belief in Magic", "Belief in Day of Judgment"], answer:2},
    {q:"Belief in Qadar means? (Taqdeer par iman?)",
     options:["Fate", "Charity", "Prayer", "Knowledge"], answer:0},
    {q:"Prophet Muhammad (PBUH) is part of? (Kaunsa rukun?)",
     options:["Pillars of Iman", "Pillars of Salah", "Pillars of Charity", "Pillars of Hajj"], answer:0},
    {q:"Belief in holy books? (Kutub ka iman?)",
     options:["Quran, Bible, Torah", "Only Quran", "Only Torah", "None"], answer:0},
    {q:"Day of Judgment? (Qayamat ka iman?)",
     options:["Yes", "No", "Sometimes", "Maybe"], answer:0},
    {q:"Iman increase/decrease by? (Amal se Iman barhta ya ghatta?)",
     options:["Good deeds", "Food", "Sleep", "Clothes"], answer:0},
    {q:"Belief in Allah alone enough? (Sirf Allah par iman kaafi?)",
     options:["No, all pillars needed", "Yes", "Sometimes", "Not sure"], answer:0}
  ],

  "Namaz": [
    {q:"How many daily prayers? (Rozana kitni Namaz?)",
     options:["3", "5", "6", "7"], answer:1},
    {q:"Namaz wajib for all Muslims? (Sab ke liye wajib?)",
     options:["Yes", "No", "Sometimes", "Maybe"], answer:0},
    {q:"Fajr is? (Fajr ka waqt?)",
     options:["Morning", "Noon", "Evening", "Night"], answer:0},
    {q:"Maghrib is? (Maghrib ka waqt?)",
     options:["After sunset", "Before sunrise", "Noon", "Morning"], answer:0},
    {q:"Wudu required for Namaz? (Wudu zaroori?)",
     options:["Yes", "No", "Optional", "Sometimes"], answer:0},
    {q:"Zuhr prayer is? (Zuhr ka waqt?)",
     options:["Noon", "Morning", "Evening", "Night"], answer:0},
    {q:"Asr prayer is? (Asr ka waqt?)",
     options:["Afternoon", "Morning", "Evening", "Night"], answer:0},
    {q:"Maghrib prayer is? (Maghrib ka waqt?)",
     options:["After sunset", "Before sunrise", "Noon", "Morning"], answer:0},
    {q:"Isha prayer is? (Isha ka waqt?)",
     options:["Night", "Morning", "Noon", "Evening"], answer:0},
    {q:"Namaz can be combined sometimes? (Kabhi combine?)",
     options:["Yes", "No", "Optional", "Sometimes"], answer:0}
  ],

  "Ilm & Zikr": [
    {q:"Zikr means? (Zikr ka matlab?)",
     options:["Remembering Allah", "Reading books", "Charity", "Prayer"], answer:0},
    {q:"Ilm means? (Ilm ka matlab?)",
     options:["Knowledge", "Wealth", "Power", "Prayer"], answer:0},
    {q:"Seeking Ilm is? (Ilm hasil karna?)",
     options:["Wajib", "Optional", "Forbidden", "Unnecessary"], answer:0},
    {q:"Zikr can be? (Zikr kaise?)",
     options:["Silent or verbal", "Only silent", "Only verbal", "Not needed"], answer:0},
    {q:"Ilm without action? (Bina amal ke?)",
     options:["Useless", "Helpful", "Powerful", "Rewarding"], answer:0},
    {q:"Zikr only after Namaz? (Sirf Namaz ke baad?)",
     options:["No", "Yes", "Optional", "Sometimes"], answer:0},
    {q:"Learning Ilm increases? (Ilm barhata?)",
     options:["Iman", "Wealth", "Power", "Fame"], answer:0},
    {q:"Zikr calms? (Dil aur dimag?)",
     options:["Heart & mind", "Body", "Eyes", "Hands"], answer:0},
    {q:"Only scholars do Zikr? (Sirf ulema?)",
     options:["No", "Yes", "Sometimes", "Optional"], answer:0},
    {q:"Ilm & Zikr help? (Zindagi aur aakhirat?)",
     options:["In life & afterlife", "Only life", "Only afterlife", "None"], answer:0}
  ],

  "Ikram-e-Muslim": [
    {q:"Being kind to Muslims? (Muslimon se meherbani?)",
     options:["Yes", "No", "Sometimes", "Optional"], answer:0},
    {q:"Helping a Muslim? (Madad karna?)",
     options:["Yes", "No", "Sometimes", "Optional"], answer:0},
    {q:"Respect elders? (Buzurgon ka ehtaram?)",
     options:["Yes", "No", "Sometimes", "Optional"], answer:0},
    {q:"Give charity? (Sadaqa dena?)",
     options:["Yes", "No", "Sometimes", "Optional"], answer:0},
    {q:"Brotherhood included? (Bhai chara?)",
     options:["Yes", "No", "Sometimes", "Optional"], answer:0},
    {q:"Harm a Muslim? (Nuksan pohchana?)",
     options:["No", "Yes", "Sometimes", "Optional"], answer:0},
    {q:"Greet Muslims? (Salam karna?)",
     options:["Yes", "No", "Sometimes", "Optional"], answer:0},
    {q:"Share knowledge? (Ilm baantna?)",
     options:["Yes", "No", "Sometimes", "Optional"], answer:0},
    {q:"Help in need? (Zarurat mein madad?)",
     options:["Yes", "No", "Sometimes", "Optional"], answer:0},
    {q:"Being rude? (Badtameezi?)",
     options:["No", "Yes", "Sometimes", "Optional"], answer:0}
  ],

  "Ikhlas-e-Niyat": [
    {q:"Niyya means? (Niyya kya hai?)",
     options:["Intention", "Action", "Word", "Prayer"], answer:0},
    {q:"Ikhlas means? (Ikhlas kya?)",
     options:["Sincerity", "Hypocrisy", "Prayer", "Deed"], answer:0},
    {q:"All actions need Ikhlas? (Har amal?)",
     options:["Yes", "No", "Sometimes", "Optional"], answer:0},
    {q:"Niyya only for oneself? (Sirf apne liye?)",
     options:["No", "Yes", "Sometimes", "Optional"], answer:0},
    {q:"Ikhlas removes hypocrisy? (Munafiqat?)",
     options:["Yes", "No", "Sometimes", "Optional"], answer:0},
    {q:"Intention before prayer optional? (Wajib nahi?)",
     options:["No", "Yes", "Sometimes", "Optional"], answer:0},
    {q:"Ikhlas applies to all deeds? (Har amal?)",
     options:["Yes", "No", "Sometimes", "Optional"], answer:0},
    {q:"Niyya can be renewed anytime? (Kabhi bhi?)",
     options:["Yes", "No", "Sometimes", "Optional"], answer:0},
    {q:"Sincere intention better than action? (Niyyat behtar?)",
     options:["Yes", "No", "Sometimes", "Optional"], answer:0},
    {q:"Ikhlas only for worship? (Sirf ibadat?)",
     options:["No", "Yes", "Sometimes", "Optional"], answer:0}
  ],

  "Dawat-e-Tabligh": [
    {q:"Dawat means? (Dawat ka matlab?)",
     options:["Invitation to Allah", "Party", "Money", "Power"], answer:0},
    {q:"Dawat duty for Muslims? (Sab ke liye?)",
     options:["Yes", "No", "Sometimes", "Optional"], answer:0},
    {q:"Dawat should be with? (Kaise?)",
     options:["Wisdom", "Force", "Threat", "None"], answer:0},
    {q:"Dawat only public? (Sirf public?)",
     options:["No", "Yes", "Sometimes", "Optional"], answer:0},
    {q:"Helping others understand Islam? (Madad karna?)",
     options:["Yes", "No", "Sometimes", "Optional"], answer:0},
    {q:"Dawat only by words? (Sirf bol kar?)",
     options:["No", "Yes", "Sometimes", "Optional"], answer:0},
    {q:"Lead by example? (Khud misaal?)",
     options:["Yes", "No", "Sometimes", "Optional"], answer:0},
    {q:"Dawat never gentle? (Kabhi na?)",
     options:["No", "Yes", "Sometimes", "Optional"], answer:0},
    {q:"Reward in life & afterlife? (Inaam?)",
     options:["Yes", "No", "Sometimes", "Optional"], answer:0},
    {q:"Focus only on mistakes? (Sirf galti?)",
     options:["No", "Yes", "Sometimes", "Optional"], answer:0}
  ]
};


const container = document.getElementById('points');

points.forEach(point => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h2>${point.title}</h2>
        <audio controls src="${point.audio}"></audio>
        <button class="take-quiz-btn">Take Quiz</button>
    `;
    container.appendChild(card);

    const btn = card.querySelector('.take-quiz-btn');

    btn.addEventListener('click', () => {
        // Check if quiz is already open in this card
        let existingQuiz = card.querySelector('.quiz-container');
        if(existingQuiz){
            // Close the quiz if already open
            existingQuiz.remove();
            return;
        }

        // Create quiz container dynamically
        const quizDiv = document.createElement('div');
        quizDiv.className = 'quiz-container';
        quizDiv.style.marginTop = '10px';
        quizDiv.style.padding = '10px';
        quizDiv.style.borderTop = '1px solid #aaa';

        const scoreDiv = document.createElement('div');
        scoreDiv.className = 'score-container';
        scoreDiv.style.marginTop = '10px';
        scoreDiv.style.padding = '10px';
        scoreDiv.style.fontWeight = 'bold';
        scoreDiv.style.color = 'green';

        const quiz = quizzes[point.title];
        quiz.forEach((q, i) => {
            const qDiv = document.createElement('div');
            qDiv.className = 'question';
            qDiv.innerHTML = `<p>${i+1}. ${q.q}</p>`;
            q.options.forEach((opt, idx) => {
                qDiv.innerHTML += `
                    <label>
                        <input type="radio" name="q${i}" value="${idx}"> ${opt}
                    </label><br>
                `;
            });
            quizDiv.appendChild(qDiv);
        });

        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Submit Quiz';
        submitBtn.addEventListener('click', () => {
            let score = 0;
            quiz.forEach((q, i) => {
                const selected = quizDiv.querySelector(`input[name="q${i}"]:checked`);
                if(selected && parseInt(selected.value) === q.answer) score++;
            });
            quizDiv.remove(); // Remove quiz after submit
            scoreDiv.innerHTML = `You scored ${score}/${quiz.length}!`;
            card.appendChild(scoreDiv);
        });

        quizDiv.appendChild(submitBtn);
        card.appendChild(quizDiv);
    });
});