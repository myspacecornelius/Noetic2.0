import {
  Chart as ChartJS, LineElement, BarElement, PointElement, LineController, BarController,
  CategoryScale, LinearScale, RadialLinearScale, Tooltip, Legend, Filler, ArcElement
} from 'chart.js'
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2'

ChartJS.register(LineElement, BarElement, PointElement, LineController, BarController,
  CategoryScale, LinearScale, RadialLinearScale, Tooltip, Legend, Filler, ArcElement)

export function MarketLine() {
  return <Line data={{
    labels: ['2024','2025','2026','2027','2028','2029','2030'],
    datasets: [{ label: 'CNS Market Size ($B)', data: [140.4,155,171.1,189,208.7,230.4,254.6], borderColor: '#667eea', backgroundColor: 'rgba(102,126,234,.1)', fill: true, tension: .4 }]
  }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: false, ticks: { callback: (v: any) => `$${v}B` } } } }} />
}

export function CapitalDoughnut() {
  return <Doughnut data={{ labels: ['Anchors','Bolt-Ons','Reserves'], datasets: [{ data: [45,35,20], backgroundColor: ['#667eea','#764ba2','#a855f7'], borderWidth: 0 }] }} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
}

export function NoeticOsRadar() {
  return <Radar data={{
    labels: ['FP&A','Reg/QA','Market Access','Data/AI','GTM','People Ops'],
    datasets: [{ label: 'Implementation Progress', data: [20,15,10,25,30,20], borderColor: '#667eea', backgroundColor: 'rgba(102,126,234,.2)', pointBackgroundColor: '#667eea' }]
  }} options={{ responsive: true, maintainAspectRatio: false, scales: { r: { beginAtZero: true, max: 100, ticks: { callback: (v: any) => `${v}%` } } } }} />
}

export function PlatformKpiBar() {
  return <Bar data={{ labels: ['Revenue Growth','EBITDA Margin','Cross-Sell Rate','Integration Speed'], datasets: [ { label: 'Current', data: [15,18,12,70], backgroundColor: '#e5e7eb' }, { label: 'Target', data: [25,25,25,90], backgroundColor: '#667eea' } ] }} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
}

export function ValueCreationDualAxis() {
  return <Line data={{ labels: ['Year 0','Year 1','Year 2','Year 3','Year 4'], datasets: [ { label: 'Revenue ($M)', data: [0,40,80,150,200], borderColor: '#667eea', yAxisID: 'y' }, { label: 'EBITDA Margin (%)', data: [0,15,20,25,30], borderColor: '#764ba2', yAxisID: 'y1' } ] }} options={{ responsive: true, scales: { y: { type:'linear', position:'left' }, y1: { type:'linear', position:'right', grid: { drawOnChartArea: false } } } }} />
}

export function ReturnBar() {
  return <Bar data={{ labels: ['Base Case','Upside Case','Stress Case'], datasets: [{ label: 'IRR (%)', data: [15,25,8], backgroundColor: ['#10b981','#667eea','#ef4444'] }] }} options={{ responsive: true, scales: { y: { beginAtZero: true, ticks: { callback: (v: any) => `${v}%` } } } }} />
}