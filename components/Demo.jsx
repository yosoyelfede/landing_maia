export default function Demo() {
  return (
    <section id="demo" className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Demo interactivo</h2>
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl mx-auto border-2 border-primary/20">
          <iframe 
            src="https://maiavr.s3.sa-east-1.amazonaws.com/lift/3d.html"
            className="absolute inset-0 w-full h-full"
            allow="xr-spatial-tracking *; microphone *; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Demo de Maia"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
} 