import React from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';

export default function Dashboard({ user, onSelect }: { user: string, onSelect: (item: string) => void }) {
    const items = [
        { label: 'Manage Teams', value: 'manage_teams' },
        { label: 'Manage Repositories', value: 'manage_repos' },
        { label: 'View Requests', value: 'view_requests' },
        { label: 'Exit', value: 'exit' }
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
            { label: 'Add Team', value: 'manage_teams_add' },
            { label: 'Modify Team', value: 'manage_teams_modify' },
            { label: 'Back', value: 'back' }
        ];
        if (activeMenu === 'repos') return [
            { label: 'Add Repository', value: 'manage_repos_add' },
            { label: 'Modify Repository', value: 'manage_repos_modify' },
            { label: 'Back', value: 'back' }
        ];
        return [];
    };

    return (
        <Box flexDirection="column">
            <Box marginBottom={1}>
                <Text>Welcome, <Text bold color="green">{user}</Text>!</Text>
            </Box>
            <Box borderStyle="round" padding={1}>
                <SelectInput items={getItems()} onSelect={handleSelect} />
            </Box>
        </Box>
    );
}
