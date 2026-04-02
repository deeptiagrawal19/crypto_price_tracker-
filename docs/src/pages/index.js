import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Welcome to BitPulse 🚀
        </Heading>
        <p className="hero__subtitle">
          Track real-time crypto prices like never before!
        </p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/introduction">
            Get Started 🚀
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title="BitPulse - Real-time Crypto Insights"
      description="Track real-time crypto prices, trends, and market analysis with BitPulse.">
      <HomepageHeader />
      <main>
        {/* Custom Section */}
        <section className="container">
          <h2>Why Choose BitPulse? 🚀</h2>
          <p>BitPulse provides real-time crypto tracking, trend analysis, and much more.</p>
          <Link className="button button--primary" to="/docs/features">
            Explore Features
          </Link>
        </section>
      </main>
    </Layout>
  );
}
