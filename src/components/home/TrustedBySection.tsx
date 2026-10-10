import oracleLogo from "@/assets/images/oracle-6-logo-svgrepo-com.svg";
import samsungLogo from "@/assets/images/samsung-1-logo-svgrepo-com.svg";
import netflixLogo from "@/assets/images/netflix-2-logo-svgrepo-com.svg";
import slackLogo from "@/assets/images/slack-logo-svgrepo-com.svg";
import lenovoLogo from "@/assets/images/lenovo-1-logo-svgrepo-com.svg";

const TrustedBySection = () => {
  return (
    <section>
        {/* Logos Section */}
        <div className="mt-16 lg:mt-24 pt-10 text-center animate-in fade-in duration-1000 delay-700">
          <p className="text-lg font-semibold text-foreground mb-4">Over 32k+ software businesses growing with Milestone</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24 hover:grayscale-0 transition-all duration-300">
            <img src={oracleLogo} alt="Oracle" className="h-20 md:h-28 object-contain" />
            <img src={netflixLogo} alt="Netflix" className="h-20 md:h-28 object-contain" />
            <img src={samsungLogo} alt="Samsung" className="h-20 md:h-28 object-contain" />
            <img src={slackLogo} alt="Slack" className="h-20 md:h-28 object-contain" />
            <img src={lenovoLogo} alt="Levi's" className="h-20 md:h-28 object-contain" />
          </div>
        </div>
    </section>
  )
}

export default TrustedBySection