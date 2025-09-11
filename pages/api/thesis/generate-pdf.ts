import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'
import type { ThesisSelection, PresentationTemplate, ExportOptions } from '../../../types/data'

interface RequestBody {
  selections: ThesisSelection[]
  template: PresentationTemplate
  options: ExportOptions
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { selections, template, options }: RequestBody = req.body

    if (!selections || !template || !options) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Generate HTML content for PDF
    const htmlContent = generatePresentationHTML(selections, template, options)

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    const page = await browser.newPage()
    
    // Set content and wait for images/charts to load
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' })
    
    // Configure PDF options
    const pdfOptions: Parameters<typeof page.pdf>[0] = {
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      },
      displayHeaderFooter: options.customization.pageNumbers,
      headerTemplate: '<div></div>',
      footerTemplate: options.customization.pageNumbers 
        ? '<div style="font-size: 10px; text-align: center; width: 100%; color: #666;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
        : '<div></div>'
    }

    // Generate PDF
    const pdf = await page.pdf(pdfOptions)
    
    await browser.close()

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment; filename="noetic-2.0-thesis.pdf"')
    res.setHeader('Content-Length', pdf.length)

    // Send PDF
    res.status(200).end(pdf)

  } catch (error) {
    console.error('PDF generation error:', error)
    res.status(500).json({ 
      error: 'Failed to generate PDF',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

function generatePresentationHTML(
  selections: ThesisSelection[],
  template: PresentationTemplate,
  options: ExportOptions
): string {
  const { branding, customization } = options

  const baseStyles = `
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { 
        font-family: ${branding.fontFamily}, -apple-system, BlinkMacSystemFont, sans-serif;
        line-height: 1.6; 
        color: #333;
        background: white;
      }
      .page {
        width: 210mm;
        min-height: 297mm;
        padding: 20mm;
        margin: 0 auto;
        background: white;
        page-break-after: always;
        display: flex;
        flex-direction: column;
      }
      .page:last-child { page-break-after: auto; }
      
      h1 { 
        color: ${branding.primaryColor}; 
        font-size: 2.5em; 
        margin-bottom: 0.5em;
        font-weight: 800;
      }
      h2 { 
        color: ${branding.primaryColor}; 
        font-size: 1.8em; 
        margin-bottom: 0.75em;
        font-weight: 700;
        border-bottom: 2px solid ${branding.primaryColor}20;
        padding-bottom: 0.25em;
      }
      h3 { 
        color: ${branding.secondaryColor}; 
        font-size: 1.4em; 
        margin-bottom: 0.5em;
        font-weight: 600;
      }
      
      .cover-page {
        justify-content: center;
        align-items: center;
        text-align: center;
        background: linear-gradient(135deg, ${branding.primaryColor}, ${branding.secondaryColor});
        color: white;
      }
      .cover-page h1, .cover-page h2 { color: white; }
      .cover-highlights {
        display: flex;
        justify-content: center;
        gap: 2em;
        margin: 2em 0;
      }
      .highlight {
        padding: 1em 2em;
        background: rgba(255,255,255,0.2);
        border-radius: 10px;
        font-weight: 700;
        font-size: 1.1em;
      }
      
      .metric-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1em;
        margin: 1em 0;
      }
      .metric-box {
        padding: 1.5em;
        border: 2px solid ${branding.primaryColor}20;
        border-radius: 10px;
        text-align: center;
        background: ${branding.primaryColor}05;
      }
      .metric-value {
        display: block;
        font-size: 2em;
        font-weight: 800;
        color: ${branding.primaryColor};
        margin-bottom: 0.25em;
      }
      .metric-label {
        font-size: 0.9em;
        color: #666;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      
      .risk-matrix {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1em;
        margin: 1em 0;
      }
      .risk-category {
        padding: 1.5em;
        border-radius: 10px;
        text-align: center;
      }
      .risk-high { background: #fee2e2; border: 2px solid #dc2626; }
      .risk-medium { background: #fef3c7; border: 2px solid #d97706; }
      .risk-low { background: #d1fae5; border: 2px solid #059669; }
      
      .chart-placeholder {
        width: 100%;
        height: 300px;
        background: #f9fafb;
        border: 2px dashed #d1d5db;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2em;
        color: #6b7280;
        margin: 1em 0;
      }
      
      ul { margin: 1em 0; padding-left: 2em; }
      li { margin: 0.5em 0; }
      
      .page-footer {
        margin-top: auto;
        padding-top: 2em;
        border-top: 1px solid #e5e7eb;
        text-align: center;
        color: #6b7280;
        font-size: 0.9em;
      }
    </style>
  `

  let htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Noetic 2.0 - Investment Thesis</title>
      ${baseStyles}
    </head>
    <body>
  `

  // Cover page
  if (customization.includeCoverPage) {
    htmlContent += `
      <div class="page cover-page">
        <div>
          <h1>NOETIC 2.0</h1>
          <h2>Investment Thesis</h2>
          <p style="font-size: 1.2em; margin: 1em 0;">Strategic Transformation: From Venture Fund to CNS Operating Company</p>
          <div class="cover-highlights">
            <div class="highlight">$140B+ Market</div>
            <div class="highlight">10.4% CAGR</div>
            <div class="highlight">Infrastructure-Led Strategy</div>
          </div>
          <div style="margin-top: 3em;">
            <p><strong>Prepared by:</strong> David C. Nichols</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Template:</strong> ${template.name}</p>
          </div>
        </div>
      </div>
    `
  }

  // Executive summary
  if (customization.includeExecutiveSummary) {
    htmlContent += `
      <div class="page">
        <h2>Executive Summary</h2>
        
        <h3>Investment Opportunity</h3>
        <p>Noetic 2.0 represents a strategic transformation from venture fund to CNS operating company, targeting the $140B+ central nervous system market with an infrastructure-led consolidation strategy.</p>
        
        <div class="metric-grid">
          <div class="metric-box">
            <span class="metric-value">$500M - $1.5B</span>
            <span class="metric-label">Target Fund Size</span>
          </div>
          <div class="metric-box">
            <span class="metric-value">25%+</span>
            <span class="metric-label">Revenue CAGR</span>
          </div>
          <div class="metric-box">
            <span class="metric-value">15-25%</span>
            <span class="metric-label">Target IRR</span>
          </div>
        </div>

        <h3>Key Value Drivers</h3>
        <ul>
          <li>Market-leading anchor acquisition in neurodiagnostics</li>
          <li>Systematic bolt-on acquisition program</li>
          <li>Platform-wide operational improvements via NoeticOS</li>
          <li>Multiple exit pathways with 6-8x revenue multiples</li>
        </ul>

        <h3>Investment Thesis</h3>
        <p>The CNS market presents a compelling consolidation opportunity driven by fragmentation, regulatory complexity, and the need for integrated solutions. Our platform approach creates sustainable competitive advantages while delivering superior returns through operational excellence and strategic acquisitions.</p>
        
        <div class="page-footer">
          Generated with Noetic 2.0 Thesis Builder
        </div>
      </div>
    `
  }

  // Content pages
  selections.sort((a, b) => a.order - b.order).forEach(selection => {
    if (selection.type === 'chart') {
      htmlContent += `
        <div class="page">
          <h2>${selection.title}</h2>
          <div class="chart-placeholder">
            📊 Chart: ${selection.title}
            <br><small>Chart visualization would appear here in the exported PDF</small>
          </div>
          <p>${getChartInsights(selection.id)}</p>
          <div class="page-footer">
            Chart: ${selection.title} | Page ${selections.indexOf(selection) + 1}
          </div>
        </div>
      `
    } else if (selection.type === 'risk') {
      htmlContent += `
        <div class="page">
          <h2>Risk Assessment</h2>
          <div class="risk-matrix">
            <div class="risk-category risk-high">
              <h3>HIGH RISK</h3>
              <div>Integration Execution</div>
              <div>Talent Retention</div>
            </div>
            <div class="risk-category risk-medium">
              <h3>MEDIUM RISK</h3>
              <div>Regulatory/Payer</div>
              <div>Market Timing</div>
              <div>Competition</div>
            </div>
            <div class="risk-category risk-low">
              <h3>LOW RISK</h3>
              <div>Technology Risk</div>
            </div>
          </div>
          <h3>Mitigation Strategies</h3>
          <ul>
            <li>Experienced management team with proven track record</li>
            <li>Conservative financial modeling with stress testing</li>
            <li>Diversified acquisition pipeline across CNS verticals</li>
            <li>Strong operational playbook via NoeticOS platform</li>
          </ul>
          <div class="page-footer">
            Risk Assessment | Noetic 2.0 Investment Thesis
          </div>
        </div>
      `
    }
  })

  htmlContent += `
    </body>
    </html>
  `

  return htmlContent
}

function getChartInsights(chartId: string): string {
  const insights = {
    'market-line': 'The CNS market shows consistent growth at 10.4% CAGR, reaching $254.6B by 2030, providing substantial runway for consolidation strategy.',
    'capital-doughnut': 'Strategic capital allocation prioritizes anchor acquisition (45%) and bolt-on growth (35%) with prudent reserves (20%).',
    'noetic-os-radar': 'NoeticOS platform capabilities span all critical operational areas, with particular strength in data/AI and go-to-market functions.',
    'platform-kpi-bar': 'Significant improvement opportunities exist across all KPIs, with integration speed and cross-sell rate showing highest potential impact.',
    'value-creation-dual': 'Value creation accelerates through systematic revenue growth and margin expansion, reaching optimal scale by Year 4.',
    'return-bar': 'Multiple return scenarios demonstrate strong downside protection with significant upside potential in favorable market conditions.'
  }
  return insights[chartId as keyof typeof insights] || 'Key insights and analysis for this metric.'
}