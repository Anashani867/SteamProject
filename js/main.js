function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}



document.addEventListener('DOMContentLoaded', function () {
    let counters = document.querySelectorAll('.milestone_counter');
    let speed = 200; // Adjust the speed of the count-up

    counters.forEach(counter => {
        let updateCount = () => {
            let target = +counter.getAttribute('data-end-value');
            let count = +counter.innerText;
            let increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1); // Repeat the function until the target is reached
            } else {
                counter.innerText = target;
            }
        };

        // Trigger counter animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.disconnect(); // Stop observing once the count is done
            }
        }, { threshold: 0.6 });

        observer.observe(counter);
    });
});



document.addEventListener("DOMContentLoaded", function () {
    fetchTestimonials();
});

function fetchTestimonials() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const testimonials = data.testimonials;

            // Select all testimonial elements
            const testimonialCards = document.querySelectorAll('.testimonial-3');

            // Loop through each testimonial and populate the HTML
            testimonialCards.forEach((card, index) => {
                if (testimonials[index]) {
                    const img = card.querySelector('.vcard');
                    const name = card.querySelector('h3');
                    const feedback = card.querySelector('p');

                    // Set the content from the JSON data
                    img.src = testimonials[index].image;
                    img.alt = 'Image of ' + testimonials[index].name;
                    name.textContent = testimonials[index].name;
                    feedback.textContent = testimonials[index].comment;
                }
            });

            // Initialize Owl Carousel after testimonials have been populated with a delay
            setTimeout(initCarousel, 100);  // Small delay to ensure DOM update
        })
        .catch(error => console.error('Error fetching testimonials:', error));
}

function initCarousel() {
    $('#testimonial-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        autoplay: true,
        responsive: {
            0: { items: 1 },
            600: { items: 1 },
            1000: { items: 1 }
        }
    });
}

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const eventContainer = document.getElementById('events');
        data.events.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.classList.add('item');
            eventItem.innerHTML = `
                <div class="row">
                    <div class="col-lg-2 image">
                        <img src="${event.image}" alt="${event.name}">
                    </div>
                    <div class="col-lg-10">
                        <ul class="list-unstyled">
                            <li>
                                <h4>${event.name}</h4>
                            </li>
                            <li>
                                <span><i class="fa fa-calendar-alt"></i> Date:</span>
                                <h6>${event.date}</h6>
                            </li>
                            <li>
                                <span><i class="fa fa-clock duration-icon"></i> Duration:</span>
                                <h6>${event.duration}</h6>
                            </li>
                            <li>
                                <span><i class="fa fa-map-marker-alt"></i> Location:</span>
                                <h6>${event.location}</h6> <!-- Added location -->
                            </li>
                        </ul>
                        <!-- Toggle button with separate icon -->
                        <a href="#" class="event-link"><i class="fa fa-angle-right toggle-icon"></i></a>
                    </div>
                </div>

                <!-- Hidden description section -->
                <div class="event-description">
                    <p style="font-weight: bold;">${event.brief}</p>
                </div>
            `;

            // Add click event to the event link
            eventItem.querySelector('.event-link').addEventListener('click', function (e) {
                e.preventDefault(); // Prevent the default anchor behavior
                const description = eventItem.querySelector('.event-description');
                const arrowIcon = eventItem.querySelector('.event-link .fa'); // Target only the toggle icon

                // Toggle the 'show' class to expand/collapse description
                if (description.style.maxHeight === '0px' || description.style.maxHeight === '') {
                    description.style.maxHeight = description.scrollHeight + 'px'; // Expand to fit content
                    arrowIcon.classList.remove('fa-angle-right'); // Change arrow to down
                    arrowIcon.classList.add('fa-angle-down');
                } else {
                    description.style.maxHeight = '0px'; // Collapse
                    arrowIcon.classList.remove('fa-angle-down'); // Change arrow to right
                    arrowIcon.classList.add('fa-angle-right');
                }
            });
            eventContainer.appendChild(eventItem);
        });
    })
    .catch(error => console.error('Error fetching the event data:', error));





// Fetch the JSON data
document.addEventListener("DOMContentLoaded", function () {
    // Function to get the course ID from the URL parameters
    function getCourseIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id'); // Returns the 'id' parameter from the URL
    }

    // Fetch the course ID from the URL
    const courseId = getCourseIdFromUrl();

    // Fetch data from courses.json
    fetch('../data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => {
            const courses = data.courses;

            // Find the course by its ID
            const course = courses.find(c => c.id == courseId); // Use the courseId from the URL

            if (!course) {
                console.error('Course not found');
                return;
            }

            // Populate course name and description
            const courseName = document.getElementById('course-name');
            courseName.id = 'course-name';
            courseName.style.padding = '20px';
            courseName.innerText = course.name;

            const courseDesc = document.createElement('p');
            courseDesc.id = 'course-desc';
            courseDesc.innerText = course.description;

            const headerContent = document.querySelector('.header-content');
            if (headerContent) {
                headerContent.appendChild(courseName);
                headerContent.appendChild(courseDesc);
            } else {
                console.error('Header content element not found.');
            }

            // Populate other course details
            const courseDetail = document.querySelector('#course-detail');
            const courseDuration = document.getElementById('duration');
            const courseAge = document.getElementById('age');
            const courseType = document.getElementById('type');

            if (courseDetail) {
                courseDetail.innerHTML += ` Description: ${course.description}`;
            } else {
                console.error('Course detail element not found.');
            }

            // Append course duration without removing icons
            if (courseDuration) {
                courseDuration.innerHTML += ` Duration: ${course.duration}`;
            } else {
                console.error('Course duration element not found.');
            }

            // Append course age without removing icons
            if (courseAge) {
                courseAge.innerHTML += ` Target Age: ${course.target_age}`;
            } else {
                console.error('Course age element not found.');
            }

            // Append course type without removing icons
            if (courseType) {
                courseType.innerHTML += ` Type: ${course.type}`;
            } else {
                console.error('Course type element not found.');
            }

            // Set course video
            const videoElement = document.getElementById('course-video');
            if (videoElement) {
                videoElement.setAttribute('src', course.course_video);
            } else {
                console.error('Video element not found.');
            }

            // Populate "What You'll Learn" section
            const contentDiv = document.querySelector('.content');
            if (contentDiv) {
                const whatYouWillLearnTitle = document.createElement('h3');
                whatYouWillLearnTitle.innerText = "What You'll Learn:";
                whatYouWillLearnTitle.style.padding = '10px';

                const whatYouWillLearn = document.createElement('p');
                whatYouWillLearn.setAttribute('id', 'what-you-will-learn')
                whatYouWillLearn.id = 'what-you-will-learn';
                whatYouWillLearn.innerText = course.youWillLearn;

                contentDiv.appendChild(whatYouWillLearnTitle);
                contentDiv.appendChild(whatYouWillLearn);

                // Enrollment information
                const enrollmentInfoTitle = document.createElement('h3');
                enrollmentInfoTitle.innerText = "Enrollment Information:";
                enrollmentInfoTitle.style.padding = '10px';

                const enrollmentInfo = document.createElement('p');
                const enrollInfoStrong = document.createElement('strong');
                enrollInfoStrong.id = 'enroll-info';
                enrollInfoStrong.innerText = course.enrollment;

                enrollmentInfo.appendChild(document.createTextNode("Sign up now! Classes start on "));
                enrollmentInfo.appendChild(enrollInfoStrong);

                contentDiv.appendChild(enrollmentInfoTitle);
                contentDiv.appendChild(enrollmentInfo);
            } else {
                console.error('Content element not found.');
            }

            // Handle the comment section
            const commentSection = document.querySelector('.comments-section');
            if (commentSection && Array.isArray(course.comments)) {
                course.comments.forEach(comment => {
                    const commentDiv = document.createElement('div');
                    commentDiv.className = 'comment';

                    const commentContentDiv = document.createElement('div');
                    commentContentDiv.className = 'comment-content';

                    const usernameSpan = document.createElement('span');
                    usernameSpan.className = 'username';
                    usernameSpan.innerText = comment.user;

                    const commentP = document.createElement('p');
                    commentP.innerText = comment.comment;

                    const commentMetaDiv = document.createElement('div');
                    commentMetaDiv.className = 'comment-meta';
                    const timestampSpan = document.createElement('span');
                    timestampSpan.className = 'timestamp';
                    timestampSpan.innerText = comment.date;

                    const replyLink = document.createElement('a');
                    replyLink.href = '#';
                    replyLink.className = 'reply-link';
                    replyLink.innerText = 'Reply';

                    replyLink.addEventListener('click', function (event) {
                        event.preventDefault();
                        createReplyForm(commentDiv);
                    });

                    commentMetaDiv.appendChild(timestampSpan);
                    commentContentDiv.appendChild(usernameSpan);
                    commentContentDiv.appendChild(commentP);
                    commentContentDiv.appendChild(commentMetaDiv);

                    commentDiv.appendChild(commentContentDiv);
                    commentSection.appendChild(commentDiv);
                });
            } else {
                console.error('Comment section element not found or comments are not an array.');
            }


            // Add new comments
            const submitBtn = document.getElementById('submit-btn');
            if (submitBtn) {
                submitBtn.addEventListener('click', function (event) {
                    event.preventDefault();

                    const username = document.getElementById('username').value;
                    const messageContent = document.getElementById('message-content').value;

                    if (!username || !messageContent) {
                        alert('Please fill out all fields.');
                        return;
                    }

                    const newCommentDiv = document.createElement('div');
                    newCommentDiv.className = 'comment d-flex mb-4';

                    const commentContentDiv = document.createElement('div');
                    commentContentDiv.className = 'comment-content d-flex flex-column';

                    const usernameSpan = document.createElement('span');
                    usernameSpan.className = 'username font-weight-bold';
                    usernameSpan.innerText = username;

                    const messageP = document.createElement('p');
                    messageP.className = 'mb-2';
                    messageP.innerText = messageContent;

                    const commentMetaDiv = document.createElement('div');
                    commentMetaDiv.className = 'comment-meta';
                    const timestampSpan = document.createElement('span');
                    timestampSpan.className = 'timestamp text-muted';
                    const timestamp = new Date().toLocaleString();
                    timestampSpan.innerText = timestamp;

                    commentContentDiv.appendChild(usernameSpan);
                    commentContentDiv.appendChild(messageP);
                    commentContentDiv.appendChild(commentMetaDiv);
                    commentMetaDiv.appendChild(timestampSpan);
                    newCommentDiv.appendChild(commentContentDiv);
                    commentSection.appendChild(newCommentDiv);

                    // Clear input fields
                    document.getElementById('username').value = '';
                    document.getElementById('message-content').value = '';

                });
            } else {
                console.error('Submit button not found.');
            }
        })
        .catch(error => console.error('Error:', error));
});

document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from courses.json
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const courses = data.courses; // Assuming data.json has a 'courses' array

            // Select containers for different types of courses
            const scienceContainer = document.getElementById('science-container');
            const mathContainer = document.getElementById('math-container');
            const technologyContainer = document.getElementById('technology-container');
            const engineeringContainer = document.getElementById('engineering-container');
            const artContainer = document.getElementById('art-container');

            // Counter to track how many cards have been displayed
            let displayedCards = 0;

            // Store cards for later use
            const allCards = [];

            // Loop through the courses and create a card for each
            courses.forEach(course => {
                // Create a new card element for each course
                let card = document.createElement('div');

                // Add the Bootstrap and event_outer classes
                card.classList.add('col-lg-4', 'col-md-6', 'mb-30', 'event_outer'); // Bootstrap classes

                // Add specific class based on course type
                card.classList.add(`${course.type}-card`);

                // Populate the card content dynamically with a clickable link
                const email = getQueryParam('email');
                card.innerHTML = ` 
                    <a href="../pages/courses.html?id=${course.id}&email=${email}" class="card-link" style="text-decoration: none; color: inherit;">
                        <div class="card">
                            <div class="thumb" style = "margin-top:15px">
                                <img class="coursePic card-img-top" src="${course.image}" alt="Image of ${course.name}">
                            </div>
                            <div class="down-content" style = "margin-top:10px"  >
                                <span class="CategoryName" style=" text-transform: capitalize;" >${course.type}</span>
                                <h4 class="courseName" style="font-weight: bold;" >${course.name}</h4>
                                <p style = "margin-bottom:20px" >Target Age: <span class="courseAge">${course.target_age}</span></p>
                            </div>
                        </div>
                    </a>
                `;

                // Store the card in the allCards array
                allCards.push(card);

                // Append the card to the appropriate container based on the type
                if (course.type === "science") {
                    scienceContainer.appendChild(card);
                } else if (course.type === "math") {
                    mathContainer.appendChild(card);
                } else if (course.type === "art") {
                    artContainer.appendChild(card);
                } else if (course.type === "technology") {
                    technologyContainer.appendChild(card);
                } else if (course.type === "engineering") {
                    engineeringContainer.appendChild(card);
                }

                // Initially hide cards beyond the 6th card
                if (displayedCards >= 6) {
                    card.style.display = 'none'; // Hide cards after the first 6
                }
                displayedCards++;
            });

            // Filter functionality
            const filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(button => {
                button.addEventListener('click', () => {
                    const filter = button.getAttribute('data-filter');

                    // Show/hide cards based on the selected filter
                    allCards.forEach(card => {
                        if (filter === 'all') {
                            card.style.display = 'block'; // Show all cards
                        } else if (card.classList.contains(`${filter}-card`)) {
                            card.style.display = 'block'; // Show filtered cards
                        } else {
                            card.style.display = 'none'; // Hide others
                        }
                    });

                    // Hide the 'Show More' button after filtering
                    showMoreBtn.style.display = 'none'; // Hide 'Show More' button
                    showLessBtn.style.display = 'none'; // Hide 'Show Less' button
                    displayedCards = 0; // Reset displayed card count
                });
            });

            // Show more functionality
            const showMoreBtn = document.getElementById('showMoreBtn');
            const showLessBtn = document.getElementById('showLessBtn');

            showMoreBtn.addEventListener('click', function () {
                // Show all hidden cards
                allCards.forEach(card => card.style.display = 'block'); // Show hidden cards
                showMoreBtn.style.display = 'none'; // Hide the 'Show More' button
                showLessBtn.style.display = 'inline-block'; // Show the 'Show Less' button
            });

            // Show less functionality
            showLessBtn.addEventListener('click', function () {
                // Hide all cards beyond the first 6
                allCards.forEach((card, index) => {
                    if (index >= 6) {
                        card.style.display = 'none'; // Hide cards beyond the first 6
                    }
                });
                showLessBtn.style.display = 'none'; // Hide the 'Show Less' button
                showMoreBtn.style.display = 'inline-block'; // Show the 'Show More' button
            });
        })
        .catch(error => console.error('Error fetching the JSON data:', error));
});


 