import Container from "./container";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
}: PageHeaderProps) {
  return (
    <section className="border-b border-neutral-200 py-20 md:py-28">
      <Container>
        {eyebrow && (
          <p className="mb-4 text-sm uppercase tracking-wider text-neutral-500">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl md:leading-[1.1]">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
