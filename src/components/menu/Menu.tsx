"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Importing GSAP specifically
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import "./menu.css";
import SplitType from "split-type";

// Define the structure for the links
interface MenuLink {
	label: string;
	path: string;
}

// Menu Links Array
const menuLinks: MenuLink[] = [
	{ label: "Home", path: "/" },
	{ label: "Work", path: "/work" },
	{ label: "About", path: "/about" },
	{ label: "Contact", path: "/contact" },
	{ label: "Lab", path: "/lab" },
];

export default function Menu() {
	const container = useRef(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const tl = useRef(gsap.timeline({ paused: true }));

	function toggleMenu() {
		setIsMenuOpen(!isMenuOpen);
	}

	useGSAP(
		() => {
			const split = new SplitType(".menu-link-item-holder", {
				types: "lines,chars",
			});
			gsap.set(split.chars, { y: 75 });

			tl.current = gsap
				.timeline({ paused: true })
				.to(".menu-overlay", {
					duration: 1.25,
					clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
					ease: "power4.inOut",
				})
				.to(split.chars, {
					duration: 1,
					y: 0,
					stagger: 0.025,
					ease: "power4.out",
					delay: -0.75,
				});

			return () => {
				split.revert();
			};
		},
		{ scope: container }
	);

	useEffect(() => {
		if (isMenuOpen) {
			tl.current.play();
		} else {
			tl.current.reverse();
		}
	}, [isMenuOpen]);

	return (
		<div className="menu-container" ref={container}>
			<div className="menu-bar">
				<div className="menu-logo">
					<Link href="/">Indra Mpd</Link>
				</div>
				<div className="menu-open" onClick={toggleMenu}>
					<p>Menu</p>
				</div>
			</div>
			<div className="menu-overlay">
				<div className="menu-overlay-bar">
					<div className="menu-logo">
						<Link href="/">Indra Mpd</Link>
					</div>
					<div className="menu-close" onClick={toggleMenu}>
						<p>Close</p>
					</div>
				</div>
				<div className="menu-close-icon" onClick={toggleMenu}>
					<p>&#x2715;</p>
				</div>
				<div className="menu-copy">
					<div className="menu-links">
						{menuLinks.map((link, index) => (
							<div className="menu-link-item" key={index}>
								<div
									className="menu-link-item-holder"
									onClick={toggleMenu}
								>
									<Link href={link.path}>{link.label}</Link>
								</div>
							</div>
						))}
					</div>
					<div className="menu-info">
						<div className="menu-info-col">
							<Link href="#">Instagram &#8599;</Link>
							<Link href="#">Facebook &#8599;</Link>
							<Link href="#">LinkedIn &#8599;</Link>
						</div>
						<div className="menu-info-col">
							<Link href="#">indampd21@gmail.com</Link>
							<Link href="#">+62 812 3456 7890</Link>
						</div>
					</div>
				</div>
				<div className="menu-preview">
					<p>View Showreel</p>
				</div>
			</div>
		</div>
	);
}
