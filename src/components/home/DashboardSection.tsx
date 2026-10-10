import dashboard from "/images/DevFlow SaaS Dashboard Mockup.png"

const DashboardSection = () => {
    return (
        <section className="container mx-auto mb-16">
            <img
                src={dashboard}
                alt="Dashboard Mockup"
                className="w-full aspect-[4/3] lg:aspect-[16/8] object-cover object-top "
            />
        </section>
    )
}

export default DashboardSection