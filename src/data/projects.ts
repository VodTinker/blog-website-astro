// Project data configuration file
// Used to manage data for the project display page

export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	category: "web" | "mobile" | "desktop" | "other";
	techStack: string[];
	status: "completed" | "in-progress" | "planned";
	liveDemo?: string;
	sourceCode?: string;
	startDate: string;
	endDate?: string;
	featured?: boolean;
	tags?: string[];
	visitUrl?: string;
}

export const projectsData: Project[] = [
	{
		id: "portfolio-personal",
		title: "Portfolio Personal",
		description:
			"Mi portfolio personal desarrollado con tecnologías web modernas, donde muestro mis proyectos y habilidades como administrador de sistemas.",
		image: "",
		category: "web",
		techStack: ["HTML", "CSS", "JavaScript"],
		status: "completed",
		visitUrl: "https://vodtinker.dev",
		startDate: "2025-12-01",
		endDate: "2026-01-01",
		featured: true,
		tags: ["Portfolio", "Web", "Personal"],
	},
	{
		id: "infraestructura-correo-dns",
		title: "Infraestructura Autoalojada de Correo y DNS",
		description:
			"Infraestructura moderna de correo y DNS impulsada por Stalwart Mail Server (Rust). Incluye protocolos IMAP/IMAP/SMTP, DNS encriptado (DoH/DoQ), backups automatizados y seguridad avanzada con eficiencia óptima de memoria.",
		image: "",
		category: "other",
		techStack: ["Stalwart", "Rust", "IMAP", "SMTP", "DNS", "DoH", "DoQ", "Linux"],
		status: "completed",
		startDate: "2024-06-01",
		endDate: "2024-12-01",
		featured: true,
		tags: ["Infraestructura", "Mail Server", "DNS", "Seguridad"],
	},
	{
		id: "discord-bot-openai",
		title: "Discord Bot con OpenAI",
		description:
			"Un bot de Discord que utiliza la API de OpenAI para proporcionar respuestas interactivas y mantener conversaciones con los usuarios.",
		image: "",
		category: "other",
		techStack: ["Python", "Discord.py", "OpenAI"],
		status: "completed",
		sourceCode: "https://github.com/VodTinker",
		startDate: "2024-03-01",
		endDate: "2024-05-01",
		featured: true,
		tags: ["Bot", "Discord", "AI", "OpenAI"],
	},
	{
		id: "web-scraping-selenium",
		title: "Web Scraping con Selenium",
		description:
			"Scripts automatizados de web scraping utilizando Selenium para recopilar datos de diversos sitios web.",
		image: "",
		category: "other",
		techStack: ["Python", "Selenium", "Web Scraping"],
		status: "completed",
		startDate: "2024-01-01",
		endDate: "2024-02-01",
		tags: ["Automatización", "Scraping", "Python"],
	},
	{
		id: "automatizacion-notificaciones-aulas",
		title: "Automatización de notificaciones de aulas virtuales",
		description:
			"Sistema automatizado con n8n que monitorea las aulas virtuales en busca de nuevas notificaciones y envía alertas instantáneas a Discord cuando se detectan actualizaciones.",
		image: "",
		category: "other",
		techStack: ["n8n", "Discord", "Webhooks", "Automatización"],
		status: "completed",
		startDate: "2023-09-01",
		endDate: "2023-11-01",
		tags: ["Automatización", "n8n", "Discord", "Notificaciones"],
	},
];

// Get project statistics
export const getProjectStats = () => {
	const total = projectsData.length;
	const completed = projectsData.filter(
		(p) => p.status === "completed",
	).length;
	const inProgress = projectsData.filter(
		(p) => p.status === "in-progress",
	).length;
	const planned = projectsData.filter((p) => p.status === "planned").length;

	return {
		total,
		byStatus: {
			completed,
			inProgress,
			planned,
		},
	};
};

// Get projects by category
export const getProjectsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return projectsData;
	}
	return projectsData.filter((p) => p.category === category);
};

// Get featured projects
export const getFeaturedProjects = () => {
	return projectsData.filter((p) => p.featured);
};

// Get all tech stacks
export const getAllTechStack = () => {
	const techSet = new Set<string>();
	projectsData.forEach((project) => {
		project.techStack.forEach((tech) => {
			techSet.add(tech);
		});
	});
	return Array.from(techSet).sort();
};
