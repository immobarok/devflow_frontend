import DashboardSection from "@/components/home/DashboardSection"
import DevFlowAbout from "@/components/home/DevFlowAbout"
import FeaturesShowcase from "@/components/home/FeatureShowcase"
import FeaturesSection from "@/components/home/FeaturesSection"
import { Hero } from "@/components/home/Hero"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <DashboardSection/>
      <FeaturesSection/>
      <FeaturesShowcase/>
      <DevFlowAbout/>
    </main>
  )
}
