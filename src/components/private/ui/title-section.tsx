import { Paragraph } from "./paragraph"
import { Title } from "./title"

interface TitleSectionProps {
	title: string
	paragraph: string
}

export function TitleSection({ title, paragraph }: TitleSectionProps) {
	return (
		<div className="flex flex-col gap-2">
			<Title>{title}</Title>
			<Paragraph>{paragraph}</Paragraph>
		</div>
	)
}
