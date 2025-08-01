import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generateBusinessPlanPDF = async (
  sections: any[], 
  theme: any, 
  setCurrentPage: (page: number) => void,
  getCurrentPageElement: () => HTMLDivElement | null,
  filename: string
) => {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Define margins
    const leftMargin = 10;
    const rightMargin = 10;
    const topMargin = 10;
    const bottomMargin = 10;
    const availableWidth = pdfWidth - leftMargin - rightMargin;
    const availableHeight = pdfHeight - topMargin - bottomMargin;

    const totalPages = 10;
    
    console.log(`Starting PDF generation for ${totalPages} pages`);
    
    // Copy all stylesheets once to reuse for all pages
    const styleSheets = Array.from(document.styleSheets);
    const cssText = styleSheets.map(sheet => {
      try {
        return Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n');
      } catch (e) {
        // Handle cross-origin stylesheets
        return '';
      }
    }).join('\n');
    
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      console.log(`Processing page ${pageNum}/${totalPages}`);
      
      // Set the current page to render the correct content
      setCurrentPage(pageNum);
      
      // Wait for React to re-render with the new page
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get the current page element from the DOM
      const element = getCurrentPageElement();
      
      if (!element) {
        console.warn(`Page ${pageNum} element not found, skipping...`);
        continue;
      }

      console.log(`Capturing page ${pageNum} content:`, element.innerHTML.substring(0, 200) + '...');

      // Create wrapper for this page using your proven method
      const wrapper = document.createElement('div');
      
      // Clone and append the element to wrapper
      const clonedElement = element.cloneNode(true) as HTMLElement;
      wrapper.appendChild(clonedElement);
      
      // Hide wrapper off-screen for rendering
      wrapper.style.position = 'absolute';
      wrapper.style.left = '-9999px';
      wrapper.style.top = '-9999px';
      wrapper.style.width = '8.5in';
      wrapper.style.minHeight = '11in';
      wrapper.style.backgroundColor = '#ffffff';
      wrapper.style.zIndex = '-1000';
      document.body.appendChild(wrapper);
      
      // Add styles to the wrapper using your method
      const styleElement = document.createElement('style');
      styleElement.textContent = cssText;
      wrapper.appendChild(styleElement);
      
      // Wait for styles to be applied
      await new Promise(resolve => setTimeout(resolve, 200));

      try {
        const canvas = await html2canvas(wrapper, {
          scale: 2,
          logging: false,
          allowTaint: true,
          useCORS: true,
          backgroundColor: '#ffffff',
          width: wrapper.offsetWidth || 816, // 8.5in at 96dpi
          height: wrapper.offsetHeight || 1056, // 11in at 96dpi
          scrollX: 0,
          scrollY: 0,
          foreignObjectRendering: false,
          removeContainer: true,
          ignoreElements: (element) => {
            return element.classList?.contains('no-print') || false;
          }
        });

        console.log(`Canvas generated for page ${pageNum}: ${canvas.width}x${canvas.height}`);
        
        // Check if canvas has content
        if (canvas.width === 0 || canvas.height === 0) {
          console.warn(`Page ${pageNum} canvas is empty, skipping...`);
          continue;
        }

        // Add new page if not the first page
        if (pageNum > 1) {
          pdf.addPage();
        }

        const imgData = canvas.toDataURL('image/png', 1.0);
        
        // Calculate dimensions to fit the page properly while maintaining aspect ratio
        const canvasAspectRatio = canvas.height / canvas.width;
        const availableAspectRatio = availableHeight / availableWidth;
        
        let renderWidth, renderHeight;
        
        if (canvasAspectRatio > availableAspectRatio) {
          // Height is the limiting factor
          renderHeight = availableHeight;
          renderWidth = renderHeight / canvasAspectRatio;
        } else {
          // Width is the limiting factor
          renderWidth = availableWidth;
          renderHeight = renderWidth * canvasAspectRatio;
        }
        
        // Center the image within the available space
        const xOffset = leftMargin + (availableWidth - renderWidth) / 2;
        const yOffset = topMargin + (availableHeight - renderHeight) / 2;
        
        pdf.addImage(imgData, 'PNG', xOffset, yOffset, renderWidth, renderHeight);
        
        console.log(`Page ${pageNum} added to PDF successfully`);
        
      } catch (canvasError) {
        console.error(`Error generating canvas for page ${pageNum}:`, canvasError);
      } finally {
        // Clean up the temporary wrapper
        if (document.body.contains(wrapper)) {
          document.body.removeChild(wrapper);
        }
      }
    }

    // Add metadata to the PDF
    pdf.setProperties({
      title: 'Business Plan',
      subject: 'Comprehensive Business Plan Document',
      author: 'Business Plan Creator',
      creator: 'InnovateTech Solutions',
      producer: 'Business Plan Creator App'
    });

    pdf.save(filename);
    
    console.log(`PDF generated successfully with ${totalPages} pages!`);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

// Single page PDF generation function (keeping your original function)
export const generatePDF = async (element: HTMLElement, filename: string) => {
  try {
    console.log(element.innerHTML);
    const wrapper = document.createElement('div');
    
    // Clone and append the element to wrapper
    const clonedElement = element.cloneNode(true) as HTMLElement;
    wrapper.appendChild(clonedElement);
    
    // Hide wrapper off-screen for rendering
    wrapper.style.position = 'absolute';
    wrapper.style.left = '-9999px';
    document.body.appendChild(wrapper);
    
    // Copy all stylesheets to ensure styles are preserved
    const styleSheets = Array.from(document.styleSheets);
    const cssText = styleSheets.map(sheet => {
      try {
        return Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n');
      } catch (e) {
        // Handle cross-origin stylesheets
        return '';
      }
    }).join('\n');
    
    // Add styles to the wrapper
    const styleElement = document.createElement('style');
    styleElement.textContent = cssText;
    wrapper.appendChild(styleElement);
    
    const canvas = await html2canvas(wrapper, {
      scale: 3,
      logging: false,
      allowTaint: true,
      useCORS: true,
      backgroundColor: '#ffffff'
    });
    
    // Clean up the temporary wrapper
    document.body.removeChild(wrapper);
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Define left and right margins (in mm)
    const leftMargin = 1.5; // 1.5mm left margin
    const rightMargin = 1.5; // 1.5mm right margin
    const availableWidth = pdfWidth - leftMargin - rightMargin;
    
    const canvasAspectRatio = canvas.height / canvas.width;
    const availableAspectRatio = pdfHeight / availableWidth;
    
    let renderWidth, renderHeight;
    
    if (canvasAspectRatio > availableAspectRatio) {
      // Height is the limiting factor
      renderHeight = pdfHeight;
      renderWidth = renderHeight / canvasAspectRatio;
    } else {
      // Width is the limiting factor
      renderWidth = availableWidth;
      renderHeight = renderWidth * canvasAspectRatio;
    }
    
    // Center horizontally within the available width (between margins)
    const xOffset = leftMargin + (availableWidth - renderWidth) / 2;
    const yOffset = (pdfHeight - renderHeight) / 2;
    
    pdf.addImage(imgData, 'PNG', xOffset, yOffset, renderWidth, renderHeight);
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};