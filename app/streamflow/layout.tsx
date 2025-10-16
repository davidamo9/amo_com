import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'StreamFlow AI Platform',
};

export default function StreamflowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="streamflow-layout">
      {children}
    </div>
  );
}
