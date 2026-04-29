import { services } from "@/content/services";
import Container from "../container";

export default function Services() {
  return (
    <section id="services" className="border-t border-neutral-200 py-20 md:py-28">
      <Container>
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm uppercase tracking-wider text-neutral-500">
            What I do
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            Services built for small teams that ship.
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="flex flex-col">
              <service.Icon size={22} className="mb-5 text-neutral-900" />
              <h3 className="text-lg font-semibold text-neutral-900">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {service.description}
              </p>
              <p className="mt-6 text-sm font-medium text-neutral-900">
                {service.startingPrice}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
