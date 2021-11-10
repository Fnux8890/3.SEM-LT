import { join } from "path";
import { promises, readFileSync, writeFileSync } from "fs";
import { platform } from "os";

/**
 * This method is used to insert at string into another string at a given index.
 * @param {String} original The original string
 * @param {Integer} index The index of where to insert the string
 * @param {String} string The string to insert
 * @returns A string with the given string inserted at index
 */
function insert(original, index, string) {
	if (index > 0) {
		return original.substring(0, index) + string + original.substr(index);
	}

	return string + original;
}
/**
 * Denne function har tilformål at asyncornt gennemgå en mappe og under mapper efter filer.
 * @param {String} dir The directory to go through
 */
async function* walk(dir) {
	for await (const d of await promises.opendir(dir)) {
		const entry = join(dir, d.name);
		if (d.isDirectory()) yield* await walk(entry);
		else if (d.isFile()) yield entry;
	}
}
//TODO should make the function to multiple function
export const insertNavbar = (req, res, next) => {
	if (req.method === "GET") {
		let afterPagePath = req.baseUrl.split("/");
		let currentFilePath;
		let matchFound = false;
		let folderSubLevel;
		(async () => {
			for await (const p of walk(
				join(__dirname, "..", "..", "..", "app", "views", "pages")
			)) {
				let currentFile;
				if (platform() === "win32") {
					currentFile = p.split("\\").pop().split(".").shift();
				} else {
					currentFile = p.split("/").pop().split(".").shift();
				}
				if (currentFile === afterPagePath[afterPagePath.length - 1]) {
					matchFound = true;
					let endPath;
					if (platform() === "win32") {
						endPath = p.split("\\");
					} else {
						endPath = p.split("/");
					}
					let j = endPath.indexOf("pages");
					for (let i = 0; i <= j; i++) {
						endPath.shift();
					}
					folderSubLevel = endPath.length - 1;
					currentFilePath = `${endPath.shift()}/${endPath.shift()}`;

					break;
				}
			}
		})()
			.then(() => {
				//TODO make better map handler
				if (afterPagePath[afterPagePath.length - 1].includes("map")) {
					return;
				}
				if (
					matchFound === false &&
					afterPagePath[afterPagePath.length - 1] !== "page"
				) {
					console.log(`AfterPagePath: ${afterPagePath}`);
					const err = new Error(
						"File does not exists under the views directory"
					);
					err.status = 404;
					next(err);
				}
				if (
					matchFound === true &&
					afterPagePath[afterPagePath.length - 1] !== "page" &&
					currentFilePath.includes("exercise") === false
				) {
					let file = join(
						__dirname,
						"../../../app",
						"views",
						"pages",
						`${currentFilePath}`
					);
					let pugFile = readFileSync(file, "utf-8");
					if (pugFile.indexOf("Navbar/navbar") === -1) {
						let insertNavbarString = ``;
						if (folderSubLevel >= 1) {
							for (let index = 0; index < folderSubLevel; index++) {
								insertNavbarString += `../`;
							}
							insertNavbarString += `Navbar/navbar\n        `;
						} else {
							insertNavbarString = `./Navbar/navbar\n        `;
						}
						pugFile = insert(
							pugFile,
							pugFile.indexOf("body") + "body".length + 9,
							`include ${insertNavbarString}`
						);
						writeFileSync(file, pugFile, "utf-8");
					}
				}
				next();
			})
			.catch((err) => {
				console.log(err.message);
			});
	}
};
