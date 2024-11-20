import { Trans } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import Title from '../components/Text/Title/Title.tsx';
import Parapraph from '../components/Text/Parapraph/Parapraph.tsx';
import Page from '../components/Page.tsx';
import '../styles/Blog.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer.tsx';
import PageLoading from "../components/PageLoading/PageLoading.tsx";

// Define the type for blog items
interface BlogItem {
  title: string;
  description: string;
  to?: string; // 'to' is optional
  img?: string; // 'img' is optional
  news_type?: string;
}

export default function Blog() {
  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: <Trans>navigation.blog_page</Trans> },
  ];

  const [showBlogPosts, setBlogPosts] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BLOG_DATA);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBlogPosts(data); // Set the fetched blog posts
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchBlogPosts();
  }, []); // Ensure the useEffect runs only once on mount

  if (loading) {
    return <PageLoading/>; // Show a loading message while fetching data
  }

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <Page>
       <div>
         <Title style={{ marginTop: '20px' }}>What’s new</Title>
         <Parapraph style={{ marginBottom: '20px' }}>
           Welcome to the Blog & Updates section! Here you’ll find news, updates, and documentation on the latest website developments, new features, design changes, and more. Stay tuned as we continuously improve your experience!
         </Parapraph>
       </div>
        <div className="blog_cards">
          {showBlogPosts.map((item, index: number) => {
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
                <div className="blog_title">
                  {item.news_type ? (
                      <> <span className='blog_title_type'> {item.news_type}  </span> - </>
                    ) : (
                      <></>
                    )}
                  {item.title}</div>
                <div className="blog_subtitle">{item.description}</div>
              </Link>
            );
          })}
        </div>
      </Page>
      <Footer />
    </>
  );
}
