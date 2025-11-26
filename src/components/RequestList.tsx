import { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import SelectInput from 'ink-select-input';
import RequestDetailView from './RequestDetailView.js';
import { Request } from '../app.js';
import { COLORS, ICONS } from '../theme.js';

type RequestListProps = {
	requests: Request[];
	onBack: () => void;
};

export default function RequestList({ requests, onBack }: RequestListProps) {
	const [mode, setMode] = useState<'list' | 'detail'>('list');
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	useInput((input, key) => {
		if (mode === 'list' && (key.escape || key.return && requests.length === 0)) {
			onBack();
		}
	});

	const handleSelect = (item: { value: string }) => {
		const index = parseInt(item.value);
		setSelectedIndex(index);
		setMode('detail');
	};

	const handleBack = () => {
		if (mode === 'detail') {
			setMode('list');
			setSelectedIndex(null);
		} else {
			onBack();
		}
	};

	// Show detail view
	if (mode === 'detail' && selectedIndex !== null && requests[selectedIndex]) {
		return <RequestDetailView request={requests[selectedIndex]} onBack={handleBack} />;
	}

	// Format request label for list
	const formatRequestLabel = (req: Request, index: number): string => {
		const actionIcon = req.action === 'ADD' ? ICONS.add : ICONS.modify;
		const typeIcon = req.type === 'TEAM' ? ICONS.team : ICONS.repo;
		const name = req.data.name || 'Unknown';
		return `${actionIcon} ${typeIcon} ${name}`;
	};

	// Convert requests to SelectInput items
	const items = requests.map((req, idx) => ({
		label: formatRequestLabel(req, idx),
		value: idx.toString()
	}));

	return (
		<Box flexDirection="column" borderStyle="round" padding={1}>
			{/* Header */}
			<Box marginBottom={1}>
				<Text bold underline color={COLORS.highlight}>
					PENDING REQUESTS ({requests.length})
				</Text>
			</Box>

			{/* List or Empty State */}
			{requests.length === 0 ? (
				<Box flexDirection="column">
					<Text italic dimColor>No requests found.</Text>
					<Box marginTop={1}>
						<Text dimColor>Press Enter or Esc to go back</Text>
					</Box>
				</Box>
			) : (
				<Box flexDirection="column">
					<SelectInput items={items} onSelect={handleSelect} />
					<Box marginTop={1}>
						<Text dimColor>↵ Enter to view details • Esc to back</Text>
					</Box>
				</Box>
			)}
		</Box>
	);
}
