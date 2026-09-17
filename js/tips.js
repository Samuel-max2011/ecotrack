let categorizedTips = {
	Water: [
		"Turn off taps while brushing",
		"Fix leaking faucets",
		"Use a bucket instead of a hose",
		"Install water-saving showerheads",
		"Collect rainwater for gardening"
	],
	Energy: [
		"Switch to LED bulbs",
		"Unplug electronics when not in use",
		"Use energy-efficient appliances",
		"Install solar panels",
		"Set your thermostat wisely"
	],
	Waste: [
		"Recycle paper, plastic, and glass",
		"Compost your food waste",
		"Use reusable shopping bags",
		"Avoid single-use plastics",
		"Donate items instead of discarding"
	],
	Transportation: [
		"Carpool to reduce emissions",
		"Use public transportation",
		"Walk or bike for short distances",
		"Maintain your vehicle for efficiency",
		"Consider electric or hybrid vehicles"
	],
	Food: [
		"Buy organic produce",
		"Reduce meat consumption",
		"Support local farmers",
		"Plan meals to avoid food waste",
		"Use reusable containers for storage"
	]
};

function getRandomTipFromCategory ( category ) {
	let tips = categorizedTips[ category ];
	let randomIndex = Math.floor( Math.random() * tips.length );
	return tips[ randomIndex ];
}

function displayRandomTip () {
	let tipElement = document.getElementById( "eco-tip" );
	let categories = Object.keys( categorizedTips );
	let randomCategory = categories[ Math.floor( Math.random() * categories.length ) ];
	tipElement.innerHTML = getRandomTipFromCategory( randomCategory );
}

document.addEventListener( "DOMContentLoaded", () => {
	displayRandomTip();

	let newTipButton = document.getElementById( "new-tip-btn" );
	newTipButton.addEventListener( "click", displayRandomTip );
} );
