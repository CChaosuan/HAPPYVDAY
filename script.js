window.onload = function () {
    console.log("Window fully loaded");

    const startButton = document.getElementById("startButton");
    const nextButton = document.getElementById("nextButton");
    const finalButton = document.getElementById("finalButton");

    const laughMusic = new Audio("laughcat.mp3");
    const jokerMusic = new Audio("joker.mp3");
    const relieveMusic = new Audio("relieve.mp3");

    const firebaseConfig = {
        apiKey: "AIzaSyCFAyOuPlj94xv6vu82mWDPVIwVPiIgi6E",
        authDomain: "v-day-aa186.firebaseapp.com",
        projectId: "v-day-aa186",
        storageBucket: "v-day-aa186.appspot.com",
        messagingSenderId: "233431607401",
        appId: "1:233431607401:web:000e4b0de1d6ccd7269af8"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const messagesRef = db.collection("messages");

    document.getElementById("submitMessage").addEventListener("click", async () => {
        let messageText = document.getElementById("messageInput").value.trim();
        if (messageText) {
            await messagesRef.add({ text: messageText });
            document.getElementById("messageInput").value = "";
            loadMessages();
        }
    });

    async function loadMessages() {
        let messageBoard = document.getElementById("messageBoard");
        messageBoard.innerHTML = "";
        let snapshot = await messagesRef.get();
        snapshot.forEach(doc => {
            let message = document.createElement("p");
            message.textContent = doc.data().text;
            messageBoard.appendChild(message);
        });
    }

    nextButton.addEventListener("click", () => {
        document.getElementById("page2").classList.add("fade-out");
        setTimeout(() => {
            document.getElementById("page3").classList.remove("hidden");
            relieveMusic.play();
            loadMessages();
        }, 1000);
    });

    finalButton.addEventListener("click", () => {
        window.location.href = "https://miro.com/app/board/uXjVLgWozEo=/";
    });
};
Z