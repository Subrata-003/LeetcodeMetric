document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("btn");
    const usernameInput = document.getElementById("user-input");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");

    const hardLabel = document.getElementById("hard-label");
    const statsContainer = document.querySelector(".stat-container");
    const easyProgressCircle = document.querySelector(".easy");
    const mediumProgressCircle = document.querySelector(".medium");
    const hardProgressCircle = document.querySelector(".hard");
    const cardContainer=document.querySelector(".card-container");
    function validateUsername(username) {
        const regex = /^[a-zA-Z0-9_]{3,20}$/;
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("Invalid Username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
        const url = 'https://leetcode-api-faisalshohag.vercel.app/' + username;
        try {
            searchButton.textContent = "Searching";
            searchButton.disabled = true;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to fetch user details");
            }
            const parsedData = await response.json();
            // console.log(data.totalEasy+" "+data.easySolved);
            displayUserData(parsedData);
        }
        catch (error) {
            statsContainer.innerHTML = '<p>No Data Found</p>';
        }
        finally {
            searchButton.textContent = 'Search';
            searchButton.disabled = false;
        }

    }
    function updateProgress(solved, total, label, circle) {
        const progressDegree = (solved / total) * 100;
        circle.style.setProperty("--progress-degree", progressDegree + '%');
        label.textContent=solved+'/'+total;
        circle.style.color='yellow';
    }

    function displayUserData(parsedData) {
        const totalHardQs = parsedData.totalHard;
        const totalMediumQs = parsedData.totalMedium;
        const totalEasyQs = parsedData.totalEasy;

        const solvedEasy = parsedData.easySolved;
        const solvedMedium = parsedData.mediumSolved;
        const solvedHard = parsedData.hardSolved;
        const solvedtotal=parsedData.totalSolved;

        updateProgress(solvedEasy, totalEasyQs, easyLabel, easyProgressCircle);
        updateProgress(solvedMedium, totalMediumQs, mediumLabel, mediumProgressCircle);
        updateProgress(solvedHard, totalHardQs, hardLabel, hardProgressCircle);
    
       cardContainer.innerHTML='Total Question Solved : '+solvedtotal+'<li>Total Easy Submissions = '+solvedEasy+'</li>'+'<li>Total Medium Submissions = '+solvedMedium+'</li>'+'<li>Total Hard Submissions = '+solvedHard+'</li>'
       cardContainer.style.display='block'
    }
    searchButton.addEventListener('click', function () {
        const username = usernameInput.value;
        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    })
})