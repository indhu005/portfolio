interface OverviewSectionProps {
  id: string;
  role?: string;
  timeline?: string;
  description?: string;
}

export default function OverviewSection({
  id,
  role = 'Lead Designer',
  timeline = '6 months',
  description = 'Project overview and context goes here.',
}: OverviewSectionProps) {
  return (
    <section id={id} className="pt-[120px] max-w-[800px]">
      <h2 className="font-ui text-[40px] font-medium text-[#1C1917] mb-8">
        Overview
      </h2>
      <div className="grid grid-cols-2 gap-8 mb-12">
        <div>
          <p className="font-ui text-[12px] font-medium uppercase tracking-[0.06em] text-[#9CA3AF] mb-2">
            Role
          </p>
          <p className="font-body text-[16px] font-normal text-[#1C1917]">{role}</p>
        </div>
        <div>
          <p className="font-ui text-[12px] font-medium uppercase tracking-[0.06em] text-[#9CA3AF] mb-2">
            Timeline
          </p>
          <p className="font-body text-[16px] font-normal text-[#1C1917]">{timeline}</p>
        </div>
      </div>
      <p className="font-body text-[16px] font-normal text-[#4A4A4A] leading-[160%]">
        {description}
      </p>
    </section>
  );
}
