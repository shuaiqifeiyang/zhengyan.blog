import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from 'rehype-highlight';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeToc from "@jsdevtools/rehype-toc";


/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/shuaiqifeiyang/**',
      },
    ],
  },
};

/** @type {import('rehype-pretty-code').Options} */
const options = {
  // See Options section below.
  theme: "github-light",
  // theme: "material-theme",
};

// const withMDX = createMDX({
//   extension: /\.mdx?$/,
//   // Add markdown plugins here, as desired
//   options: {
//     remarkPlugins: [remarkMath, remarkGfm],
//     rehypePlugins: [rehypeKatex, rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings, rehypeToc],
//   },
// });

// Merge MDX config with Next.js config

export default nextConfig
