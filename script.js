document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
    const startButton = document.getElementById("startButton");
    const nextButton = document.getElementById("nextButton");
    const finalButton = document.getElementById("finalButton");

    const relieveMusic = new Audio("relieve.mp3");

    relieveMusic.loop = true;

    startButton?.addEventListener("click", () => {
        console.log("Start button clicked");
        document.getElementById("page1").classList.add("hidden");
        document.getElementById("page2").classList.remove("hidden");

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
            document.getElementById("youText").classList.add("show");
            document.getElementById("youText").innerText = "YOU";
        }, 3500);

        setTimeout(async () => {
            console.log("Updating visitor count");
            let count = await updateVisitorCount();
            document.getElementById("counterText").classList.add("show");
            document.getElementById("counterText").innerText = `and ${count} other poor single souls like YOU (and Zhuoxuan)`;
        }, 4000);

        setTimeout(() => {
            console.log("Showing next button");
            nextButton.classList.add("show");
        }, 4500);
    });

    nextButton?.addEventListener("click", () => {
        console.log("Transitioning to Page 3");
        document.getElementById("page2").classList.add("hidden");
        document.getElementById("page3").classList.remove("hidden");
        relieveMusic.play();
    });
});
