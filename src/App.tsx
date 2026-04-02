import { MejoravitPage } from "./features/mejoravit/components/MejoravitPage"
import { MejoravitProvider } from "./features/mejoravit/context/MejoravitContext"




function App() {


  return (
    <MejoravitProvider>
      <MejoravitPage />

    </MejoravitProvider>
  )
}

export default App
