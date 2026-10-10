import DashboardSection from "@/components/home/DashboardSection"
import DevFlowAbout from "@/components/home/DevFlowAbout"
import FeaturesShowcase from "@/components/home/FeatureShowcase"
import FeaturesSection from "@/components/home/FeaturesSection"
import { Hero } from "@/components/home/Hero"
import IntegrationsSection from "@/components/home/IntegrationsSection"
import SpecialFeatureSection from "@/components/home/SpecialFeatureSection"
import AnalyticsBannerSection from "@/components/home/AnalyticsBannerSection"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <DashboardSection/>
      <FeaturesSection/>
      <FeaturesShowcase/>
      <DevFlowAbout/>
      <IntegrationsSection/>
      <SpecialFeatureSection/>
      <AnalyticsBannerSection/>
    </main>
  )
}
