// FIXME: it doesn't work as a module
// see http://hayley.zone/bondage.js/web_runner.js
// const bondage = require('bondage');

(function() {
    const node = 'Start';
    let d;
    const runner = new bondage.Runner();
    const dialoguesContainer = document.querySelectorAll('#dialogues')[0];
    const choicesContainer = document.querySelectorAll('#choices')[0];
    const characterElement = document.querySelectorAll('#character')[0];
    const delay_step = 200.0;

    fetch('conditions.json')
	.then(function(response){
	    return response.text();
	})
	.then(function(storyContent){
            const data = JSON.parse(storyContent);
            runner.load(data);
            d = runner.run(node);
            run();
	});

    function showAfter(delay, el) {
        setTimeout(function() { el.classList.add("show") }, delay);
    }

    function scrollToBottom() {
        const start = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const dist = document.body.scrollHeight - window.innerHeight - start;
        if ( dist < 0 ) {
            return;
        }

        const duration = 300 + 300*dist/100;
        let startTime = null;
        function step(time) {
            if (startTime == null) {
                startTime = time;
            }
            const t = (time-startTime) / duration;
            const lerp = 3*t*t - 2*t*t*t;
            window.scrollTo(0, start + lerp*dist);
            if ( t < 1 ) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    }

    const run = () => {

        let delay = 0.0;

        const result = d.next().value;
        if (!result) {
            // story end?
            return;
        }

        if (result.options) {
            // delay += 1000.0;

            // Remove all existing choices
            const existingChoices = choicesContainer.querySelectorAll('p.choice');

            delay += delay_step;

            for (let i=0; i<existingChoices.length; i++) {
                const c = existingChoices[i];
                c.parentNode.removeChild(c);
            }

            for (const i in result.options) {
                // Create paragraph with anchor element
                const choiceParagraphElement = document.createElement('p');
                choiceParagraphElement.classList.add("choice");
                choiceParagraphElement.innerHTML = `<a href='#'>${result.options[i]}</a>`
                choicesContainer.appendChild(choiceParagraphElement);

                // Fade choice in after a short delay
                showAfter(delay, choiceParagraphElement);
                delay += delay_step;

                scrollToBottom();

                // Click on choice
                const choiceAnchorEl = choiceParagraphElement.querySelectorAll("a")[0];
                choiceAnchorEl.addEventListener("click", function(event) {
                    
                    // Don't follow <a> link
                    event.preventDefault();

                    // Hide all existing choices
                    const existingChoices = choicesContainer.querySelectorAll('p.choice');
                    for (let i=0; i<existingChoices.length; i++) {
                        const c = existingChoices[i];
                        c.classList.remove('show');
                    }

                    const existingDialoguesActive = dialoguesContainer.querySelectorAll('p.dialogue.active');
                    for (let i=0; i<existingDialoguesActive.length; i++) {
                        const c = existingDialoguesActive[i];
                        c.classList.remove('active');
                    }

                    characterElement.classList.remove('show');

                    setTimeout(function() {
                        // Tell the story where to go next
                        result.select(i);

                        // Aaand loop
                        run();
                        
                    }, 300);
                });
            }
        } else {
            const paragraphElement = document.createElement('p');
            paragraphElement.classList.add("dialogue");
            paragraphElement.classList.add("active");
            paragraphElement.innerHTML = result.text;
            dialoguesContainer.appendChild(paragraphElement);

            // Fade in paragraph after a short delay
            showAfter(delay, paragraphElement);

            if (!characterElement.classList.contains('show')) {
                showAfter(delay, characterElement);
                delay += delay_step;
            }

            scrollToBottom();
            run();
        }
    };

})();

