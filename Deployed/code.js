document.addEventListener('DOMContentLoaded', function() {

    // --- New Post Simulation ---
    const postButton = document.getElementById('postButton');
    const newPostTextarea = document.getElementById('newPostTextarea');
    const feed = document.querySelector('.feed'); // Area to add new posts

    if (postButton && newPostTextarea && feed) {
        postButton.addEventListener('click', () => {
            const postText = newPostTextarea.value.trim();
            if (postText) {
                // **Simulation**: In a real app, you'd send this to the server.
                // Here, we'll just log it and maybe prepend a simple placeholder.
                console.log("New post submitted:", postText);

                // Optional: Add a visual representation (very basic)
                const newPostElement = document.createElement('article');
                newPostElement.classList.add('post');
                newPostElement.innerHTML = `
                    <div class="post-header">
                        <img src="https://via.placeholder.com/40" alt="User Avatar" class="avatar">
                        <div>
                            <span class="username">You</span>
                            <span class="timestamp"> • Just now</span>
                        </div>
                    </div>
                    <div class="post-content">
                        <p>${escapeHTML(postText)}</p> <!-- Basic escaping -->
                    </div>
                    <div class="post-actions">
                        <button class="action-btn reply-btn"><i class="fas fa-reply"></i> Reply</button>
                        <button class="action-btn like-btn"><i class="far fa-heart"></i> Like</button>
                        <button class="action-btn"><i class="fas fa-share"></i> Share</button>
                    </div>
                     <div class="reply-box" style="display: none;">
                        <textarea placeholder="Write your reply..."></textarea>
                        <button class="btn btn-secondary btn-sm">Send Reply</button>
                    </div>
                    <div class="post-replies"></div>
                `;
                // Add the new post to the top of the feed
                feed.insertBefore(newPostElement, feed.children[1]); // Insert after the new post box

                // Add event listeners to the newly created post's buttons
                addEventListenersToPost(newPostElement);

                // Clear the textarea
                newPostTextarea.value = '';

            } else {
                alert("Please write something to post!");
            }
        });
    }

    // --- Add event listeners to existing and new posts ---
    function addEventListenersToPost(postElement) {
        // Reply Button Functionality
        const replyButton = postElement.querySelector('.reply-btn');
        const replyBox = postElement.querySelector('.reply-box');

        if (replyButton && replyBox) {
            replyButton.addEventListener('click', () => {
                // Toggle display of the reply box
                replyBox.style.display = replyBox.style.display === 'none' ? 'block' : 'none';
                if(replyBox.style.display === 'block') {
                    replyBox.querySelector('textarea').focus();
                }
            });
        }

        // Like Button Functionality (Simulation)
        const likeButton = postElement.querySelector('.like-btn');
        if (likeButton) {
            likeButton.addEventListener('click', () => {
                const likeIcon = likeButton.querySelector('i');
                const likeCountSpan = likeButton.querySelector('.like-count');
                let currentLikes = 0;

                if (likeCountSpan) {
                    currentLikes = parseInt(likeCountSpan.textContent || '0', 10);
                }

                if (likeButton.classList.contains('liked')) {
                    // Unlike
                    likeButton.classList.remove('liked');
                    likeIcon.classList.remove('fas'); // Switch back to regular icon
                    likeIcon.classList.add('far');   // Font Awesome class for regular heart
                    if (likeCountSpan) likeCountSpan.textContent = Math.max(0, currentLikes - 1);
                } else {
                    // Like
                    likeButton.classList.add('liked');
                    likeIcon.classList.remove('far');
                    likeIcon.classList.add('fas'); // Font Awesome class for solid heart
                    if (likeCountSpan) likeCountSpan.textContent = currentLikes + 1;
                    else { // If there was no count span initially
                       const newCountSpan = document.createElement('span');
                       newCountSpan.classList.add('like-count');
                       newCountSpan.textContent = '1';
                       likeButton.appendChild(newCountSpan); // Add count span
                    }
                }
                 // Remove count span if likes go back to 0 and it exists
                 if (likeCountSpan && parseInt(likeCountSpan.textContent || '0', 10) === 0) {
                    likeButton.removeChild(likeCountSpan);
                 }
            });
        }

        // Add listeners for other buttons if needed (Share, Reply Send, etc.)
        const sendReplyButton = postElement.querySelector('.reply-box button');
        if (sendReplyButton) {
             sendReplyButton.addEventListener('click', () => {
                 const replyTextarea = postElement.querySelector('.reply-box textarea');
                 const replyText = replyTextarea.value.trim();
                 if (replyText) {
                     console.log(`Simulating reply to post ${postElement.id || 'unknown'}: ${replyText}`);
                     // In real app: send to server, then append reply visually
                     // Basic visual simulation:
                     const repliesContainer = postElement.querySelector('.post-replies');
                     const newReplyDiv = document.createElement('div');
                     newReplyDiv.classList.add('reply');
                     newReplyDiv.innerHTML = `
                        <img src="https://via.placeholder.com/30" alt="User Avatar" class="avatar avatar-sm">
                        <div>
                            <span class="username">You</span>
                            <span class="timestamp"> • Just now</span>
                            <p>${escapeHTML(replyText)}</p>
                        </div>
                     `;
                     repliesContainer.appendChild(newReplyDiv);

                     replyTextarea.value = ''; // Clear textarea
                     replyBox.style.display = 'none'; // Hide reply box
                 }
             });
        }
    }

    // --- Initial Setup: Add listeners to posts already on the page ---
    const allPosts = document.querySelectorAll('.post');
    allPosts.forEach(post => {
        addEventListenersToPost(post);
    });

    // --- Helper function for basic HTML escaping ---
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

});