import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';

export async function generatePDF(elementId: string): Promise<Blob> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Resume element not found');
  }

  // Find parent scale wrapper if exists
  const parentWrapper = element.parentElement;
  let originalParentTransform = '';
  if (parentWrapper) {
    originalParentTransform = parentWrapper.style.transform;
    parentWrapper.style.transform = 'none';
  }

  // Store original styles
  const originalTransform = element.style.transform;
  const originalWidth = element.style.width;
  const originalHeight = element.style.height;

  // Reset transform for capture
  element.style.transform = 'none';
  element.style.width = '794px';  // A4 at 96 DPI
  element.style.height = 'auto';

  // Wait a tick for styles to apply
  await new Promise(resolve => setTimeout(resolve, 50));

  try {
    const imgData = await htmlToImage.toPng(element, {
      pixelRatio: 2, // High resolution
      backgroundColor: '#ffffff',
      width: 794,
      style: {
        transform: 'none'
      }
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    const imgWidth = pdfWidth;
    
    // We need to calculate height based on the generated image aspect ratio
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to parse generated image data'));
      img.src = imgData;
      // Safety timeout just in case
      setTimeout(() => reject(new Error('Image calculation timed out')), 5000);
    });
    
    const imgHeight = (img.height * pdfWidth) / img.width;

    // Use a small tolerance factor to prevent tiny rounding decimals (like an image being 297.015 tall) 
    // from triggering a whole second blank page.
    let totalPages = Math.ceil((imgHeight - 1) / pdfHeight);
    
    // Ensure at least 1 page
    if (totalPages < 1) totalPages = 1;

    for (let i = 0; i < totalPages; i++) {
      if (i > 0) {
        pdf.addPage();
      }
      // Shift image up by one page height for each successive page
      const position = -(pdfHeight * i);
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    }

    return pdf.output('blob');
  } finally {
    // Restore original styles
    element.style.transform = originalTransform;
    element.style.width = originalWidth;
    element.style.height = originalHeight;
    if (parentWrapper) {
      parentWrapper.style.transform = originalParentTransform;
    }
  }
}
