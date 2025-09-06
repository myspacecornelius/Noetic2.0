import { useState, useMemo } from 'react'
import { useMetricsData } from '../../hooks/useMetricsData'
import ChartCapture from './ChartCapture'
import { MarketLine, CapitalDoughnut, NoeticOsRadar, PlatformKpiBar, ValueCreationDualAxis, ReturnBar } from '../NoeticCharts'
import type { ThesisSelection } from '../../types/data'

interface DataSelectorProps {
  selections: ThesisSelection[]
  onChange: (selections: ThesisSelection[]) => void
  onNext: () => void
}

// Available chart components (moved outside component to avoid dependency issues)
const chartComponents = {
  'market-line': { component: MarketLine, title: 'Market Size Projection', category: 'charts' },
  'capital-doughnut': { component: CapitalDoughnut, title: 'Capital Allocation', category: 'charts' },
  'noetic-os-radar': { component: NoeticOsRadar, title: 'NoeticOS Implementation', category: 'charts' },
  'platform-kpi-bar': { component: PlatformKpiBar, title: 'Platform KPIs', category: 'charts' },
  'value-creation-dual': { component: ValueCreationDualAxis, title: 'Value Creation Timeline', category: 'charts' },
  'return-bar': { component: ReturnBar, title: 'Return Scenarios', category: 'charts' }
}

export default function DataSelector({ selections, onChange, onNext }: DataSelectorProps) {
  const metricsData = useMetricsData()
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'charts' | 'metrics' | 'phases' | 'risks'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Generate available selections
  const availableSelections = useMemo(() => {
    const items: ThesisSelection[] = []

    // Add charts
    Object.entries(chartComponents).forEach(([id, chart]) => {
      items.push({
        id,
        type: 'chart',
        title: chart.title,
        data: chart,
        order: 0,
        selected: selections.some(s => s.id === id)
      })
    })

    // Add phase data
    metricsData.phases.forEach((phase, index) => {
      items.push({
        id: phase.id,
        type: 'phase',
        title: phase.title,
        data: phase,
        order: 0,
        selected: selections.some(s => s.id === phase.id)
      })
    })

    // Add key metrics
    const keyMetrics = [
      { id: 'target-fund-size', title: 'Target Fund Size', data: metricsData.capitalPlan.targetFundSize },
      { id: 'anchor-allocation', title: 'Anchor Allocation', data: metricsData.capitalPlan.anchorAllocation },
      { id: 'bolt-on-allocation', title: 'Bolt-On Allocation', data: metricsData.capitalPlan.boltOnAllocation }
    ]

    keyMetrics.forEach(metric => {
      items.push({
        id: metric.id,
        type: 'metric',
        title: metric.title,
        data: metric.data,
        order: 0,
        selected: selections.some(s => s.id === metric.id)
      })
    })

    // Add risks
    items.push({
      id: 'risk-assessment',
      type: 'risk',
      title: 'Risk Assessment',
      data: metricsData.risks,
      order: 0,
      selected: selections.some(s => s.id === 'risk-assessment')
    })

    return items
  }, [metricsData, selections])

  // Filter items based on category and search
  const filteredSelections = useMemo(() => {
    return availableSelections.filter(item => {
      // Map plural category names to singular item types
      const categoryTypeMap = {
        'charts': 'chart',
        'metrics': 'metric', 
        'phases': 'phase',
        'risks': 'risk'
      } as const
      
      const matchesCategory = selectedCategory === 'all' || 
        item.type === categoryTypeMap[selectedCategory as keyof typeof categoryTypeMap]
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [availableSelections, selectedCategory, searchQuery])

  const handleSelectionToggle = (item: ThesisSelection) => {
    const existing = selections.find(s => s.id === item.id)
    
    if (existing) {
      // Remove selection
      onChange(selections.filter(s => s.id !== item.id))
    } else {
      // Add selection
      const newSelection: ThesisSelection = {
        ...item,
        order: selections.length,
        selected: true
      }
      onChange([...selections, newSelection])
    }
  }

  const handleReorder = (dragIndex: number, hoverIndex: number) => {
    const draggedItem = selections[dragIndex]
    const newSelections = [...selections]
    newSelections.splice(dragIndex, 1)
    newSelections.splice(hoverIndex, 0, draggedItem)
    
    // Update order numbers
    newSelections.forEach((item, index) => {
      item.order = index
    })
    
    onChange(newSelections)
  }

  return (
    <div className="data-selector">
      <div className="selector-header">
        <h2>Select Data & Charts</h2>
        <p>Choose the metrics, charts, and analysis you want to include in your investment thesis.</p>
      </div>

      {/* Filters */}
      <div className="selector-filters">
        <div className="category-tabs">
          {['all', 'charts', 'metrics', 'phases', 'risks'].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as any)}
              className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        <input
          type="text"
          placeholder="Search data..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="selector-content">
        {/* Available Items */}
        <div className="available-items">
          <h3>Available Items ({filteredSelections.length})</h3>
          <div className="items-grid">
            {filteredSelections.map(item => (
              <div
                key={item.id}
                className={`data-item ${item.selected ? 'selected' : ''}`}
                onClick={() => handleSelectionToggle(item)}
              >
                <div className="item-header">
                  <h4>{item.title}</h4>
                  <span className={`item-type ${item.type}`}>{item.type}</span>
                </div>
                
                {item.type === 'chart' && (
                  <div className="chart-preview">
                    <ChartCapture
                      chartId={item.id}
                      component={item.data.component}
                      height={120}
                    />
                  </div>
                )}
                
                <div className="item-actions">
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => handleSelectionToggle(item)}
                    aria-label={`Select ${item.title}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Items */}
        <div className="selected-items">
          <h3>Selected Items ({selections.length})</h3>
          <div className="selected-list">
            {selections
              .sort((a, b) => a.order - b.order)
              .map((item, index) => (
                <div
                  key={item.id}
                  className="selected-item"
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', index.toString())}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault()
                    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'))
                    handleReorder(dragIndex, index)
                  }}
                >
                  <span className="drag-handle">⋮⋮</span>
                  <span className="item-title">{item.title}</span>
                  <span className={`item-type ${item.type}`}>{item.type}</span>
                  <button
                    onClick={() => handleSelectionToggle(item)}
                    className="remove-button"
                    aria-label={`Remove ${item.title}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            
            {selections.length === 0 && (
              <p className="empty-state">No items selected. Choose items from the left to get started.</p>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="selector-actions">
        <button
          onClick={onNext}
          disabled={selections.length === 0}
          className="button primary"
        >
          Next: Choose Template ({selections.length} items selected)
        </button>
      </div>
    </div>
  )
}