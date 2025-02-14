window.onload = function () {
    console.log("Window fully loaded");

    const startButton = document.getElementById("startButton");
    const nextButton = document.getElementById("nextButton");
    const finalButton = document.getElementById("finalButton");
    const submitMessage = document.getElementById("submitMessage");
    const messageInput = document.getElementById("messageInput");
    const messageBoard = document.getElementById("messageBoard");

    const harpMusic = new Audio("harp.mp3");
    const laughMusic = new Audio("laughcat.mp3");
    const jokerMusic = new Audio("joker.mp3");
    const relieveMusic = new Audio("relieve.mp3");

    // 🔹 **Your Firebase Configuration (Preserved)**
    const firebaseConfig = {
        apiKey: "AIzaSyCFAyOuPlj94xv6vu82mWDPVIwVPiIgi6E",
        authDomain: "v-day-aa186.firebaseapp.com",
        projectId: "v-day-aa186",
        storageBucket: "v-day-aa186.appspot.com",
        messagingSenderId: "233431607401",
        appId: "1:233431607401:web:000e4b0de1d6ccd7269af8",
        measurementId: "G-MV0BZZTGXV"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const counterRef = db.collection("visitors").doc("count");
    const messagesRef = db.collection("messages");

    // Function to update visitor count
    async function updateVisitorCount() {
        console.log("Fetching visitor count...");
        let countData = await counterRef.get();
        let count = countData.exists ? countData.data().count : 0;
        count++;
        await counterRef.set({ count });
        console.log("Visitor count updated to:", count);
        return count;
    }

    // Function to submit a new message
    if (submitMessage) {
        submitMessage.addEventListener("click", async () => {
            let messageText = messageInput.value.trim();
            if (messageText) {
                await messagesRef.add({ text: messageText, timestamp: firebase.firestore.FieldValue.serverTimestamp() });
                messageInput.value = "";
                loadMessages();
            }
        });
    } else {
        console.log("submitMessage button not found!");
    }

    // Function to load messages from Firestore
    async function loadMessages() {
        if (!messageBoard) {
            console.log("Message board not found!");
            return;
        }
        messageBoard.innerHTML = "";
        let snapshot = await messagesRef.orderBy("timestamp", "desc").limit(10).get();
        snapshot.forEach(doc => {
            let message = document.createElement("p");
            message.textContent = doc.data().text;
            messageBoard.appendChild(message);
        });
    }

    // Ensure buttons exist before adding event listeners
    if (startButton) {
        startButton.addEventListener("click", () => {
            console.log("Start button clicked");
            relieveMusic.pause();
            console.log("testing if pause")
            relieveMusic.currentTime = 0;

            document.getElementById("page1").classList.add("hidden");
            document.getElementById("page2").classList.remove("hidden");

            harpMusic.play();
            console.log("Playing harp.mp3");

            setTimeout(() => {
                console.log("Playing laughcat.mp3");
                laughMusic.play();
            }, 3000);

            console.log("Playing joker.mp3 immediately");
            jokerMusic.play();

            setTimeout(() => {
                console.log("Showing guess text");
                document.getElementById("guessText").classList.add("show");
            }, 500);

            setTimeout(() => {
                console.log("Showing mirror and laughcat");
                document.getElementById("mirror").classList.add("show");
                document.getElementById("laughcat1").classList.add("show");
            }, 2500);

            setTimeout(() => {
                console.log("Showing YOU text");
                let youText = document.getElementById("youText");
                youText.classList.add("show");
                youText.innerText = "YOU";

                setTimeout(async () => {
                    console.log("Replacing YOU text with visitor count");
                    let count = await updateVisitorCount();
                    console.log("Visitor count fetched:", count);
                    youText.innerText = `and ${count} other poor single souls like YOU (and Zhuoxuan)`;
                }, 1000);
            }, 1500);

            setTimeout(() => {
                console.log("Showing next button");
                nextButton.classList.add("show");
            }, 4500);
        });
    } else {
        console.log("startButton not found!");
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            console.log("Transitioning to Page 3");
            jokerMusic.pause();
            jokerMusic.currentTime = 0;

            document.getElementById("page2").classList.add("hidden");
            document.getElementById("page3").classList.remove("hidden");
            relieveMusic.play();

            loadMessages(); // Load messages when entering Page 3
        });
    } else {
        console.log("nextButton not found!");
    }

    if (finalButton) {
        finalButton.addEventListener("click", () => {
            console.log("Redirecting to Miro board");
            window.location.href = "https://miro.com/app/board/uXjVLgWozEo=/";
        });
    } else {
        console.log("finalButton not found!");
    }
};
