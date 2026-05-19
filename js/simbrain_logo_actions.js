document.addEventListener("DOMContentLoaded", function() {
    const simbrainContainer = document.querySelector("#simbrain_container");
    const simbrainWeb = document.querySelector("#simbrain_web");
    const playButton = document.querySelector("#simbrain_play");

    function shouldShowCallout() {
        const storageKey = "simbrain_callout_last_seen";
        const monthInMilliseconds = 30 * 24 * 60 * 60 * 1000;

        try {
            const lastSeen = Number(window.localStorage.getItem(storageKey));
            if (lastSeen && Date.now() - lastSeen < monthInMilliseconds) {
                return false;
            }
            window.localStorage.setItem(storageKey, String(Date.now()));
        } catch (error) {
            return true;
        }

        return true;
    }

    if (simbrainContainer && shouldShowCallout()) {
        const callout = document.createElement("div");
        callout.classList.add("simbrain_callout");
        callout.innerHTML = '<a class="simbrain_callout_body" href="simbrain_web_info.html" target="_blank">This is a real neural network you can interact with. Click here for more info.</a>';
        simbrainContainer.classList.add("simbrain_callout_active");
        simbrainContainer.appendChild(callout);

        function dismissCallout() {
            callout.classList.add("simbrain_callout_dismissed");
            simbrainContainer.classList.remove("simbrain_callout_active");
        }

        window.setTimeout(dismissCallout, 7000);
        simbrainWeb?.addEventListener("pointerdown", dismissCallout, { once: true });
        document.addEventListener("keydown", dismissCallout, { once: true });
    }

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

    let frameCount = 0;
    let animationFrameId;

    function animate() {
        frameCount++;
        if (frameCount % 1 === 0) {
            window.network.update();
        }
        animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);

    if (!playButton) {
        return;
    }

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
