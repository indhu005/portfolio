interface ReflectionSectionProps {
  id: string;
  title?: string;
  learnings?: string[];
  nextSteps?: string;
}

export default function ReflectionSection({
  id,
  title = 'Reflection',
  learnings = [
    'Key learning from the project',
    'Another important insight',
    'What we would do differently',
  ],
  nextSteps = 'Future iterations and improvements.',
}: ReflectionSectionProps) {
  return (
    <section id={id} className="pt-[120px] pb-32 max-w-[800px]">
      <h2 className="font-ui text-[40px] font-medium text-[#1C1917] mb-8">
        {title}
      </h2>
      <div className="space-y-12">
        <div>
          <p className="font-ui text-[12px] font-medium uppercase tracking-[0.06em] text-[#9CA3AF] mb-4">
            Key Learnings
          </p>
          <ul className="space-y-4">
            {learnings.map((learning, index) => (
              <li
                key={index}
                className="font-body text-[16px] font-normal text-[#4A4A4A] leading-[160%] pl-6 relative before:content-['•'] before:absolute before:left-0"
              >
                {learning}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-ui text-[12px] font-medium uppercase tracking-[0.06em] text-[#9CA3AF] mb-4">
            Next Steps
          </p>
          <p className="font-body text-[16px] font-normal text-[#4A4A4A] leading-[160%]">
            {nextSteps}
          </p>
        </div>
      </div>
    </section>
  );
}
