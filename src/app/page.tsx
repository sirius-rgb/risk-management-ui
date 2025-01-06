import { Container } from "@/components/layout"
import Header from "@/components/layout/header"
import Feature from "@/components/section/feature"
import Hero from "@/components/section/hero"
import Scrolling from "@/components/section/scrolling"

export default function Page() {
  return (
    <Container>
      <Header />
      <Hero />
      <Feature />
      <Scrolling />
    </Container>
  )
}
