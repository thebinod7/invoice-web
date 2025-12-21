import { SlashIcon } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { capitalizeFirstLetter } from '@/app/helpers';
import { Fragment } from 'react';

export function BreadcrumbMenu({ items }: { items: string[] }) {
  const filteredItems = items.filter((item) => item !== '');
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {filteredItems.map((item, index) => (
          <Fragment key={index + 1}>
            <BreadcrumbItem>
              <BreadcrumbPage
                className={`${
                  index === filteredItems.length - 1 ? 'font-semibold' : ''
                }`}
              >
                {capitalizeFirstLetter(item)}
              </BreadcrumbPage>
            </BreadcrumbItem>

            {index < filteredItems.length - 1 && (
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
