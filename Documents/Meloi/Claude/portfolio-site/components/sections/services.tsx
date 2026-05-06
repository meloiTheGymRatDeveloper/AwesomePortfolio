import { services } from "@/content/services";
import Container from "../container";

export default function Services() {
  return (
    <section id="services" className="border-t border-slate-800 py-20 md:py-28">
      <Container>
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-400">
            What I do
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-50 md:text-4xl">
            Services built for businesses that mean it.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col rounded-2xl bg-slate-800 p-6 ring-1 ring-slate-700"
            >
              <service.Icon size={22} className="mb-5 text-violet-400" />
              <h3 className="text-lg font-semibold text-slate-50">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {service.description}
              </p>
              <p className="mt-6 text-sm font-semibold text-violet-400">
                {service.startingPrice}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
