/* eslint-disable react/no-danger */
/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line no-use-before-define
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Prismic from '@prismicio/client';
import { v4 as uuidV4 } from 'uuid';

import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { RichText } from 'prismic-dom';
import Comments from '../../components/Comments';
import { getPrismicClient } from '../../services/prismic';

import styles from './post.module.scss';
import commonStyles from '../../styles/common.module.scss';

interface Post {
  first_publication_date: string | null;
  last_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
  preview: boolean;
  navPost: {
    nextPost: {
      uid: string | null;
      title: string | null;
    };
    prevPost: {
      uid: string | null;
      title: string | null;
    };
  };
}

export default function Post({
  post,
  preview,
  navPost,
}: PostProps): JSX.Element {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Carregando...</div>;
  }

  const postContent = post.data.content.map(text => {
    return {
      heading: text.heading,
      body: RichText.asText(text.body),
    };
  });

  const totalWords = postContent.reduce((acc, content) => {
    return (
      acc +
      (content.heading.split(/\s/g).length + content.body.split(/\s/g).length)
    );
  }, 0);

  const timeReading = Math.ceil(totalWords / 200);

  return (
    <>
      <Head>
        <title>Post | spacetraveling</title>
      </Head>

      <div className={styles.container}>
        {!postContent ? (
          <h1>Carregando...</h1>
        ) : (
          <>
            <section className={styles.banner}>
              <img src={String(post.data.banner.url)} alt="banner" />
            </section>

            <article className={styles.post}>
              <h1>{post.data.title}</h1>
              <section>
                <span>
                  <FiCalendar size={20} color="#D7D7D7" />
                  <time>
                    {format(
                      new Date(post.first_publication_date),
                      'dd MMM uuuu',
                      {
                        locale: ptBR,
                      }
                    )}
                  </time>
                </span>
                <span>
                  <FiUser size={20} color="#D7D7D7" />
                  {post.data.author}
                </span>
                <span>
                  <FiClock size={20} color="#D7D7D7" />
                  {timeReading} min
                </span>
              </section>

              <div className={styles.editPostDate}>
                <time>
                  {`* editado em ${
                    post.last_publication_date &&
                    format(
                      new Date(post.last_publication_date),
                      'dd MMM uuuu',
                      {
                        locale: ptBR,
                      }
                    )
                  } às ${
                    post.last_publication_date &&
                    format(new Date(post.last_publication_date), 'p', {
                      locale: ptBR,
                    })
                  }`}
                  {}
                </time>
              </div>

              <div className={styles.content}>
                {post.data.content.map(item => (
                  <React.Fragment key={uuidV4()}>
                    <strong>{item.heading}</strong>
                    {item.body.map(text => (
                      <div
                        key={uuidV4()}
                        dangerouslySetInnerHTML={{ __html: text.text }}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </div>

              <div className={styles.divider} />

              <div className={styles.postNav}>
                {navPost.prevPost.uid ? (
                  <div className={styles.previousPost}>
                    <p>{navPost.prevPost.title}</p>
                    <Link href={`/post/${navPost.prevPost.uid}`}>
                      <a>
                        <AiOutlineLeft size={12} />
                        Post anterior
                      </a>
                    </Link>
                  </div>
                ) : (
                  <div className={styles.previousPost} />
                )}

                {navPost.nextPost.uid ? (
                  <div className={styles.nextPost}>
                    <p>{navPost.nextPost.title}</p>
                    <Link href={`/post/${navPost.nextPost.uid}`}>
                      <a>
                        Próximo post
                        <AiOutlineRight size={12} />
                      </a>
                    </Link>
                  </div>
                ) : (
                  <div className={styles.nextPost} />
                )}
              </div>

              <Comments />

              {preview && (
                <aside>
                  <Link href="/api/exit-preview">
                    <a className={commonStyles.preview}>Sair do modo Preview</a>
                  </Link>
                </aside>
              )}
            </article>
          </>
        )}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    Prismic.Predicates.at('document.type', 'post'),
    {
      orderings: '[document.first_publication_date]',
      pageSize: 3,
    }
  );

  const slugs = posts.results.reduce((arr, post) => {
    arr.push(post.uid);

    return arr;
  }, []);

  const params = slugs.map(slug => {
    return {
      params: { slug },
    };
  });

  return {
    paths: params,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const prismic = getPrismicClient();

  const { slug } = params;

  const post = await prismic.getByUID('post', String(slug), {
    ref: previewData?.ref ?? null,
  });

  const nextPostData = await prismic.query(
    Prismic.predicates.at('document.type', 'post'),
    {
      after: post.id,
    }
  );

  const prevPostData = await prismic.query(
    Prismic.predicates.at('document.type', 'post'),
    {
      after: post.id,
      orderings: '[document.last_publication_date]',
    }
  );

  const navPost = {
    nextPost: {
      uid: nextPostData.results[0]?.uid || null,
      title: nextPostData.results[0]?.data.title || null,
    },
    prevPost: {
      uid: prevPostData.results[0]?.uid || null,
      title: prevPostData.results[0]?.data.title || null,
    },
  };

  return {
    props: {
      post,
      preview,
      navPost,
    },
    revalidate: 60 * 60 * 24,
  };
};
