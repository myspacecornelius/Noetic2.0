import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, ExternalLink, Download, Link2 } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';

interface AddToThesisButtonProps {
  sectionId: string;
  sectionTitle: string;
  data?: any;
  variant?: 'default' | 'compact';
  className?: string;
}

interface SectionCTARowProps {
  sectionId: string;
  sectionTitle: string;
  data?: any;
  showDownload?: boolean;
  downloadFormat?: 'csv' | 'json' | 'pdf';
  className?: string;
}

export function AddToThesisButton({
  sectionId,
  sectionTitle,
  data,
  variant = 'default',
  className = ''
}: AddToThesisButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToThesis = async () => {
    if (isAdded || isLoading) return;

    setIsLoading(true);
    
    try {
      // Emit custom event for thesis builder to catch
      const thesisData = {
        id: sectionId,
        title: sectionTitle,
        type: 'market-intelligence',
        data: data,
        timestamp: new Date().toISOString(),
        source: 'market-intelligence-page'
      };

      // Store in localStorage for persistence
      const existingData = localStorage.getItem('thesis-builder-data');
      const parsedData = existingData ? JSON.parse(existingData) : { items: [] };
      
      // Check if already added
      const exists = parsedData.items.some((item: any) => item.id === sectionId);
      if (!exists) {
        parsedData.items.push(thesisData);
        localStorage.setItem('thesis-builder-data', JSON.stringify(parsedData));
      }

      // Emit custom event
      window.dispatchEvent(new CustomEvent('thesis-data-added', {
        detail: thesisData
      }));

      setIsAdded(true);
      
      // Auto-reset after 3 seconds
      setTimeout(() => setIsAdded(false), 3000);
    } catch (error) {
      console.error('Failed to add to thesis:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonContent = isAdded ? (
    <>
      <Check className="w-4 h-4" aria-hidden="true" />
      {variant === 'default' && 'Added to Thesis'}
    </>
  ) : (
    <>
      <Plus className="w-4 h-4" aria-hidden="true" />
      {variant === 'default' && 'Add to Thesis'}
    </>
  );

  return (
    <Tooltip
      content={isAdded ? 'Added to thesis builder' : `Add ${sectionTitle} to thesis builder`}
      disabled={variant === 'default'}
    >
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAddToThesis}
        disabled={isLoading}
        className={`
          inline-flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50
          ${isAdded 
            ? 'bg-green-900/30 text-green-300 border border-green-700/50' 
            : 'bg-blue-900/30 text-blue-300 border border-blue-700/50 hover:bg-blue-900/50'
          }
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          ${variant === 'compact' ? 'px-2 py-1.5' : ''}
          ${className}
        `}
        aria-label={`Add ${sectionTitle} section to thesis builder`}
      >
        {buttonContent}
      </motion.button>
    </Tooltip>
  );
}

export function SectionCTARow({
  sectionId,
  sectionTitle,
  data,
  showDownload = true,
  downloadFormat = 'csv',
  className = ''
}: SectionCTARowProps) {
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleDownload = () => {
    if (!data) return;

    let content = '';
    let mimeType = '';
    let filename = '';

    switch (downloadFormat) {
      case 'csv':
        content = convertToCSV(data);
        mimeType = 'text/csv';
        filename = `${sectionId}-data.csv`;
        break;
      case 'json':
        content = JSON.stringify(data, null, 2);
        mimeType = 'application/json';
        filename = `${sectionId}-data.json`;
        break;
      default:
        return;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const convertToCSV = (data: any): string => {
    // Simple CSV conversion - could be enhanced based on data structure
    if (Array.isArray(data)) {
      if (data.length === 0) return '';
      const headers = Object.keys(data[0]).join(',');
      const rows = data.map(row => Object.values(row).join(','));
      return [headers, ...rows].join('\n');
    }
    return Object.entries(data).map(([key, value]) => `${key},${value}`).join('\n');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        flex items-center justify-center gap-3 py-4 px-6 
        bg-gray-800/20 rounded-lg border border-gray-700/30
        ${className}
      `}
    >
      <AddToThesisButton
        sectionId={sectionId}
        sectionTitle={sectionTitle}
        data={data}
        variant="compact"
      />
      
      <div className="w-px h-6 bg-gray-600" />
      
      <Tooltip content={linkCopied ? 'Link copied!' : 'Copy section link'}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCopyLink}
          className={`
            inline-flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/50
            ${linkCopied
              ? 'bg-green-900/30 text-green-300 border border-green-700/50'
              : 'bg-gray-800/50 text-gray-300 border border-gray-600/50 hover:bg-gray-700/50'
            }
          `}
          aria-label="Copy section link"
        >
          <Link2 className="w-4 h-4" aria-hidden="true" />
          {linkCopied ? 'Copied!' : 'Copy Link'}
        </motion.button>
      </Tooltip>

      {showDownload && data && (
        <>
          <div className="w-px h-6 bg-gray-600" />
          
          <Tooltip content={`Download section data as ${downloadFormat.toUpperCase()}`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownload}
              className="
                inline-flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm
                bg-gray-800/50 text-gray-300 border border-gray-600/50 hover:bg-gray-700/50
                transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/50
              "
              aria-label={`Download section data as ${downloadFormat}`}
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Download {downloadFormat.toUpperCase()}
            </motion.button>
          </Tooltip>
        </>
      )}
    </motion.div>
  );
}