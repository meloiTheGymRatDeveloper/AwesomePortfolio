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
    <section className="border-b border-slate-800 py-20 md:py-28">
      <Container>
        {eyebrow && (
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-violet-400">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-slate-50 md:text-5xl md:leading-[1.1]">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
