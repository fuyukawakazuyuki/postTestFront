export default function BoardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex">
				{children}
		</section>
	);
}
