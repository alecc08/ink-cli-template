// Design system and theme tokens for ink-cli-template

export const COLORS = {
	// Actions
	add: 'green',
	modify: 'yellow',
	delete: 'red',

	// Status
	pending: 'yellow',
	approved: 'green',
	rejected: 'red',

	// UI Elements
	primary: 'cyan',
	secondary: 'magenta',
	accent: '#ff8800',

	// Semantic
	success: 'green',
	warning: 'yellow',
	error: 'red',
	info: 'blue',

	// Text
	highlight: 'cyan',
	dim: 'gray',
	muted: '#666666',

	// Diff colors
	diffAdded: 'green',
	diffRemoved: 'red',
	diffUnchanged: 'gray',
} as const;

export const BORDERS = {
	primary: 'round',
	secondary: 'single',
	emphasis: 'double',
	bold: 'bold',
} as const;

export const GRADIENTS = {
	header: 'morning',
	success: 'cristal',
	warning: 'teen',
	error: 'passion',
} as const;

// Icons
export const ICONS = {
	team: '👥',
	repo: '📦',
	requests: '📋',
	exit: '🚪',
	add: '[+]',
	modify: '[~]',
	delete: '[-]',
	confirm: '✓',
	cancel: '✗',
} as const;

// Spacing
export const SPACING = {
	xs: 0,
	sm: 1,
	md: 2,
	lg: 3,
} as const;
