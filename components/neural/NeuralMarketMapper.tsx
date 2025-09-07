'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import AIControlPanel, { AISettings } from './ai/AIControlPanel'
import InsightsSidebar from './ai/InsightsSidebar'
import { ConnectionPredictionEngine, ConnectionPrediction } from '../../lib/ai/prediction-engine'
import { AnomalyDetector, Alert } from '../../lib/ai/anomaly-detector'
import { MarketAnalyzer, MarketHealth } from '../../lib/ai/market-analyzer'

// Dynamic imports for Three.js to prevent SSR issues
let THREE: any = null

interface NeuralMarketMapperProps {
  className?: string
}

export default function NeuralMarketMapper({ className = '' }: NeuralMarketMapperProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<any>(null)
  const rendererRef = useRef<any>(null)
  const animationFrameRef = useRef<number>()
  
  // Three.js loading state
  const [threeLoaded, setThreeLoaded] = useState(false)
  const [loadingError, setLoadingError] = useState<string | null>(null)
  
  // AI state
  const [aiSettings, setAiSettings] = useState<AISettings>({
    predictions: { 
      enabled: true, 
      timeHorizon: '6M', 
      minProbability: 50,
      showGhostSynapses: true 
    },
    anomalies: { 
      enabled: true, 
      sensitivity: 'medium', 
      realTimeAlerts: true,
      alertTypes: []
    },
    display: {
      showProbabilities: true,
      animateAlerts: true,
      heatmapIntensity: 0.7
    }
  })
  
  // AI data state
  const [predictions, setPredictions] = useState<ConnectionPrediction[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [marketHealth, setMarketHealth] = useState<MarketHealth>({
    overall: 72,
    sectors: {},
    riskFactors: [],
    opportunities: [],
    volatility: 'medium',
    networkDensity: 0.34,
    connectivityScore: 7.2
  })
  const [insights, setInsights] = useState<string[]>([])
  
  // UI state
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize AI engines
  const [predictionEngine] = useState(() => new ConnectionPredictionEngine())
  const [anomalyDetector] = useState(() => new AnomalyDetector())
  const [marketAnalyzer] = useState(() => new MarketAnalyzer())

  // Load Three.js dynamically on client-side only
  useEffect(() => {
    let mounted = true
    
    const loadThreeJS = async () => {
      try {
        const threeModule = await import('three' as any)
        if (mounted) {
          THREE = threeModule
          setThreeLoaded(true)
        }
      } catch (error) {
        console.error('Failed to load Three.js:', error)
        if (mounted) {
          setLoadingError('Failed to load 3D visualization library')
        }
      }
    }
    
    loadThreeJS()
    
    return () => {
      mounted = false
    }
  }, [])

  // Initialize 3D scene
  const initializeScene = useCallback(() => {
    if (!THREE || !mountRef.current || isInitialized) return

    const container = mountRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Create scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0f0f12) // Match --bg color
    sceneRef.current = scene

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(0, 0, 50)

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create neural network nodes (companies)
    const nodeGeometry = new THREE.SphereGeometry(1.5, 16, 16)
    const nodes: any[] = []
    
    // Company positions in 3D space
    const companies = [
      { name: 'NeuroTech Solutions', sector: 'neurodiagnostics', pos: [-15, 10, -5] },
      { name: 'BrainWave Diagnostics', sector: 'medical_devices', pos: [10, -8, 8] },
      { name: 'SynapseInc', sector: 'digital_health', pos: [-8, -12, 0] },
      { name: 'Neural Dynamics', sector: 'therapeutics', pos: [15, 5, -10] },
      { name: 'BrainTech Corp', sector: 'neurodiagnostics', pos: [0, 15, 5] },
      { name: 'MindBridge AI', sector: 'digital_health', pos: [-12, 0, 12] },
      { name: 'NeuroVision Systems', sector: 'medical_devices', pos: [8, -15, -3] },
      { name: 'Cognitive Therapeutics', sector: 'therapeutics', pos: [-5, 8, -8] }
    ]

    // Color coding by sector
    const sectorColors = {
      neurodiagnostics: 0x667eea, // Primary blue
      medical_devices: 0x22c55e,  // Success green  
      digital_health: 0x8b5cf6,   // Purple
      therapeutics: 0xf59e0b      // Warning amber
    }

    companies.forEach((company, index) => {
      const material = new THREE.MeshBasicMaterial({ 
        color: sectorColors[company.sector as keyof typeof sectorColors] || 0x667eea
      })
      const node = new THREE.Mesh(nodeGeometry, material)
      node.position.set(...company.pos)
      node.userData = { company: company.name, sector: company.sector, index }
      
      scene.add(node)
      nodes.push(node)

      // Add subtle glow effect
      const glowGeometry = new THREE.SphereGeometry(2, 16, 16)
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: sectorColors[company.sector as keyof typeof sectorColors] || 0x667eea,
        transparent: true,
        opacity: 0.1
      })
      const glow = new THREE.Mesh(glowGeometry, glowMaterial)
      glow.position.copy(node.position)
      scene.add(glow)
    })

    // Create connections (synapses) between related companies
    const connections = [
      [0, 4], // NeuroTech <-> BrainTech (both neurodiagnostics)
      [1, 6], // BrainWave <-> NeuroVision (both medical devices)
      [2, 5], // SynapseInc <-> MindBridge (both digital health)
      [3, 7], // Neural Dynamics <-> Cognitive (both therapeutics)
      [0, 1], // Cross-sector connections
      [2, 3],
      [4, 6],
      [1, 3]
    ]

    const lineGeometry = new THREE.BufferGeometry()
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x27272a, // --border color
      transparent: true,
      opacity: 0.3
    })

    connections.forEach(([startIdx, endIdx]) => {
      const startPos = nodes[startIdx].position
      const endPos = nodes[endIdx].position
      
      const points = [startPos, endPos]
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(geometry, lineMaterial)
      scene.add(line)
    })

    // Add ambient lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4)
    directionalLight.position.set(10, 10, 10)
    scene.add(directionalLight)

    // Camera controls (basic orbit)
    let mouseX = 0
    let mouseY = 0
    let targetRotationX = 0
    let targetRotationY = 0
    
    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - width / 2) * 0.001
      mouseY = (event.clientY - height / 2) * 0.001
      targetRotationX = mouseY * 0.5
      targetRotationY = mouseX * 0.5
    }
    
    container.addEventListener('mousemove', onMouseMove, false)

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)
      
      // Smooth camera rotation
      camera.position.x += (Math.sin(targetRotationY) * 50 - camera.position.x) * 0.02
      camera.position.z += (Math.cos(targetRotationY) * 50 - camera.position.z) * 0.02
      camera.position.y += (targetRotationX * 30 - camera.position.y) * 0.02
      camera.lookAt(0, 0, 0)

      // Animate node glow based on AI activity
      nodes.forEach((node, index) => {
        const baseScale = 1
        const pulseScale = Math.sin(Date.now() * 0.003 + index) * 0.1 + 1
        node.scale.setScalar(baseScale * pulseScale)
      })

      renderer.render(scene, camera)
    }
    
    animate()
    setIsInitialized(true)

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return
      
      const newWidth = mountRef.current.clientWidth
      const newHeight = mountRef.current.clientHeight
      
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
    
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousemove', onMouseMove, false)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isInitialized])

  // Initialize scene when Three.js loads
  useEffect(() => {
    if (threeLoaded && !loadingError) {
      initializeScene()
    }
  }, [threeLoaded, loadingError, initializeScene])

  // Load AI data
  useEffect(() => {
    const loadAIData = async () => {
      try {
        // Generate predictions
        const newPredictions = predictionEngine.predictConnections([], aiSettings.predictions.timeHorizon)
        setPredictions(newPredictions.filter(p => p.probability >= aiSettings.predictions.minProbability))
        
        // Detect anomalies
        const newAlerts = anomalyDetector.detectAnomalies()
        setAlerts(newAlerts)
        
        // Analyze market health
        const health = marketAnalyzer.analyzeMarketHealth()
        setMarketHealth(health)
        
        // Generate insights
        const newInsights = marketAnalyzer.generateInsights(health)
        setInsights(newInsights)
      } catch (error) {
        console.error('Failed to load AI data:', error)
      }
    }
    
    loadAIData()
  }, [aiSettings, predictionEngine, anomalyDetector, marketAnalyzer])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (rendererRef.current && mountRef.current) {
        try {
          mountRef.current.removeChild(rendererRef.current.domElement)
        } catch (error) {
          // Element might already be removed
        }
      }
    }
  }, [])

  if (loadingError) {
    return (
      <div className={`neural-market-mapper error ${className}`}>
        <div className="neural-error">
          <h3>🚨 Visualization Error</h3>
          <p>{loadingError}</p>
          <button 
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Retry Loading
          </button>
        </div>
      </div>
    )
  }

  if (!threeLoaded) {
    return (
      <div className={`neural-market-mapper loading ${className}`}>
        <div className="neural-loading">
          <div className="loading-pulse"></div>
          <h3>Loading Neural Network...</h3>
          <p>Initializing 3D CNS market visualization</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`neural-market-mapper ${className}`}>
      {/* 3D Canvas */}
      <div ref={mountRef} className="neural-canvas" />
      
      {/* AI Control Panel */}
      <AIControlPanel 
        settings={aiSettings}
        onSettingsChange={setAiSettings}
      />
      
      {/* Insights Toggle */}
      <button 
        onClick={() => setSidebarVisible(!sidebarVisible)}
        className="insights-toggle"
        aria-label={sidebarVisible ? 'Hide AI insights' : 'Show AI insights'}
      >
        🧠 AI Insights
        {alerts.filter(a => a.severity === 'high' || a.severity === 'critical').length > 0 && (
          <span className="alert-badge">
            {alerts.filter(a => a.severity === 'high' || a.severity === 'critical').length}
          </span>
        )}
      </button>
      
      {/* Insights Sidebar */}
      <InsightsSidebar
        predictions={predictions}
        alerts={alerts}
        marketHealth={marketHealth}
        insights={insights}
        isVisible={sidebarVisible}
        onToggle={() => setSidebarVisible(!sidebarVisible)}
      />
      
      {/* Status Indicator */}
      <div className="neural-status">
        <div className="status-indicators">
          <div className={`status-dot predictions ${aiSettings.predictions.enabled ? 'active' : 'inactive'}`} 
               title="Prediction Engine" />
          <div className={`status-dot anomalies ${aiSettings.anomalies.enabled ? 'active' : 'inactive'}`} 
               title="Anomaly Detection" />
          <div className={`status-dot network ${isInitialized ? 'active' : 'inactive'}`} 
               title="Neural Network" />
        </div>
      </div>
    </div>
  )
}