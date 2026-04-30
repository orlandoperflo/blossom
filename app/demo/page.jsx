export default function DemoPage() {
  return (
    <>
      <div style={{ padding: '75% 0 0 0', position: 'relative' }}>
        <iframe
          src="https://player.vimeo.com/video/1188239389?badge=0&autopause=0&player_id=0&app_id=58479"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          title="Blossom Accelerate Demo"
        ></iframe>
      </div>
      <script src="https://player.vimeo.com/api/player.js"></script>
    </>
  )
}
