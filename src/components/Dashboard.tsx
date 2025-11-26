import React from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import Gradient from 'ink-gradient';
import { ICONS, COLORS } from '../theme.js';

type DashboardProps = {
	user: string;
	onSelect: (item: string) => void;
	requestCount?: number;
};

export default function Dashboard({ user, onSelect, requestCount = 0 }: DashboardProps) {
    const items = [
        { label: `${ICONS.team} Manage Teams`, value: 'manage_teams' },
        { label: `${ICONS.repo} Manage Repositories`, value: 'manage_repos' },
        { label: `${ICONS.requests} View Requests${requestCount > 0 ? ` (${requestCount})` : ''}`, value: 'view_requests' },
        { label: `${ICONS.exit} Exit`, value: 'exit' }
    ];

    const [activeMenu, setActiveMenu] = React.useState('main');

    const handleSelect = (item: { value: string }) => {
        if (activeMenu === 'main') {
            if (item.value === 'manage_teams') {
                setActiveMenu('teams');
            } else if (item.value === 'manage_repos') {
                setActiveMenu('repos');
            } else if (item.value === 'view_requests') {
                onSelect('view_requests');
            } else if (item.value === 'exit') {
                process.exit(0);
            }
        } else if (activeMenu === 'teams') {
            if (item.value === 'back') {
                setActiveMenu('main');
            } else {
                onSelect(item.value);
            }
        } else if (activeMenu === 'repos') {
            if (item.value === 'back') {
                setActiveMenu('main');
            } else {
                onSelect(item.value);
            }
        }
    };

    const getItems = () => {
        if (activeMenu === 'main') return items;
        if (activeMenu === 'teams') return [
            { label: `${ICONS.add} Add Team`, value: 'manage_teams_add' },
            { label: `${ICONS.modify} Modify Team`, value: 'manage_teams_modify' },
            { label: '← Back', value: 'back' }
        ];
        if (activeMenu === 'repos') return [
            { label: `${ICONS.add} Add Repository`, value: 'manage_repos_add' },
            { label: `${ICONS.modify} Modify Repository`, value: 'manage_repos_modify' },
            { label: '← Back', value: 'back' }
        ];
        return [];
    };

    const menuTitle = activeMenu === 'main' ? 'MAIN MENU' :
                      activeMenu === 'teams' ? 'TEAM MANAGEMENT' :
                      'REPOSITORY MANAGEMENT';

    return (
        <Box flexDirection="column">
            <Box marginBottom={1} justifyContent="center">
                <Gradient name="morning">
                    <Text>Welcome, {user}! ⚡</Text>
                </Gradient>
            </Box>
            <Box borderStyle="double" padding={1} borderColor={COLORS.primary}>
                <Box flexDirection="column">
                    <Box marginBottom={1} justifyContent="center">
                        <Text bold color={COLORS.highlight}>
                            {menuTitle}
                        </Text>
                    </Box>
                    <SelectInput items={getItems()} onSelect={handleSelect} />
                </Box>
            </Box>
        </Box>
    );
}
