function generateProjectPlaceholder(title, width = 800, height = 400) {
  // Hash based on the title to generate consistent colors
  const hash = title.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const hue = Math.abs(hash % 360);
  const color1 = `hsl(${hue}, 70%, 50%)`;
  const color2 = `hsl(${(hue + 30) % 360}, 70%, 60%)`;
  
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad${hash}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad${hash})"/>
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-family="'Segoe UI', Arial, sans-serif"
        font-size="48"
        font-weight="600"
        fill="white"
        opacity="0.9"
      >${title}</text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export default generateProjectPlaceholder;
