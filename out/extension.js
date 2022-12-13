"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const config_1 = require("./config");
const fetchCodeCompletions_1 = require("./utils/fetchCodeCompletions");
const lodash_1 = require("lodash");
const debouncedFetchCodeCompletionTexts = (0, lodash_1.debounce)(fetchCodeCompletions_1.fetchCodeCompletionTexts, 2000);
function activate(context) {
    const provider = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        provideInlineCompletionItems: (document, position, context, token) => __awaiter(this, void 0, void 0, function* () {
            // Grab the api key from the extension's config
            const textBeforeCursor = document.getText();
            if (textBeforeCursor.trim() === "") {
                return { items: [] };
            }
            let last_x = "";
            let start;
            let end;
            let range;
            for (let i = 0; i < 32; i++) {
                start = new vscode.Position(position.line - i, 0);
                end = position;
                range = new vscode.Range(start, end);
                last_x = document.getText(range);
                if (last_x.includes("def ")) {
                    break;
                }
            }
            // Check if user's state meets one of the trigger criteria
            if (config_1.default.SEARCH_PHARSE_END.includes(last_x[last_x.length - 1])) {
                let rs;
                try {
                    // Fetch the code completion based on the text in the user's document
                    rs = yield (0, fetchCodeCompletions_1.fetchCodeCompletionTexts)(last_x);
                }
                catch (err) {
                    if (err instanceof Error) {
                        vscode.window.showErrorMessage(err.toString());
                    }
                    return { items: [] };
                }
                if (rs == null) {
                    return { items: [] };
                }
                // Add the generated code to the inline suggestion list
                const items = [];
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
        }),
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    vscode.languages.registerInlineCompletionItemProvider({ pattern: "**" }, provider);
}
exports.activate = activate;
