document.addEventListener('DOMContentLoaded', function () {
    const landing = document.getElementById('landing');
    const myWork = document.getElementById('myWork');
    const vouches = document.getElementById('vouches');
    const btnSeeMore = document.querySelector('#landing .btn');
    const btnMore = document.querySelector('#myWork .btn');
    const backToTopBtn = document.getElementById('backToTopBtn');
    let lastScrollTime = 0;

    // Function to handle scroll event
    function handleScroll(event) {
        const currentOverlay = getCurrentOverlay();
        const currentTime = new Date().getTime();
        const deltaY = event.deltaY;

        if (currentTime - lastScrollTime > 1000) {
            if (deltaY > 0) {
                if (currentOverlay === null) {
                    showPage(myWork, false);
                } else if (currentOverlay === landing) {
                    showPage(myWork, true);
                } else if (currentOverlay === myWork) {
                    showPage(vouches, true);
                }
            } else if (deltaY < 0) {
                if (currentOverlay === myWork) {
                    showPage(landing, false);
                } else if (currentOverlay === vouches) {
                    showPage(myWork, false);
                }
            }
            lastScrollTime = currentTime;
        }
    }

    // Function to get the currently visible overlay
    function getCurrentOverlay() {
        const overlays = document.querySelectorAll('.overlay');
        for (let overlay of overlays) {
            const computedStyle = getComputedStyle(overlay);
            if (computedStyle.display !== 'none') {
                return overlay;
            }
        }
        return null;
    }

    // Function to show a page and hide others with smooth transitions
    function showPage(page, scrollUp) {
        const overlays = document.querySelectorAll('.overlay');
        overlays.forEach(function (overlay) {
            if (overlay === page) {
                overlay.style.display = 'flex';
                overlay.style.transform = 'translateY(0%)';
            } else {
                if (scrollUp) {
                    overlay.style.transform = 'translateY(-100%)';
                } else {
                    overlay.style.transform = 'translateY(100%)';
                }
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 300); // Wait for the animation to complete before hiding
            }
        });

        // Hide landing page when transitioning to another page
        if (page !== landing) {
            landing.style.display = 'none';
        } else {
            landing.style.display = 'flex';
        }
    }

    // Function to handle button click events
    function handleClick(event) {
        const target = event.target;
        if (target === btnSeeMore) {
            showPage(myWork, true);
        } else if (target === btnMore) {
            showPage(vouches, true);
        } else if (target === backToTopBtn) {
            showPage(landing, false);
        }
    }

    // Add event listeners
    window.addEventListener('wheel', handleScroll);
    document.addEventListener('click', handleClick);
});
