const inkjs = require('inkjs');

(function() {
	
    let story;

    const dialoguesContainer = document.querySelectorAll('#dialogues')[0];
    const choicesContainer = document.querySelectorAll('#choices')[0];
    const characterElement = document.querySelectorAll('#character')[0];
    const delay_step = 200.0;

    fetch('intercept.ink.json')
	.then(function(response){
	    return response.text();
	})
	.then(function(storyContent){
	    story = new inkjs.Story(storyContent);
	    continueStory();
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

    function continueStory() {

        let delay = 0.0;

        // Generate story text - loop through available content
        while (story.canContinue) {

            // Get ink to generate the next paragraph
            const paragraphText = story.Continue();

            // Create paragraph element
            const paragraphElement = document.createElement('p');
            paragraphElement.classList.add("dialogue");
            paragraphElement.classList.add("active");
            // paragraphElement.classList.add("left");
            paragraphElement.innerHTML = paragraphText;
            dialoguesContainer.appendChild(paragraphElement);

            // Fade in paragraph after a short delay
            showAfter(delay, paragraphElement);
        }

        if (!characterElement.classList.contains('show')) {
            showAfter(delay, characterElement);
            delay += delay_step;
        }

        // Remove all existing choices
        const existingChoices = choicesContainer.querySelectorAll('p.choice');
        for (let i=0; i<existingChoices.length; i++) {
            const c = existingChoices[i];
            c.parentNode.removeChild(c);
        }

        // Create HTML choices from ink choices
        story.currentChoices.forEach(function(choice) {

            // Create paragraph with anchor element
            const choiceParagraphElement = document.createElement('p');
            choiceParagraphElement.classList.add("choice");
            choiceParagraphElement.innerHTML = `<a href='#'>${choice.text}</a>`
            choicesContainer.appendChild(choiceParagraphElement);

            // Fade choice in after a short delay
            showAfter(delay, choiceParagraphElement);
            delay += delay_step;

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
                    story.ChooseChoiceIndex(choice.index);

                    // Aaand loop
                    continueStory();
                    
                }, 300);
            });
        });

        scrollToBottom();
    }

})();
