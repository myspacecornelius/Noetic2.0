import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import { Chip } from './Chip';
import { Tooltip } from './Tooltip';

interface TechnologyItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  marketImpact: string;
  keyPlayers: string[];
  investmentThesis: string;
  riskFactors: string[];
  marketSize?: string;
  timeframe?: string;
}

interface TechnologyAccordionProps {
  technologies: TechnologyItem[];
  defaultOpen?: string;
  className?: string;
}

export function TechnologyAccordion({ 
  technologies, 
  defaultOpen, 
  className = '' 
}: TechnologyAccordionProps) {
  const [openItem, setOpenItem] = useState<string>(defaultOpen || technologies[0]?.id || '');

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? '' : id);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {technologies.map((tech) => (
        <div
          key={tech.id}
          className="border border-gray-700/50 rounded-lg bg-gray-800/30 overflow-hidden"
        >
          <button
            onClick={() => toggleItem(tech.id)}
            className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            aria-expanded={openItem === tech.id}
            aria-controls={`technology-${tech.id}`}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="text-blue-400 flex-shrink-0" aria-hidden="true">
                {tech.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-100 text-lg">
                  {tech.title}
                </h3>
                <div className="text-sm text-gray-400 mt-1">
                  <Tooltip content="Projected market impact and timeline">
                    {tech.marketImpact}
                  </Tooltip>
                  {tech.timeframe && (
                    <span className="ml-2 text-blue-400">• {tech.timeframe}</span>
                  )}
                </div>
              </div>
              {tech.marketSize && (
                <div className="flex-shrink-0 mr-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-400">
                      {tech.marketSize}
                    </div>
                    <div className="text-xs text-gray-500">Market Size</div>
                  </div>
                </div>
              )}
            </div>
            <motion.div
              animate={{ rotate: openItem === tech.id ? 180 : 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="text-gray-400 hover:text-gray-200 transition-colors flex-shrink-0"
            >
              <ChevronDown className="w-5 h-5" aria-hidden="true" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {openItem === tech.id && (
              <motion.div
                id={`technology-${tech.id}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.3, ease: 'easeInOut' },
                  opacity: { duration: 0.2, ease: 'easeInOut' }
                }}
                className="overflow-hidden border-t border-gray-700/30"
              >
                <div className="p-6 space-y-6">
                  {/* Key Players */}
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-blue-300 mb-3">
                      <TrendingUp className="w-4 h-4" aria-hidden="true" />
                      Key Players
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tech.keyPlayers.map((player, index) => (
                        <Chip key={index} variant="primary" size="sm">
                          {player}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  {/* Investment Thesis */}
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="flex items-center gap-2 font-semibold text-green-300 mb-2">
                      <DollarSign className="w-4 h-4" aria-hidden="true" />
                      Investment Thesis
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      {tech.investmentThesis}
                    </p>
                  </div>

                  {/* Risk Factors */}
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-amber-300 mb-3">
                      <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                      Risk Factors
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tech.riskFactors.map((risk, index) => (
                        <Chip key={index} variant="warning" size="sm">
                          {risk}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}