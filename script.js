document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("skincare-form");
    const loadingSection = document.getElementById("loading");
    const resultsSection = document.getElementById("results");
    const routineDiv = document.getElementById("routine");
    const productsDiv = document.getElementById("products");
    const dermatologistsDiv = document.getElementById("dermatologists");

    const recommendedProducts = {
        dry: [
            "CeraVe Moisturizing Cream",
            "La Roche-Posay Toleriane",
            "Neutrogena Hydro Boost",
            "Avene Tolerance",
            "First Aid Beauty Ultra Repair"
        ],
        oily: [
            "CeraVe Foaming Cleanser",
            "The Ordinary Niacinamide",
            "Paula's Choice BHA",
            "La Roche-Posay Effaclar",
            "Neutrogena Oil-Free"
        ],
        combination: [
            "CeraVe Hydrating Cleanser",
            "La Roche-Posay Effaclar",
            "Neutrogena Ultra Gentle",
            "The Ordinary Hyaluronic Acid",
            "Clinique Dramatically Different"
        ],
        sensitive: [
            "Vanicream Gentle Cleanser",
            "Avene Tolerance",
            "CeraVe Baby Lotion",
            "La Roche-Posay Toleriane",
            "First Aid Beauty Ultra Repair"
        ]
    };

    const sampleDermatologists = [
        { name: "Kigali Dermatology Center", phone: "+250 782 742 943" },
        { name: "Neoderma Clinica", phone: "+250 790 004 000" },
        { name: "Dermatology Clinic", phone: "+250 794 873 645" }
    ];

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const skinType = document.getElementById("skinType").value;
        const concerns = document.getElementById("concerns").value.trim();

        console.log("skinType:", skinType);
        console.log("concerns:", concerns);


        if (!skinType || !concerns) {
            return alert("Please fill in all fields.");
        }

        resultsSection.classList.add("hidden");
        loadingSection.classList.remove("hidden");

        try {
            const { key: rapidKey, hosts } = getAPIConfig("rapidapi");

            const routineRes = await fetch("https://open-ai21.p.rapidapi.com/chatgpt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-RapidAPI-Key": 'ec605ee42bmshe1a5d818a3dbd7dp19445cjsnee119b4628e0',
                    "X-RapidAPI-Host": "open-ai21.p.rapidapi.com"
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: "user",
                            content: `Give me a detailed skincare routine for someone with ${skinType} skin concerned about ${concerns}. And to make the text bold just write normal text so that it wont appear with "*, #" on my end`
                        }
                    ],
                    temperature: 0.7
                })
            });

            const routineData = await routineRes.json();
            const routineText = routineData?.result || "No routine found.";

            loadingSection.classList.add("hidden");

            // Inject routine
            routineDiv.innerHTML = `<p>${routineText}</p>`;

            // Inject recommended products
            const products = recommendedProducts[skinType.toLowerCase()];
            if (products?.length) {
                productsDiv.innerHTML = `
                    <ul>
                        ${products.map(p => `<li>${p}</li>`).join("")}
                    </ul>`;
            } else {
                productsDiv.innerHTML = "<p>No recommended products available.</p>";
            }

            // Inject sample dermatologists
            dermatologistsDiv.innerHTML = `
                <ul>
                    ${sampleDermatologists.map(d => `
                        <li>
                            <strong>${d.name}</strong><br>
                            Phone: ${d.phone}
                        </li>
                    `).join("")}
                </ul>`;

            resultsSection.classList.remove("hidden");

        } catch (err) {
            loadingSection.classList.add("hidden");
            alert("Something went wrong. Please try again.");
            console.error("Error:", err);
        }
    });
});
