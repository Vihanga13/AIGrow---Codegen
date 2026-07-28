import { PlayCircle } from 'lucide-react';

/** Extracts a YouTube video id from the common URL shapes, else null. */
function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

/** Extracts a Vimeo numeric id, else null. */
function vimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

/**
 * Renders a product demo video. Accepts a YouTube/Vimeo link (embedded as an iframe)
 * or a direct video file path (.mp4/.webm) served with native controls.
 */
export default function ProductVideo({ src, title }: { src: string; title: string }) {
  const yt = youtubeId(src);
  const vimeo = yt ? null : vimeoId(src);

  return (
    <section>
      <div className="flex items-center gap-2 mb-5">
        <PlayCircle className="h-6 w-6 text-emerald-600" />
        <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-950 tracking-tight">See it in action</h2>
      </div>

      <div className="relative aspect-video overflow-hidden rounded-3xl border border-gray-200/70 bg-gray-950 shadow-lg shadow-emerald-900/5">
        {yt ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${yt}`}
            title={`${title} — product video`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : vimeo ? (
          <iframe
            src={`https://player.vimeo.com/video/${vimeo}`}
            title={`${title} — product video`}
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <video
            src={src}
            controls
            preload="metadata"
            playsInline
            className="absolute inset-0 h-full w-full object-contain"
          />
        )}
      </div>
    </section>
  );
}
