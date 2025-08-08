import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// export const generateBusinessPlanPDF = async (
//   sections: any[], 
//   theme: any, 
//   setCurrentPage: (page: number) => void,
//   getCurrentPageElement: () => HTMLDivElement | null,
//   filename: string
// ) => {
//   try {
//     const totalPages = 13;
    
//     console.log(`Starting PDF generation for ${totalPages} pages`);
    
//     // Create PDF document
//     const pdf = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4',
//       compress: false
//     });

//     let isFirstPage = true;
    
//     for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
//       console.log(`Processing page ${pageNum}/${totalPages}`);
      
//       // Set the current page to render the correct content
//       setCurrentPage(pageNum);
      
//       // Wait for React to re-render with the new page
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Get the current page element from the DOM
//       const element = getCurrentPageElement();
      
//       if (!element) {
//         console.warn(`Page ${pageNum} element not found, skipping...`);
//         continue;
//       }

//       console.log(`Capturing page ${pageNum} using generatePDFFullCanvas method`);

//       try {
//         // Use the working generatePDFFullCanvas method to create canvas
//         const canvas = await generatePageCanvasForMultiPage(element);
        
//         if (!canvas || canvas.width === 0 || canvas.height === 0) {
//           console.warn(`Page ${pageNum} canvas is empty, skipping...`);
//           continue;
//         }

//         // Add new page if not the first page
//         if (!isFirstPage) {
//           pdf.addPage();
//         } else {
//           isFirstPage = false;
//         }

//         const imgData = canvas.toDataURL('image/png', 1.0);
        
//         // PDF page dimensions
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = pdf.internal.pageSize.getHeight();
//         const margins = 1.5;
//         const availableWidth = pdfWidth - (margins * 2);
//         const availableHeight = pdfHeight - (margins * 2);
        
//         // Calculate dimensions to fit the page properly while maintaining aspect ratio
//         const canvasAspectRatio = canvas.height / canvas.width;
//         const availableAspectRatio = availableHeight / availableWidth;
        
//         let renderWidth, renderHeight;
        
//         if (canvasAspectRatio > availableAspectRatio) {
//           renderHeight = availableHeight;
//           renderWidth = renderHeight / canvasAspectRatio;
//         } else {
//           renderWidth = availableWidth;
//           renderHeight = renderWidth * canvasAspectRatio;
//         }
        
//         // Center the image within the available space
//         const xOffset = margins + (availableWidth - renderWidth) / 2;
//         const yOffset = margins + (availableHeight - renderHeight) / 2;
        
//         pdf.addImage(imgData, 'PNG', xOffset, yOffset, renderWidth, renderHeight);
        
//         console.log(`Page ${pageNum} added to PDF successfully`);
        
//       } catch (canvasError) {
//         console.error(`Error generating canvas for page ${pageNum}:`, canvasError);
//       }
//     }

//     // Add metadata to the PDF
//     pdf.setProperties({
//       title: 'Business Plan',
//       subject: 'Comprehensive Business Plan Document',
//       author: 'Business Plan Creator',
//       creator: 'InnovateTech Solutions',
//       producer: 'Business Plan Creator App'
//     });

//     pdf.save(filename);
    
//     console.log(`PDF generated successfully with ${totalPages} pages!`);
    
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//     throw error;
//   }
// };

// // Canvas generation using the working generatePDFFullCanvas method
// const generatePageCanvasForMultiPage = async (element: HTMLElement): Promise<HTMLCanvasElement> => {
//   console.log('Capturing element using proven method:', element.innerHTML.substring(0, 200));
  
//   // Fixed dimensions for consistent output across screen sizes
//   const fixedWidth = 794; // A4 width in pixels at 96 DPI
//   const fixedHeight = 1123; // A4 height in pixels at 96 DPI
  
//   const computedStyle = window.getComputedStyle(element);
//   const devicePixelRatio = window.devicePixelRatio || 1;
  
//   console.log(`Fixed dimensions: ${fixedWidth}x${fixedHeight}`);
//   console.log(`Device pixel ratio: ${devicePixelRatio}`);
  
//   // Create wrapper with fixed dimensions
//   const wrapper = document.createElement('div');
//   wrapper.style.position = 'fixed';
//   wrapper.style.top = '0';
//   wrapper.style.left = '0';
//   wrapper.style.zIndex = '-9999';
//   wrapper.style.visibility = 'hidden';
//   wrapper.style.pointerEvents = 'none';
//   wrapper.style.width = `${fixedWidth}px`;
//   wrapper.style.height = `${fixedHeight}px`;
//   wrapper.style.overflow = 'visible';
//   wrapper.style.transform = 'scale(1)';
//   wrapper.style.transformOrigin = 'top left';
//   wrapper.style.zoom = '1';
  
//   // Clone element with dimension preservation
//   const clonedElement = element.cloneNode(true) as HTMLElement;
  
//   // Simple bullet fix - just find spans with bullet characters and normalize them
//   const bulletSpans = clonedElement.querySelectorAll('span');
//   bulletSpans.forEach(span => {
//     if (span.textContent?.trim() === '•') {
//       const spanEl = span as HTMLElement;
//       spanEl.style.zoom = '1';
//       spanEl.style.transform = 'scale(1)';
//     }
//   });
  
//   // Enhanced computed styles preservation
//   const preserveComputedStyles = (original: Element, clone: Element) => {
//     const originalStyles = window.getComputedStyle(original);
//     const cloneEl = clone as HTMLElement;
    
//     // Priority styles that must be preserved exactly
//     const priorityStyles = [
//       'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height',
//       'font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing',
//       'color', 'background-color', 'background-image', 'background-size',
//       'border', 'border-radius', 'padding', 'margin',
//       'display', 'position', 'flex', 'grid', 'align-items', 'justify-content'
//     ];
    
//     // Apply all computed styles
//     for (let i = 0; i < originalStyles.length; i++) {
//       const property = originalStyles[i];
//       const value = originalStyles.getPropertyValue(property);
//       try {
//         cloneEl.style.setProperty(property, value, originalStyles.getPropertyPriority(property));
//       } catch (e) {
//         // Some properties might not be settable
//       }
//     }
    
//     // Ensure priority styles are definitely set
//     priorityStyles.forEach(property => {
//       const value = originalStyles.getPropertyValue(property);
//       if (value) {
//         try {
//           cloneEl.style.setProperty(property, value, 'important');
//         } catch (e) {
//           // Fallback without important
//           cloneEl.style.setProperty(property, value);
//         }
//       }
//     });
    
//     // Override any zoom or transform that might affect sizing
//     cloneEl.style.zoom = '1';
//     cloneEl.style.transform = originalStyles.transform === 'none' ? 'none' : originalStyles.transform;
    
//     // Recursively apply to children
//     const originalChildren = original.children;
//     const cloneChildren = clone.children;
//     for (let i = 0; i < originalChildren.length; i++) {
//       if (cloneChildren[i]) {
//         preserveComputedStyles(originalChildren[i], cloneChildren[i]);
//       }
//     }
//   };
  
//   // Apply styles to preserve exact appearance
//   preserveComputedStyles(element, clonedElement);
  
//   // Force fixed dimensions on cloned element
//   clonedElement.style.width = `${fixedWidth}px`;
//   clonedElement.style.height = `${fixedHeight}px`;
//   clonedElement.style.minWidth = `${fixedWidth}px`;
//   clonedElement.style.minHeight = `${fixedHeight}px`;
  
//   wrapper.appendChild(clonedElement);
  
//   // Add comprehensive styles
//   const getAllStyles = () => {
//     let cssText = '';
    
//     // Get inline styles
//     const styleElements = document.querySelectorAll('style');
//     styleElements.forEach(style => {
//       cssText += style.textContent || '';
//     });
    
//     // Get external stylesheets
//     const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
//     linkElements.forEach(link => {
//       try {
//         const sheet = (link as HTMLLinkElement).sheet;
//         if (sheet) {
//           cssText += Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n');
//         }
//       } catch (e) {
//         console.warn('Could not access stylesheet:', link.href);
//       }
//     });
    
//     // Get document stylesheets
//     Array.from(document.styleSheets).forEach(sheet => {
//       try {
//         if (sheet.cssRules) {
//           cssText += Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n');
//         }
//       } catch (e) {
//         console.warn('Could not access stylesheet rules');
//       }
//     });
    
//     // Add minimal zoom reset
//     cssText += `
//       * { 
//         zoom: 1 !important; 
//         transform-origin: top left !important;
//       }
//       body { 
//         zoom: 1 !important; 
//         transform: scale(1) !important;
//       }
//     `;
    
//     return cssText;
//   };
  
//   const styleElement = document.createElement('style');
//   styleElement.textContent = getAllStyles();
//   wrapper.appendChild(styleElement);
  
//   // Add to DOM
//   document.body.appendChild(wrapper);
  
//   try {
//     // Wait for rendering and font loading
//     await document.fonts.ready;
//     await new Promise(resolve => setTimeout(resolve, 200));
    
//     // Enhanced image loading
//     const images = wrapper.querySelectorAll('img');
//     await Promise.all(Array.from(images).map(img => {
//       return new Promise((resolve) => {
//         if (img.complete && img.naturalWidth > 0) {
//           resolve(void 0);
//         } else {
//           img.onload = () => resolve(void 0);
//           img.onerror = () => resolve(void 0);
//           setTimeout(() => resolve(void 0), 2000);
//         }
//       });
//     }));
    
//     // Calculate optimal scale for quality vs performance
//     const optimalScale = Math.min(3, Math.max(1, 2000 / Math.max(fixedWidth, fixedHeight)));
    
//     const canvas = await html2canvas(wrapper, {
//       scale: optimalScale,
//       logging: false,
//       allowTaint: true,
//       useCORS: true,
//       backgroundColor: '#ffffff',
//       foreignObjectRendering: true,
//       imageTimeout: 15000,
//       removeContainer: false,
//       letterRendering: true,
//       width: fixedWidth,
//       height: fixedHeight,
//       scrollX: 0,
//       scrollY: 0,
//       windowWidth: fixedWidth,
//       windowHeight: fixedHeight,
//       ignoreElements: (element) => {
//         return element.tagName === 'SCRIPT' || 
//                element.tagName === 'NOSCRIPT' ||
//                element.style.display === 'none';
//       },
//       onclone: (clonedDoc, clonedElement) => {
//         // Reset zoom and scaling on cloned document
//         clonedDoc.body.style.zoom = '1';
//         clonedDoc.documentElement.style.zoom = '1';
//         clonedDoc.body.style.transform = 'scale(1)';
//         clonedDoc.documentElement.style.transform = 'scale(1)';
        
//         // Simple bullet fix in cloned document
//         const bulletSpansInClone = clonedDoc.querySelectorAll('span');
//         bulletSpansInClone.forEach(span => {
//           if (span.textContent?.trim() === '•') {
//             const spanEl = span as HTMLElement;
//             spanEl.style.zoom = '1';
//             spanEl.style.transform = 'scale(1)';
//           }
//         });
        
//         return clonedDoc;
//       }
//     });
    
//     console.log(`Generated canvas: ${canvas.width}x${canvas.height}`);
//     return canvas;
    
//   } finally {
//     // Clean up
//     if (document.body.contains(wrapper)) {
//       document.body.removeChild(wrapper);
//     }
//   }
// };

// // ----------------------------------------------------------------------------

// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

export const generateBusinessPlanPDF = async (
  sections: any[], 
  theme: any, 
  setCurrentPage: (page: number) => void,
  getCurrentPageElement: () => HTMLDivElement | null,
  filename: string
) => {
  try {
    const totalPages = 13;
    
    console.log(`Starting PDF generation for ${totalPages} pages`);
    
    // Create PDF document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: false
    });

    let isFirstPage = true;
    
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      console.log(`Processing page ${pageNum}/${totalPages}`);
      
      // Set the current page to render the correct content
      setCurrentPage(pageNum);
      
      // Wait for React to re-render with the new page
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get the current page element from the DOM
      const element = getCurrentPageElement();
      
      if (!element) {
        console.warn(`Page ${pageNum} element not found, skipping...`);
        continue;
      }

      console.log(`Capturing page ${pageNum} using enhanced canvas method`);

      try {
        // Use the enhanced canvas generation method
        const canvas = await generatePageCanvasForMultiPage(element);
        
        if (!canvas || canvas.width === 0 || canvas.height === 0) {
          console.warn(`Page ${pageNum} canvas is empty, skipping...`);
          continue;
        }

        // Add new page if not the first page
        if (!isFirstPage) {
          pdf.addPage();
        } else {
          isFirstPage = false;
        }

        const imgData = canvas.toDataURL('image/png', 1.0);
        
        // PDF page dimensions
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margins = 1.5;
        const availableWidth = pdfWidth - (margins * 2);
        const availableHeight = pdfHeight - (margins * 2);
        
        // Calculate dimensions to fit the page properly while maintaining aspect ratio
        const canvasAspectRatio = canvas.height / canvas.width;
        const availableAspectRatio = availableHeight / availableWidth;
        
        let renderWidth, renderHeight;
        
        if (canvasAspectRatio > availableAspectRatio) {
          renderHeight = availableHeight;
          renderWidth = renderHeight / canvasAspectRatio;
        } else {
          renderWidth = availableWidth;
          renderHeight = renderWidth * canvasAspectRatio;
        }
        
        // Center the image within the available space
        const xOffset = margins + (availableWidth - renderWidth) / 2;
        const yOffset = margins + (availableHeight - renderHeight) / 2;
        
        pdf.addImage(imgData, 'PNG', xOffset, yOffset, renderWidth, renderHeight);
        
        console.log(`Page ${pageNum} added to PDF successfully`);
        
      } catch (canvasError) {
        console.error(`Error generating canvas for page ${pageNum}:`, canvasError);
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

// Enhanced canvas generation using the proven generatePDFFullCanvas method logic
const generatePageCanvasForMultiPage = async (element: HTMLElement): Promise<HTMLCanvasElement> => {
  try {
    const fixedWidth = 529; // Further scaled down A4 width (66.6% of 794)
    const fixedHeight = 748; // Further scaled down A4 height (66.6% of 1123)
    // Get comprehensive element dimensions (same as your working function)
    const computedStyle = window.getComputedStyle(element);
    const originalRect = element.getBoundingClientRect();
    const devicePixelRatio = window.devicePixelRatio || 1;
    
    // Calculate true content dimensions accounting for all possible sizing
    const contentWidth = Math.max(
      element.scrollWidth,
      element.offsetWidth,
      element.clientWidth,
      parseInt(computedStyle.width) || 0,
      529 // Minimum scaled width in pixels
    );
    
    const contentHeight = Math.max(
      element.scrollHeight,
      element.offsetHeight,
      element.clientHeight,
      parseInt(computedStyle.height) || 0,
      748 // Minimum scaled height in pixels
    );
    
    console.log(`Original dimensions: ${originalRect.width}x${originalRect.height}`);
    console.log(`Content dimensions: ${contentWidth}x${contentHeight}`);
    console.log(`Device pixel ratio: ${devicePixelRatio}`);
    
    // Create wrapper with precise dimensions (same as your working function)
    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.top = '0';
    wrapper.style.left = '0';
    wrapper.style.zIndex = '-9999';
    wrapper.style.visibility = 'hidden';
    wrapper.style.pointerEvents = 'none';
    wrapper.style.width = `${contentWidth}px`;
    wrapper.style.height = `${contentHeight}px`;
    wrapper.style.overflow = 'visible';
    wrapper.style.transform = 'scale(1)';
    wrapper.style.transformOrigin = 'top left';
    wrapper.style.zoom = '1';
    
    // Clone element with dimension preservation
    const clonedElement = element.cloneNode(true) as HTMLElement;
    
    // Enhanced computed styles preservation (copied from your working function)
    const preserveComputedStyles = (original: Element, clone: Element) => {
      const originalStyles = window.getComputedStyle(original);
      const cloneEl = clone as HTMLElement;
      
      // Priority styles that must be preserved exactly
      const priorityStyles = [
        'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height',
        'font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing',
        'color', 'background-color', 'background-image', 'background-size',
        'border', 'border-radius', 'padding', 'margin',
        'display', 'position', 'flex', 'grid', 'align-items', 'justify-content'
      ];
      
      // Apply all computed styles
      for (let i = 0; i < originalStyles.length; i++) {
        const property = originalStyles[i];
        const value = originalStyles.getPropertyValue(property);
        try {
          cloneEl.style.setProperty(property, value, originalStyles.getPropertyPriority(property));
        } catch (e) {
          // Some properties might not be settable
        }
      }
      
      // Ensure priority styles are definitely set
      priorityStyles.forEach(property => {
        const value = originalStyles.getPropertyValue(property);
        if (value) {
          try {
            cloneEl.style.setProperty(property, value, 'important');
          } catch (e) {
            // Fallback without important
            cloneEl.style.setProperty(property, value);
          }
        }
      });
      
      // Override any zoom or transform that might affect sizing
      cloneEl.style.zoom = '1';
      cloneEl.style.transform = originalStyles.transform === 'none' ? 'none' : originalStyles.transform;
      
      // Recursively apply to children
      const originalChildren = original.children;
      const cloneChildren = clone.children;
      for (let i = 0; i < originalChildren.length; i++) {
        if (cloneChildren[i]) {
          preserveComputedStyles(originalChildren[i], cloneChildren[i]);
        }
      }
    };
    
    // Apply styles to preserve exact appearance
    preserveComputedStyles(element, clonedElement);
    
    // Force dimensions on cloned element
    clonedElement.style.width = `${contentWidth}px`;
    clonedElement.style.height = `${contentHeight}px`;
    clonedElement.style.minWidth = `${contentWidth}px`;
    clonedElement.style.minHeight = `${contentHeight}px`;
    
    wrapper.appendChild(clonedElement);
    
    // Add comprehensive styles (copied from your working function)
    const getAllStyles = () => {
      let cssText = '';
      
      // Get inline styles
      const styleElements = document.querySelectorAll('style');
      styleElements.forEach(style => {
        cssText += style.textContent || '';
      });
      
      // Get external stylesheets
      const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
      linkElements.forEach(link => {
        try {
          const sheet = (link as HTMLLinkElement).sheet;
          if (sheet) {
            cssText += Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n');
          }
        } catch (e) {
          console.warn('Could not access stylesheet:', link.href);
        }
      });
      
      // Get document stylesheets
      Array.from(document.styleSheets).forEach(sheet => {
        try {
          if (sheet.cssRules) {
            cssText += Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n');
          }
        } catch (e) {
          console.warn('Could not access stylesheet rules');
        }
      });
      
      // Add zoom reset styles
      cssText += `
        * { 
          zoom: 1 !important; 
          transform-origin: top left !important;
        }
        body { 
          zoom: 1 !important; 
          transform: scale(1) !important;
        }
      `;
      
      return cssText;
    };
    
    const styleElement = document.createElement('style');
    styleElement.textContent = getAllStyles();
    wrapper.appendChild(styleElement);
    
    // Add to DOM
    document.body.appendChild(wrapper);
    
    try {
      // Wait for rendering and font loading (same as your working function)
      await document.fonts.ready;
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Enhanced image loading
      const images = wrapper.querySelectorAll('img');
      await Promise.all(Array.from(images).map(img => {
        return new Promise((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve(void 0);
          } else {
            img.onload = () => resolve(void 0);
            img.onerror = () => resolve(void 0);
            setTimeout(() => resolve(void 0), 2000);
          }
        });
      }));
      
      // Calculate optimal scale for quality vs performance
      const optimalScale = Math.min(3, Math.max(1, 2000 / Math.max(contentWidth, contentHeight)));
      
      const canvas = await html2canvas(wrapper, {
        scale: optimalScale,
        logging: false,
        allowTaint: true,
        useCORS: true,
        backgroundColor: '#ffffff',
        foreignObjectRendering: true,
        imageTimeout: 15000,
        removeContainer: false,
        letterRendering: true,
        width: contentWidth,
        height: contentHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: contentWidth,
        windowHeight: contentHeight,
        ignoreElements: (element) => {
          return element.tagName === 'SCRIPT' || 
                 element.tagName === 'NOSCRIPT' ||
                 element.style.display === 'none';
        },
        onclone: (clonedDoc, clonedElement) => {
          // Reset zoom and scaling on cloned document
          clonedDoc.body.style.zoom = '1';
          clonedDoc.documentElement.style.zoom = '1';
          clonedDoc.body.style.transform = 'scale(1)';
          clonedDoc.documentElement.style.transform = 'scale(1)';
          
          // Ensure the cloned element maintains exact dimensions
          const targetElements = clonedDoc.querySelectorAll('*') as NodeListOf<HTMLElement>;
          targetElements.forEach(el => {
            el.style.zoom = '1';
            el.style.transform = el.style.transform === 'none' ? 'none' : el.style.transform;
          });
          
          // Handle bullet points specifically
          const bulletSpansInClone = clonedDoc.querySelectorAll('span');
          bulletSpansInClone.forEach(span => {
            if (span.textContent?.trim() === '•') {
              const spanEl = span as HTMLElement;
              spanEl.style.zoom = '1';
              spanEl.style.transform = 'scale(1)';
            }
          });
          
          return clonedDoc;
        }
      });
      
      console.log(`Generated canvas: ${canvas.width}x${canvas.height}`);
      return canvas;
      
    } finally {
      // Clean up
      if (document.body.contains(wrapper)) {
        document.body.removeChild(wrapper);
      }
    }
  } catch (error) {
    console.error('Error in generatePageCanvasForMultiPage:', error);
    throw error;
  }
};


