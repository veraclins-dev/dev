import {
	Hr,
	Img,
	Text,
	Link,
	Row,
	Column,
	type ImgProps,
} from '@react-email/components'
import { EmailSection } from '#app/components/emails/components/section'
import { getBaseURL } from '#app/utils/misc'

interface SocialIcon extends ImgProps {
	link: string
}

interface FooterProps {
	socialIcons?: SocialIcon[]
	footerLinks?: Array<{ href: string; label: string; isEmail?: boolean }>
	supportText?: string
	copyrightText?: string
}

const defaultSocialIcons: SocialIcon[] = [
	{
		alt: 'Linkedin',
		src: 'linkedin.png',
		width: 32,
		height: 32,
		link: '#',
		className: 'pr-[10px]',
	},
	{
		alt: 'X',
		src: 'x.png',
		width: 32,
		height: 32,
		link: '#',
		className: 'pr-[10px]',
	},
	{
		alt: 'Facebook',
		src: 'facebook.png',
		width: 32,
		height: 32,
		link: '#',
	},
]

const defaultFooterLinks = [
	{ href: 'privacy', label: 'Privacy Policy' },
	{ href: 'terms', label: 'Terms & Conditions' },
	{
		href: `mailto:${process.env.EMAIL_FROM || 'support@example.com'}`,
		label: process.env.EMAIL_FROM || 'support@example.com',
		isEmail: true,
	},
]

const SocialLinks = ({ socialIcons }: { socialIcons: SocialIcon[] }) => {
	const baseURL = getBaseURL()
	return (
		<td align="center">
			<Row className="table-cell w-full align-bottom" align="center">
				{socialIcons.map(({ alt, src, width, height, link, className }) => (
					<Column className={className} key={alt}>
						<Link href={link}>
							<Img
								alt={alt}
								src={`${baseURL}/${src}`}
								width={width}
								height={height}
							/>
						</Link>
					</Column>
				))}
			</Row>
		</td>
	)
}

const FooterLinks = ({
	mobile = false,
	footerLinks,
}: {
	mobile?: boolean
	footerLinks: Array<{ href: string; label: string; isEmail?: boolean }>
}) => {
	const baseURL = getBaseURL()
	return (
		<td align="center" className={mobile ? 'md:hidden' : 'hidden md:block'}>
			{mobile ? (
				footerLinks.map(({ label, href, isEmail }) => (
					<Text key={label} className="my-1">
						<Link
							href={isEmail ? href : `${baseURL}/${href}`}
							className="text-black underline"
						>
							{label}
						</Link>
					</Text>
				))
			) : (
				<Row className="table-cell w-full align-bottom text-sm" align="center">
					{footerLinks.map(({ label, href, isEmail }, idx) => (
						<>
							<Column key={label}>
								<Link
									href={isEmail ? href : `${baseURL}/${href}`}
									className="text-black underline"
								>
									{label}
								</Link>
							</Column>
							{idx < footerLinks.length - 1 && (
								<Column className="hidden px-[5px] md:block">&#9900;</Column>
							)}
						</>
					))}
				</Row>
			)}
		</td>
	)
}

const FooterTable = ({
	socialIcons,
	footerLinks,
	copyrightText,
}: {
	socialIcons: SocialIcon[]
	footerLinks: Array<{ href: string; label: string; isEmail?: boolean }>
	copyrightText: string
}) => (
	<table className="mx-auto w-full">
		<tr>
			<SocialLinks socialIcons={socialIcons} />
		</tr>
		<tr>
			<td align="center">
				<Text className="text-md mt-1 mb-2">{copyrightText}</Text>
			</td>
		</tr>
		<tr>
			<FooterLinks footerLinks={footerLinks} />
		</tr>
		<tr>
			<FooterLinks mobile footerLinks={footerLinks} />
		</tr>
	</table>
)

export const Footer = ({
	socialIcons = defaultSocialIcons,
	footerLinks = defaultFooterLinks,
	supportText,
	copyrightText = `© ${new Date().getFullYear()} ${process.env.APP_NAME || 'App'}. All rights reserved.`,
}: FooterProps = {}) => (
	<EmailSection className="text-center">
		{supportText && (
			<Text className="font-md">
				<strong>Need Help?</strong> {supportText}
			</Text>
		)}
		<Hr />
		<FooterTable
			socialIcons={socialIcons}
			footerLinks={footerLinks}
			copyrightText={copyrightText}
		/>
	</EmailSection>
)
