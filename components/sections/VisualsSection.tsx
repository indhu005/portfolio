interface VisualsSectionProps {
  id: string;
  title?: string;
  images?: string[];
}

export default function VisualsSection({
  id,
  title = 'Design Exploration',
  images = [],
}: VisualsSectionProps) {
  return (
    <section id={id} className="pt-[120px] max-w-[800px]">
      <h2 className="font-ui text-[40px] font-medium text-[#1C1917] mb-12">
        {title}
      </h2>
      <div className="space-y-8">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div
              key={index}
              className="w-full aspect-video bg-[#EFECE8] rounded-lg flex items-center justify-center"
            >
              <p className="font-body text-[16px] text-[#9CA3AF]">
                Image {index + 1}
              </p>
            </div>
          ))
        ) : (
          <>
            <div className="w-full aspect-video bg-[#EFECE8] rounded-lg flex items-center justify-center">
              <p className="font-body text-[16px] text-[#9CA3AF]">
                Visual 1
              </p>
            </div>
            <div className="w-full aspect-video bg-[#EFECE8] rounded-lg flex items-center justify-center">
              <p className="font-body text-[16px] text-[#9CA3AF]">
                Visual 2
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
