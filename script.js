document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
    const startButton = document.getElementById("startButton");
    const nextButton = document.getElementById("nextButton");
    const finalButton = document.getElementById("finalButton");

    const harpMusic = new Audio("harp.mp3");
    const laughMusic = new Audio("laughcat.mp3");
    const jokerMusic = new Audio("joker.mp3");
    const relieveMusic = new Audio("relieve.mp3");

    relieveMusic.loop = true;

    startButton?.addEventListener("click", () => {
        console.log("Start button clicked");
        relieveMusic.pause();
        relieveMusic.currentTime = 0;

        document.getElementById("page1").classList.add("hidden");
        document.getElementById("page2").classList.remove("hidden");

        harpMusic.play();
        console.log("Playing harp.mp3");

        setTimeout(() => {
            console.log("Playing laughcat.mp3");
            laughMusic.play();
        }, 3000);

        setTimeout(() => {
            console.log("Playing joker.mp3");
            jokerMusic.play();
        }, 5000);

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
            console.log("Updating YOU text");
            let youText = document.getElementById("youText");
            youText.classList.add("show");
            youText.innerText = "YOU";

            setTimeout(async () => {
                console.log("Replacing YOU text with visitor count");
                let count = await updateVisitorCount();
                youText.innerText = `and ${count} other poor single souls like YOU (and Zhuoxuan)`;
            }, 1000);
        }, 3500);

        setTimeout(() => {
            console.log("Showing next button");
            nextButton.classList.add("show");
        }, 4500);
    });

    nextButton?.addEventListener("click", () => {
        console.log("Transitioning to Page 3");
        jokerMusic.pause();
        jokerMusic.currentTime = 0;

        document.getElementById("page2").classList.add("hidden");
        document.getElementById("page3").classList.remove("hidden");
        relieveMusic.play();
    });
});
