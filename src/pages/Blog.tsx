import { Trans } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import Title from '../components/Text/Title/Title.tsx';
import Page from '../components/Page.tsx';
import '../styles/Blog.css';
import { Link } from 'react-router-dom';

// Define the type for blog items
interface BlogItem {
  title: string;
  description: string;
  to?: string; // 'to' is optional
  img?: string; // 'img' is optional
}

export default function Blog() {
  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: <Trans>navigation.blog_page</Trans> },
  ];

  // Items array with optional 'to' and 'img'
  const items: BlogItem[] = [
    {
      title: 'First Blog Post',
      description: 'This is the description of the first blog post.',
    },
    {
      to: '/second-post', // Link for the second post
      title: 'Second Blog Post',
      description: 'This is the description of the second blog post.',
      img: 'https://via.placeholder.com/150', // Optional image
    },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <Page>
        <Title style={{ marginTop: '20px' }}>What’s new</Title>

        <div className="blog_cards">
          {items.map((item, index: number) => {
            const hasLink = !!item.to; // Check if the 'to' prop exists

            return (
              <Link
                key={index}
                to={hasLink ? item.to! : '#'}
                className="blog"
                style={{ cursor: hasLink ? 'pointer' : 'default' }} // Change cursor based on 'to'
              >
                {item.img ? (
                  <img src={item.img} alt="Blog Post" className="blog_img" />
                ) : (
                  <div className="blog_img_empty"></div>
                )}
                <div className="blog_title">{item.title}</div>
                <div className="blog_subtitle">{item.description}</div>
              </Link>
            );
          })}
        </div>
      </Page>
    </>
  );
}
