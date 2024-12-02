document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form");
    
    form.addEventListener("submit", (event) => {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        let isValid = true;

        if (name === "") {
            alert("Name is required!");
            isValid = false;
        }

        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!email.match(emailPattern)) {
            alert("Please enter a valid email address!");
            isValid = false;
        }

        if (message === "") {
            alert("Message cannot be empty!");
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const rows = document.querySelectorAll("tr[data-timer]");

    function updateCountdown() {
        const now = new Date().getTime();

        rows.forEach((row) => {
            const matchTime = new Date(row.getAttribute("data-timer")).getTime();
            const countdownElement = row.querySelector(".countdown");

            if (matchTime > now) {
                const timeLeft = matchTime - now;
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            } else {
                countdownElement.textContent = "Match Started!";
            }
        });
    }

    setInterval(updateCountdown, 1000); // Update every second
    updateCountdown(); // Initial call to display immediately
});

document.addEventListener("DOMContentLoaded", () => {
    const monthlyBtn = document.getElementById("monthly");
    const yearlyBtn = document.getElementById("yearly");
    const plans = document.querySelectorAll(".plan");

    function togglePlans(planType) {
        plans.forEach(plan => {
            if (plan.getAttribute("data-plan") === planType) {
                plan.style.display = "block";
            } else {
                plan.style.display = "none";
            }
        });

        if (planType === "monthly") {
            monthlyBtn.classList.add("active");
            yearlyBtn.classList.remove("active");
        } else {
            yearlyBtn.classList.add("active");
            monthlyBtn.classList.remove("active");
        }
    }

    monthlyBtn.addEventListener("click", () => togglePlans("monthly"));
    yearlyBtn.addEventListener("click", () => togglePlans("yearly"));

    // Set default to monthly
    togglePlans("monthly");
});

document.addEventListener("DOMContentLoaded", () => {
    const planType = document.getElementById("plan-type");
    const duration = document.getElementById("duration");
    const durationLabel = document.getElementById("duration-label");
    const totalPrice = document.getElementById("total-price");

    function updatePrice() {
        const plan = planType.value;
        const durationValue = parseInt(duration.value, 10);
        let price = 0;

        if (plan === "monthly") {
            price = 4000 * durationValue;
            durationLabel.textContent = "months";
        } else if (plan === "yearly") {
            price = 40000 * durationValue;
            durationLabel.textContent = "years";
        }

        totalPrice.textContent = `R${price}`;
    }

    planType.addEventListener("change", updatePrice);
    duration.addEventListener("input", updatePrice);

    // Initialize price calculation
    updatePrice();
});

document.addEventListener("DOMContentLoaded", () => {
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach((question) => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector(".icon");

            // Toggle answer visibility with smooth animation
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                icon.textContent = "+";
            } else {
                // Close other answers
                document.querySelectorAll(".faq-answer").forEach((otherAnswer) => {
                    otherAnswer.style.maxHeight = null;
                });
                document.querySelectorAll(".faq-question .icon").forEach((otherIcon) => {
                    otherIcon.textContent = "+";
                });

                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.textContent = "-";
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const filterButton = document.getElementById("filter-button");
    const dateFilter = document.getElementById("date-filter");
    const leagueFilter = document.getElementById("league-filter");
    const teamFilter = document.getElementById("team-filter");
    const predictionItems = document.querySelectorAll(".prediction-item");

    filterButton.addEventListener("click", () => {
        const dateValue = dateFilter.value;
        const leagueValue = leagueFilter.value.toLowerCase();
        const teamValue = teamFilter.value.toLowerCase();

        let delay = 0; // Initialize delay for staggered animations

        predictionItems.forEach((item) => {
            const itemDate = item.dataset.date;
            const itemLeague = item.dataset.league.toLowerCase();
            const itemTeam = item.dataset.team.toLowerCase();

            const matchesDate = !dateValue || itemDate === dateValue;
            const matchesLeague = leagueValue === "all" || itemLeague.includes(leagueValue);
            const matchesTeam = !teamValue || itemTeam.includes(teamValue);

            if (matchesDate && matchesLeague && matchesTeam) {
                item.style.display = "block";
                item.style.animationDelay = `${delay}s`; // Apply staggered delay
                item.classList.add("slide-in"); // Trigger slide-in animation
                setTimeout(() => {
                    item.classList.remove("slide-in");
                }, 700 + delay * 1000); // Remove animation after it completes
                delay += 0.3; // Increment delay for the next item
            } else {
                item.style.display = "none";
            }
        });
    });
});

const searchInput = document.createElement("input");
searchInput.setAttribute("placeholder", "Search predictions...");
searchInput.setAttribute("id", "search-bar");
document.querySelector(".filter").appendChild(searchInput);

searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    const predictionItems = document.querySelectorAll(".prediction-item");
    predictionItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchValue) ? "block" : "none";
    });
});

const toggleButton = document.createElement("button");
toggleButton.textContent = "Toggle Grid/List View";
toggleButton.id = "toggle-view";
document.querySelector(".filter").appendChild(toggleButton);

toggleButton.addEventListener("click", () => {
    const predictions = document.querySelector(".predictions");
    predictions.classList.toggle("grid-view");
});

const scrollButton = document.createElement("button");
scrollButton.textContent = "Scroll to Predictions";
scrollButton.id = "scroll-button";
document.body.appendChild(scrollButton);

scrollButton.addEventListener("click", () => {
    const predictionsSection = document.querySelector(".predictions");
    predictionsSection.scrollIntoView({ behavior: "smooth" });
});



    
