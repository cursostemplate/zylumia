"use client"

const videos = [
  "https://storage.googleapis.com/site-zylumia/video%203.mp4",
  "https://storage.googleapis.com/site-zylumia/V%C3%ADdeo%20sem%20t%C3%ADtulo%20%E2%80%90%20Feito%20com%20o%20Clipchamp.mp4",
  "https://storage.googleapis.com/site-zylumia/V%C3%ADdeo%20sem%20t%C3%ADtulo%20%E2%80%90%20Feito%20com%20o%20Clipchamp%20(60).mp4",
  "https://storage.googleapis.com/site-zylumia/video%204.1.mp4",
]

export function VideoSection() {
  return (
    <section className="w-full py-12 md:py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold font-lora tracking-tighter sm:text-4xl text-brand">Discover Our Story</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Watch our journey and connect with the authentic stories behind Zylumia
            </p>
          </div>
        </div>

        {/* Grid de 4 vídeos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {videos.map((videoUrl, index) => (
            <div key={index} className="w-full">
              <video
                src={videoUrl}
                controls
                playsInline
                className="w-full rounded-lg shadow-lg"
                style={{ aspectRatio: "130.95 / 233.38" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
