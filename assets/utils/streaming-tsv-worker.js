const p=()=>{const c=new TextDecoder("utf-8");let e,r="";return{parseChunk(o){const t=(c.decode(o)+r).split(`
`);return e||(e=t[0].trim().split("	"),t.shift()),r=t.pop(),t.map(s=>{const n=s.trim().split("	");if(n.length!==e.length)return null;let i={};return e.forEach((a,d)=>{i[a]=n[d]}),i}).filter(s=>s)}}};onmessage=async({data:c})=>{let e=0;const r=p(),o=await fetch(c);if(!o.body)throw Error("ReadableStream not yet supported in this browser.");const t=await new Response(new ReadableStream({start(l){const s=o.body.getReader(),n=async()=>{const{done:i,value:a}=await s.read();if(i){l.close();return}const d=r.parseChunk(a);e+=a.byteLength,postMessage({items:d,totalBytes:e}),l.enqueue(a),n()};n()}})).text();postMessage({items:[],totalBytes:t.length,finished:!0})};
