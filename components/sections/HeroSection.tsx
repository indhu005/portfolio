interface HeroSectionProps {
  id: string;
  title?: string;
  subtitle?: string;
}

export default function HeroSection({ id, title = 'Project Title', subtitle }: HeroSectionProps) {
  return (
    <section id={id} className="min-h-[80vh] flex items-center">
      <div className="max-w-[800px]">
        <h1 className="font-display text-[64px] font-normal text-[#1C1917] leading-[1.1]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 font-body text-[16px] font-normal text-[#4A4A4A] leading-[160%]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
