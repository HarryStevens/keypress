$(document).ready(() => {

	// Configuration variables
	var min_show = -1;
	var curr_show = -1;
	var max_arr = [];
	$(".show").each((index, el) => {
		max_arr.push(+$(el).attr("effect-order"));
	});
	var max_show = jz.arr.max(max_arr) + 1;

	// Event handler for keydown
	$(document).keydown(e => {
		var key = e.key;
		if (key == "ArrowUp" || key == "ArrowDown") {
			e.preventDefault(); // no scrolling!
		} else {
			return; // do nothing
		}
		
		if (key == "ArrowUp" && curr_show !== min_show){
			--curr_show;
		}

		if (key == "ArrowDown" && curr_show !== max_show){
			++curr_show;
		}

		showToggle(key);

	}); // end of keydown event handler

	// Function to decide whether to show or hide elements
	function showToggle(key){
		$(".show").each((index, el) => {

			var effectIn = $(el).attr("effect-in");
			var effectOut = $(el).attr("effect-out");
			var effectOrder = +$(el).attr("effect-order");

			// if the element's effect order is less than the current show,
			// just keep showing it
			if (effectOrder < curr_show){
				$(el).show();
			}

			// if the element's effect order is the same as the current showm
			// run the effectIn or just keep showing, depending on the key
			else if (effectOrder == curr_show){

				// if the key is down, the runEffectIn
				if (key == "ArrowDown"){
					runEffect({el: el, effect: effectIn, toggle: "in"});	
				}

				// if the key is up, just keep showing
				else if (key == "ArrowUp") {
					$(el).show();
				}
				
			}

			// if the element's effect order is one greater than the current show
			// run the effectOut or just keep hiding, depending on the key
			else if (effectOrder == curr_show + 1){

				// if the key is down, just keep hiding
				if (key == "ArrowDown"){
					$(el).hide();
				}

				// if the key is up, just keep showing
				else if (key == "ArrowUp") {
					runEffect({el: el, effect: effectOut, toggle: "out"});
				}

			}

		});

	} // end showToggle()

	// Function to run the effect associated with each element
	function runEffect(options){
		
		// fade in
		if (options.effect == "fadeIn") {
			$(options.el).fadeIn();
		}

		// fade out
		else if (options.effect == "fadeOut") {
			$(options.el).fadeOut();
		}

		// slide
		else if (options.effect == "slide") {

			var slide_options = {
				direction: $(options.el).attr("effect-" + options.toggle + "-slide-direction")
			}

			// if we are sliding in
			if (options.toggle == "in"){
				$(options.el).effect(options.effect, slide_options);	
			} else {
				$(options.el).hide(options.effect, slide_options);
			}
			
		}

	} // end runEffect()

});