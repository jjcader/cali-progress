const V='cali-mwu2k04l';const SHELL=['./','index.html','app.js?v=mwu2k04l','app.css?v=mwu2k04l','manifest.webmanifest','icon-180.png','icon-192.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!=='cali-fonts').map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;
if(u.host.includes('fonts.g')){e.respondWith(caches.open('cali-fonts').then(async c=>{const hit=await c.match(e.request);const net=fetch(e.request).then(r=>{c.put(e.request,r.clone());return r}).catch(()=>hit);return hit||net}));return}
if(u.origin!==location.origin)return;
if(e.request.mode==='navigate'){e.respondWith((async()=>{const saved=await caches.match('index.html');
const net=fetch(new Request(u.origin+u.pathname,{cache:'no-cache',credentials:'same-origin'})).then(r=>{if(r.ok){const cl=r.clone();caches.open(V).then(c=>c.put('index.html',cl))}return r});
if(!saved)return net;return Promise.race([net.then(r=>r.ok?r:saved).catch(()=>saved),new Promise(res=>setTimeout(()=>res(saved),2500))])})());return}
e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{if(r.ok){const cl=r.clone();caches.open(V).then(c=>c.put(e.request,cl))}return r})))});