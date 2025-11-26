import { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import SelectInput from 'ink-select-input';

type EntityFormProps = {
    type: 'TEAM' | 'REPO';
    action: 'ADD' | 'MODIFY';
    initialData?: any;
    onSubmit: (data: any) => void;
    onCancel: () => void;
};

export default function EntityForm({ type, action, initialData, onSubmit, onCancel }: EntityFormProps) {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<any>(initialData || {});

    // Fields definition
    const getFields = () => {
        if (type === 'TEAM') {
            return [
                { name: 'Name', type: 'text' },
                { name: 'Description', type: 'text' },
                { name: 'Lead', type: 'text' }
            ];
        }
        return [
            { name: 'Name', type: 'text' },
            { name: 'Language', type: 'multi-select', options: ['TypeScript', 'JavaScript', 'Rust', 'Go', 'Python'] },
            { name: 'Visibility', type: 'select', options: ['Public', 'Private'] }
        ];
    };

    const fields = getFields();
    const currentField = fields[step];

    // For multi-select state
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    useEffect(() => {
        if (currentField && currentField.type === 'multi-select' && formData[currentField.name.toLowerCase()]) {
            const saved = formData[currentField.name.toLowerCase()];
            if (Array.isArray(saved)) setSelectedOptions(saved);
            else if (typeof saved === 'string') setSelectedOptions(saved.split(', '));
        }
    }, [currentField, formData]);

    useInput((_input, key) => {
        if (key.escape) {
            onCancel();
        }
        // For multi-select, enter confirms selection
        if (currentField && currentField.type === 'multi-select' && key.return) {
            handleNext(selectedOptions);
        }
    });

    const handleNext = (value: any) => {
        if (!currentField) return;
        const newFormData = { ...formData, [currentField.name.toLowerCase()]: value };
        setFormData(newFormData);

        if (step < fields.length - 1) {
            setStep(step + 1);
            setSelectedOptions([]);
        } else {
            onSubmit({
                id: initialData?.id || Math.random().toString(36).substr(2, 9),
                type,
                action,
                data: newFormData,
                status: 'PENDING'
            });
        }
    };

    const renderInput = () => {
        if (!currentField) return null;

        if (currentField.type === 'text') {
            return (
                <TextInput
                    value={formData[currentField.name.toLowerCase()] || ''}
                    onChange={(val) => setFormData({ ...formData, [currentField.name.toLowerCase()]: val })}
                    onSubmit={handleNext}
                />
            );
        }

        if (currentField.type === 'select') {
            const items = currentField.options?.map(opt => ({ label: opt, value: opt })) || [];
            return (
                <SelectInput
                    items={items}
                    onSelect={(item) => handleNext(item.value)}
                />
            );
        }

        if (currentField.type === 'multi-select') {
            const options = currentField.options || [];
            return (
                <Box flexDirection="column">
                    {options.map((opt, idx) => {
                        const isSelected = selectedOptions.includes(opt);
                        return (
                            <Text key={idx} color={isSelected ? 'green' : 'white'}>
                                {isSelected ? '[x]' : '[ ]'} {opt}
                            </Text>
                        );
                    })}
                    <Box marginTop={1}>
                        <Text dimColor>Use 1-{options.length} to toggle, Enter to confirm</Text>
                    </Box>
                    {/* Hacky input for number selection */}
                    <Box display="none">
                        <TextInput value="" onChange={(val) => {
                            const num = parseInt(val);
                            if (!isNaN(num) && num > 0 && num <= options.length) {
                                const opt = options[num - 1];
                                if (opt) {
                                    if (selectedOptions.includes(opt)) {
                                        setSelectedOptions(selectedOptions.filter(o => o !== opt));
                                    } else {
                                        setSelectedOptions([...selectedOptions, opt]);
                                    }
                                }
                            }
                        }} />
                    </Box>
                </Box>
            );
        }
        return null;
    };

    // Custom handler for multi-select keys since TextInput is hidden/not focused properly for raw keys
    useInput((input, _key) => {
        if (currentField && currentField.type === 'multi-select') {
            const num = parseInt(input);
            if (!isNaN(num) && num > 0 && num <= (currentField.options?.length || 0)) {
                const opt = currentField.options![num - 1];
                if (opt) {
                    if (selectedOptions.includes(opt)) {
                        setSelectedOptions(selectedOptions.filter(o => o !== opt));
                    } else {
                        setSelectedOptions([...selectedOptions, opt]);
                    }
                }
            }
        }
    });

    if (!currentField) return null;

    return (
        <Box flexDirection="column" borderStyle="round" padding={1}>
            <Text bold underline>{action} {type}</Text>
            <Box marginTop={1}>
                <Text>{currentField.name}: </Text>
                {renderInput()}
            </Box>
            <Box marginTop={1}>
                <Text dimColor>Esc to Cancel</Text>
            </Box>
        </Box>
    );
}
