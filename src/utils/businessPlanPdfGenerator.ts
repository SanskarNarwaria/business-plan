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

      // Ensure the element is visible and properly styled
      element.style.position = 'static';
      element.style.visibility = 'visible';
      element.style.opacity = '1';
      element.style.transform = 'none';
      element.style.webkitPrintColorAdjust = 'exact';
      element.style.colorAdjust = 'exact';
      
      // Apply styles to all child elements
      const allElements = element.querySelectorAll('*');
      allElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.webkitPrintColorAdjust = 'exact';
        htmlEl.style.colorAdjust = 'exact';
        htmlEl.style.boxSizing = 'border-box';
      });

      // Wait for any dynamic content to load
      await new Promise(resolve => setTimeout(resolve, 300));

      // Generate canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        allowTaint: true,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 816,
        height: 1056,
        scrollX: 0,
        scrollY: 0,
        foreignObjectRendering: true,
        ignoreElements: (element) => {
          return element.classList?.contains('no-print') || false;
        }
      });

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
    alert(`Error generating PDF: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
  }
};