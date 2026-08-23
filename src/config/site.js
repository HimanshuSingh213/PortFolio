// Site configuration for dynamic links and environment overrides
export const siteConfig = {
  name: "Himanshu Singh Dangi",
  title: "Frontend & Full Stack Developer",
  email: "himanshusingh213@zohomail.in",
  github: "https://github.com/HimanshuSingh213",
  twitter: "https://x.com/HimanshuInTech",
  linkedin: "https://www.linkedin.com/in/himanshu-singh-dangi-631869372/",
  
  // Dynamic Resume Link (Google Drive, Cloud Storage, or PDF):
  // Update without commits via VITE_RESUME_URL in Vercel/Netlify or Google Drive "Manage Versions"
  resumeUrl: import.meta.env.VITE_RESUME_URL || "/resume.pdf",

  // Converts Google Drive share links to clean iframe embed URLs automatically
  getResumeEmbedUrl: () => {
    const url = import.meta.env.VITE_RESUME_URL || "/resume.pdf";
    if (url.includes("drive.google.com")) {
      const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }
    return url;
  },
};

export default siteConfig;
