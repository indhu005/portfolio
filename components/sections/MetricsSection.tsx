interface Metric {
  value: string;
  label: string;
}

interface MetricsSectionProps {
  id: string;
  title?: string;
  metrics?: Metric[];
}

export default function MetricsSection({
  id,
  title = 'Impact',
  metrics = [
    { value: '45%', label: 'Increase in engagement' },
    { value: '2.3x', label: 'Faster task completion' },
    { value: '92%', label: 'User satisfaction' },
  ],
}: MetricsSectionProps) {
  return (
    <section id={id} className="pt-[120px] max-w-[800px]">
      <h2 className="font-ui text-[40px] font-medium text-[#1C1917] mb-12">
        {title}
      </h2>
      <div className="grid grid-cols-3 gap-12">
        {metrics.map((metric, index) => (
          <div key={index}>
            <p className="font-numbers text-[64px] font-medium text-[#1C1917] mb-2">
              {metric.value}
            </p>
            <p className="font-body text-[16px] font-normal text-[#4A4A4A]">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
