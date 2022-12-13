import * as vscode from 'vscode';
import CSConfig from './config';
import { fetchCodeCompletionTexts } from './utils/fetchCodeCompletions';
import { debounce, join } from 'lodash';

const debouncedFetchCodeCompletionTexts = debounce(fetchCodeCompletionTexts, 2000);

export function activate(context: vscode.ExtensionContext) {

	const provider: vscode.CompletionItemProvider = {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		provideInlineCompletionItems: async (document, position, context, token) => {
			// Grab the api key from the extension's config
			const textBeforeCursor = document.getText();
			if (textBeforeCursor.trim() === "") {
				return { items: [] };
			}
			let last_x = "";
			let start:vscode.Position;
			let end:vscode.Position;
			let range:vscode.Range;

			for (let i = 0; i < 32; i++) {
				start = new vscode.Position(position.line - i, 0);
				end = position;
				range = new vscode.Range(start, end);
				last_x = document.getText(
					range
				);
				if (last_x.includes("def ")) {
					break;
				}
			}			

			// Check if user's state meets one of the trigger criteria
			if (CSConfig.SEARCH_PHARSE_END.includes(last_x[last_x.length - 1])) {
				let rs;

				try {
					// Fetch the code completion based on the text in the user's document
					rs = await fetchCodeCompletionTexts(last_x);
				} catch (err) {

					if (err instanceof Error) {
						vscode.window.showErrorMessage(err.toString());
					}
					return { items: [] };
				}


				if (rs == null) {
					return { items: [] };
				}

				// Add the generated code to the inline suggestion list
				const items: any[] = [];
				for (let i = 0; i < rs.completions.length; i++) {
					items.push({
						insertText: rs.completions[i],
						range: new vscode.Range(position.translate(0, rs.completions.length), position),
						trackingId: `snippet-${i}`,
					});
				}
				return { items };
			}
			return { items: [] };
		},
	};

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	vscode.languages.registerInlineCompletionItemProvider({ pattern: "**" }, provider);
}
