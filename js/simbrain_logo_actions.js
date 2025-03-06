document.addEventListener("DOMContentLoaded", function() {
    function randomActivation() {
        if (!window.neurons) {
            return;
        }
        function sampleNeuron() {
            return window.neurons[Math.floor(Math.random() * window.neurons.length)]
        }
        sampleNeuron().value = (Math.random() - 0.5) * 2.0;
        sampleNeuron().value = (Math.random() - 0.5) * 2.0;
        sampleNeuron().value = (Math.random() - 0.5) * 2.0;
        window.network.update();
    }

    const playButton = document.querySelector("#simbrain_play");

    let frameCount = 0;
    let animationFrameId;

    function animate() {
        frameCount++;
        if (frameCount % 5 === 0) {
            window.network.update();
        }
        animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);

    playButton.addEventListener("click", function () {
        if (playButton.dataset.state === "play") {
            playButton.innerHTML = "";
            const icon = document.createElement("i");
            icon.classList.add("fas", "fa-play");
            playButton.appendChild(icon);
            playButton.dataset.state = "pause";
            cancelAnimationFrame(animationFrameId);
        } else if (playButton.dataset.state === "pause") {
            playButton.innerHTML = "";
            const icon = document.createElement("i");
            icon.classList.add("fas", "fa-pause");
            playButton.appendChild(icon);
            playButton.dataset.state = "play";
            animationFrameId = requestAnimationFrame(animate);
        }
    });
});