// Utility functions for computing diffs between entities

export type FieldChange = {
	field: string;
	changed?: boolean;
	unchanged?: boolean;
	before?: any;
	after?: any;
	added?: string[];
	removed?: string[];
	value?: any;
};

/**
 * Compute the diff between two objects field by field
 */
export function computeDiff(
	before: any,
	after: any,
	fields: string[]
): FieldChange[] {
	const changes: FieldChange[] = [];

	for (const field of fields) {
		const beforeVal = before?.[field];
		const afterVal = after[field];

		if (Array.isArray(afterVal)) {
			// Handle array fields (like languages)
			const beforeArray = Array.isArray(beforeVal) ? beforeVal : [];
			const added = afterVal.filter(v => !beforeArray.includes(v));
			const removed = beforeArray.filter(v => !afterVal.includes(v));

			if (added.length > 0 || removed.length > 0) {
				changes.push({
					field,
					added,
					removed,
					changed: true
				});
			} else {
				changes.push({
					field,
					value: afterVal,
					unchanged: true
				});
			}
		} else if (beforeVal !== afterVal) {
			// Simple field change
			changes.push({
				field,
				before: beforeVal,
				after: afterVal,
				changed: true,
			});
		} else {
			// Unchanged field
			changes.push({
				field,
				value: afterVal,
				unchanged: true,
			});
		}
	}

	return changes;
}

/**
 * Get field names for a given entity type
 */
export function getFieldsForType(type: 'TEAM' | 'REPO'): string[] {
	if (type === 'TEAM') {
		return ['name', 'description', 'lead'];
	}
	return ['name', 'language', 'visibility'];
}

/**
 * Format field name for display (capitalize first letter)
 */
export function formatFieldName(field: string): string {
	return field.charAt(0).toUpperCase() + field.slice(1);
}

/**
 * Format field value for display
 */
export function formatFieldValue(value: any): string {
	if (Array.isArray(value)) {
		return value.join(', ');
	}
	if (value === null || value === undefined) {
		return '(empty)';
	}
	return String(value);
}
