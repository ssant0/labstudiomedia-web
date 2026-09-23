import { defineConfig } from 'astro/config';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import { execSync } from 'node:child_process';

let lastmod;
try {
  lastmod = execSync('git log -1 --format=%cI').toString().trim();
} catch {
  lastmod = new Date().toISOString();
}

// https://astro.build/config
export default defineConfig({
  site: 'https://labstudiomedia.com',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/links'),
      serialize(item) {
        return { ...item, lastmod };
      },
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"]
      }
    })
  ]
});
