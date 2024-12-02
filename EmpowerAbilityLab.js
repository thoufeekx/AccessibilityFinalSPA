document.addEventListener('DOMContentLoaded', () => {
    // Focus Management
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Update browser history
            history.pushState(null, '', `#${targetId}`);

            // Focus on target section
            targetSection.setAttribute('tabindex', '-1');
            targetSection.focus();

            // Update page title
            document.title = `Empower Ability Labs - ${targetSection.querySelector('h1').textContent}`;
        });
    });

    // Event Details Show/Hide
    const inviteSpeakerCheckbox = document.getElementById('inviteSpeaker');
    const eventDetailsContainer = document.getElementById('eventDetailsContainer');

    inviteSpeakerCheckbox.addEventListener('change', () => {
        eventDetailsContainer.style.display = inviteSpeakerCheckbox.checked ? 'block' : 'none';
    });

    // Form Validation
    const scheduleForm = document.getElementById('scheduleCallForm');
    const emailInput = document.getElementById('email');

    scheduleForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation
        if (!emailInput.validity.valid) {
            emailInput.setCustomValidity('Please enter a valid email address');
            emailInput.reportValidity();
            return;
        }

        // Simulate form submission
        alert('Thank you for scheduling a call! We will contact you soon.');
        scheduleForm.reset();
        eventDetailsContainer.style.display = 'none';
    });

    // Handle browser back button
    window.addEventListener('popstate', () => {
        const hash = window.location.hash;
        if (hash) {
            const targetSection = document.querySelector(hash);
            if (targetSection) {
                targetSection.setAttribute('tabindex', '-1');
                targetSection.focus();
            }
        }
    });
});



document.addEventListener("DOMContentLoaded", () => {
    // Select all sections and navigation links
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    // Function to show the selected section and hide others
    function showSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add("active");
                section.setAttribute("tabindex", "0"); // Make section focusable
                section.setAttribute("aria-hidden", "false"); // Section is visible
                section.focus(); // Focus the active section for screen readers
            } else {
                section.classList.remove("active");
                section.setAttribute("tabindex", "-1"); // Remove focusability
                section.setAttribute("aria-hidden", "true"); // Section is hidden
            }
        });
    }

    // Attach click and keyboard events to navigation links
    navLinks.forEach((link, index) => {
        link.addEventListener("click", event => {
            event.preventDefault(); // Prevent default anchor behavior
            const targetId = link.getAttribute("href").substring(1); // Get the target ID
            showSection(targetId); // Show the target section
            updateNavState(link); // Update navigation state
        });

        link.addEventListener("keyup", event => {
            // Navigate links using arrow keys
            if (event.key === "ArrowRight") {
                const nextIndex = (index + 1) % navLinks.length;
                navLinks[nextIndex].focus();
            } else if (event.key === "ArrowLeft") {
                const prevIndex = (index - 1 + navLinks.length) % navLinks.length;
                navLinks[prevIndex].focus();
            }
        });
    });

    // Update navigation link states for accessibility
    function updateNavState(activeLink) {
        navLinks.forEach(link => {
            if (link === activeLink) {
                link.setAttribute("aria-selected", "true");
                link.removeAttribute("tabindex");
                link.classList.add("active-link");
            } else {
                link.setAttribute("aria-selected", "false");
                link.setAttribute("tabindex", "-1");
                link.classList.remove("active-link");
            }
        });
    }

    // Initially display the "home" section and set active link
    showSection("home");
    updateNavState(navLinks[0]);
});
