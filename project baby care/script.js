document.getElementById("babyForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const dob = new Date(document.getElementById("dob").value);
  const ageInMonths = getAgeInMonths(dob);

  document.getElementById("output").classList.remove("hidden");

  displayVaccinationSchedule(ageInMonths);
  showFoodSuggestion(ageInMonths);
});

function getAgeInMonths(dob) {
  const now = new Date();
  return (now.getFullYear() - dob.getFullYear()) * 12 + (now.getMonth() - dob.getMonth());
}

function displayVaccinationSchedule(age) {
  const schedule = [
    { month: 0, vaccine: "BCG, OPV-0, Hep B-1" },
    { month: 6, vaccine: "Hepatitis B-3, OPV-3, DPT-3" },
    { month: 9, vaccine: "MMR-1" },
    { month: 15, vaccine: "MMR-2, Varicella" },
  ];

  const list = document.getElementById("vaccinationList");
  list.innerHTML = "";
  schedule.forEach((item) => {
    if (item.month <= age) {
      list.innerHTML += `<li><strong>Month ${item.month}:</strong> ${item.vaccine} ✅</li>`;
    } else {
      list.innerHTML += `<li><strong>Month ${item.month}:</strong> ${item.vaccine}</li>`;
    }
  });
}

function showFoodSuggestion(age) {
  const foodMap = {
    0: "Only breastfeeding is recommended.",
    6: "Start pureed fruits, mashed vegetables.",
    9: "Introduce soft rice, dal, khichdi.",
    12: "Family food, chopped fruits, and veggies.",
    18: "All regular home food, soft chapati, etc.",
  };

  let suggestion = "Consult doctor for proper plan.";
  for (const key in foodMap) {
    if (age >= parseInt(key)) {
      suggestion = foodMap[key];
    }
  }
  document.getElementById("foodSuggestion").innerText = suggestion;
}

async function handleChat() {
  const input = document.getElementById("chatInput").value.trim();
  if (!input) return;

  const box = document.getElementById("chatBox");
  box.innerHTML += `<p><strong>You:</strong> ${input}</p>`;

  try {
    const response = await fetch("https://dea2155c-2072-4885-829b-140e43308ba0-00-3iyrapvvg80r2.sisko.replit.dev/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: input })
    });

    const data = await response.json();
    box.innerHTML += `<p><strong>AI:</strong> ${data.reply}</p>`;
  } catch (error) {
    console.error("Chat Error:", error);
    box.innerHTML += `<p><strong>AI:</strong> Sorry, something went wrong while connecting to the server.</p>`;
  }

  document.getElementById("chatInput").value = "";
}
