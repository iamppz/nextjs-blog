import Layout from '../../components/layout'
import {getAllPostIds, getPostData} from '../../lib/posts'
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from '../../styles/utils.module.css'
import Script from "next/script";

export async function getStaticProps({params}) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}

export default function Post({postData}) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
                <link href="https://cdn.bootcdn.net/ajax/libs/highlight.js/11.4.0/styles/default.min.css"
                      rel="stylesheet"/>
                <script src="https://cdn.bootcdn.net/ajax/libs/highlight.js/11.4.0/highlight.min.js"></script>
                <script>hljs.highlightAll();</script>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date}/>
                </div>
                <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}
