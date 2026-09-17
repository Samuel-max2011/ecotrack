function updateProgress ( checkbox ) {
	let scoreElement = document.getElementById( 'totalScore' );
	let progressBar = document.getElementById( 'progressBar' );

	let totalScore = parseInt( localStorage.getItem( 'totalScore' ) ) || 0;

	let points = parseInt( checkbox.getAttribute( 'data-points' ) ) || 0;
	if ( checkbox.checked ) {
		totalScore += points;

	} else {
		totalScore -= points;

	}

	localStorage.setItem( 'totalScore', totalScore );

	if ( scoreElement ) {
		scoreElement.innerHTML = totalScore;
	}

	if ( progressBar ) {
		let maxScore = parseInt( progressBar.getAttribute( 'aria-valuemax' ) ) || 100;
		let progressPercentage = Math.min( ( totalScore / maxScore ) * 100, 100 );
		progressBar.style.width = progressPercentage + '%';
		progressBar.setAttribute( 'aria-valuenow', progressPercentage );
	}
}

function resetProgress () {
	localStorage.removeItem( 'totalScore' );

	let scoreElement = document.getElementById( 'totalScore' );
	if ( scoreElement ) {
		scoreElement.innerHTML = '0';
	}

	let progressBar = document.getElementById( 'progressBar' );
	if ( progressBar ) {
		progressBar.style.width = '0%';
		progressBar.setAttribute( 'aria-valuenow', '0' );
	}

	let checkboxes = document.querySelectorAll( 'input[type="checkbox"]' );
	checkboxes.forEach( checkbox => checkbox.checked = false );
}

document.addEventListener( 'DOMContentLoaded', function () {
	let scoreElement = document.getElementById( 'totalScore' );
	let progressBar = document.getElementById( 'progressBar' );

	let totalScore = parseInt( localStorage.getItem( 'totalScore' ) ) || 0;

	if ( scoreElement ) {
		scoreElement.innerHTML = totalScore;
	}

	if ( progressBar ) {
		let maxScore = parseInt( progressBar.getAttribute( 'aria-valuemax' ) ) || 100;
		let progressPercentage = Math.min( ( totalScore / maxScore ) * 100, 100 );
		progressBar.style.width = progressPercentage + '%';
		progressBar.setAttribute( 'aria-valuenow', progressPercentage );
	}

	let checkboxes = document.querySelectorAll( 'input[type="checkbox"]' );
	checkboxes.forEach( checkbox => {
		checkbox.addEventListener( 'change', function () {
			updateProgress( this );
		} );
	} );

	let resetButton = document.getElementById( 'resetButton' );
	if ( resetButton ) {
		resetButton.addEventListener( 'click', resetProgress );
	}


	$( 'input[type="checkbox"]' ).change( function () {
		let points = parseInt( $( this ).data( 'points' ) );
		if ( this.checked ) {
			totalScore += points;
		} else {

			totalScore -= points;
		}

		$( '#totalScore' ).text( totalScore );
		$( '#progressBar' ).css( 'width', totalScore + '%' ).attr( 'aria-valuenow', totalScore );

		if ( totalScore >= 100 ) {
			if ( !$( '#congratsBanner' ).length ) {
				$( 'body' ).prepend( `
								<div id="congratsBanner" class="alert alert-success text-center position-fixed top-0 start-0 w-100" style="z-index: 1050;">
									<h4>Congratulations! 🎉 You've reached 100 points!</h4>
								</div>
							`);
				setTimeout( () => {
					$( '#congratsBanner' ).fadeOut( 500, function () {
						$( this ).remove();
					} );
				}, 5000 );
			}
		}
	} );

	$( '#resetButton' ).click( function () {
		totalScore = 0;
		$( '#totalScore' ).text( totalScore );
		$( '#progressBar' ).css( 'width', '0%' ).attr( 'aria-valuenow', totalScore );
		$( 'input[type="checkbox"]' ).prop( 'checked', false );
	} );
} );

function waitForjQuery () {
	if ( window.jQuery ) {
		( function ( $ ) {
			let $btn = $( '#animateBtn' );

			$btn.css( 'transition', 'transform 0.3s ease, box-shadow 0.3s ease' );

			$btn.on( 'mouseenter', function () {
				$( this ).css( {
					transform: 'translateY(-6px)',
					boxShadow: '0 12px 26px rgba(0,0,0,0.18)'
				} );
			} ).on( 'mouseleave', function () {
				$( this ).css( {
					transform: 'translateY(0)',
					boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
				} );
			} );
		} )( jQuery );
	} else {
		setTimeout( waitForjQuery, 50 );
	}
}
waitForjQuery();

