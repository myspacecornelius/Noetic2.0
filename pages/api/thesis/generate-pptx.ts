import type { NextApiRequest, NextApiResponse } from 'next'
import PptxGenJS from 'pptxgenjs'
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

    // Create new presentation
    const pptx = new PptxGenJS()
    
    // Configure presentation properties
    pptx.author = 'David C. Nichols'
    pptx.company = 'Noetic 2.0'
    pptx.subject = 'Investment Thesis'
    pptx.title = 'Noetic 2.0 - Strategic Transformation Investment Thesis'

    // Set theme colors
    const primaryColor = options.branding.primaryColor.replace('#', '')
    const secondaryColor = options.branding.secondaryColor.replace('#', '')

    // Master slide layout
    pptx.defineSlideMaster({
      title: 'NOETIC_MASTER',
      background: { fill: 'FFFFFF' },
      objects: [
        {
          line: {
            x: 0.5, y: 9.0, w: 9.0, h: 0,
            line: { color: primaryColor, width: 2 }
          }
        },
        {
          text: {
            text: 'NOETIC 2.0',
            options: {
              x: 8.5, y: 9.2, w: 1.5, h: 0.3,
              fontSize: 10,
              color: primaryColor,
              fontFace: options.branding.fontFamily,
              align: 'right'
            }
          }
        }
      ]
    })

    // Cover slide
    if (options.customization.includeCoverPage) {
      const coverSlide = pptx.addSlide({ masterName: 'NOETIC_MASTER' })
      
      coverSlide.background = { color: primaryColor }

      coverSlide.addText('NOETIC 2.0', {
        x: 1, y: 2, w: 8, h: 1.5,
        fontSize: 48,
        bold: true,
        color: 'FFFFFF',
        align: 'center',
        fontFace: options.branding.fontFamily
      })

      coverSlide.addText('Investment Thesis', {
        x: 1, y: 3.5, w: 8, h: 1,
        fontSize: 32,
        color: 'FFFFFF',
        align: 'center',
        fontFace: options.branding.fontFamily
      })

      coverSlide.addText('Strategic Transformation: From Venture Fund to CNS Operating Company', {
        x: 1, y: 4.5, w: 8, h: 0.8,
        fontSize: 18,
        color: 'FFFFFF',
        align: 'center',
        fontFace: options.branding.fontFamily
      })

      // Highlights
      const highlights = ['$140B+ Market', '10.4% CAGR', 'Infrastructure-Led Strategy']
      highlights.forEach((highlight, index) => {
        coverSlide.addText(highlight, {
          x: 1.5 + (index * 2.5), y: 6, w: 2, h: 0.8,
          fontSize: 14,
          bold: true,
          color: 'FFFFFF',
          align: 'center',
          fill: { color: 'FFFFFF', transparency: 20 },
          fontFace: options.branding.fontFamily
        })
      })

      // Footer info
      coverSlide.addText(`Prepared by: David C. Nichols\nDate: ${new Date().toLocaleDateString()}\nTemplate: ${template.name}`, {
        x: 1, y: 7.5, w: 8, h: 1,
        fontSize: 12,
        color: 'FFFFFF',
        align: 'center',
        fontFace: options.branding.fontFamily
      })
    }

    // Executive Summary
    if (options.customization.includeExecutiveSummary) {
      const summarySlide = pptx.addSlide({ masterName: 'NOETIC_MASTER' })
      
      summarySlide.addText('Executive Summary', {
        x: 0.5, y: 0.5, w: 9, h: 0.8,
        fontSize: 32,
        bold: true,
        color: primaryColor,
        fontFace: options.branding.fontFamily
      })

      summarySlide.addText('Investment Opportunity', {
        x: 0.5, y: 1.5, w: 9, h: 0.5,
        fontSize: 18,
        bold: true,
        color: secondaryColor,
        fontFace: options.branding.fontFamily
      })

      summarySlide.addText('Noetic 2.0 represents a strategic transformation from venture fund to CNS operating company, targeting the $140B+ central nervous system market with an infrastructure-led consolidation strategy.', {
        x: 0.5, y: 2, w: 9, h: 1,
        fontSize: 14,
        fontFace: options.branding.fontFamily
      })

      // Key metrics boxes
      const metrics = [
        { label: 'Target Fund Size', value: '$500M - $1.5B' },
        { label: 'Revenue CAGR', value: '25%+' },
        { label: 'Target IRR', value: '15-25%' }
      ]

      metrics.forEach((metric, index) => {
        summarySlide.addText(metric.value, {
          x: 0.5 + (index * 3), y: 3.5, w: 2.5, h: 0.6,
          fontSize: 20,
          bold: true,
          color: primaryColor,
          align: 'center',
          fontFace: options.branding.fontFamily
        })
        
        summarySlide.addText(metric.label, {
          x: 0.5 + (index * 3), y: 4.1, w: 2.5, h: 0.4,
          fontSize: 12,
          color: '666666',
          align: 'center',
          fontFace: options.branding.fontFamily
        })

        summarySlide.addShape(pptx.ShapeType.rect, {
          x: 0.5 + (index * 3), y: 3.4, w: 2.5, h: 1.2,
          fill: { color: primaryColor, transparency: 90 },
          line: { color: primaryColor, width: 1 }
        })
      })

      // Key value drivers
      summarySlide.addText('Key Value Drivers', {
        x: 0.5, y: 5, w: 9, h: 0.5,
        fontSize: 18,
        bold: true,
        color: secondaryColor,
        fontFace: options.branding.fontFamily
      })

      const valueDrivers = [
        'Market-leading anchor acquisition in neurodiagnostics',
        'Systematic bolt-on acquisition program',
        'Platform-wide operational improvements via NoeticOS',
        'Multiple exit pathways with 6-8x revenue multiples'
      ]

      summarySlide.addText(valueDrivers.map(driver => `• ${driver}`).join('\n'), {
        x: 0.5, y: 5.5, w: 9, h: 2,
        fontSize: 14,
        fontFace: options.branding.fontFamily
      })
    }

    // Content slides based on selections
    selections.sort((a, b) => a.order - b.order).forEach(selection => {
      const slide = pptx.addSlide({ masterName: 'NOETIC_MASTER' })

      if (selection.type === 'chart') {
        // Chart slide
        slide.addText(selection.title, {
          x: 0.5, y: 0.5, w: 9, h: 0.8,
          fontSize: 28,
          bold: true,
          color: primaryColor,
          fontFace: options.branding.fontFamily
        })

        // Chart placeholder (in real implementation, would capture actual chart image)
        slide.addShape(pptx.ShapeType.rect, {
          x: 1, y: 1.5, w: 8, h: 4.5,
          fill: { color: 'F9FAFB' },
          line: { color: 'D1D5DB', width: 2, dashType: 'dash' }
        })

        slide.addText('📊 Chart Visualization', {
          x: 1, y: 3.5, w: 8, h: 0.5,
          fontSize: 18,
          color: '6B7280',
          align: 'center',
          fontFace: options.branding.fontFamily
        })

        slide.addText(`Chart: ${selection.title}`, {
          x: 1, y: 4, w: 8, h: 0.3,
          fontSize: 12,
          color: '6B7280',
          align: 'center',
          fontFace: options.branding.fontFamily
        })

        // Insights
        slide.addText('Key Insights', {
          x: 0.5, y: 6.2, w: 9, h: 0.4,
          fontSize: 16,
          bold: true,
          color: secondaryColor,
          fontFace: options.branding.fontFamily
        })

        slide.addText(getChartInsights(selection.id), {
          x: 0.5, y: 6.6, w: 9, h: 1.5,
          fontSize: 12,
          fontFace: options.branding.fontFamily
        })

      } else if (selection.type === 'phase') {
        // Phase slide
        const phaseData = getPhaseData(selection.id)
        
        slide.addText(selection.title, {
          x: 0.5, y: 0.5, w: 9, h: 0.8,
          fontSize: 28,
          bold: true,
          color: primaryColor,
          fontFace: options.branding.fontFamily
        })

        slide.addText(`Duration: ${phaseData.duration}`, {
          x: 0.5, y: 1.3, w: 9, h: 0.4,
          fontSize: 14,
          color: secondaryColor,
          fontFace: options.branding.fontFamily
        })

        // Metrics table
        let yPos = 2
        Object.entries(phaseData.metrics).forEach(([key, value]) => {
          slide.addText(key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()), {
            x: 0.5, y: yPos, w: 4, h: 0.4,
            fontSize: 12,
            fontFace: options.branding.fontFamily
          })
          
          slide.addText(value, {
            x: 5, y: yPos, w: 4, h: 0.4,
            fontSize: 12,
            bold: true,
            color: primaryColor,
            fontFace: options.branding.fontFamily
          })
          
          yPos += 0.5
        })

      } else if (selection.type === 'risk') {
        // Risk assessment slide
        slide.addText('Risk Assessment', {
          x: 0.5, y: 0.5, w: 9, h: 0.8,
          fontSize: 28,
          bold: true,
          color: primaryColor,
          fontFace: options.branding.fontFamily
        })

        // Risk categories
        const riskCategories = [
          { level: 'HIGH', color: 'DC2626', items: ['Integration Execution', 'Talent Retention'] },
          { level: 'MEDIUM', color: 'D97706', items: ['Regulatory/Payer', 'Market Timing', 'Competition'] },
          { level: 'LOW', color: '059669', items: ['Technology Risk'] }
        ]

        riskCategories.forEach((category, index) => {
          slide.addText(category.level + ' RISK', {
            x: 0.5 + (index * 3), y: 1.5, w: 2.5, h: 0.4,
            fontSize: 14,
            bold: true,
            color: 'FFFFFF',
            align: 'center',
            fill: { color: category.color },
            fontFace: options.branding.fontFamily
          })

          slide.addText(category.items.join('\n'), {
            x: 0.5 + (index * 3), y: 1.9, w: 2.5, h: 1.5,
            fontSize: 11,
            align: 'center',
            fontFace: options.branding.fontFamily
          })

          slide.addShape(pptx.ShapeType.rect, {
            x: 0.5 + (index * 3), y: 1.5, w: 2.5, h: 1.9,
            fill: { color: category.color, transparency: 90 },
            line: { color: category.color, width: 2 }
          })
        })

        // Mitigation strategies
        slide.addText('Mitigation Strategies', {
          x: 0.5, y: 4, w: 9, h: 0.5,
          fontSize: 16,
          bold: true,
          color: secondaryColor,
          fontFace: options.branding.fontFamily
        })

        const mitigationStrategies = [
          'Experienced management team with proven track record',
          'Conservative financial modeling with stress testing',
          'Diversified acquisition pipeline across CNS verticals',
          'Strong operational playbook via NoeticOS platform'
        ]

        slide.addText(mitigationStrategies.map(strategy => `• ${strategy}`).join('\n'), {
          x: 0.5, y: 4.5, w: 9, h: 2,
          fontSize: 12,
          fontFace: options.branding.fontFamily
        })
      }
    })

    // Generate and send PPTX  
    // @ts-ignore - PptxGenJS types may be incomplete
    const pptxBuffer = await pptx.write({ outputType: 'nodebuffer' }) as Buffer

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation')
    res.setHeader('Content-Disposition', 'attachment; filename="noetic-2.0-thesis.pptx"')
    res.setHeader('Content-Length', pptxBuffer.length)

    res.status(200).end(pptxBuffer)

  } catch (error) {
    console.error('PPTX generation error:', error)
    res.status(500).json({ 
      error: 'Failed to generate PPTX',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
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

function getPhaseData(phaseId: string) {
  const phases = {
    'p0': {
      duration: 'Months 0-6',
      metrics: {
        'Operating Partners Hired': '0/3',
        'Target Pipeline Built': '0/100+',
        'NoeticOS Development': 'Planning',
        'First LOIs': 'Target: 20+'
      }
    },
    'p1': {
      duration: 'Months 6-18',
      metrics: {
        'Revenue Range': '$35-75M',
        'EBITDA Margin': '20%+',
        'Focus Areas': 'Neurodiagnostics',
        'Business Model': 'SaaS + Device'
      }
    },
    'p2': {
      duration: 'Months 12-30',
      metrics: {
        'Target Count': '3-6 acquisitions',
        'Size Range': '$5-25M revenue',
        'Integration Timeline': '<18 months',
        'Synergy Target': '70% of underwrite'
      }
    },
    'p3': {
      duration: 'Months 30-48',
      metrics: {
        'Combined Revenue': '$150M+ target',
        'EBITDA Margin': '25%+ target',
        'FCF Yield': '15%+ target',
        'Revenue/Invested Capital': '1.2x+ target'
      }
    },
    'p4': {
      duration: 'Months 48-72',
      metrics: {
        'Revenue Run Rate': '$200M+ target',
        'EBITDA Margin': '30%+ target',
        'Growth Rate': '20%+ sustainable',
        'Market Position': 'Top 3 in niche'
      }
    }
  }
  
  return phases[phaseId as keyof typeof phases] || { duration: '', metrics: {} }
}