import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const scenarios = [
  {
    name: 'Base Case',
    className: 'base-case',
    icon: '📊',
    returns: {
      multiple: 3.2,
      irr: 28,
      valuation: 2.1,
      period: 60,
    },
  },
  {
    name: 'Upside',
    className: 'upside',
    icon: '🚀',
    returns: {
      multiple: 5.8,
      irr: 42,
      valuation: 3.8,
      period: 48,
    },
  },
  {
    name: 'Conservative',
    className: 'conservative',
    icon: '⚖️',
    returns: {
      multiple: 2.1,
      irr: 18,
      valuation: 1.4,
      period: 72,
    },
  },
  {
    name: 'Stress Test',
    className: 'stress',
    icon: '⚠️',
    returns: {
      multiple: 1.2,
      irr: 3,
      valuation: 0.8,
      period: 84,
    },
  },
];

export const ScenarioComparison = () => {
  const [viewMode, setViewMode] = useState('stacked'); // stacked or side-by-side

  const { isMin, isMax } = useMemo(() => {
    const metrics = {
      multiple: scenarios.map(s => s.returns.multiple),
      irr: scenarios.map(s => s.returns.irr),
      valuation: scenarios.map(s => s.returns.valuation),
      period: scenarios.map(s => s.returns.period),
    };

    const minMax = {
      multiple: { min: Math.min(...metrics.multiple), max: Math.max(...metrics.multiple) },
      irr: { min: Math.min(...metrics.irr), max: Math.max(...metrics.irr) },
      valuation: { min: Math.min(...metrics.valuation), max: Math.max(...metrics.valuation) },
      period: { min: Math.min(...metrics.period), max: Math.max(...metrics.period) },
    };

    const isMin = (key: keyof typeof minMax, value: number) => value === minMax[key].min;
    const isMax = (key: keyof typeof minMax, value: number) => value === minMax[key].max;

    return { isMin, isMax };
  }, []);

  const getMetricClass = (key: keyof typeof scenarios[0]["returns"], value: number) => {
    if (isMin(key, value)) return 'min';
    if (isMax(key, value)) return 'max';
    return '';
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button 
          onClick={() => setViewMode(viewMode === 'stacked' ? 'side-by-side' : 'stacked')} 
          className="button secondary"
        >
          {viewMode === 'stacked' ? 'Compare Side-by-Side' : 'View Stacked'}
        </button>
      </div>

      <div className={viewMode === 'side-by-side' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4' : 'space-y-8'}>
        {scenarios.map(scenario => (
          <div key={scenario.name} className={`scenario-card ${scenario.className}`}>
            <h3>{scenario.icon} {scenario.name} Returns</h3>
            <div className="return-metrics">
              <div className="metric">
                <span className={`value ${getMetricClass('multiple', scenario.returns.multiple)}`}>{scenario.returns.multiple}x</span>
                <span className="label">Total Return Multiple</span>
              </div>
              <div className="metric">
                <span className={`value ${getMetricClass('irr', scenario.returns.irr)}`}>{scenario.returns.irr}%</span>
                <span className="label">IRR</span>
              </div>
              <div className="metric">
                <span className={`value ${getMetricClass('valuation', scenario.returns.valuation)}`}>${scenario.returns.valuation}B</span>
                <span className="label">Exit Valuation</span>
              </div>
              <div className="metric">
                <span className={`value ${getMetricClass('period', scenario.returns.period)}`}>{scenario.returns.period} months</span>
                <span className="label">Investment Period</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};