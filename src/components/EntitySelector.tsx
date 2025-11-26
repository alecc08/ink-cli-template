import { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import SelectInput from 'ink-select-input';

type EntitySelectorProps = {
    items: { label: string, value: string }[];
    onSelect: (value: string) => void;
    onCancel: () => void;
};

export default function EntitySelector({ items, onSelect, onCancel }: EntitySelectorProps) {
    const [filter, setFilter] = useState('');

    const filteredItems = items.filter(item =>
        item.label.toLowerCase().includes(filter.toLowerCase())
    );

    useInput((_input, key) => {
        if (key.escape) {
            onCancel();
        }
    });

    return (
        <Box flexDirection="column" borderStyle="round" padding={1}>
            <Text bold>Select Entity to Modify</Text>
            <Box marginTop={1}>
                <Text>Filter: </Text>
                <TextInput value={filter} onChange={setFilter} />
            </Box>
            <Box marginTop={1} borderStyle="single" padding={1}>
                {filteredItems.length > 0 ? (
                    <SelectInput
                        items={filteredItems}
                        onSelect={(item) => onSelect(item.value)}
                        limit={5}
                    />
                ) : (
                    <Text italic dimColor>No matches found</Text>
                )}
            </Box>
            <Box marginTop={1}>
                <Text dimColor>Esc to Cancel</Text>
            </Box>
        </Box>
    );
}
