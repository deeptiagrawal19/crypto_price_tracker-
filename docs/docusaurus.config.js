// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'BitPulse',
  tagline: 'Real-time Crypto Insights',
  favicon: 'img/favicon.ico',

  url: 'https://deeptiagrawal19.github.io', // If hosting on GitHub Pages
  baseUrl: '/BitPulse/', // Change to '/' if not using GitHub Pages

  organizationName: 'deeptiagrawal19', // GitHub username
  projectName: 'BitPulse', // Repository name

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      ({
        docs: {
          path: '.', // ✅ Fix: Changed from '.' to 'docs'
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/deeptiagrawal19/BitPulse/tree/main/docs/',
          exclude: ['**/node_modules/**', '**/README.md'], // ✅ Prevents node_modules issues
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/deeptiagrawal19/BitPulse/tree/main/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig: ({
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'BitPulse',
      logo: {
        alt: 'BitPulse Logo',
        src: 'img/logo.svg',
      },
      items: [
        { type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: 'Docs' }, // ✅ Ensure this exists in sidebars.js
        { to: '/blog', label: 'Blog', position: 'left' },
        { href: 'https://github.com/deeptiagrawal19/BitPulse', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [{ label: 'Introduction', to: '/docs/intro' }],
        },
        {
          title: 'Community',
          items: [
            { label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/docusaurus' },
            { label: 'Discord', href: 'https://discordapp.com/invite/docusaurus' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'GitHub', href: 'https://github.com/deeptiagrawal19/BitPulse' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} BitPulse. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  }),
};

export default config;
