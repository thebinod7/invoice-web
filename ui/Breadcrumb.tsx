import { SlashIcon } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { capitalizeFirstLetter } from '@/app/helpers';

export function BreadcrumbMenu({ items }: { items: string[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <>
            <BreadcrumbItem key={index}>
              <BreadcrumbPage
                className={`${
                  index === items.length - 1 ? 'font-semibold' : ''
                }`}
              >
                {capitalizeFirstLetter(item)}
              </BreadcrumbPage>
            </BreadcrumbItem>

            {index < items.length - 1 && (
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
            )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
