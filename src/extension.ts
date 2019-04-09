// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as cp from 'child_process';

let commandOutput : vscode.OutputChannel;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
		console.log('Congratulations, your extension "Sura Flow - Salesforce" is now active!');
	/*vscode.languages.registerHoverProvider(
		'javascript',
		new class implements vscode.HoverProvider {
			provideHover(
				document: vscode.TextDocument,
				_position: vscode.Position,
				_token: vscode.CancellationToken
			): vscode.ProviderResult<vscode.Hover> {
				const args = [{ resourceUri: document.uri }];
				const stageCommandUri = vscode.Uri.parse(
					`command:ls?${encodeURIComponent(JSON.stringify(args))}`
				);
				const contents = new vscode.MarkdownString(`[List](${stageCommandUri})`);
				contents.isTrusted = true;
				return new vscode.Hover(contents);
			}
		}()
	);*/
	commandOutput = vscode.window.createOutputChannel('SuraFlow');
	context.subscriptions.push(commandOutput);
	  
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		let workspaceRoot = vscode.workspace.rootPath;
		const message = 'Execute Command';
		// Display a message box to the user
		let commandLine = 'sfdx force:org:list ';
		const value = vscode.window.showInputBox({ prompt: 'Comando a ejecutar ' })
		.then(value => {
			if (value !== null && value !== undefined) {
				commandLine = value;
				exec(commandLine, { cwd: workspaceRoot });
			}
		});
		vscode.window.showInformationMessage(message);
	});


	let disposableFeatureStart = vscode.commands.registerCommand('extension.featureStart', () => {
		// The code you place here will be executed every time your command is executed
		let workspaceRoot = vscode.workspace.rootPath;
		const message = 'Feature Branch Start';
		// Display a message box to the user
		let commandLine = 'git sfdx featureStart ';
		const value = vscode.window.showInputBox({ prompt: 'Nombre del Feature Branch' })
		.then(value => {
			if (value !== null && value !== undefined && value.trim().length > 0) {
				commandLine = commandLine + `${value}`;
				console.log('commandLine: ' + commandLine);
				exec(commandLine, { cwd: workspaceRoot });
			}else {
                vscode.window.showErrorMessage("ERROR: No ingreso el nombre del branch");
            }
		});
		vscode.window.showInformationMessage(message);
	});

	let disposableFeatureFinish = vscode.commands.registerCommand('extension.featureFinish', () => {
		// The code you place here will be executed every time your command is executed
		let workspaceRoot = vscode.workspace.rootPath;
		const message = 'Feature Branch Finish';
		// Display a message box to the user
		let commandLine = 'git sfdx featureFinish ';
		const value = vscode.window.showInputBox({ prompt: 'Mensaje del Commit' })
		.then(value => {
			if (value !== null && value !== undefined && value.trim().length > 0) {
				commandLine = commandLine + `"${value}"`;
				console.log('commandLine: ' + commandLine);
				exec(commandLine, { cwd: workspaceRoot });
			}else {
                vscode.window.showErrorMessage("ERROR: No ingreso el mensaje del commit");
            }
		});
		vscode.window.showInformationMessage(message);
		
	});

	let disposableFeatureRestart = vscode.commands.registerCommand('extension.featureRestart', () => {
		
		// The code you place here will be executed every time your command is executed
		let workspaceRoot = vscode.workspace.rootPath;
		const message = 'Restart Feature Branch';
		// Display a message box to the user
		let commandLine = 'git sfdx featureRestart ';
		const value = vscode.window.showInputBox({ prompt: 'Nombre del Feature Branch' })
		.then(value => {
			if (value !== null && value !== undefined && value.trim().length > 0) {
				commandLine = commandLine + `${value}`;
				console.log('commandLine: ' + commandLine);
				exec(commandLine, { cwd: workspaceRoot });
			}else {
                vscode.window.showErrorMessage("ERROR: No ingreso el nombre del branch");
            }
		});
		vscode.window.showInformationMessage(message);
	});

	let disposableFeatureCommit = vscode.commands.registerCommand('extension.featureCommit', () => {
		
		// The code you place here will be executed every time your command is executed
		let workspaceRoot = vscode.workspace.rootPath;
		const message = 'Commit Feature Branch';
		// Display a message box to the user
		let commandLine = 'git sfdx featureCommit ';
		const value = vscode.window.showInputBox({ prompt: 'Mensaje del Commit' })
		.then(value => {
			if (value !== null && value !== undefined && value.trim().length > 0) {
				commandLine = commandLine + `"${value}"`;
				console.log('commandLine: ' + commandLine);
				exec(commandLine, { cwd: workspaceRoot });
			}else {
                vscode.window.showErrorMessage("ERROR: No ingreso el mensaje del commit");
            }
		});
		vscode.window.showInformationMessage(message);
	});


	context.subscriptions.push(disposable);
	context.subscriptions.push(disposableFeatureStart);
	context.subscriptions.push(disposableFeatureFinish);
	context.subscriptions.push(disposableFeatureRestart);
	context.subscriptions.push(disposableFeatureCommit);
}

function exec(command: string, options: cp.ExecOptions): Promise<{ stdout: string; stderr: string }> {
	return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
		cp.exec(command, options, (error, stdout, stderr) => {
			commandOutput.clear();
			commandOutput.appendLine(`> Running command \`${command}\`...`);
			if (error) {
				reject({ error, stdout, stderr });
				commandOutput.appendLine(`> Result: ${stdout}`);
				commandOutput.appendLine(`> ERROR: ${stderr}`);
				vscode.window.showErrorMessage(`ERROR: ${stderr}`, 'Ver Output').then((action) => { commandOutput.show(); });
			}else{
				commandOutput.appendLine(`> Result: ${stdout}`);
				commandOutput.appendLine(`> Command \`${command}\` ran successfully.`);
				vscode.window.showInformationMessage("Termino Correctamente");
			}
			resolve({ stdout, stderr });
		});
	});
}

// this method is called when your extension is deactivated
export function deactivate() {}
