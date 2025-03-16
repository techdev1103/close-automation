// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <section className="w-full h-full overflow-auto">{children}</section>;
}
