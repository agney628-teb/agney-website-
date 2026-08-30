import fs from 'fs';
import https from 'https';

const TOKEN = 'nfp_nKynTWbHK45B2finkoCVA5UqZs2oXk7s253e';

function request(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', reject);
    if (body) {
      req.write(body);
    }
    req.end();
  });
}

async function run() {
  console.log('Fetching or creating Netlify site...');
  
  // Try to create site
  let siteRes = await request(
    {
      hostname: 'api.netlify.com',
      path: '/api/v1/sites',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    },
    JSON.stringify({ name: `agney-portfolio-${Date.now()}` })
  );

  let site = siteRes.data;
  if (!site || !site.id) {
    // List sites
    const listRes = await request({
      hostname: 'api.netlify.com',
      path: '/api/v1/sites',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    if (Array.isArray(listRes.data) && listRes.data.length > 0) {
      site = listRes.data[0];
    } else {
      console.error('Failed to create or list site:', siteRes);
      return;
    }
  }

  console.log(`Target Site ID: ${site.id} (${site.name})`);
  console.log('Reading site.zip and deploying...');

  const zipData = fs.readFileSync('site.zip');

  const deployReq = https.request(
    {
      hostname: 'api.netlify.com',
      path: `/api/v1/sites/${site.id}/deploys`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/zip',
        'Content-Length': zipData.length,
      },
    },
    (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        const deploy = JSON.parse(data);
        console.log('=== NETLIFY DEPLOYMENT SUCCESSFUL ===');
        console.log(`Live Site URL: ${site.ssl_url || site.url || deploy.ssl_url || deploy.url}`);
        console.log(`Deploy URL: ${deploy.ssl_url || deploy.deploy_ssl_url || deploy.url}`);
      });
    }
  );

  deployReq.on('error', (e) => console.error('Deploy error:', e));
  deployReq.write(zipData);
  deployReq.end();
}

run();
