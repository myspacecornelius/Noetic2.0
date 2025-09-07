import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, DollarSign, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { Tooltip } from './ui/Tooltip';

const companyData = [
  {
    name: 'Roche',
    revenue: 12.8,
    pipeline: 'Strong Alzheimer\'s pipeline, multiple Phase III assets.',
    logo: 'roche.svg', // Placeholder
    therapeuticArea: 'Oncology, CNS'
  },
  {
    name: 'Novartis',
    revenue: 8.4,
    pipeline: 'Multiple sclerosis market leader, expanding into gene therapies.',
    logo: 'novartis.svg',
    therapeuticArea: 'Immunology, CNS'
  },
  {
    name: 'Biogen',
    revenue: 6.2,
    pipeline: 'Neurodegeneration specialist with approved Alzheimer\'s therapy.',
    logo: 'biogen.svg',
    therapeuticArea: 'CNS'
  },
  {
    name: 'J&J',
    revenue: 5.9,
    pipeline: 'Diversified psychiatric and neuro-drug portfolio.',
    logo: 'jnj.svg',
    therapeuticArea: 'Various'
  },
];

const LogoPlaceholder = ({ name }: { name: string }) => (
  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold text-white">
    {name.charAt(0)}
  </div>
);

export const CompetitiveLandscape = () => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof typeof companyData[0]; direction: 'ascending' | 'descending' } | null>({ key: 'revenue', direction: 'descending' });

  const sortedData = React.useMemo(() => {
    let sortableItems = [...companyData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [sortConfig]);

  const requestSort = (key: keyof typeof companyData[0]) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const maxRevenue = Math.max(...companyData.map(c => c.revenue));

  return (
    <div className="bg-gray-900/10 border border-blue-700/50 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-blue-400">
          <Building2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-blue-300">Competitive Landscape</h3>
          <p className="text-sm text-blue-400/70">Big Pharma Revenue & Pipeline</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-2 text-sm font-semibold text-gray-400">Company</th>
              <th className="p-2 text-sm font-semibold text-gray-400 cursor-pointer" onClick={() => requestSort('revenue')}> 
                <div className="flex items-center gap-1">
                  Revenue (USD B)
                  {sortConfig?.key === 'revenue' && (sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </div>
              </th>
              <th className="p-2 text-sm font-semibold text-gray-400">Therapeutic Area</th>
            </tr>
          </thead>
          <motion.tbody
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
            initial="hidden"
            animate="show"
          >
            {sortedData.map((company) => (
              <motion.tr 
                key={company.name} 
                className="border-b border-gray-800 last:border-b-0"
                whileHover={{ backgroundColor: 'rgba(102, 126, 234, 0.1)' }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <td className="p-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <LogoPlaceholder name={company.name} />
                    <div>
                      <div className="font-medium text-white">{company.name}</div>
                      <Tooltip content={company.pipeline}>
                        <div className="text-xs text-gray-400 cursor-pointer">Pipeline Snapshot</div>
                      </Tooltip>
                    </div>
                  </div>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg text-blue-300">{company.revenue.toFixed(1)}</span>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <motion.div 
                        className="bg-blue-500 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(company.revenue / maxRevenue) * 100}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-300 whitespace-nowrap">{company.therapeuticArea}</td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
};