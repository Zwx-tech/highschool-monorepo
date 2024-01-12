export default {
    // Other Vite configuration options...
  
    server: {
      proxy: {
        '/api': {
          target: 'https://v-irc.vercel.app/api', // Replace with your actual Vercel deployment URL
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }