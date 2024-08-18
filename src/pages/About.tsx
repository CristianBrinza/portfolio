import Breadcrumb from "../components/Breadcrumb.tsx";

export default function About() {

    const breadcrumbItems = [
        { label: 'Acasa', url: '/' },
        { label: 'Prepararea cafelei', url: '/prepararea-cafelei' },
        { label: 'Aparate de cafea', url: '/apparate-de-cafea' },
        { label: 'Aparat de cafea DeLonghi ECAM650.85MS, Argintiu', url: '/aparat-de-cafea-delonghi' },
    ];

  return (
    <>
        <Breadcrumb items={breadcrumbItems} />
<br/>
        About
    </>
  );
}
