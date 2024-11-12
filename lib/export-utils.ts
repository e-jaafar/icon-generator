export const exportToFormat = async (
  svg: string, 
  format: 'svg' | 'png' | 'jpg', 
  size: number
): Promise<string> => {
  if (format === 'svg') {
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    canvas.width = size;
    canvas.height = size;
    
    img.onload = () => {
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL(`image/${format}`, 0.9));
      }
    };
    
    img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  });
}; 