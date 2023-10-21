type IndexListPageProps = {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const IndexListPage = ({ title, description, children }: IndexListPageProps) => (
  <div className="flex flex-col gap-2 md:max-w-prose">
    <h1>{title}</h1>
    <p>{description}</p>
    {children}
  </div>
)