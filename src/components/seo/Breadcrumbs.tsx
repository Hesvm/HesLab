import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { generateBreadcrumbSchema, BreadcrumbItem } from '../../utils/schema';
import { JsonLd } from './JsonLd';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
  const { isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft2 : ArrowRight2;
  const schema = generateBreadcrumbSchema(items);

  return (
    <>
      <JsonLd data={schema} id="breadcrumbs-schema" />
      <nav
        aria-label="مسیر صفحه / Breadcrumb"
        className="w-full flex items-center gap-1.5 text-[12.5px] text-zinc-400 py-3 mb-4 flex-wrap"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={item.path} className="flex items-center gap-1.5">
              {index > 0 && (
                <ArrowIcon
                  size={12}
                  variant="Linear"
                  color="currentColor"
                  className="opacity-40 shrink-0"
                />
              )}
              {isLast ? (
                <span
                  aria-current="page"
                  className="text-zinc-800 font-semibold truncate max-w-[280px]"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-zinc-900 transition-colors duration-150"
                >
                  {item.name}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
};

export default Breadcrumbs;
