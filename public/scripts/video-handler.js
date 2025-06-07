// Wacht tot de DOM volledig is geladen
document.addEventListener('DOMContentLoaded', function() {
    // Elementen ophalen
    const thumbnail = document.getElementById('videoThumbnail');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoFrame = document.getElementById('videoFrame');
    const videoTitle = document.getElementById('videoTitle');
    
    // Video configuratie (wordt dynamisch ingesteld via data-attributen)
    const videoId = thumbnail?.dataset.videoId;
    const title = thumbnail?.dataset.title || 'Video';
    const description = thumbnail?.dataset.description || '';
    
    // Titel en beschrijving instellen
    if (videoTitle) {
        videoTitle.textContent = title;
        videoTitle.title = description;
    }
    
    // Event listener toevoegen als alle benodigde elementen bestaan
    if (thumbnail && videoPlayer && videoFrame && videoId) {
        thumbnail.addEventListener('click', function() {
            thumbnail.style.display = 'none';
            videoPlayer.style.display = 'block';
            videoFrame.src = `https://customer-5j7pwes53hyjitp3.cloudflarestream.com/${videoId}/iframe?autoplay=true`;
        });
    } else {
        console.warn('Niet alle benodigde elementen gevonden voor video-afspeler');
    }
});
