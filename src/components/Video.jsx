import React from 'react';

const Video = ({
  videoId,
  title,
  caption = '',
  loop = true,
  autoplay = true,
  muted = true,
  preload = true,
  width = '100%',
  maxWidth = '800px',
}) => {
  const queryParams = new URLSearchParams({
    preload: preload ? 'true' : 'false',
    loop: loop ? 'true' : 'false',
    autoplay: autoplay ? 'true' : 'false',
    muted: muted ? 'true' : 'false',
    controls: 'true',
  });

  const videoUrl = `https://customer-5j7pwes53hyjitp3.cloudflarestream.com/${videoId}/iframe?${queryParams}`;

  return (
    <div 
      style={{
        maxWidth,
        margin: '2rem auto',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        width: '100%',
      }}
    >
      <div style={{
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        overflow: 'hidden',
      }}>
        <iframe
          src={videoUrl}
          title={title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {caption && (
        <p style={{
          textAlign: 'center',
          color: '#666',
          fontSize: '0.9em',
          fontStyle: 'italic',
          margin: 0,
          padding: '15px',
          lineHeight: 1.4,
          backgroundColor: '#f8f9fa',
          borderTop: '1px solid #eee',
        }}>
          {caption}
        </p>
      )}
      <style jsx>{`
        @media (max-width: 768px) {
          div {
            border-radius: 0 !important;
            margin: 1rem -1rem !important;
            max-width: 100% !important;
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Video;
