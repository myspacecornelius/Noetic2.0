import dynamic from 'next/dynamic'

const DynamicNeuralMapper = dynamic(
  () => import('./NeuralMarketMapper'),
  {
    ssr: false,
    loading: () => (
      <div className="neural-market-mapper loading">
        <div className="neural-loading">
          <div className="loading-pulse"></div>
          <h3>Loading Neural Network...</h3>
          <p>Initializing 3D CNS market visualization</p>
        </div>
      </div>
    )
  }
)

export default DynamicNeuralMapper