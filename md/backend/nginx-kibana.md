---
{
  "title": "How to Host Kibana Behind Nginx",
  "draft": false,
  "created_at": "2024-06-20",
  "category": "Backend",
  "tags": ["Nginx"],
  "description": "Configure Nginx to make Kibana and our page under the same domain"
}
---



## Problem Statement

I need to embed Kibana into the page I developed through an iframe. In order to avoid all kinds of CORS issue, I plan to host Kibana and our own developed frontend pages under the same domain through Nginx. We access the main website through `https://mydomain.com` and access Kibana through `https://mydomain.com/kibana`

## Prerequisite Knowledge

### Nginx

#### ►The difference between `location /kibana/` and `location /kibana`

1. **`location /kibana/`**:
   - This is a **trailing slash location**. It matches any request URI that starts with `/kibana/` followed by any characters, including none at all. This means it will match URLs like `/kibana/`, `/kibana/index.html`, `/kibana/dashboard`, etc.
   - The key point here is that the trailing slash implies that this location block should match when `/kibana/` is treated as a directory or a base of more specific URIs.
2. **`location /kibana`**:
   - This is a **non-trailing slash location**. It matches any request URI that begins with `/kibana`, not necessarily followed by a slash. Therefore, it matches `/kibana`, `/kibana/`, `/kibanaanything`, `/kibana.html`, etc.
   - This type of location can sometimes lead to unexpected matches because it does not distinguish between `/kibana` as a specific file or path and `/kibana` as a prefix to something else (like `/kibana123`).

**Practical Impact**:

- If you intend for `/kibana` to serve as a specific endpoint or to distinctly redirect or rewrite to another URI, use `location /kibana`.
- If `/kibana/` is meant to be a directory under which multiple paths or resources will be served (common in applications or when proxying), you should use `location /kibana/` to ensure only URIs starting with this base path are matched.

 

####  ►The difference between `proxy_pass https://127.0.0.1:5601` and `proxy_pass https://127.0.0.1:5601/`

* **Without trailing slash (`proxy_pass https://127.0.0.1:5601`)**: The full original request URI is appended directly to the proxy_pass URL. 

  For example, if the location block is defined as `location /kibana`, and the request is for `/kibana/dashboard`, the request sent to the proxy will be `https://127.0.0.1:5601/dashboard`. The `/kibana` part of the URI is replaced with the URI specified in the `proxy_pass`.

* **With trailing slash (`proxy_pass https://127.0.0.1:5601/`)**: The original request URI's leading portion, which matches the location block, is stripped out, and the rest is appended to the proxy_pass URL.

  For the same example, with a location block of `location /kibana` and a request for `/kibana/dashboard`, the request sent to the proxy server will be `https://127.0.0.1:5601/dashboard` — effectively the same as without the trailing slash in this specific case.

## Solution

### Nginx Configuration

```nginx
location /kibana {
  proxy_pass http://127.0.0.1:5601
}
```

### Kibana Configuration

```yml
server.basePath: "/kibana"
server.rewriteBasePath: "true"
```

