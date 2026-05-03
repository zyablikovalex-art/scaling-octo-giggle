/** @type {import('next').NextConfig} */
function resolveBuildVersion() {
  const msg = process.env.VERCEL_GIT_COMMIT_MESSAGE || "";
  const match = msg.match(/#(\d+)/);
  if (match) return match[1];
  if (process.env.VERCEL_GIT_PULL_REQUEST_ID) {
    return process.env.VERCEL_GIT_PULL_REQUEST_ID;
  }
  return "dev";
}

const nextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_VERSION: resolveBuildVersion(),
  },
};

export default nextConfig;
