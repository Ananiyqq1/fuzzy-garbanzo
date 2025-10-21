// Test backend connectivity
import http from 'http';

console.log('Testing backend connectivity...\n');

const testEndpoint = (path) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5138,
      path: path,
      method: 'GET',
      headers: {
        'Origin': 'http://localhost:5173'
      }
    };

    const req = http.request(options, (res) => {
      console.log(`✅ ${path}`);
      console.log(`   Status: ${res.statusCode}`);
      console.log(`   CORS Headers:`);
      console.log(`     - Access-Control-Allow-Origin: ${res.headers['access-control-allow-origin']}`);
      console.log(`     - Access-Control-Allow-Credentials: ${res.headers['access-control-allow-credentials']}`);
      console.log('');
      
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });

    req.on('error', (e) => {
      console.log(`❌ ${path}`);
      console.log(`   Error: ${e.message}\n`);
      reject(e);
    });

    req.end();
  });
};

(async () => {
  try {
    await testEndpoint('/courses');
    await testEndpoint('/topics');
    console.log('✅ All backend endpoints are accessible!\n');
    console.log('If you still see network errors in the browser:');
    console.log('1. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)');
    console.log('2. Clear browser cache');
    console.log('3. Open browser console (F12) to see detailed error messages');
  } catch (error) {
    console.log('❌ Backend connectivity test failed!');
    console.log('\nTroubleshooting:');
    console.log('1. Check if backend container is running: sudo docker ps');
    console.log('2. Check backend logs: sudo docker logs resource-service');
    console.log('3. Verify port 5138 is accessible: curl http://localhost:5138/courses');
  }
})();
