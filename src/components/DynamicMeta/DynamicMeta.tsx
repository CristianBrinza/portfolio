import React from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../SEO/SEO';
import { getRouteSeo } from '../../seo/siteSeo';

interface DynamicMetaProps {
  title: string;
  description: string;
  keywords?: string;
}

const DynamicMeta: React.FC<DynamicMetaProps> = ({ title, description }) => {
  const { pathname } = useLocation();
  const routeSeo = getRouteSeo(pathname);

  return (
    <SEO
      title={title}
      description={description}
      canonicalPath={routeSeo.canonicalPath}
      language={routeSeo.language}
      noIndex={routeSeo.noIndex}
      pageType={routeSeo.pageType}
    />
  );
};

export default DynamicMeta;
