document.addEventListener("DOMContentLoaded", function() {
    function randomActivation() {
        function sampleNeuron() {
            return window.neurons[Math.floor(Math.random() * window.neurons.length)]
        }
        sampleNeuron().value = (Math.random() - 0.5) * 2.0;
        sampleNeuron().value = (Math.random() - 0.5) * 2.0;
        sampleNeuron().value = (Math.random() - 0.5) * 2.0;
        window.network.update();
    }




    const playButton = document.querySelector("#simbrain_play");

    let interval = setInterval(randomActivation, 200);

    playButton.addEventListener("click", function () {
        if (playButton.dataset.state === "play") {
            playButton.innerHTML = "";
            const icon = document.createElement("i");
            icon.classList.add("fas", "fa-play");
            playButton.appendChild(icon);
            playButton.dataset.state = "pause";
            clearInterval(interval);
        } else if (playButton.dataset.state === "pause") {
            playButton.innerHTML = "";
            const icon = document.createElement("i");
            icon.classList.add("fas", "fa-pause");
            playButton.appendChild(icon);
            playButton.dataset.state = "play";
            interval = setInterval(randomActivation, 200);
        }
    });
});