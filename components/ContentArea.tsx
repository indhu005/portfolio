'use client';

interface ContentAreaProps {
  children: React.ReactNode;
}

export default function ContentArea({ children }: ContentAreaProps) {
  return (
    <main
      className="fixed overflow-y-scroll bg-[#F7F4F0]"
      style={{ left: '380px', top: '72px', right: '0', bottom: '0', padding: '60px' }}
    >
      {children}
    </main>
  );
}
