import { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import DiffViewer from './DiffViewer.js';
import { Team, Repository } from '../app.js';
import { COLORS, BORDERS, ICONS } from '../theme.js';

type ConfirmationSummaryProps = {
	type: 'TEAM' | 'REPO';
	action: 'ADD' | 'MODIFY';
	data: Team | Repository;
	previousData?: Team | Repository;
	onConfirm: () => void;
	onCancel: () => void;
};

export default function ConfirmationSummary({
	type,
	action,
	data,
	previousData,
	onConfirm,
	onCancel,
}: ConfirmationSummaryProps) {
	const [selected, setSelected] = useState<'confirm' | 'cancel'>('confirm');
	const [pulse, setPulse] = useState(0);

	// Animated border pulse effect
	useEffect(() => {
		const timer = setInterval(() => {
			setPulse(p => (p + 1) % 2);
		}, 500);
		return () => clearInterval(timer);
	}, []);

	useInput((input, key) => {
		if (key.leftArrow || key.rightArrow) {
			setSelected(s => s === 'confirm' ? 'cancel' : 'confirm');
		}
		if (key.return) {
			if (selected === 'confirm') {
				onConfirm();
			} else {
				onCancel();
			}
		}
		if (key.escape) {
			onCancel();
		}
	});

	const borderColor = pulse === 0 ? COLORS.primary : COLORS.info;
	const actionColor = action === 'ADD' ? COLORS.add : COLORS.modify;
	const actionText = `${action} ${type}`;

	return (
		<Box flexDirection="column" padding={1}>
			<Box
				borderStyle={BORDERS.emphasis as any}
				borderColor={borderColor}
				padding={1}
				flexDirection="column"
			>
				{/* Header */}
				<Box justifyContent="center" marginBottom={1}>
					<Text bold color={COLORS.warning}>
						⚡ ACTION CONFIRMATION
					</Text>
				</Box>

				{/* Action Badge */}
				<Box justifyContent="center" marginBottom={1}>
					<Text bold color={actionColor}>
						[{actionText}]
					</Text>
				</Box>

				{/* Divider */}
				<Box marginBottom={1}>
					<Text dimColor>{'─'.repeat(50)}</Text>
				</Box>

				{/* Changes Section - Most Prominent */}
				<Box flexDirection="column" marginBottom={2}>
					<Text bold underline color={COLORS.highlight}>
						{action === 'ADD' ? 'NEW DATA:' : 'CHANGES:'}
					</Text>
					<Box marginTop={1}>
						<DiffViewer
							type={type}
							action={action}
							data={data}
							previousData={previousData}
						/>
					</Box>
				</Box>

				{/* Divider */}
				<Box marginBottom={1}>
					<Text dimColor>{'─'.repeat(50)}</Text>
				</Box>

				{/* Confirmation Buttons */}
				<Box justifyContent="center" gap={4}>
					<Text
						bold
						color={selected === 'confirm' ? COLORS.success : COLORS.dim}
						backgroundColor={selected === 'confirm' ? 'green' : undefined}
					>
						{' '}{ICONS.confirm} Confirm{' '}
					</Text>
					<Text
						bold
						color={selected === 'cancel' ? COLORS.error : COLORS.dim}
						backgroundColor={selected === 'cancel' ? 'red' : undefined}
					>
						{' '}{ICONS.cancel} Cancel{' '}
					</Text>
				</Box>

				{/* Helper Text */}
				<Box marginTop={1} justifyContent="center">
					<Text dimColor>
						← → to navigate • Enter to confirm • Esc to cancel
					</Text>
				</Box>
			</Box>
		</Box>
	);
}
