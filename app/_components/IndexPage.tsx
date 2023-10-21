type IndexPageProps = {
  children: React.ReactNode;
}

export const IndexPage = ({ children }: IndexPageProps) => (
  <div className="flex flex-col gap-2 md:max-w-prose">
    {children}
  </div>
)