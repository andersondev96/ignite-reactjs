import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import Prismic from '@prismicio/client';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getPrismicClient } from '../services/prismic';

import styles from './home.module.scss';
import commonStyles from '../styles/common.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
  preview: boolean;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Home({ postsPagination, preview }: HomeProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [nextPage, setNextPage] = useState<string | null>('');

  useEffect(() => {
    if (postsPagination) {
      setPosts(
        postsPagination.results.map(post => {
          return {
            ...post,
            first_publication_date: format(
              new Date(post.first_publication_date),
              'dd MMM yyyy',
              {
                locale: ptBR,
              }
            ),
          };
        })
      );
    }
    if (postsPagination.next_page) {
      setNextPage(postsPagination.next_page);
    }
  }, [postsPagination]);

  const handleLoadMorePosts = useCallback(() => {
    if (nextPage) {
      fetch(nextPage)
        .then(res => {
          return res.json();
        })
        .then(response => {
          const loadedPosts = response.results.map(post => {
            return {
              uid: post.uid,
              first_publication_date: format(
                new Date(post.first_publication_date),
                'dd MM yyyy',
                {
                  locale: ptBR,
                }
              ),
              data: {
                title: post.data.title,
                subtitle: post.data.subtitle,
                author: post.data.author,
              },
            };
          });
          setPosts([...posts, ...loadedPosts]);
          setNextPage(response.next_page);
        });
    }
  }, [nextPage, posts]);

  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>

      <div className={styles.container}>
        <main className={styles.postContainer}>
          {posts.length > 0 &&
            posts.map(post => (
              <Link key={post.uid} href={`/post/${post.uid}`}>
                <a className={styles.post}>
                  <strong>{post.data.title}</strong>
                  <p>{post.data.subtitle}</p>
                  <footer>
                    <span>
                      <FiCalendar size={20} color="#BBBBBB" />
                      <time>{post.first_publication_date}</time>
                    </span>
                    <span>
                      <FiUser size={20} color="#BBBBBB" />
                      {post.data.author}
                    </span>
                  </footer>
                </a>
              </Link>
            ))}

          {nextPage && (
            <button
              type="button"
              className={styles.loadMorePosts}
              onClick={handleLoadMorePosts}
            >
              Carregar mais posts
            </button>
          )}

          {preview && (
            <aside>
              <Link href="/api/exit-preview">
                <a className={commonStyles.preview}>Sair do modo Preview</a>
              </Link>
            </aside>
          )}
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  previewData,
}) => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      pageSize: 2,
      page: 1,
      ref: previewData?.ref ?? null,
    }
  );

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: posts,
      },
      preview,
    },
  };
};
