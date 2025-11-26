import { Box, Text, useInput } from 'ink';
import DiffViewer from './DiffViewer.js';
import { Request } from '../app.js';
import { COLORS, BORDERS, ICONS } from '../theme.js';

type RequestDetailViewProps = {
	request: Request;
	onBack: () => void;
};

export default function RequestDetailView({ request, onBack }: RequestDetailViewProps) {
	useInput((input, key) => {
		if (key.escape || key.return) {
			onBack();
		}
	});

	const actionColor = request.action === 'ADD' ? COLORS.add : COLORS.modify;
	const actionIcon = request.action === 'ADD' ? ICONS.add : ICONS.modify;

	// Format timestamp
	const timestamp = request.createdAt instanceof Date
		? request.createdAt.toLocaleString()
		: new Date(request.createdAt).toLocaleString();

	return (
		<Box flexDirection="column" padding={1}>
			<Box
				borderStyle={BORDERS.primary as any}
				borderColor={actionColor}
				padding={1}
				flexDirection="column"
			>
				{/* Header */}
				<Box justifyContent="center" marginBottom={1}>
					<Text bold underline color={COLORS.highlight}>
						REQUEST DETAILS
					</Text>
				</Box>

				{/* Metadata */}
				<Box flexDirection="column" marginBottom={1}>
					<Text>
						<Text dimColor>ID: </Text>
						<Text>{request.id}</Text>
					</Text>
					<Text>
						<Text dimColor>Status: </Text>
						<Text color={COLORS.pending}>[{request.status}]</Text>
					</Text>
					<Text>
						<Text dimColor>Type: </Text>
						<Text>{request.type}</Text>
					</Text>
					<Text>
						<Text dimColor>Action: </Text>
						<Text color={actionColor}>{actionIcon} {request.action}</Text>
					</Text>
					<Text>
						<Text dimColor>Created: </Text>
						<Text>{timestamp}</Text>
					</Text>
				</Box>

				{/* Divider */}
				<Box marginY={1}>
					<Text dimColor>{'─'.repeat(50)}</Text>
				</Box>

				{/* Changes */}
				<Box flexDirection="column">
					<Box marginBottom={1}>
						<Text bold underline color={COLORS.highlight}>
							{request.action === 'ADD' ? 'DATA:' : 'CHANGES:'}
						</Text>
					</Box>
					<DiffViewer
						type={request.type}
						action={request.action}
						data={request.data}
						previousData={request.previousData}
					/>
				</Box>

				{/* Footer */}
				<Box marginTop={2} justifyContent="center">
					<Text dimColor>Press Esc or Enter to go back</Text>
				</Box>
			</Box>
		</Box>
	);
}
