import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generateBusinessPlanPDF = async (pageElements: (HTMLDivElement | null)[], filename: string) => {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    let pageCount = 0;

    // Filter out null elements and process all pages
    const validElements = pageElements.filter(element => element !== null) as HTMLDivElement[];
    
    console.log(`Processing ${validElements.length} pages for PDF generation`);
    
    for (let i = 0; i < validElements.length; i++) {
      const element = validElements[i];
      
      if (!element) continue;

      console.log(`Processing page ${i + 1}/${validElements.length}`);

      // Ensure the element and all children are properly styled for PDF
      const prepareElementForPDF = (el: HTMLElement) => {
        el.style.webkitPrintColorAdjust = 'exact';
        el.style.colorAdjust = 'exact';
        el.style.boxSizing = 'border-box';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        el.style.display = el.style.display || 'block';
        
        // Ensure text is visible
        if (el.style.color === '' || el.style.color === 'transparent') {
          el.style.color = '#374151';
        }
        
        // Ensure backgrounds are visible
        if (el.style.backgroundColor === 'transparent' || el.style.backgroundColor === '') {
          const computedStyle = window.getComputedStyle(el);
          if (computedStyle.backgroundColor && computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)') {
            el.style.backgroundColor = computedStyle.backgroundColor;
          }
        }
      };
      
      // Apply to root element
      prepareElementForPDF(element);
      
      // Apply to all child elements
      const allElements = element.querySelectorAll('*');
      allElements.forEach((el) => {
        prepareElementForPDF(el as HTMLElement);
      });

      // Wait for any dynamic content to load
      await new Promise(resolve => setTimeout(resolve, 100));

      // Generate canvas
      const canvas = await html2canvas(element, {
        scale: 1.5,
        logging: false,
        allowTaint: true,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: element.offsetWidth || 816,
        height: element.offsetHeight || 1056,
        scrollX: 0,
        scrollY: 0,
        foreignObjectRendering: false,
        removeContainer: true,
        ignoreElements: (element) => {
          return element.classList?.contains('no-print') || false;
        }
      });

      console.log(`Canvas generated for page ${i + 1}: ${canvas.width}x${canvas.height}`);
      
      // Check if canvas has content
      if (canvas.width === 0 || canvas.height === 0) {
        console.warn(`Page ${i + 1} canvas is empty, skipping...`);
        continue;
      }

      // Add new page if not the first page
      if (pageCount > 0) {
        pdf.addPage();
      }

      const imgData = canvas.toDataURL('image/png');
      
      // Calculate dimensions to fit the page properly
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // Center the image if it's smaller than the page
      const yOffset = imgHeight < pdfHeight ? (pdfHeight - imgHeight) / 2 : 0;
      
      pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, Math.min(imgHeight, pdfHeight));
      pageCount++;
      
      console.log(`Page ${pageCount} added to PDF`);
    }

    if (pageCount === 0) {
      throw new Error('No valid pages were generated for the PDF');
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
    
    // Show success message
    const successMessage = `PDF generated successfully! ${pageCount} pages exported.`;
    console.log(successMessage);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};