import { AppSeo, images, Routes } from "@/constants";
import { Button, Multimedia, Typography } from "@/library";
import { stylesConfig } from "@/utils";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import styles from "./styles.module.scss";

interface ILandingPageHeroProps {}

const classes = stylesConfig(styles, "landing-page-hero");

export const LandingPageHero: React.FC<ILandingPageHeroProps> = () => {
	const router = useRouter();
	return (
		<section className={classes("")}>
			<div
				className={classes("-container")}
				style={{
					backgroundImage: `url(${images.bgLandscape})`,
				}}
			>
				<div className={classes("-logo")}>
					<Multimedia.Image
						className={classes("-container__logo")}
						src={images.favicon}
						alt="logo"
						width={512}
						height={512}
					/>
				</div>
				<div className={classes("-content")}>
					<Typography
						className={classes("-container__heading")}
						size="head-1"
						weight="bold"
						as="h1"
					>
						{AppSeo.title} ✨
					</Typography>
					<Typography
						className={classes("-container__subheading")}
						size="xl"
						as="p"
					>
						Blend in the fun and let us handle your expenses.
					</Typography>
					<Button
						size="large"
						icon={<AiOutlineArrowRight />}
						iconPosition="right"
						onClick={() => {
							void router.push(Routes.LOGIN);
						}}
					>
						Get Started Today
					</Button>
				</div>
			</div>
		</section>
	);
};
