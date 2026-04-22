/* MagicMirror secure config example
 * - Secrets loaded from environment variables.
 * - Network access hardened by default.
 * - Duplicates and inconsistent intervals cleaned up.
 */
function env(name, fallback = "") {
	return process.env[name] || fallback;
}

const weatherBase = {
	weatherProvider: "openweathermap",
	lat: 45.2641,
	lon: 9.1252,
	apiKey: env("MM_OPENWEATHER_API_KEY"),
	updateInterval: 60 * 60 * 1000,
	animationSpeed: 1000,
	showWindDirection: true,
	showWindDirectionAsArrow: true,
	colored: true
};

let config = {
	address: env("MM_ADDRESS", "localhost"),
	port: Number(env("MM_PORT", "8181")),
	basePath: "/",
	ipWhitelist: env(
		"MM_IP_WHITELIST",
		"127.0.0.1,::ffff:127.0.0.1,::1"
	).split(",").map((ip) => ip.trim()).filter(Boolean),

	useHttps: false,
	httpsPrivateKey: "",
	httpsCertificate: "",

	language: "it",
	locale: "it-IT",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"],
	timeFormat: 24,
	units: "metric",

	modules: [
		{ module: "alert" },
		{ module: "updatenotification", position: "bottom_bar" },
		{
			module: "clock",
			position: "top_bar",
			config: {
				displayType: "digital",
				showDate: true,
				showWeek: false
			}
		},
		{
			module: "calendar",
			header: "I Nostri Impegni",
			position: "lower_third",
			config: {
				calendars: [
					{
						symbol: "calendar-check",
						url: "https://calendar.google.com/calendar/ical/591lmdtrqjku2utqoi22lsklrs%40group.calendar.google.com/public/basic.ics",
						color: "#FF6B6B"
					},
					{
						symbol: "⚽",
						url: "https://calendar.google.com/calendar/ical/4f43af602dae2a292b377ecd0fcdae4fc073149c6c004bfffab13f44c698bfdd%40group.calendar.google.com/public/basic.ics",
						color: "#0068A8"
					}
				],
				maximumEntries: 8,
				maximumNumberOfDays: 7,
				displaySymbol: true,
				defaultSymbol: "calendar",
				showLocation: true,
				displayRepeatingCountTitle: true,
				dateFormat: "DD/MM HH:mm",
				dateEndFormat: "HH:mm",
				timeFormat: "absolute",
				getRelative: 0,
				urgency: 0,
				fadePoint: 0.25,
				fade: true,
				updateInterval: 15 * 60 * 1000,
				showEnd: true,
				colored: true,
				coloredSymbolOnly: false,
				tableClass: "medium",
				broadcastEvents: true,
				broadcastPastEvents: false,
				nextDaysRelative: true,
				hidePrivate: false,
				excludedEvents: [],
				sliceMultiDayEvents: true,
				showTimeToday: true
			}
		},
		{
			module: "weather",
			position: "top_right",
			config: {
				...weatherBase,
				type: "current",
				showFeelsLike: true,
				showHumidity: true,
				degreeLabel: true
			}
		},
		{
			module: "weather",
			position: "top_right",
			config: {
				...weatherBase,
				type: "hourly",
				maxNumberOfDays: 2,
				showPrecipitationAmount: true,
				updateInterval: 90 * 60 * 1000
			}
		},
		{
			module: "weather",
			position: "top_right",
			config: {
				...weatherBase,
				type: "forecast",
				maxNumberOfDays: 7,
				showPrecipitationAmount: true,
				showFeelsLike: true,
				showHumidity: true,
				updateInterval: 2 * 60 * 60 * 1000,
				fade: false
			}
		},
		{
			module: "MMM-MenuScuola",
			position: "middle_center",
			config: {
				startDate: "2025-11-24",
				startWeek: 4,
				updateInterval: 60 * 60 * 1000
			}
		},
		{
			module: "MMM-Bring",
			position: "top_left",
			config: {
				email: env("MM_BRING_EMAIL"),
				password: env("MM_BRING_PASSWORD"),
				updateInterval: 5,
				listName: "Spesa",
				showListName: true,
				locale: "it-IT",
				maxItems: 15,
				customTitle: "Lista della Spesa"
			}
		}
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
