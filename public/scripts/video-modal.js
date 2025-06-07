document.addEventListener('DOMContentLoaded', function() {
    const thumbnail = document.getElementById('videoThumbnail');
    const modal = document.getElementById('videoModal');
    const closeBtn = document.getElementById('closeModal');
    const videoFrame = document.getElementById('videoFrame');
    const videoUrl = 'https://customer-5j7pwes53hyjitp3.cloudflarestream.com/e8c2fc778291443cb296387d406928af/iframe?autoplay=true';

    if (thumbnail && modal && closeBtn && videoFrame) {
        thumbnail.addEventListener('click', function(e) {
            e.preventDefault();
            videoFrame.src = videoUrl;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Force fullscreen
            if (videoFrame.requestFullscreen) {
                videoFrame.requestFullscreen().catch(err => {
                    console.log('Error attempting to enable fullscreen:', err);
                });
            } else if (videoFrame.webkitRequestFullscreen) { // Safari
                videoFrame.webkitRequestFullscreen();
            } else if (videoFrame.msRequestFullscreen) { // IE11
                videoFrame.msRequestFullscreen();
            }
        });

        function closeModal() {
            modal.style.display = 'none';
            videoFrame.src = '';
            document.body.style.overflow = 'auto';
            
            // Exit fullscreen if needed
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else if (document.webkitFullscreenElement) {
                document.webkitExitFullscreen();
            } else if (document.msFullscreenElement) {
                document.msExitFullscreen();
            }
        }

        closeBtn.addEventListener('click', closeModal);

        // Close modal when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeModal();
            }
        });

        // Close when clicking outside the iframe
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});
