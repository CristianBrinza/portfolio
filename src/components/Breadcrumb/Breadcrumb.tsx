import { Link } from 'react-router-dom';
import './Breadcrumb.css';
import { ReactNode } from 'react';

interface BreadcrumbItem {
  label: ReactNode;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="breadcrumb main">
      {items.map((item: BreadcrumbItem, index: number) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index}>
            {isLast || !item.url ? (
              <span>{item.label}</span>
            ) : (
              <>
                <Link to={item.url}>{item.label}</Link>
                <span className="breadcrumb-separator"> / </span>
              </>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
