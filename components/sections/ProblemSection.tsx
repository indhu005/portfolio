interface ProblemSectionProps {
  id: string;
  title?: string;
  description?: string;
  challenges?: string[];
}

export default function ProblemSection({
  id,
  title = 'The Challenge',
  description = 'Problem statement and context.',
  challenges = ['Challenge 1', 'Challenge 2', 'Challenge 3'],
}: ProblemSectionProps) {
  return (
    <section id={id} className="pt-[120px] max-w-[800px]">
      <h2 className="font-ui text-[40px] font-medium text-[#1C1917] mb-8">
        {title}
      </h2>
      <p className="font-body text-[16px] font-normal text-[#4A4A4A] leading-[160%] mb-12">
        {description}
      </p>
      <div className="space-y-6">
        {challenges.map((challenge, index) => (
          <div key={index} className="flex gap-4">
            <span className="font-body text-[16px] text-[#9CA3AF] flex-shrink-0">
              0{index + 1}
            </span>
            <p className="font-body text-[16px] font-normal text-[#1C1917] leading-[160%]">
              {challenge}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
