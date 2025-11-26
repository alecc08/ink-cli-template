import { Box, Text } from 'ink';
import { Team, Repository } from '../app.js';
import { computeDiff, getFieldsForType, formatFieldName, formatFieldValue } from '../utils/diffUtils.js';
import { COLORS, ICONS } from '../theme.js';

type DiffViewerProps = {
	type: 'TEAM' | 'REPO';
	action: 'ADD' | 'MODIFY';
	data: Team | Repository;
	previousData?: Team | Repository;
	compact?: boolean;
};

export default function DiffViewer({ type, action, data, previousData, compact = false }: DiffViewerProps) {
	const fields = getFieldsForType(type);
	const changes = action === 'MODIFY' && previousData
		? computeDiff(previousData, data, fields)
		: fields.map(field => ({ field, value: (data as any)[field], unchanged: false }));

	const renderFieldChange = (change: any) => {
		const fieldName = formatFieldName(change.field);

		// For ADD actions or unchanged fields
		if (change.unchanged || action === 'ADD') {
			const value = formatFieldValue(change.value || (data as any)[change.field]);
			if (action === 'ADD') {
				return (
					<Box key={change.field} marginLeft={compact ? 0 : 2}>
						<Text color={COLORS.diffAdded}>
							{ICONS.add} {fieldName}: {value}
						</Text>
					</Box>
				);
			}
			return (
				<Box key={change.field} marginLeft={compact ? 0 : 2}>
					<Text dimColor>
						  {fieldName}: {value}
					</Text>
				</Box>
			);
		}

		// For array changes (like languages)
		if (change.added || change.removed) {
			return (
				<Box key={change.field} flexDirection="column" marginLeft={compact ? 0 : 2}>
					<Text bold>{fieldName}:</Text>
					{change.removed && change.removed.length > 0 && change.removed.map((v: string) => (
						<Box key={`removed-${v}`} marginLeft={2}>
							<Text color={COLORS.diffRemoved}>  - {v}</Text>
						</Box>
					))}
					{change.added && change.added.length > 0 && change.added.map((v: string) => (
						<Box key={`added-${v}`} marginLeft={2}>
							<Text color={COLORS.diffAdded}>  + {v}</Text>
						</Box>
					))}
				</Box>
			);
		}

		// Simple field change (MODIFY)
		const beforeVal = formatFieldValue(change.before);
		const afterVal = formatFieldValue(change.after);

		return (
			<Box key={change.field} flexDirection="column" marginLeft={compact ? 0 : 2}>
				<Text bold>{fieldName}:</Text>
				<Box marginLeft={2}>
					<Text color={COLORS.diffRemoved}>  - {beforeVal}</Text>
				</Box>
				<Box marginLeft={2}>
					<Text color={COLORS.diffAdded}>  + {afterVal}</Text>
				</Box>
			</Box>
		);
	};

	return (
		<Box flexDirection="column">
			{changes.map(renderFieldChange)}
		</Box>
	);
}
