import { ReactNode } from 'react';

import { LeftSidebar } from '@/components/sidebar/LeftSidebar';

type ISectionProps = {
  // title?: string;
  // description?: string;
  // yPadding?: string;
  children: ReactNode;
};

const VerticalLayout = ({ children }: ISectionProps) => (
  <div className={`flex h-screen w-screen`}>
    <LeftSidebar />
    {children}
  </div>
);

export { VerticalLayout };
