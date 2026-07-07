interface SolutionSectionProps {
  id: string;
  title?: string;
  description?: string;
  approach?: string[];
}

export default function SolutionSection({
  id,
  title = 'The Solution',
  description = 'How we solved the problem.',
  approach = ['Research & Discovery', 'Design & Iteration', 'Implementation'],
}: SolutionSectionProps) {
  return (
    <section id={id} className="pt-[120px] max-w-[800px]">
      <h2 className="font-ui text-[40px] font-medium text-[#1C1917] mb-8">
        {title}
      </h2>
      <p className="font-body text-[16px] font-normal text-[#4A4A4A] leading-[160%] mb-12">
        {description}
      </p>
      <div className="grid grid-cols-3 gap-8">
        {approach.map((step, index) => (
          <div key={index}>
            <p className="font-ui text-[12px] font-medium uppercase tracking-[0.06em] text-[#9CA3AF] mb-3">
              Step {index + 1}
            </p>
            <p className="font-body text-[16px] font-normal text-[#1C1917]">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
